import './MainFooter.css'
import landline from '../assets/images/landline.png'
import payment from '../assets/images/payment.png'
function MainFooter() {
    return (
        <footer id="main-footer">
            <div className="container">

                <div id="store" className='padded'>
                    {/* Newsletter section */}
                    <div className="newsletter-section site-footer-row-container-inner" >
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 text-center mt-5">
                                    <i className="bi bi-envelope mail-go"></i>
                                    <h2 className="fw-bold mt-1 text-foo">SUBSCRIBE TO OUR NEWSLETTER</h2>
                                    <p className="mb-3 text-footer">
                                        Subscribe to our latest newsletter to get news about special discounts.
                                    </p>
                                    <form className="d-flex justify-content-center" style={{ maxWidth: 700, margin: "0 auto" }}>
                                        <input
                                            type="email"
                                            className="form-control-footer form-control-lg me-2"
                                            placeholder="Email"
                                            style={{ borderRadius: 0, fontSize: "1.1rem" }}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg suscribe-boton"
                                        >
                                            SUBSCRIBE
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer - links */}
                <div className="row center g-4">
                    <div className="col-12 col-md-2">
                        <h5>About Information</h5>
                        <div className="row listSpunto misma-linea text-color mini-padded">
                            <li className='col-1'><i className="bi bi-geo-alt"></i></li>
                            <li className='col-10'>60 29th Street San Francisco, 94110 507-Union Trade Center, United States America</li>
                        </div>
                        <div className="row listSpunto misma-linea text-color mini-padded">
                            <li className='col-1'><img src={landline} width={14} height={14} alt="" /></li>
                            <li className='col-10'>(+91) 9876-543-210</li>
                        </div>

                        <div className='row listSpunto misma-linea text-color mini-padded'>
                            <li className="col-1"><i className="bi bi-phone"></i></li>
                            <li className="col-10">(+00) 123-456-7890</li>
                        </div>

                        <div className='row listSpunto misma-linea text-color mini-padded'>
                            <li className="col-1"><i className="bi bi-envelope"></i></li>
                            <li className="col-10">demo@example.com</li>
                        </div>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="row center">
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
                    </div>
                    <div className="col-12 col-md-2">
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
                    <div className="col-12 col-md-2">
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
                <div className="row g-3">
                    <div className="col-7 col-md-4">
                        <div className='social-link center'>
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter-x"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-pinterest"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                    <div className="col-5 col-md-4 center texto-fuente-footer">© 2025 Plumbix Demo - WordPress Theme by Avanam</div>
                    <div className="col-12 col-md-4 center"><img src={payment} alt="" /></div>
                </div>
            </div>
        </footer>
    )
}

export default MainFooter