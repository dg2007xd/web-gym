import Shop from '../assets/images/shop-image.jpg';
import '../data/Dropdowns.css'
//1
export const dropdownTienda = () => {
  return (

    <div className="dropdown-menu mega-menuS p-4">
      <div className="row">

        <div className="col-md-3">
          <h6 className="dropdown-header">Product Types</h6>
          <a className="dropdown-item" href="#">Simple Products</a>
          <a className="dropdown-item" href="#">Grouped Products</a>
          <a className="dropdown-item" href="#">
            Variable Product <span id="boton-new">NEW</span>
          </a>
          <a className="dropdown-item" href="#">External/Affiliate Product</a>
          <a className="dropdown-item" href="#">
            Sale Products <span id="boton-rosa">SALE</span>
          </a>
          <a className="dropdown-item" href="#">Upsell Products</a>
          <a className="dropdown-item" href="#">Cross-Sell Product</a>
        </div>

        <div className="col-md-3">
          <h6 className="dropdown-header">WooCommerce Pages</h6>
          <a className="dropdown-item" href="#">Shop Page</a>
          <a className="dropdown-item" href="#">Checkout Page</a>
          <a className="dropdown-item" href="#">Shopping Cart</a>
          <a className="dropdown-item" href="#">My Account</a>
          <a className="dropdown-item" href="#">
            Shop Ajax Filter <span id="boton-naranja">HOT</span>
          </a>
          <a className="dropdown-item" href="#">Product Category</a>
          <a className="dropdown-item" href="#">Privacy Policy</a>
        </div>

        <div className="col-md-3">
          <h6 className="dropdown-header">Product Features</h6>
          <a className="dropdown-item" href="#">Stock Progress Bar</a>
          <a className="dropdown-item" href="#">Color/Image Swatches</a>
          <a className="dropdown-item" href="#">
            Size Guide Table <span id="boton-naranja">POPULAR</span>
          </a>
          <a className="dropdown-item" href="#">Custom Tab</a>
          <a className="dropdown-item" href="#">Countdown Timer</a>
          <a className="dropdown-item" href="#">
            Product Video <span id="boton-rosa">FEATURED</span>
          </a>
          <a className="dropdown-item" href="#">Product Brand</a>
        </div>

        <div className="col-md-3">
          <img src={Shop} width={388} height={242} alt="" />
        </div>
      </div>
    </div>
  );
};

//2
export const dropdownCategorias = () => {
  return (
    <div className="dropdown-menu mega-menuC">
      <div className="row">
        <div className="col-md-7 p-4">

          <div className="row">
            <div className="col-md-3 mb-4">
              <h6 className="dropdown-header">Pipes And Fittings</h6>
              <a className="dropdown-item" href="#">Compression Fittings</a>
              <a className="dropdown-item" href="#">Copper Pipes</a>
              <a className="dropdown-item" href="#">PVC Pipes</a>
              <a className="dropdown-item" href="#">Threaded Fittings</a>

            </div>

            <div className="col-md-3 mb-4 ms-5 me-5">
              <h6 className="dropdown-header">Plumbing Accessories</h6>
              <a className="dropdown-item" href="#">Escutcheons</a>
              <a className="dropdown-item" href="#">Shower Curtains</a>
              <a className="dropdown-item" href="#">Shower Heads</a>
              <a className="dropdown-item" href="#">Soap Dispensers</a>

            </div>

            <div className="col-md-3 mb-4">
              <h6 className="dropdown-header">Plumbing Fixtures</h6>
              <a className="dropdown-item" href="#">Bathtubs</a>
              <a className="dropdown-item" href="#">Faucets</a>
              <a className="dropdown-item" href="#">Showers</a>
              <a className="dropdown-item" href="#">Wash Basins</a>

            </div>
          </div>


          <div className="row">

            <div className="col-md-3 mb-4">
              <h6 className="dropdown-header">Plumbing Hardware</h6>
              <a className="dropdown-item" href="#">Anchors</a>
              <a className="dropdown-item" href="#">Gaskets</a>
              <a className="dropdown-item" href="#">Seals</a>
              <a className="dropdown-item" href="#">Washers</a>

            </div>

            <div className="col-md-3 mb-4 ms-5 me-5">
              <h6 className="dropdown-header">Plumbing Tools</h6>
              <a className="dropdown-item" href="#">Drain Snakes</a>
              <a className="dropdown-item" href="#">Pipe Clamps</a>
              <a className="dropdown-item" href="#">Pipe Cutters</a>
              <a className="dropdown-item" href="#">Soldering Tools</a>

            </div>

            <div className="col-md-3 mb-4">
              <h6 className="dropdown-header">Pumps And Tanks</h6>
              <a className="dropdown-item" href="#">Pressure Tanks</a>
              <a className="dropdown-item" href="#">Pump Accessories</a>
              <a className="dropdown-item" href="#">Water Pumps </a>
              <a className="dropdown-item" href="#">Well Pumps</a>

            </div>

          </div>

        </div>

        <div className='col-md-4 bg-categories-img'>
          <div className=''>
            <img src={Shop} width={388} height={242} alt="" />
          </div>



        </div>

      </div>
    </div>
  );
};


