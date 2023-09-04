import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/dashboard/Sidebar'
import { Col, Row,message} from 'antd'
import ExpenseHeader from '@/components/dashboard/ExpenseHeader'
import ExpenseForm from '@/components/dashboard/ExpenseForm'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
export default function edit() {
  const {userDetails} = useSelector(state=>state.users)
  const {imageFile} = useSelector(state=>state.expenses)
  // console.log(imageFile)
  const router = useRouter()
  const {id} = router.query
  const [msg, contextHolder] = message.useMessage()

  const handleExpUpdate = async(values) =>{//update expense
    values.addedBy = userDetails._id
    const formData = new FormData()
    Object.entries(values).forEach((item)=>{
    formData.append(item[0], item[1])
    })
    // formData.append('receiptImage', imageFile)
    const requestOptions = {
        method: 'PUT',
        body: formData
    };
    const res = await fetch(`http://localhost:5000/expenses/edit/${id}`, requestOptions)
    const data = await res.json()
    if(data.success){
        msg.info(data.msg)
    }else{
        msg.info(data.msg)
    }
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
                  <ExpenseHeader title="Edit Expense"/>
                </div>
                <ExpenseForm handleSubmit={handleExpUpdate}/>
               </div>
            </Col>
          </Row>
        </div>
        
      </div>
        
      <Footer/>
    </>
  )
}
