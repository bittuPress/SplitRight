import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
export default function index() {
  return (
    <>
      <Header/>
        <section className='hero' style={{backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(122, 189, 31, 0.73))`}}>
          <div className='container'>
            <div className='request--box'>
              <h2>Welcome to Splitright</h2>
              <h3>Now Split the bill in right way</h3>
            </div>
          </div>
        </section>
      <Footer/>
     </>
  )
}
