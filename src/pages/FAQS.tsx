import PageHeader from "../components/PageHeader";
import "./FAQS.css";

function FAQS() {
  return (
    <>
      <PageHeader pageTitle="Faqs" />
      <section className="faqs-section padded-inverso">
        <div className="faqs-container">
          <div className="faqs-left">
            <div className="faqs-breadcrumb">FAQs</div>
            <h1 className="faqs-title">FREQUENTLY ASKED QUESTION</h1>
            <p className="faqs-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <div className="faqs-img-box">
              <img
                src="https://img.freepik.com/vector-gratis/faq-concept-illustration_114360-5245.jpg"
                alt="FAQ"
                className="faqs-img"
              />
            </div>
          </div>
          <div className="faqs-right">
            <div>
              <h3 className="faqs-question">HOW CAN YOU HELP?</h3>
              <p className="faqs-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            </div>
            <div >
              <h3 className="faqs-question">WHAT IS A RETURN POLICY?</h3>
              <p className="faqs-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            </div>
            <div >
              <h3 className="faqs-question">WHAT PAYMENT METHODS DO YOU ACCEPT?</h3>
              <p className="faqs-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            </div>
            <div >
              <h3 className="faqs-question">DO YOU SELL GIFT CARDS?</h3>
              <p className="faqs-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQS;