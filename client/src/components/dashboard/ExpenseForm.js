import { Button, Form, Input, DatePicker, Select, message, Col, Row} from 'antd'
import React, { useState } from 'react'
import ImageUpload from '../modules/ImageUpload'
import dayjs from 'dayjs'
export default function ExpenseForm(props) {
const dateFormat = 'YYYY/MM/DD'
let now = dayjs()
let defaultDate = dayjs(now.format(), dateFormat)
return (
    <div>
     <Form
      name="expense"
      wrapperCol={{
        span: 10,
      }}
      initialValues={{
        remember: true,
        ["expensesDate"]: defaultDate
      }}
      onFinish= {props.handleSubmit}
      autoComplete="off"
    >
      <Row>
        <Col span={18}>
          <Form.Item
            label= ""
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input description!',
              },
            ]}
          >
            <Input placeholder='Description'/>
            
          </Form.Item>
          
          
          <Form.Item
            label=""
            name="billAmount"
            rules={[
              {
                required: true,
                message: 'Please input bill amount!',
              },
            ]}
          >
            <Input placeholder='$0.00'/>
          </Form.Item>
          <Form.Item
            label=""
            name="paidBy"
            rules={[
              {
                required: true,
                message: 'Please select the user paid',
              },
            ]}
            >
          <Select
            showSearch
            placeholder="Paid by"
            optionFilterProp="children"
            filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
            {
                value: 'jack',
                label: 'Jack',
            },
            {
                value: 'lucy',
                label: 'Lucy',
            },
            {
                value: 'tom',
                label: 'Tom',
            },
            ]}
        />
        </Form.Item>
          <Form.Item name="expensesDate">
              <DatePicker format={dateFormat} defaultValue={defaultDate}/>
            </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <ImageUpload/>
          </Form.Item>
        </Col>
      </Row>
      
    </Form>
    </div>
  )
}