//3
export const dropdownProductos = () => {
  return (
    <div className="dropdown-menu mega-menuP p-4">
      <div className="row">
        <div className="col-md-4">
          <h6 className="dropdown-header">Product Types</h6>
          <a className="dropdown-item" href="#">Simple Products</a>
          <a className="dropdown-item" href="#">Grouped Products</a>
          <a className="dropdown-item" href="#">
            Variable Product <span className="badge">NEW</span>
          </a>
          <a className="dropdown-item" href="#">External/Affiliate Product</a>
          <a className="dropdown-item" href="#">
            Sale Products <span className="badge bg-danger">SALE</span>
          </a>
          <a className="dropdown-item" href="#">Upsell Products</a>
          <a className="dropdown-item" href="#">Cross-Sell Product</a>
        </div>

        <div className="col-md-4">
          <h6 className="dropdown-header">WooCommerce Pages</h6>
          <a className="dropdown-item" href="#">Shop Page</a>
          <a className="dropdown-item" href="#">Checkout Page</a>
          <a className="dropdown-item" href="#">Shopping Cart</a>
          <a className="dropdown-item" href="#">My Account</a>
          <a className="dropdown-item" href="#">
            Shop Ajax Filter <span className="badge bg-warning">HOT</span>
          </a>
          <a className="dropdown-item" href="#">Product Category</a>
          <a className="dropdown-item" href="#">Privacy Policy</a>
        </div>

        <div className="col-md-4">
          <h6 className="dropdown-header">Product Features</h6>
          <a className="dropdown-item" href="#">Stock Progress Bar</a>
          <a className="dropdown-item" href="#">Color/Image Swatches</a>
          <a className="dropdown-item" href="#">
            Size Guide Table <span className="badge bg-warning">POPULAR</span>
          </a>
          <a className="dropdown-item" href="#">Custom Tab</a>
          <a className="dropdown-item" href="#">Countdown Timer</a>
          <a className="dropdown-item" href="#">
            Product Video <span className="badge bg-danger">FEATURED</span>
          </a>
          <a className="dropdown-item" href="#">Product Brand</a>
        </div>
      </div>
    </div>
  );
};


//4
export const dropdownTopDeals = () => {
  return (
    <div className="dropdown-menu mega-menuT p-4">
      <div className="row">
        <div className="col-md-4">
          <h6 className="dropdown-header">Product Types</h6>
          <a className="dropdown-item" href="#">Simple Products</a>
          <a className="dropdown-item" href="#">Grouped Products</a>
          <a className="dropdown-item" href="#">
            Variable Product <span className="badge">NEW</span>
          </a>
          <a className="dropdown-item" href="#">External/Affiliate Product</a>
          <a className="dropdown-item" href="#">
            Sale Products <span className="badge bg-danger">SALE</span>
          </a>
          <a className="dropdown-item" href="#">Upsell Products</a>
          <a className="dropdown-item" href="#">Cross-Sell Product</a>
        </div>

        <div className="col-md-4">
          <h6 className="dropdown-header">WooCommerce Pages</h6>
          <a className="dropdown-item" href="#">Shop Page</a>
          <a className="dropdown-item" href="#">Checkout Page</a>
          <a className="dropdown-item" href="#">Shopping Cart</a>
          <a className="dropdown-item" href="#">My Account</a>
          <a className="dropdown-item" href="#">
            Shop Ajax Filter <span className="badge bg-warning">HOT</span>
          </a>
          <a className="dropdown-item" href="#">Product Category</a>
          <a className="dropdown-item" href="#">Privacy Policy</a>
        </div>

        <div className="col-md-4">
          <h6 className="dropdown-header">Product Features</h6>
          <a className="dropdown-item" href="#">Stock Progress Bar</a>
          <a className="dropdown-item" href="#">Color/Image Swatches</a>
          <a className="dropdown-item" href="#">
            Size Guide Table <span className="badge bg-warning">POPULAR</span>
          </a>
          <a className="dropdown-item" href="#">Custom Tab</a>
          <a className="dropdown-item" href="#">Countdown Timer</a>
          <a className="dropdown-item" href="#">
            Product Video <span className="badge bg-danger">FEATURED</span>
          </a>
          <a className="dropdown-item" href="#">Product Brand</a>
        </div>
      </div>
    </div>
  );
};