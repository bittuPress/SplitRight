import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/dashboard/Sidebar'
import { Col, Row, Avatar, Card, Image,  Button, Space, Modal, message} from 'antd'
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
                  <h1>Dashboard</h1>
                  <div className='actions'>
                  <Space wrap>
                    <Button type="primary" className='expenses'>Add Expenses</Button>
                    <Button type="primary">Settle up</Button>
                  </Space>
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
