import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

   class Header extends React.Component {
   	constructor(props) {
	    super(props);
	    
  }

   	 _refreshPage() {
        localStorage.clear();
        window.location.reload();
      }
   
  
   	render() {
   		


    	 return (

    	 	<nav className="navbar navbar-expand-sm bottom-border">
        <div className="container">
            <Link className="navbar-brand link-float-left" to=' '>
            <img className="img-style" src="https://www.goodhand.ae/public/images/logo.svg" />
            </Link>
            <ul className="navbar-nav">
                <li className="nav-item header-link">
                    <Link className="nav-link" to=' ' data-toggle="modal" data-target="#add_new_task">Add New </Link>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link link-logout" to=' ' onClick = {this._refreshPage}>
					Logout
				</Link>
                </li>
            </ul>
        </div>
        
    
    </nav>
    

    );
}
}


    export default Header