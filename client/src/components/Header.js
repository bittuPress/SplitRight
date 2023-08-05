import Image from 'next/image'
import Logo from '../../public/split-logo.png'
import Link from 'next/link';
import { Avatar, Button, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import {logoutUser} from '@/redux/reducerSlice/Users'
import { useRouter } from 'next/router';
export default function Header() {
   const {userDetails, isLoggedIn} = useSelector(state=>state.users)
   const dispatch = useDispatch()
   const router = useRouter()
   const handleLogout = () => {
      dispatch(logoutUser())
      router.push('/login')
   }
   const content = (
      <div>
        <p><Link href="/profile">Profile</Link></p>
        <p><a onClick={handleLogout}>Logout</a></p>
      </div>
    );
  return (
   <header>
    <div className="container">
       <nav>
        <div className="logo">
            <Link href='/'><Image src={Logo} alt="logo"/></Link>
        </div>
        { isLoggedIn ?
            <Popover placement="bottom" title={`Hi, ${userDetails.fullName}`}  content={content} trigger="click">
              <Avatar
                  size="large"
                  style={{
                  backgroundColor: '#fde3cf',
                  color: '#f56a00',
                  fontSize: '1.5rem',
                  marginRight: '10px'
                  }} > 
                  {userDetails.fullName[0]}
            </Avatar>
            </Popover>
            : <ul className="nav-menus">
            <li><Link href="/login">Login</Link></li>
            <li><Link className="active" href="/register">Signup</Link></li>
            </ul>
         }      
         </nav>
    </div>
     </header>
  )
}
