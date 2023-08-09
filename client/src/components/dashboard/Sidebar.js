import React from 'react'
import Link from 'next/link';
export default function Sidebar() {
  return (
    <div class="sidebar">
       <ul>
        <li>
            <Link href="/dashboard">
                <span class="item">Dashboard</span>
            </Link>
        </li>
        <li>
            <Link href="/expenses">
                <span class="item">All Expenses</span>
            </Link>
        </li>
                
        </ul>
    </div>  
  )
}
