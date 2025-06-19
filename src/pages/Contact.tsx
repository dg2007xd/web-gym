import PageHeader from '../components/PageHeader';
import './Contact.css';
import callSVG from '../assets/images/phone-solid.svg'
import locationSVG from '../assets/images/location-dot-solid.svg'
import mailSVG from '../assets/images/mail-bulk-solid.svg'
import clockSVG from '../assets/images/clock-solid.svg'

function Contact() {
    return (
        <>
            <PageHeader pageTitle="Contact Us" />
            <section id='contact' className=' padded-inverso-shop'>
                <div className="contact-section">
                    <div className="container">
                        <div className="row">
                            {/* Mapa */}
                            <div className="col-md-8 mb-4">
                                <div className="contact-map-container">
                                    <iframe
                                        title="Google Map"
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d317960.4920879157!2d-0.160963!3d51.49365!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondres!5e0!3m2!1ses!2suk!4v1750361112455!5m2!1ses!2suk"
                                        width="100%"
                                        height="800"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </div>
                            {/* Formulario */}
                            <div className="col-md-4">
                                <div className="contact-form-box p-4">
                                    <h2 className="contact-title">GET IN TOUCH WITH US</h2>
                                    <p className="contact-desc">
                                        If you wish to directly reach us, Please fill out the form below -
                                    </p>
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Your name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Your email</label>
                                            <input type="email" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Your message (optional)</label>
                                            <textarea className="form-control" rows={8}></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary contact-submit-btn mt-4">
                                            SUBMIT
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row-contact contact-info-row mt-5">
                        <div className="col-md-3 col-6 mb-3">
                            <div className="contact-info-box">
                                <div className="contact-info-icon">
                                    <img className='icon-img-contact' src={locationSVG} alt="" />
                                </div>
                                <div>
                                    <div>60 29th San Francisco,</div>
                                    <div>507 - UTC</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 mb-3">
                            <div className="contact-info-box2">
                                <div className="contact-info-icon">
                                    <img className='icon-img-contact' src={callSVG} alt="" />
                                </div>
                                <div>
                                    <div>Call us :</div>
                                    <div>(+01) 987-654-3210</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 mb-3">
                            <div className="contact-info-box">
                                <div className="contact-info-icon">
                                    <img className='icon-img-contact' src={mailSVG} alt="" />
                                </div>
                                <div>
                                    <div>Mail us :</div>
                                    <div>demo@example.com</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6 mb-3">
                            <div className="contact-info-box2">
                                <div className="contact-info-icon">
                                    <img className='icon-img-contact' src={clockSVG} alt="" />
                                </div>
                                <div>
                                    <div>Open time :</div>
                                    <div>10:00AM – 6:00PM</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Contact