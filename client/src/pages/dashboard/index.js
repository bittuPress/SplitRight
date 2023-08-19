import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/dashboard/Sidebar'
import { Col, Row} from 'antd'
import ExpenseHeader from '@/components/dashboard/ExpenseHeader'
export default function Dashboard() {
  return (
    <>
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
                <ExpenseHeader title="Dashboard"/>
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
