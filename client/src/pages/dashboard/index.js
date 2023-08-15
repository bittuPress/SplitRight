import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/dashboard/Sidebar'
import { Col, Row, Avatar, Card, Image,  Button, Space, Modal, message, Form} from 'antd'
import ExpenseForm from '@/components/dashboard/ExpenseForm'
import { useSelector } from 'react-redux'
export default function Dashboard() {

  const {userDetails} = useSelector(state=>state.users)
  const [isExpModalOpen, setIsExpModalOpen] = useState(false)
  const [msg, contextHolder] = message.useMessage()
  const handleExpense = async(values) =>{
    // console.log(userDetails)
     values.addedBy = userDetails._id
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
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
  return (
    <>
      {contextHolder}
      <Header/>
      <div className='container inner--cover'>
        <div className='dashboard'>
          <Row>
            <Col span={6}>
              <Sidebar/>
            </Col>
            <Col span={18}>
              <div className='center--content'>
                <div className='header'>
                  <h1>Dashboard</h1>
                  <div className='actions'>
                  <Space wrap>
                    <Button type="primary" className='expenses' onClick={()=>setIsExpModalOpen(true)}>Add Expense</Button>
                    <Button type="primary">Settle up</Button>
                  </Space>
                  <Modal
                      footer={null}
                      title="Add Expenses" open={isExpModalOpen} onCancel={()=>setIsExpModalOpen(false)} >
                      <ExpenseForm handleSubmit={handleExpense}/>
                  </Modal>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        
      </div>
        
      <Footer/>
    </>
  )
}
