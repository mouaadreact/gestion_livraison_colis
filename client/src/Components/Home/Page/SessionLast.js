import MouaadImage from '../../Images/mouaad.png'
import AkramImage from '../../Images/akram.png'
const SessionLast=()=>{
    return(
        <section className="text-center bg-light testimonials">
        <div className="container">
            <h2 data-aos="zoom-in-up" data-aos-duration="800" className="mb-5" style={{color:"#e83e8c",paddingTop:"30px"}}>Web Site Creators&nbsp;</h2>
            <div className="col" style={{display:"flex"}}>
            <div data-aos="zoom-in" data-aos-duration="1100" style={{width:"50%"}}><img src={MouaadImage} style={{width:"initial"}}/>
                    <p className="developer_first" style={{fontFamily:"Aclonica, sans-serif"}}>Kharchich Mouaad</p>
                    <p className="developer_second" style={{fontFamily:"Ubuntu"}}>Computer science student</p>
                </div>
                <div data-aos="zoom-in" data-aos-duration="1100" style={{width:"50%"}}><img src={AkramImage} style={{width:"initial"}}/>
                    <p className="developer_first"  style={{fontFamily:"Aclonica, sans-serif"}} >Kssiri Mohamed Akram</p>
                    <p className="developer_second"  style={{fontFamily:"Ubuntu"}}>Computer science student<br/></p>
                </div>
            </div>
        </div>
    </section>
    )
}

export default SessionLast;