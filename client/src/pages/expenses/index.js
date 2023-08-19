import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/dashboard/Sidebar'
import { Col, Row,Button, Space, Modal, message, Form, Popconfirm, Tooltip,Skeleton} from 'antd'
import ExpenseForm from '@/components/dashboard/ExpenseForm'
import { useSelector } from 'react-redux'
import {DeleteOutlined} from '@ant-design/icons';

export default function Expenses() {

  const {userDetails} = useSelector(state=>state.users)
  const [isExpModalOpen, setIsExpModalOpen] = useState(false)
  const [msg, contextHolder] = message.useMessage()
  // const {imageFile} = useSelector(state=>state.expenses)
  const handleExpense = async(values) =>{//create a new expense
    console.log(values)
    
    values.addedBy = userDetails._id
     const formData = new FormData()
     Object.entries(values).forEach((item)=>{
      formData.append(item[0], item[1])
     })
    // formData.append('receiptImage', imageFile)
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    const res = await fetch('http://localhost:5000/add-expenses', requestOptions)
    const data = await res.json()
    if(data.success){
      setIsExpModalOpen(false)
      msg.info(data.msg)
    }else{
      setIsExpModalOpen(true)
      msg.info(data.msg)
    }
}

//loading all expenses using useEffect hook
const [expenses,setExpenses] = useState([])
const [isEditOpen, setIsEditOpen] = useState(false)
const [isDelete, setIsDelete] = useState(false)
const fetchExpenses = async() =>{//get all the expenses
    const res = await fetch('http://localhost:5000/expenses')
    const {data} = await res.json()
    setExpenses(data)
}
const deleteExpense = async (ID) => {//delete the expense
  setIsDelete(false)
  try {
    const res = await fetch(`http://localhost:5000/delete-expense/${ID}`, { method: 'DELETE'});
    const data = await res.json()
    message.success(data.msg);
    setIsDelete(true)

  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
    fetchExpenses()
},[isExpModalOpen,isDelete])

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
                  <h1>Expenses</h1>
                  <div className="actions">
                    <Space wrap>
                        <Button type="primary" className="expenses" onClick={()=>setIsExpModalOpen(true)}>Add Expense</Button>
                        <Button type="primary">Settle up</Button>
                    </Space>
                    <Modal
                        footer={null}
                        title="Add Expense" open={isExpModalOpen} onCancel={()=>setIsExpModalOpen(false)} >
                        <ExpenseForm handleSubmit={handleExpense}/>
                    </Modal>
                  </div>
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
              </div>
            </Col>
          </Row>
        </div>
        
      </div>
        
      <Footer/>
    </>
  )
}