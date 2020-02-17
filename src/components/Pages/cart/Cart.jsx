import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Modals from '../../component/modals/Modals'

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
                    <tr>
                        <td>{cart.productID}</td>
                        <td>{cart.name}</td>
                        <td>{cart.description}</td>
                        <td>{cart.price}</td>
                        <img style={{ width: '100px' }} src={'http://localhost:5000/' + cart.image} />
                        <td>{cart.jumlah}</td>
                        <td>
                            <button onClick={() => { this.deleteItems(cart.cartID) }} className='btn btn-warning'>Delete</button>
                        </td>
                    </tr>
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
                    <h1 className='display-4 text-center'>List belanja Anda :</h1>
                    <table className='table text-center'>
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
                    </table>
                    {
                        this.state.carts.length > 0 ?
                            <div className='text-center'>
                                <Modals />
                            </div>
                            :
                            <div className="text-center">
                                <h1>Cart Anda masih kosong, belanja dulu yuk !</h1>
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