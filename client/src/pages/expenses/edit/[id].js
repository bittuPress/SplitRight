import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/dashboard/Sidebar'
import { Col, Row,Button, Space, Modal, message,Popconfirm, Tooltip,Skeleton} from 'antd'
import ExpenseHeader from '@/components/dashboard/ExpenseHeader'
import ExpenseForm from '@/components/dashboard/ExpenseForm'

export default function edit() {
const [msg, contextHolder] = message.useMessage()
const editExpense = () =>{

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
                <ExpenseForm/>
               </div>
            </Col>
          </Row>
        </div>
        
      </div>
        
      <Footer/>
    </>
  )
}
