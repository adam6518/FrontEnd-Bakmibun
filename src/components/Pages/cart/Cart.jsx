import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Modals from '../../component/modals/Modals'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import '../cart/Cart.css'

class Cart extends Component {

    state = {
        carts: [],
        jumlah: 0
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(
            'http://localhost:5000/cart/getcarts',
            {
                params: {
                    userID: this.props.user_id
                }
            }
        ).then(res => {
            if (res.data.length > 0) {
                this.setState({
                    carts: res.data,
                    jumlah: res.data[0].jumlah
                })
            }

            this.setState({
                carts: res.data
            })
            console.log(this.state.carts);
            console.log(this.state.jumlah);
        })
    }

    deleteItems = (cartID) => {
        axios.delete(
            'http://localhost:5000/cart/deleteitems',
            {
                data: {
                    cartID: cartID
                }
            }
        ).then(res => {
            this.getData()
        })
    }

    renderList = () => {
        if (this.state.carts.length > 0) {
            return this.state.carts.map((cart) => {
                // console.log(cart);

                return (
                    <Card id="cart-list" className="container col-3 mx-5 my-5">
                        <CardHeader>
                            <h1>{cart.name}</h1>
                        </CardHeader>
                        <CardBody>
                            <CardTitle>
                                <img style={{ width: '400px', height: '200px' }} src={'http://localhost:5000/' + cart.image} />
                            </CardTitle>
                            <CardText>
                                <h4>ID Product : {cart.productID}</h4>
                                <h4>Jumlah     : {cart.jumlah}</h4>
                                <h4>Harga      : {cart.price}</h4>
                                <h4>Deskripsi  : {cart.description}</h4>
                            </CardText>

                        </CardBody>
                        <CardFooter>
                            <button onClick={() => { this.deleteItems(cart.cartID) }} className='btn btn-warning btn-block'>Delete</button>
                        </CardFooter>
                    </Card>
                    // <tr>
                    //     <td>{cart.productID}</td>
                    //     <td>{cart.name}</td>
                    //     <td>{cart.description}</td>
                    //     <td>{cart.price}</td>
                    //     <img style={{ width: '100px' }} src={'http://localhost:5000/' + cart.image} />
                    //     <td>{cart.jumlah}</td>
                    //     <td>
                    //         <button onClick={() => { this.deleteItems(cart.cartID) }} className='btn btn-warning'>Delete</button>
                    //     </td>
                    // </tr>
                )
            })
        } else {
            return null
        }
    }

    render() {
        if (this.props.user_id) {

            return (
                <div>
                    <h1 className='display-4 text-center' style={{ fontStyle: 'italic', fontFamily: 'initial' }}>LIST BELANJAKU :</h1>
                    <div className="ml-5 row">
                        {this.renderList()}
                    </div>
                    {/* <table className='table text-center'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Makanan</th>
                                <th>Deskripsi</th>
                                <th>Harga</th>
                                <th>Gambar</th>
                                <th>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table> */}
                    {
                        this.state.carts.length > 0 ?
                            <div className='text-center mt-5'>
                                <Modals />
                            </div>
                            :
                            <div className="text-center">
                                <h1 className="my-5">Cart Anda masih kosong, belanja dulu yuk !</h1>
                                <a href='/'>
                                    <Button className="btn btn-success">Kembali ke Home Page</Button>
                                </a>
                            </div>
                    }

                </div>
            )


        } else {
            return <Redirect to='/login' />
        }
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.id
    }
}

export default connect(mapStateToProps)(Cart)