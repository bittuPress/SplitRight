import React,{ useState} from 'react'
import ExpenseForm from '@/components/dashboard/ExpenseForm'
import {Button, Space, Modal, message} from 'antd'
import { useSelector } from 'react-redux'
export default function ExpenseHeader(props) {
    const {userDetails} = useSelector(state=>state.users)
    const {imageFile} = useSelector(state=>state.expenses)
    // console.log(imageFile)
    const [isExpModalOpen, setIsExpModalOpen] = useState(false) 
    const [msg, contextHolder] = message.useMessage()
    const handleExpense = async(values) =>{//create a new expense

        console.log(values)
        values.addedBy = userDetails._id
            const formData = new FormData()
            Object.entries(values).forEach((item)=>{
            formData.append(item[0], item[1])
            })
        // formData.append('receiptImage', imageFile)
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        const res = await fetch('http://localhost:5000/add-expenses', requestOptions)
        const data = await res.json()
        if(data.success){
            if(props.getExpenses) props.getExpenses()
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
        <h1>{props.title}</h1>
        <div className="actions">
            <Space wrap>
                <Button type="primary" className="expenses" onClick={()=>setIsExpModalOpen(true)}>Add Expense</Button>
                <Button type="primary">Settle up</Button>
            </Space>
            <Modal
                footer={null}
                title="Add Expense" open={isExpModalOpen} onCancel={()=>setIsExpModalOpen(false)} >
                <ExpenseForm handleSubmit={handleExpense}/>
            </Modal>
        </div>
    </>
  )
}
