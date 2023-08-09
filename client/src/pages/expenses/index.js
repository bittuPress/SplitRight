import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/dashboard/Sidebar'
import { Col, Row,Button, Space, Modal, message, Form} from 'antd'
import ExpenseForm from '@/components/dashboard/ExpenseForm'
import { useSelector } from 'react-redux'
export default function Expenses() {

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
    const res = await fetch('http://localhost:4000/add-expenses', requestOptions)
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
                  <h1>Expenses</h1>
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
                <div className='all--expenses'>
                    <div className='details'>
                    <Row>
                        <Col span={14}>
                            <div className='flexcontainer'>
                                <div className='exp--date'>
                                    <p><span>Aug</span> 08</p>
                                </div>
                                <div className='exp--title'>
                                    <h2>Uber Cab</h2>
                                </div>
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className='flexcontainer'>
                                <div className='bill'>
                                    shyam paid<br/>
                                    <span class="number">$30.00</span>
                                </div>
                                <div className='you'>
                                    shyam lent you<br/>
                                    <span class="number">$10.00</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
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