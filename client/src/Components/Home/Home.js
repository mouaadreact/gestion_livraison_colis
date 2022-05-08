import './Home.css'
import '../bootstrap.min.css'
import Header from './Page/Header'
import Footer from './Page/Footer';
import Section from './Page/Section';
import scrolls from './Scroll';
import { UidContext } from '../AppContext';
import { useContext } from 'react';
import ForBidden_404 from '../Images/403.jpg'

const Home =()=>{
   scrolls();
   const uid=useContext(UidContext);
    return (
        <div className='Home'>
        {uid ? (<>
         <section className='page-not-found'>
            <img  src={ForBidden_404} alt='403 forbidden'/>
            <h1>403 Forbidden</h1>
            <p>The client does not have access rights to the content; that is, it is unauthorized,
             so the server is refusing to give the requested resource. Unlike 401 Unauthorized,
             the client's identity is known to the server.
             </p>
         </section>
        </>) :(
            <>
        <Header/>
        <Section/>
        <Footer/>
        </>
        )
        }
        </div>
    )
};

export default Home;