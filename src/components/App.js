import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { keepLogin } from '../redux/action/authentication'

import Home from './Pages/home/Home'
import Header from './component/Header/Header'
import Register from './Pages/register/Register'
import Login from './Pages/login/Login'
import MyProfile from './Pages/profile/MyProfile'
import Cart from './Pages/cart/Cart'
import AllProduct from './Products/all-products/AllProduct'
import Checkout from './Pages/checkout/Checkout'
import ManageUsers from './Admin/manage-users/ManageUsers'
import BuktiTransfer from './Admin/bukti-transfer/BuktiTransfer'
import ManageProducts from './Admin/manage-products/ManageProducts'

class App extends Component {

    state = {
        check: false
    }

    componentDidMount() {
        let userStorage = JSON.parse(localStorage.getItem('userData'));
        console.log(userStorage);
        
        if (userStorage) {
            this.props.keepLogin(userStorage)
        }

        this.setState({check: true})
    }

    render() {
        if (this.state.check) {
            return (
                <BrowserRouter>
                    <Header />
                    <Route path='/' exact component={Home} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/myprofile' component={MyProfile}/>
                    <Route path='/cart' component={Cart}/>
                    <Route path='/allproduct' component={AllProduct}/>
                    <Route path='/manageusers' component={ManageUsers} />
                    <Route path='/buktitransfer' component={BuktiTransfer} />
                    <Route path='/manageproducts' component={ManageProducts} />
                    <Route path='/checkout' component={Checkout} />
                </BrowserRouter>
            )
        } else {
            return <div><h1 className="text-center">Loading... </h1></div>
        }
    }
}

export default connect(null, {keepLogin})(App)
