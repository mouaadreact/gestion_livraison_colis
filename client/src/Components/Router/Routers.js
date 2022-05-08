import {Route,Switch,BrowserRouter as Router,Redirect} from 'react-router-dom'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp';
import Home from '../Home/Home';
import Profil from '../Profil/Profil'
import NavBar from '../NavBar/NavBar'
import Logout  from '../Login/Logout';
/*------------------------------------------*/
import Command from '../Dashboard/Command/Command';
import Dashboard from '../Dashboard/Dashboard';
import Deliverers from '../Dashboard/Deliverers/Deliverers';
import ContactUs from '../ContactUs/ContactUs'

function Root() {

  return (
    <Router>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Home}/> 
            <Route exact path="/SignUp"  component={SignUp}/>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/Profil" component={Profil}/>
            <Route exact path="/Logout" component={Logout}/>
            <Route exact path='/Dashboard' component={Dashboard}/>
            <Route exact path='/Dashboard/Command' component={Command}/>
            <Route exact path="/Dashboard/Deliverers" component={Deliverers}/>
            <Route exact path="/ContactUs" component={ContactUs} />
            
          </Switch>
     </Router>

    
  );
}

export default Root;