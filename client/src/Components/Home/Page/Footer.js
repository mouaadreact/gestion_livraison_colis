import {BsFacebook} from 'react-icons/bs';
import {AiFillInstagram} from 'react-icons/ai';
import {AiOutlineTwitter} from 'react-icons/ai';

const Footer =()=>{
    const icon={
        width:"20px",
        color:"#e83e8c"
    }
    return( 
        <footer className="bg-light footer" data-aos="zoom-in" data-aos-duration="950">
        <div className="container container-footer">
            <div className="row">
                <div className="col-lg-6 text-center text-lg-start my-auto h-100">
                    <p className="text-muted small mb-4 mb-lg-0">© Brand 2022. All Rights Reserved.</p>
                </div>
                <div className="col-lg-6 text-center text-lg-end my-auto h-100">
                    <ul className="list-inline mb-0">
                        <li className="list-inline-item"><a href="#"><BsFacebook style={icon}/></a></li>
                        <li className="list-inline-item"><a href="#"><AiOutlineTwitter style={icon} /></a></li>
                        <li className="list-inline-item"><a href="#"><AiFillInstagram style={icon} /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    )
}
export default Footer;