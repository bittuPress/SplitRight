import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

export default function Customform(props) {
  return (
    <div>
    <Formik
      initialValues={props.initialValues}
      onSubmit={values => {
        // same shape as initial values
        props.handleSubmit(values)
      }}
    >
      {({ errors, touched }) => (
        <Form>
            {props.AccountUserFields.map((item)=>{
                 return  <Field name={item.value} type={item.type} placeholder={item.value}/>
            })}
          <button type="submit">{props.title}</button>
        </Form>
      )}
    </Formik>
  </div>
  )
}
