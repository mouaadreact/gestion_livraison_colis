import Session_1_Image from '../../Images/session_2_1.webp';
import Session_2_Image from '../../Images/session_2_2.png';
import Session_3_Image from '../../Images/session_2_3.webp';


const SessionMidle=()=>{

    function Image(url){
        return (
            {
            backgroundImage:"url("+url+")",
            backgroundSize:"contain",
            backgroundRepeat:"no-repeat",
            with:"200px"
            }
            )
        
    }
    return(
 
        <section className="showcase">
            <div className='container-session'>
            <div className="container-fluid p-0">
            <div className="row g-0">
                <div className="col-lg-6 text-white showcase-img" data-aos="fade-up-right" data-aos-duration="850" style={Image(Session_1_Image)}><span></span></div>
                <div className="col-lg-6 my-auto order-lg-1 showcase-text" data-aos="fade-up-left" data-aos-duration="850">
                    <h2 style={{color:"#e83e8c",fontSize:"25px"}}>Fast delivery</h2>
                    <p style={{fontSize:"19px"}} className="lead mb-0">wherever you're ,Get your product in time record with Livraison . Livraison provides the most reliable delivery service in market   </p>
                </div>
            </div>
            <div className="row g-0">
                <div className="col-lg-6 text-white order-lg-2 showcase-img" data-aos="fade-up-left" data-aos-duration="900" style={Image(Session_2_Image)}><span></span></div>
                <div className="col-lg-6 my-auto order-lg-1 showcase-text" data-aos="fade-up-right" data-aos-duration="900">
                    <h2 style={{color:"#e83e8c",fontSize:"25px"}}>Availability</h2>
                    <p  style={{fontSize:"19px"}} className="lead mb-0">With Livraison , Get your packages whenever you're want ,Livraison offers a consistent service all the time and every time</p>
                </div>
            </div>
            <div className="row g-0">
                <div className="col-lg-6 text-white showcase-img" data-aos="fade-up-right" data-aos-duration="950" style={Image(Session_3_Image)}><span></span></div>
                <div className="col-lg-6 my-auto order-lg-1 showcase-text" data-aos="fade-up-left" data-aos-duration="850">
                    <h2 style={{color:"#e83e8c",fontSize:"25px"}}>Easy to Use &amp;&nbsp;to Order</h2>
                    <p  style={{fontSize:"19px"}} className="lead mb-0">Our platform provides a smooth interaction with clients and relies on the simplicity , consistency ,responsiveness</p>
                </div>
            </div>
        </div> 
            </div>
        </section>
    )
}
export default SessionMidle;