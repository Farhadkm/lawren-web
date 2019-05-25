import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import './Header.css'

class Header extends Component {
    state = {
        isOpen: false
    }

    toggle = _ => this.setState(prevState => ({ isOpen: !prevState.isOpen }));



    render() {
        return (
            <div>
                <Navbar className="fixed-top bg-white border-bottom" light expand="md">


                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>


                            <NavItem className='nav-item'>
                                <Link className='nav-item__link' to="/" >Home</Link>
                            </NavItem>

                            <NavItem className='nav-item'>
                                <Link className='nav-item__link' to="/bot">Bot</Link>
                            </NavItem>

                            <NavItem className='nav-item'>
                                <Link className='nav-item__link' to="/bot-creator">Bot Creator</Link>
                            </NavItem>




                            <UncontrolledButtonDropdown>
                                <DropdownToggle style={{ borderWidth: 1, width: 40, borderRadius: 10, backgroundColor: 'rgba(0,0,255,0.4)' }} className="p-0 shadow-none">
                                    <img style={{ height: 25, width: 25 }} src="https://genomics.tamu.edu/public/assets/uploads/2016/10/TIGSS_Cluster_Account_Stock_Photo.png" alt='' className="header__user-icon" />
                                </DropdownToggle>
                                <DropdownMenu className="header-dropdown-position p-0">
                                    <DropdownItem onClick={_ => { this.props.logout() }}>Logout</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>

                        </Nav>
                    </Collapse>

                </Navbar>
            </div>
        );
    }
}

export default Header;