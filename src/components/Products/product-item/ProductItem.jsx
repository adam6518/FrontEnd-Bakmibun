import React, { Component } from 'react'
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button,
    Popover, PopoverHeader, PopoverBody, Input
} from 'reactstrap'
import { Redirect } from 'react-router-dom'
import '../product-item/ProductItem.css'
import axios from 'axios';
import { connect } from 'react-redux'
import { onLogoutUser } from '../../../redux/action/authentication'
import Swal from 'sweetalert2'

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false,
            // carts: [],
            products: [],
            qty: 1
        };
    }

    toggle = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    postToCart = () => {

        // console.log(this.props.barang.productID);
        // console.log(this.props.user_id);
        // console.log(this.state.qty);
        axios.get(
            'http://localhost:5000/cart/getcarts', {
            params: {
                userID: this.props.user_id
            }
        }
        ).then(res => {
            var check = false
            var jumlah
            // console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].productID === this.props.barang.productID) {
                    check = true
                    jumlah = res.data[i].jumlah
                }

            }
            if (!check) {
                axios.post(
                    `http://localhost:5000/cart/posttocarts`,
                    {
                        productID: this.props.barang.productID,
                        userID: this.props.user_id,
                        jumlah: this.state.qty

                    }
                ).then(res => {
                    // console.log(res.data);
                    Swal.fire('Item berhasil ditambahkan ke cart', 'Cek cart Anda', 'success')
                    // this.setState({
                    //     // carts: res.data,
                    //     redirect: true
                    // })
                })
            } else {
                // alert('oi')
                axios.patch(
                    'http://localhost:5000/cart/updatejumlah', {
                    jumlah: jumlah + this.state.qty,
                    productID: this.props.barang.productID
                }
                ).then(res => {
                    Swal.fire('Item berhasil ditambahkan ke cart', 'Cek cart Anda', 'success')
                })
            }



        })
    }


    handlePlus = () => {
        this.setState({
            qty: this.state.qty + 1
        })
    }

    handleMinus = () => {
        if (this.state.qty > 1) {
            this.setState({
                qty: this.state.qty - 1
            })
        }
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to='/' />
        // }

        let { productID, image, price, description, name } = this.props.barang

        return (
            <div className='card mt-5' id="shadow">
                <Card className="mx-auto">
                    <CardImg style={{ width: '246px', height: '200px' }} top width="100%" src={'http://localhost:5000/' + image} alt={productID} />
                    <CardBody>
                        <CardTitle>{name}</CardTitle>
                        <CardSubtitle>RP. {price}</CardSubtitle>
                        <div>
                            <Button className="mt-2" id={name.split(' ').join('')} type="button" onClick={this.toggle}>
                                Deskripsi makanan
                            </Button>
                            <Popover placement="bottom" isOpen={this.state.popoverOpen} target={name.split(' ').join('')} toggle={this.toggle}>
                                <PopoverHeader>{name}</PopoverHeader>
                                <PopoverBody>
                                    <span>{description}</span>
                                    <h6>Klik lagi untuk menutup deskripsi</h6>
                                </PopoverBody>
                            </Popover>
                        </div>
                        <div className="mt-2">
                            {/* <Input onChange={e => this.setState({qty: e.target.value})} className="text-center" placeholder="Jumlah pesanan Anda"/> */}
                            <Button onClick={this.handleMinus} className="ml-2 mr-2">-</Button>
                            <span>{this.state.qty}</span>
                            <Button onClick={this.handlePlus} className="ml-2 mr-2">+</Button>

                            <div className="mt-2">
                                <Button onClick={this.postToCart} className="btn btn-outline" style={{ color: 'white', backgroundColor: '#050505' }}>Order</Button>
                            </div>


                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.id
    }
}

export default connect(mapStateToProps)(ProductItem)