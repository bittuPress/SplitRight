import React from 'react'
import { Col, Row} from 'antd'
export default function Sidebar() {
  return (
    <div class="sidebar">
       <ul>
        <li>
            <a href="#">
                <span class="item">Dashboard</span>
            </a>
        </li>
        <li>
            <a href="#">
                <span class="item">All Expenses</span>
            </a>
        </li>
                
        </ul>
    </div>  
  )
}
