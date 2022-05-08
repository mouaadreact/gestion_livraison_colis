import SessionFirst from "./SessionFirst";
import SessionLast from "./SessionLast";
import SessionMidle from "./SessionMidle";
const Section =()=>{
    return(
       <div className="Session">
       <SessionFirst/>
       <SessionMidle/>
       <SessionLast/>
       </div>

    )
}
export default Section;