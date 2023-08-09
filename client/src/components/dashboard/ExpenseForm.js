import { Button, Form, Input, DatePicker, Select, message } from 'antd';
import React from 'react';
export default function ExpenseForm(props) {
const dateFormat = 'YYYY/MM/DD';
const onFinishFailed = (errorInfo) => {
console.log('Failed:', errorInfo);
}
return (
    <div>
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
      onFinish={props.handleSubmit}
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
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
