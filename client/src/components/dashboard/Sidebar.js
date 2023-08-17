import React from 'react'
import Link from 'next/link';
export default function Sidebar() {
  return (
    <div className="sidebar">
       <ul>
        <li>
            <Link href="/dashboard">
                <span className="item">Dashboard</span>
            </Link>
        </li>
        <li>
            <Link href="/expenses">
                <span className="item">All Expenses</span>
            </Link>
        </li>
                
        </ul>
    </div>  
  )
}
