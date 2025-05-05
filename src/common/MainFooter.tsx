import './MainFooter.css'
import landline from '../assets/images/landline.png'
import payment from '../assets/images/payment.png'
function MainFooter() {
    return (
        <footer id="main-footer">
            <div className="container ">
                <div className="row center align-items-start">
                    <div className="col-2">
                        <h5>About Information</h5>
                        <div className="row listSpunto text-color mini-padded">
                            <li className='col-1'><i className="bi bi-geo-alt"></i></li>
                            <li className='col-10'>60 29th Street San Francisco, 94110 507-Union Trade Center, United States America</li>
                        </div>
                        <div className="row listSpunto text-color mini-padded">
                            <li className='col-1'><img src={landline} width={14} height={14} alt="" /></li>
                            <li className='col-10'>(+91) 9876-543-210</li>
                        </div>

                        <div className='row listSpunto text-color mini-padded'>
                            <li className="col-1"><i className="bi bi-phone"></i></li>
                            <li className="col-10">(+00) 123-456-7890</li>
                        </div>

                        <div className='row listSpunto text-color mini-padded'>
                            <li className="col-1"><i className="bi bi-envelope"></i></li>
                            <li className="col-10">demo@example.com</li>
                        </div>
                    </div>
                    <div className="col-2">
                        <h5>Quick Links</h5>
                        <div className='text-color '>
                            <p>Contact Us</p>
                            <p>Shipping</p>
                            <p>Sitemap</p>
                            <p>FAQs</p>
                            <p>Store Us</p>
                            <p>About Us</p>
                        </div>
                    </div>
                    <div className="col-2">
                        <h5>Your Account</h5>
                        <div className='text-color '>
                            <p>Product Support</p>
                            <p>Checkout</p>
                            <p>License Policy</p>
                            <p>Affiliate</p>
                            <p>Locality</p>
                            <p>Order Tracking</p>
                        </div>
                    </div>
                    <div className="col-2">
                        <h5>Need Help?</h5>
                        <div className='text-color '>
                            <p>Help Center</p>
                            <p>Redeem Voucher</p>
                            <p>Contact Us</p>
                            <p>Report Abuse</p>
                            <p>Submit a Dispute</p>
                            <p>Policies & Rules</p>
                        </div>
                    </div>
                </div>

            </div>

            <hr />

            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className='social-link center'>
                        <a href="#"><i className="bi bi-facebook"></i></a>
                        <a href="#"><i className="bi bi-twitter-x"></i></a>
                        <a href="#"><i className="bi bi-instagram"></i></a>
                        <a href="#"><i className="bi bi-pinterest"></i></a>
                        <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                    <div className="col center">© 2025 Plumbix Demo - WordPress Theme by Avanam</div>
                    <div className="col center"><img src={payment} alt="" /></div>
                </div>
            </div>
        </footer>
    )
}

export default MainFooter