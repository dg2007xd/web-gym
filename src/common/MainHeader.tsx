import { Link } from 'react-router-dom'
import './MainHeader.css'

function MainHeader() {
    return (    
        <header id='main-header'>
            <div className="container row center">
                <h4 className='mt-2 col-6 header-html'>Free Shipping World wide for all orders over $199 <a href="#">SHOP NOW</a> </h4>
                <div className='header-nav col-6 mt-2 mb-2'>
                    <li>ABOUT US</li>
                    <li className='ms-2 me-2 blueW'>|</li>
                    <li>BLOG</li>
                    <li className='ms-2 me-2 blueW'>|</li>
                    <li><Link className='texto-header' to="/contacto">CONTACT US</Link></li>
                    <li className='ms-2 me-2 blueW'>|</li>
                    <li>FAQS</li>
                </div>
            </div>
        </header>
    )
}

export default MainHeader