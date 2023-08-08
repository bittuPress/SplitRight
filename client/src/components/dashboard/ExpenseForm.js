import { Button, Form, Input, DatePicker, Select, message } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux'


export default function ExpenseForm() {
const {userDetails} = useSelector(state=>state.users)
const [msg, contextHolder] = message.useMessage();
const dateFormat = 'YYYY/MM/DD';
const handleExpense = async(values) =>{
  console.log(userDetails)
    console.log(values)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    const res = await fetch('http://localhost:4000/add-expenses', requestOptions)
    const data = await res.json()
    if(data.success){
        // debugger;
        msg.info(data.msg);
    }else{
        msg.info(data.msg);
    }
}

const onFinishFailed = (errorInfo) => {
console.log('Failed:', errorInfo);
};

  return (
    <div>
     {contextHolder}
      <Form
      name="expense"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleExpense}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
        <Input type="hidden" name="addedBy" value={userDetails._id}/>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
