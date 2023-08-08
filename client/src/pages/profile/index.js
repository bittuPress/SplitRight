import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Avatar, Card, Image,  Button, Space, Modal, message} from 'antd'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CustomForm from '@/components/form/CustomForm'
import {setUserDetails} from '@/redux/reducerSlice/Users'

const SignupSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    newPassword: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
      confirmNewPassword: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});
  
const ChangePassForm = () => {
    return (
      <div>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="currentPassword" type="password" placeholder="Current password"/>
              {errors.currentPassword && touched.currentPassword ? (
                <div>{errors.currentPassword}</div>
              ) : null}
              <Field name="newPassword" type="password" placeholder="New password"/>
              {errors.newPassword && touched.newPassword ? (
                <div>{errors.newPassword}</div>
              ) : null}
              <Field name="confirmNewPassword" type="password" placeholder="New password" />
              {errors.confirmNewPassword && touched.confirmNewPassword ? <div>{errors.confirmNewPassword}</div> : null}
              <button type="submit">Change password</button>
            </Form>
          )}
        </Formik>
      </div>
    )
}
export default function Profile() {
    const {userDetails} = useSelector(state=>state.users)
    const [msg, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const AccountUserFields= [
      {value: 'fullName', type: 'text'},
      {value: 'email', type: 'text'},
      {value: 'phoneNumber', type: 'text'},
    ]
    let tempObj={}
    AccountUserFields.forEach((item)=> {
      tempObj[item.value] = 
      userDetails[item.value]
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccountModelOpen, setIsAccountModelOpen] = useState(false);

    const handleEditProfile = async (values) => {
      try {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        };
        const res = await fetch(`http://localhost:4000/user/${userDetails._id}`, requestOptions)
        const data = await res.json()
        if (data && data.success && res.status == 200) {
          dispatch(setUserDetails(data))
          msg.info(data.msg);
          setIsAccountModelOpen(false)
        } else {
          msg.info(data.msg);
        }
      } catch (error) {
        msg.info('Something went wrong!!')
        setIsAccountModelOpen(true)
      }
    }
  return (
    <>
        {contextHolder}
        <Header/>
            <section className='user--profile'>
                <div className='container'>
                    <h2>Your Profile</h2>
                    <Row>
                        <Col span={12}>
                            <Card
                                title="Avatar"
                                bordered={false}
                                style={{
                                width: 300,
                                }}
                            >
                                <Image
                                    width={'100%'}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                                <Space
                                    direction="vertical"
                                    style={{
                                    width: '100%',
                                    marginTop:'20px'
                                    }}
                                >
                                    <Button type="dashed" block>
                                    Change Avatar
                                    </Button>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={12}>
                        <Card className="account--details"
                            title="Account Details"
                            extra={<a onClick={()=>setIsAccountModelOpen(true)}>Edit Details</a>}
                            bordered={true}
                            style={{
                            width: '100%',
                            }}
                        >
                            <p><span>Full Name: </span>{userDetails.fullName}</p>
                            <p><span>Email: </span><a href={`mailto:${userDetails.email}`}>{userDetails.email}</a></p>
                            <p><span>Phone: </span>{userDetails.phoneNumber}</p>

                            <Modal
                              footer={null}
                              title="Edit Details" open={isAccountModelOpen} onCancel={()=>setIsAccountModelOpen(false)} >
                              <h2>Account Details</h2>
                              <CustomForm
                                title="Edit Account Details"
                                handleSubmit={handleEditProfile}
                                submitEndpoint="/users"
                                method="PUT"
                                initialValues={tempObj}
                                AccountUserFields={AccountUserFields}
                              />
                            </Modal>
                        </Card>
                        <Card className="account--details"
                            title="Account Settings"
                            bordered={true}
                            style={{
                            width: '100%',
                            }}
                        >
                           <Space
                                direction="vertical"
                                style={{
                                width: '50%',
                                marginTop:'20px'
                                }}
                            >
                                <Button type="primary" onClick={()=>setIsModalOpen(true)}>
                                Change Password
                                </Button>
                                <Modal
                                    footer={null}
                                    title="Change Password" open={isModalOpen} onCancel={()=>setIsModalOpen(false)} >
                                    <ChangePassForm/>
                                </Modal>
                            </Space>
                        </Card>
                        </Col>
                    </Row>
                </div>
            </section>
            
        <Footer/>
    </>
  )
}
