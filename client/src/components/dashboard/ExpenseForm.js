import { Button, Form, Input, DatePicker, Select, message, Col, Row} from 'antd';
import React, { useState } from 'react';
import ImageUpload from '../modules/ImageUpload';
export default function ExpenseForm(props) {
const dateFormat = 'YYYY/MM/DD';
const onFinishFailed = (errorInfo) => {
console.log('Failed:', errorInfo);
}
const [imageFile, setImageFile] = useState()
const handleImageName = (imgFile) =>{
  setImageFile(imgFile)
}
const handleExpense = async(values) =>{
  console.log(values)
  console.log(imageFile)
  //debugger
    const formData = new FormData()
   Object.entries(values).forEach((item)=>{
    formData.append(item[0], item[1])
   })
   formData.append('receiptImage', imageFile)
  const requestOptions = {
      method: 'POST',
      body: formData
  };
  const res = await fetch('http://localhost:5000/add-expenses', requestOptions)
  const data = await res.json()
  if(data.success){
    console.log(data.msg)
  }else{
    console.log(data.msg)
  }
}
return (
    <div>
     <Form
      name="expense"
      wrapperCol={{
        span: 10,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleExpense}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row>
        <Col span={18}>
          <Form.Item
            label= ""
            name="description"
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
            name="paidBy">
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
              <DatePicker format={dateFormat}/>
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
            <ImageUpload imageCallBack={handleImageName}/>
          </Form.Item>
        </Col>
      </Row>
      
    </Form>
    </div>
  )
}
