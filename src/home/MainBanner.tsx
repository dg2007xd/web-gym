import slide1 from './../assets/images/foto3.jpg';
import slide2 from './../assets/images/foto2.jpg';
import './MainBanner.css';



function MainBanner() {

  return (
    <div id="carouselExampleCaptions" className="carousel slide padded-banner" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={slide1} className="d-block banner-img" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5 className='titulo mb-5'>ENTRENA CON LOS MEJORES</h5>
            <p className='sub'>SOLUCIONES DE ALTO RENDIMIENTO</p>
            <button className='btnC'>DESCUBRIR EQUIPOS</button>
          </div>
        </div>
        <div className="carousel-item">
          <img src={slide2} className="d-block banner-img" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5 className='titulo'>FUERZA SIN LÍMITES</h5>
            <p className='sub'>PESAS DE ACERO INOXIDABLE DE ALTO RENDIMIENTO</p>
            <button className='btnC'>VER CATÁLOGO</button>
          </div>
        </div>

      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}


export default MainBanner
