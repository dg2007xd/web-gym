import './Contact.css';
function Contact() {
    return (
        <section className="contact-section">
            <div className="container">
                <div className="row">
                    {/* Mapa */}
                    <div className="col-md-8 mb-4">
                        <div className="contact-map-container">
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19801.89326383448!2d-0.1277583!3d51.5073509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3333333333%3A0x123456789abcdef!2sLondon!5e0!3m2!1ses!2suk!4v1680000000000!5m2!1ses!2suk"
                                width="100%"
                                height="600"
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
                                    <textarea className="form-control" rows={6}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary contact-submit-btn">
                                    SUBMIT
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row contact-info-row mt-5">
                <div className="col-md-3 col-6 mb-3">
                    <div className="contact-info-box">
                        <div className="contact-info-icon">
                            <i className="bi bi-geo-alt"></i>
                        </div>
                        <div>
                            <div>60 29th San Francisco,</div>
                            <div>507 - UTC</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                    <div className="contact-info-box">
                        <div className="contact-info-icon">
                            <i className="bi bi-telephone"></i>
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
                            <i className="bi bi-envelope-paper"></i>
                        </div>
                        <div>
                            <div>Mail us :</div>
                            <div>demo@example.com</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                    <div className="contact-info-box">
                        <div className="contact-info-icon">
                            <i className="bi bi-clock"></i>
                        </div>
                        <div>
                            <div>Open time :</div>
                            <div>10:00AM – 6:00PM</div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Contact