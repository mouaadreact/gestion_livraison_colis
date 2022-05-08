import Session_1_Image from "../../Images/session_1_1.webp"
import Session_2_Image from "../../Images/session_1_2.png"
import Session_3_Image from '../../Images/session_1_3.jpg'
const SessionFirst=()=>{
    return(
        <section className="text-center bg-light features-icons" style={{paddingTop:"50px"}}>
        <div className="container" >
            <div className="row">
                <div className="col-lg-4" data-aos="fade-right" data-aos-duration="850">
                    <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                        <h3 style={{color:"#e83e8c",fontSize:"22px"}}>honesty</h3>
                        <p className="lead mb-0"></p>
                    </div>
                    <p  style={{fontSize:"17px"}} className="lead mb-0"><img src={Session_1_Image}/>Livraison provides the Most reliable delivering service </p>
                </div>
                <div className="col-lg-4" data-aos="fade-left" data-aos-duration="850">
                    <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                        <h3></h3>
                        <h3 style={{color:"#e83e8c",fontSize:"22px"}}>Quality</h3>
                        <p style={{fontSize:"17px"}} className="lead mb-0"><img src={Session_2_Image}/>Livraison garantees the best quality of service in the market</p>
                    </div>
                </div>
                <div className="col-lg-4" data-aos="fade-right" data-aos-duration="850">
                    <div className="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                        <h3 style={{color:"#e83e8c",fontSize:"22px"}}>Availability</h3>
                        <p style={{fontSize:"17px"}} className="lead mb-0"><img src={Session_3_Image}/>livraison offers his services 24/24 7/7 </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}
export default SessionFirst;