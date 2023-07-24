import Image from 'next/image'
import Logo from '../../public/split-logo.png'
import Link from 'next/link';
export default function Header() {
  return (
   <header>
    <div className="container">
       <nav>
        <div className="logo">
           <Link href='/'><Image src={Logo} alt="Picture of the author"/></Link>
        </div>
        <ul className="nav-menus">
            <li><Link href="/login">Login</Link></li>
            <li><Link className="active" href="/register">Signup</Link></li>
        </ul>
       </nav>
    </div>
        
    </header>
    
  )
}
