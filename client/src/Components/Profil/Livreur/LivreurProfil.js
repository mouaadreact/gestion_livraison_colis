import LivreurInfos from "./LivreurInfos";
import LivreurImage from "./LivreurImage";
const LivreurProfil =()=>{
 

    return(
        <> 
           <div className="row">
             <div className="container">
                <div className="main-body">
                    <div className="row gutters-sm">
                      <LivreurImage/>
                      <LivreurInfos/>
                    </div>
                </div>
             </div>
             </div>
        </>
    )
}
export default LivreurProfil;