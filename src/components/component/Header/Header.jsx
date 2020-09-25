import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogoutUser } from '../../../redux/action/authentication'
import { filterMenu } from '../../../redux/action/search'
import {
    Button,
    ButtonGroup,
    InputGroup,
    Collapse,
    Input,
    InputGroupAddon,
    InputGroupText,
    Navbar,
    NavbarToggler,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import '../Header/Header.css'

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            keyword: ''
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onSearchSubmit = (e) => {
        e.preventDefault()
        this.props.filterMenu(this.state.keyword)
        // if(this.keyword.value){
        //     this.props.history.push('/')
        // }
    }

    render() {
        console.log(this.props.hasilFilter)
        console.log(this.state.keyword)
        if (!this.props.user_name) {
            return (
                <div>
                    <Navbar className="gradient" style={{ backgroundColor: '#0a0c07' }} expand="md">
                        <a href='/'>
                            <img alt="logo" className="logo-size" src={require("../../../Bakmi-bun/logo2.png")}></img>
                        </a>
                        {/* <NavLink to='/allproduct'>
                            <h3 className="kategori">Kategori</h3>
                        </NavLink> */}
                        <ButtonGroup className="button-group" size="md">
                            <Input value={this.state.keyword} onChange={e => this.setState({ keyword: e.target.value })} className="searchbar-margin" type="text" placeholder="Cari disini..."></Input>
                            <Button onClick={this.onSearchSubmit} className="mr-5 ml-5" style={{ backgroundColor: '#f0c75f' }} color="warning">Search</Button>
                        </ButtonGroup>
                        <NavLink className="mb-3 cart-sizing" to='/cart'>
                            <Button className="button-outline" style={{ backgroundColor: '#0a0c07', width: "55px" }}>
                                <i className="fas fa-shopping-cart" style={{ color: 'white', backgroundColor: '#0a0c07', marginRight: '50px', fontSize: '25px' }}></i>
                            </Button>
                        </NavLink>
                        {/* <NavLink to='/'>
                            <Button className="button-margination" style={{ backgroundColor: 'rgb(129, 128, 46)' }}>
                                <img alt="button" stye={{ backgroundColor: '#0a0c07' }} className="cart-sizing" src={require("../Bakmi-bun/cart2.png")}></img>
                            </Button>
                        </NavLink> */}
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret style={{ color: '#f0c75f', fontSize: '20px' }}>
                                        Order now
                                    </DropdownToggle>
                                    <DropdownMenu middle style={{ backgroundColor: '#0a0c07' }}>
                                        <NavLink to='/register'>
                                            <DropdownItem>
                                                <Button className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>Sign Up</Button>
                                            </DropdownItem>
                                        </NavLink>
                                        <NavLink to='/login'>
                                            <DropdownItem>
                                                <Button className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>Sign In</Button>
                                            </DropdownItem>
                                        </NavLink>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )
        } else {
            if (this.props.user_role !== 'admin') {
                return (
                    <div>
                        <Navbar className="gradient" style={{ backgroundColor: '#0a0c07' }} expand="md">
                            <a href='/'>
                                <img alt="logo" className="logo-size" src={require("../../../Bakmi-bun/logo2.png")}></img>
                            </a>
                            <ButtonGroup className="button-group" size="md">
                                <Input value={this.state.keyword} onChange={e => this.setState({ keyword: e.target.value })} className="searchbar-margin" type="text" placeholder="Cari disini..."></Input>
                                <Button onClick={this.onSearchSubmit} className="mr-5 ml-5" style={{ backgroundColor: '#f0c75f' }} color="warning">Search</Button>
                            </ButtonGroup>
                            <NavLink className="mb-3 cart-sizing" to='/cart'>
                                <Button className="button" style={{ backgroundColor: '#0a0c07', width: "85px" }}>
                                    <i className="fas fa-shopping-cart" style={{ color: 'white', backgroundColor: '#0a0c07', fontSize: '25px' }}></i>
                                </Button>
                            </NavLink>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret style={{ color: '#f0c75f', fontSize: '17px' }}>
                                            Hai {this.props.user_name} ^o^
                                        </DropdownToggle>
                                        <DropdownMenu middle style={{ backgroundColor: '#0a0c07' }}>
                                            <NavLink to='/cart'>
                                                <DropdownItem>
                                                    <Button className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>My cart</Button>
                                                </DropdownItem>
                                                <NavLink to='/myprofile'>
                                                    <DropdownItem>
                                                        <Button className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>Profile</Button>
                                                    </DropdownItem>
                                                </NavLink>
                                            </NavLink>
                                            <NavLink to='/'>
                                                <DropdownItem onClick={this.props.onLogoutUser}>
                                                    <Button onClick={this.props.onLogoutUser} className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>Log out</Button>
                                                </DropdownItem>
                                            </NavLink>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Navbar className="gradient" style={{ backgroundColor: '#0a0c07' }} expand="md">
                            <a href='/'>
                                <img alt="logo" className="logo-size" src={require("../../../Bakmi-bun/logo2.png")}></img>
                            </a>
                            <ButtonGroup className="button-group" size="md">
                                <Input value={this.state.keyword} onChange={e => this.setState({ keyword: e.target.value })} className="searchbar-margin" type="text" placeholder="Cari disini..."></Input>
                                <Button onClick={this.onSearchSubmit} className="mr-5 ml-5" style={{ backgroundColor: '#f0c75f' }} color="warning">Search</Button>
                            </ButtonGroup>
                            <NavLink className="mb-3 cart-sizing" to='/cart'>
                                <Button className="button" style={{ backgroundColor: '#0a0c07', width: "85px" }}>
                                    <i className="fas fa-shopping-cart" style={{ color: 'white', backgroundColor: '#0a0c07', fontSize: '25px' }}></i>
                                </Button>
                            </NavLink>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret style={{ color: '#f0c75f', fontSize: '17px' }}>
                                            Hai {this.props.user_name} ^o^
                                        </DropdownToggle>
                                        <DropdownMenu middle style={{ backgroundColor: '#0a0c07' }}>
                                            <NavLink to='/cart'>
                                                <DropdownItem>
                                                    <Button className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>My cart</Button>
                                                </DropdownItem>
                                                <NavLink to='/myprofile'>
                                                    <DropdownItem>
                                                        <Button className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>Profile</Button>
                                                    </DropdownItem>
                                                </NavLink>
                                                <NavLink to='/manageproducts'>
                                                    <DropdownItem>
                                                        <Button className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>Manage products</Button>
                                                    </DropdownItem>
                                                </NavLink>
                                                <NavLink to='/buktitransfer'>
                                                    <DropdownItem>
                                                        <Button className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>Bukti transfer users</Button>
                                                    </DropdownItem>
                                                </NavLink>
                                                <NavLink to='/manageusers'>
                                                    <DropdownItem>
                                                        <Button className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>Manage users</Button>
                                                    </DropdownItem>
                                                </NavLink>
                                            </NavLink>
                                            <NavLink to='/'>
                                                <DropdownItem onClick={this.props.onLogoutUser}>
                                                    <Button onClick={this.props.onLogoutUser} className="button" style={{ backgroundColor: '#f0c75f', color: '#0a0c07', fontSize: '15px' }}>Log out</Button>
                                                </DropdownItem>
                                            </NavLink>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        user_name: state.auth.username,
        user_role: state.auth.role,
        hasilFilter: state.filter
    }
}

export default connect(mapStateToProps, { onLogoutUser, filterMenu })(Header)