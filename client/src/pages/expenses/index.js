import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/dashboard/Sidebar'
import { Col, Row,Button, Space, Modal, message,Popconfirm, Tooltip,Skeleton} from 'antd'
import {DeleteOutlined} from '@ant-design/icons';
import ExpenseHeader from '@/components/dashboard/ExpenseHeader'
export default function Expenses() {
const [msg, contextHolder] = message.useMessage()
//loading all expenses using useEffect hook
const [expenses,setExpenses] = useState([])
const [isEditOpen, setIsEditOpen] = useState(false)
const [isDelete, setIsDelete] = useState(false)
const [isModalChange, setIsModalChange] = useState(false)
const [isLoadMore,setIsLoadMore] = useState(true)
const isModalClose = (arg) =>{
  setIsModalChange(arg)
}
const fetchExpenses = async(page=0, size=3) =>{//get all the expenses
    const res = await fetch(`http://localhost:5000/expenses?page=${page}&size=${size}`)
    const data = await res.json()
    
    setExpenses([...expenses, ...data.data])
    if(data.total === expenses.length + size) setIsLoadMore(false)
}

const deleteExpense = async (ID) => {//delete the expense
  setIsDelete(false)
  try {
    const res = await fetch(`http://localhost:5000/delete-expense/${ID}`, { method: 'DELETE'});
    const data = await res.json()
    msg.info(data.msg);
    setIsDelete(true)
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
    fetchExpenses()
},[isModalChange,isDelete])

const loadMore = () =>{
  fetchExpenses(expenses.length,3)
}
const getTwoDigitDay = (day)=>{
  return day.toString().padStart(2, '0');
}
  return (
    <>
      {contextHolder}
      <Header/>
      <div className="container inner--cover">
        <div className="dashboard">
          <Row>
            <Col span={6}>
              <Sidebar/>
            </Col>
            <Col span={18}>
              <div className="center--content">
                <div className="header">
                  <ExpenseHeader title="Expenses" modalCallBack={isModalClose}/>
                </div>
                { expenses.length > 0 ? (
                <div className="all--expenses">
                    { expenses.map((item) => {
                        
                        let date = new Date(item.expensesDate)
                        let day = getTwoDigitDay(date.getDate())//gets two digit day
                        let nameOfMonthUS = new Intl.DateTimeFormat('en-US', {//get name of a month
                          month: 'short',
                        }).format(date)
                            return <div className="details">
                            <Row>
                                <Col span={14}>
                                    <div className="flexcontainer">
                                        <div className="exp--date">
                                            <p><span>{nameOfMonthUS}</span> {day}</p>
                                        </div>
                                        <div className="exp--title">
                                            <h2>{item.description}</h2>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <div className="flexcontainer">
                                        <div className="bill">
                                          {item.paidBy} paid<br/>
                                          <span className="number">${item.billAmount}</span>
                                        </div>
                                        <div className="you">
                                          {item.paidBy} lent you<br/>
                                          <span className="number">${item.billAmount / 2}</span>
                                          {/* <Image src={`http://localhost:5000/expenses-img/${item._id}`} alt={item.description} width={50} height={50}/> */}
                                        </div>
                                        <div className='actions'>
                                        <Popconfirm
                                            title="Delete the Expense"
                                            description="Are you sure to delete this expense?"
                                            onCancel={() => setIsEditOpen(false)}
                                            onConfirm={() => deleteExpense(item._id)} 
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Tooltip className='' placement="top">
                                              <DeleteOutlined/>
                                            </Tooltip>
                                        </Popconfirm>
                                        </div>
                                        
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        })}
                        
                        
                       
                 </div>
                 ): <Skeleton active />}
                 
                 { isLoadMore ? (
                 <button onClick={loadMore}>Load more</button> 
                 ): ""} 
                 
              </div>
            </Col>
          </Row>
        </div>
        
      </div>
        
      <Footer/>
    </>
  )
}