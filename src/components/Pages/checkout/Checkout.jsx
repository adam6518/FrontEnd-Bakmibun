import React, { Component, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, Collapse
} from 'reactstrap';
import { Button } from 'semantic-ui-react'
import moment from 'moment'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom'

class Checkout extends Component {
    state = {
        detail: [],
        penerima: '',
        alamat: '',
        kontak: null,
        jumlahTotal: 0,
        totalTagihan: 0,
        uploadBukti: null,
        ubahKeGambar: null,
        namaGambar: '',
        // tanggal: moment().format('YYYY-M-D')
    }

    componentDidMount() {
        this.getFromCart()
        // console.log(moment().format('DD-MM-YYYY'));
    }

    getFromCart = () => {
        axios.get(
            'http://localhost:5000/cart/getcarts', {
            params: {
                userID: this.props.user_id
            }
        }
        ).then(res => {

            if (res.data.length > 0) {
                this.setState({
                    detail: res.data
                })
            } else {
                console.log(this.props.history);

                this.props.history.push("/")
            }

            console.log(this.state.detail);

            // console.log(this.state.detail)
            // this.totalPesanan()
            // this.totalHarga()
        })
    }

    totalPesanan = () => {
        // this.state.jumlahTotal = 0
        // for (let i = 0; i < this.state.detail.length; i++) {
        //     this.state.jumlahTotal += (this.state.detail[i].jumlah)
        // }
        // return this.state.jumlahTotal
        let total = 0
        for (let i = 0; i < this.state.detail.length; i++) {
            total += (this.state.detail[i].jumlah)
        }
        // console.log(this.state.detail[0]);
        // this.setState({
        //     jumlahTotal: total
        // })
        return total
    }

    totalHarga = () => {
        let total = 0

        for (let i = 0; i < this.state.detail.length; i++) {
            total += (this.state.detail[i].price * this.state.detail[i].jumlah)
        }
        // this.setState({
        //     totalTagihan: total
        // })
        return total

    }

    onSubmitBukti = () => {
        var fd = new FormData
        fd.append('choose_file', this.state.uploadBukti, this.state.uploadBukti.name)
        fd.append('userID', this.props.user_id)
        fd.append('totalHarga', this.state.totalTagihan)
        // fd.append('date', this.state.tanggal)

        axios.post(
            'http://localhost:5000/transaction/posttotransaction', fd
        ).then(res => {
            console.log(res);
            axios.post('http://localhost:5000/transaction/posttotransactiondetails', {
                transactionID: 2,
                namaProduk: this.state.detail[0].name,
                jumlah: this.totalPesanan(),
                harga: this.totalHarga()
            })


        }).then(res1 => {
            // console.log(res1);
            axios.delete('http://localhost:5000/cart/deletecarts', {
                data: {
                    userID: this.props.user_id
                }
            }).then(res2 => {
                Swal.fire('Berhasil upload bukti !', 'Harap tunggu dalam 12 jam', 'success')


            })
        })
    }

    showFileName = (e) => {
        console.log(e);

        this.setState({
            uploadBukti: e.target.files[0],
            ubahKeGambar: URL.createObjectURL(e.target.files[0]),
            namaGambar: e.target.files[0].name
        })
    }

    render() {
        if (this.props.user_id) {
            if (this.state.detail.length > 0) {
                return (
                    <div className="text-center">
                        <h1>Pembayaran</h1>
                        <div>
                            <Card>
                                <CardHeader style={{ fontSize: '30px' }}>Detail pembayaran Anda :</CardHeader>
                                <CardBody>
                                    <CardText style={{ fontSize: '20px', fontWeight: 'bold' }}>Penerima : {this.props.user_name}</CardText>
                                    <CardText style={{ fontSize: '20px', fontWeight: 'bold' }}>Nomor penerima : {this.props.user_kontak}</CardText>
                                    <CardText style={{ fontSize: '20px', fontWeight: 'bold' }}>Dikirim ke alamat : {this.props.user_alamat}</CardText>
                                    <CardText style={{ fontSize: '20px', fontWeight: 'bold' }}>Total pesanan : {this.totalPesanan()}</CardText>
                                    <CardText style={{ fontSize: '20px', fontWeight: 'bold' }}>Total harga : Rp. {this.totalHarga()}</CardText>
                                </CardBody>
                                <CardFooter style={{ fontSize: '30px' }}>Terima kasih sudah belanja {this.props.user_name} ^o^</CardFooter>
                            </Card>
                        </div>
                        <div style={{ marginLeft: '750px' }} className="row mt-5">
                            <div className="col-4">
                                <input type="file" ref="fileBtn" className="d-none" onChange={e => this.showFileName(e)} />
                                <input type="button" onClick={() => this.refs.fileBtn.click()} value="Unggah bukti pembayaran Anda" className="btn btn-primary" />
                                <img className="my-5" style={{ width: '500px' }} src={this.state.ubahKeGambar} alt="" />
                                <input type="button" href="/" onClick={this.onSubmitBukti} value="Kirim" className="btn btn-success" />
                            </div>
                        </div>
                    </div>
                )
            } else {
                return null
            }
        } else {
            return (
                <Redirect to='/' />
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.id,
        user_alamat: state.auth.alamat,
        user_name: state.auth.username,
        user_kontak: state.auth.phone
    }
}

export default connect(mapStateToProps)(Checkout)