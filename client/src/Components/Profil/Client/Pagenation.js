import React from 'react'
import './Client.css'

function Pagenation({postsPerPage,totalPosts,paginate}) {
    const pageNumber=[];
    for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumber.push(i);
    }
    pageNumber.map((ele)=>{
        console.log(ele);
    })


    
  return (
    <nav className='navPagination'>
   
        <div class="pagination">
            {  
                pageNumber.map((ele)=>
                <a  className="btn" onClick={(e)=>{e.preventDefault();paginate(ele)}} href="Profil/!#">{ele}</a>
                )    
            }
        </div>

    </nav>
  )
}

export default Pagenation;