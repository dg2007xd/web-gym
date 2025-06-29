import './AboutUs.css'
import { useState } from "react";
import PageHeader from "../components/PageHeader"
import recepcion from "../assets/images/recepcion.jpg"
import chica from "../assets/images/chica-corriendo.jpg"
import largo from "../assets/images/gym-largo.jpg"
import flexiones from "../assets/images/flexiones.jpg"

import motivation from "../assets/images/motivation.jpg"

function AboutUs() {
  const [activeTab, setActiveTab] = useState("development");
  const [open, setOpen] = useState("vision");

  return (
    <>
      <PageHeader pageTitle="About Us" />
      <section className="padded-inverso padded">
        <div className="container">
          <div className="d-flex justify-content-center mb-0">
            <ul className="nav nav-tabs custom-tabs" style={{ border: "none" }}>
              <li className="nav-item">
                <button
                  className={`nav-link fw-bold ${activeTab === "development" ? "active custom-active" : ""}`}
                  onClick={() => setActiveTab("development")}
                >
                  Development
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fw-bold ${activeTab === "qualified" ? "active custom-active" : ""}`}
                  onClick={() => setActiveTab("qualified")}
                >
                  Qualified team
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fw-bold ${activeTab === "strategy" ? "active custom-active" : ""}`}
                  onClick={() => setActiveTab("strategy")}
                >
                  Strategy
                </button>
              </li>
            </ul>
          </div>
          <div className="p-4 caja-about-us">
            {activeTab === "development" && (
              <>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                </p>
                <p>
                  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                </p>
              </>
            )}
            {activeTab === "qualified" && (
              <p>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
              </p>
            )}
            {activeTab === "strategy" && (
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            )}
          </div>
        </div>


        <div className="container-fluid py-4 mt-5">
          <div className="row g-3 align-items-stretch">
            <div className="col-md-6">
              <img src={recepcion} alt="Recepcion" className="img-fluid w-100 h-100" />
            </div>
            <div className="col-md-6">
              <div className="row g-3 h-100">
                <div className="col-12">
                  <img src={largo} alt="..." className="img-fluid w-100" />
                </div>
                <div className="col-6">
                  <img src={chica} alt="..." className="img-fluid w-100" />
                </div>
                <div className="col-6">
                  <img src={flexiones} alt="..." className="img-fluid w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <div className='bg-acerca'>
        <div className="padded-inverso">
          <div className="aboutus-container justify-content-center align-items-center">
            <div className="aboutus-left">
              <h1 className="aboutus-title">INSPIRATION, INNOVATION,<br />AND OPPORTUNITIES.</h1>
              <p className="aboutus-subtitle">
                Many Desktop Publishing Packages And Web Page Editors Now Use Lorem Ipsum As Their Default Model Text.
              </p>
              <div className="aboutus-accordion">
                <div className={`aboutus-accordion-item${open === "vision" ? " open" : ""}`}>
                  <button
                    className="aboutus-accordion-header"
                    onClick={() => setOpen(open === "vision" ? "" : "vision")}
                  >
                    <span className="aboutus-accordion-arrow">{open === "vision" ? "↴" : "▸"}</span>
                    <span className="aboutus-accordion-label">Business’s vision</span>
                  </button>
                  <div className="aboutus-accordion-content">
                    {open === "vision" && (
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      </p>
                    )}
                  </div>
                </div>
                <div className={`aboutus-accordion-item${open === "mission" ? " open" : ""}`}>
                  <button
                    className="aboutus-accordion-header"
                    onClick={() => setOpen(open === "mission" ? "" : "mission")}
                  >
                    <span className="aboutus-accordion-arrow">{open === "mission" ? "↴" : "▸"}</span>
                    <span className="aboutus-accordion-label">Our mission</span>
                  </button>
                  <div className="aboutus-accordion-content">
                    {open === "mission" && (
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                      </p>
                    )}
                  </div>
                </div>
                <div className={`aboutus-accordion-item${open === "support" ? " open" : ""}`}>
                  <button
                    className="aboutus-accordion-header"
                    onClick={() => setOpen(open === "support" ? "" : "support")}
                  >
                    <span className="aboutus-accordion-arrow">{open === "support" ? "↴" : "▸"}</span>
                    <span className="aboutus-accordion-label">Our support</span>
                  </button>
                  <div className="aboutus-accordion-content">
                    {open === "support" && (
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="aboutus-right">
              <img
                src={motivation}
                alt="Idea"
                className="aboutus-image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;