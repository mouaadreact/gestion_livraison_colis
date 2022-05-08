import {Link} from 'react-router-dom'
const Header =()=>{

    return(
<header className="text-center text-white masthead header" >
        <div className="container container-header">
            <div className="row">
                <div className="col-xl-9 mx-auto position-relative">
                    <h1 className="text-dark mb-5" style={{fontSize:"21px",fontFamily:"Aclonica, sans-serif"}}>Welcome To Livraison&nbsp;&nbsp;</h1>
                    <p className="text-dark" style={{fontFamily:"Aclonica, sans-serif"}}>Get your package All across the world , today and tomorrow</p>
                </div>
                <div className="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
                    <form>
                        <div className="row">
                            <div className="col-xl-6 offset-xl-3 text-start d-flex float-end Button-header-div" ><Link exact to='/ContactUs' className="btn btn-primary btn-lg active d-flex float-none Button-header-a" style={{backgroundColor:"#e83e8c",fontSize:"14px"}} role="button" >Contact us</Link></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </header>
    )
}



export default Header;