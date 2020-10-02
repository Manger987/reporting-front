import React, { Component } from 'react';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { removeLogin } from '../../../services/authService';

class NavbarMenu extends Component {
    logOut = () => {
        removeLogin();
        console.log("SALLL");
    }
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img src={require("./../../../public/img/logofen.png")} style={{ width: '25%', height: '25%' }} id="icon" alt="User Icon" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="#features">Features</Nav.Link> */}
                            <NavDropdown title="Reporte" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/reports/create">Crear</NavDropdown.Item>
                                <NavDropdown.Item href="/reports">Listar Reportes</NavDropdown.Item>
                                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
                            {/* <Nav.Link eventKey={2} href="#memes">Dank memes </Nav.Link> */}
                            <Link to="#" className="menu-bars">
                                <BiLogOut onClick={this.logOut} />
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>)
    }
}
export default NavbarMenu;