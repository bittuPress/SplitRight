import React from 'react'
import { useSelector } from 'react-redux'
export default function Homepage() {
    const {fullName} = useSelector(state=>state.users)
  return (
    <section className='hero' style={{backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(122, 189, 31, 0.73))`}}>
          <div className='container'>
            <div className='request--box'>
              <h2>Welcome to Splitright {fullName}</h2>
              <h3>Now Split the bill in right way</h3>
            </div>
          </div>
        </section>
  )
}
