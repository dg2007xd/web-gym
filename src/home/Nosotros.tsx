import './Nosotros.css'
import plan1 from '../assets/images/plan1.jpg';
import plan2 from '../assets/images/plan2.jpg';
import plan3 from '../assets/images/plan3.jpg';
function Nosotros() {
    return (
        <section id="nosotros" className='padded'>
            <div className="container">
                <div className="container text-center">
                    <h1 className='text-center'>PLANES</h1>
                    <div className="row">
                        <div className="col">
                            <img src={plan1} alt="" />
                        </div>
                        <div className="col">
                            <img src={plan2} alt="" />
                        </div>
                        <div className="col">
                            <img src={plan3} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Nosotros