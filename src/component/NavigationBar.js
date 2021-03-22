import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

class NavigationBars extends React.Component {
    render() {
        return (

            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://pngimg.com/uploads/book/book_PNG2109.png"
                        width="25"
                        height="25"
                        alt="logo"
                    />{''}Book Store
                </Link>
                <Nav className="mr-auto">
                    <Link to="/add" className="nav-link">Add Book</Link>
                    <Link to="/list" className="nav-link">Book List</Link>
                    <Link to="/users" className="nav-link">User List</Link>


                </Nav>

                <Nav className="navbar-right">
                 
                    <Link to={"register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> Register</Link>
                    <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>


                </Nav>

            </Navbar>
        )
    }
}
export default NavigationBars;