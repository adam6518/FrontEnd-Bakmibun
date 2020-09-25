import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap'
import '../bukti-transfer/BuktiTransfer.css'

class BuktiTransfer extends Component {
    state = {
        statusTransfer: []
    }

    componentDidMount() {
        this.getDataTransaction()
        // console.log(this.state.statusTransfer);

        // this.statusChanger()
    }


    getDataTransaction = () => {
        axios.get(
            'http://localhost:5000/transaction/gettransaction'
        ).then(res => {
            // console.log(res.data);

            this.setState({
                statusTransfer: res.data
            })
        })
    }

    statusChanger = (userID) => {
        axios.patch(
            'http://localhost:5000/transaction/statuschanger',
            {
                userID: userID
            }
        ).then(
            this.getDataTransaction(),
            Swal.fire(`${this.props.user_name} berhasil konfirmasi bukti transfer`, `Pesanan sudah bisa dikirim`, `success`)
        )
    }

    renderBukti = () => {
        return this.state.statusTransfer.map((bukti) => {
            // console.log(bukti);

            return (
                <Card id="list-bukti" className="container col-3 mx-5 my-5">
                    <CardHeader>
                        <h2>ID Transaksi : {bukti.transactionID}</h2>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                            <img style={{ width: '500px', width: '300px' }} src={'http://localhost:5000/bukti/' + bukti.bukti} />
                        </CardTitle>
                        <CardText>
                            <h4>ID User : {bukti.userID}</h4>
                            <h4>Total harga : {bukti.totalHarga}</h4>
                            <h4>Tanggal upload bukti transfer : {bukti.userID}</h4>
                            <h4>Status : {bukti.status ? 'Done' : 'Pending'} {this.confirmButton(bukti.userID, bukti.status)}</h4>

                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => this.deleteConfirm(bukti.transactionID)} className='btn btn-danger btn-block'>Hapus bukti transfer</Button>
                    </CardFooter>
                </Card>
                // <tr>
                //     <td>{bukti.transactionID}</td>
                //     <td>{bukti.userID}</td>
                //     <td>{bukti.totalHarga}</td>
                //     <td>{bukti.date}</td>
                //     <td>{bukti.status ? 'Done' : 'Pending'}</td>
                //     <td>
                //         <img style={{ width: '300px', width: '300px' }} src={'http://localhost:5000/bukti/' + bukti.bukti} />
                //     </td>
                //     <td>{this.confirmButton(bukti.userID, bukti.status)}</td>
                //     <td>
                //         <Button onClick={() => this.deleteConfirm(bukti.transactionID)} >Hapus bukti transfer</Button>
                //     </td>
                // </tr>
            )

        })
    }

    confirmButton = (userID, status) => {
        if (status) {
            return (
                <Button disabled style={{ backgroundColor: '#1ac906' }}>Telah di konfirmasi</Button>
            )
        } else {
            return (
                <a href='/buktitransfer'>
                    <Button onClick={() => this.statusChanger(userID)} style={{ backgroundColor: '#1ac906' }}>Konfirmasi</Button>
                </a>
            )
        }
    }

    deleteConfirm = (transactionID) => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus bukti transfer ini ?',
            text: "Bukti transfer ini akan dihapus dari database",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ac906',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus bukti !'
        }).then((result) => {
            if (result.value) {
                console.log(result);

                axios.delete(
                    'http://localhost:5000/transaction/deletetransaction', {
                    data: {
                        transactionID: transactionID
                    }
                }
                ).then(res => {
                    Swal.fire(
                        'Terhapus !',
                        'Bukti transfer ini berhasil dihapus',
                        'success'
                    )
                    this.getDataTransaction()
                })
            }
        })
    }

    render() {
        if (this.props.user_role === 'admin') {
            return (

                <div>
                    <h1 className='display-4 text-center' style={{ fontStyle: 'italic', fontFamily: 'fantasy' }}>BUKTI TRANSFER PEMBELI BAKMI BUN :</h1>
                    <div className="ml-5 row">
                        {this.renderBukti()}
                        {/* <h1 className='display-4 text-center'>Bukti transfer users :</h1>
                    <table className='table text-center container'>
                        <thead>
                            <tr>
                                <th>ID transaksi</th>
                                <th>ID user</th>
                                <th>Total harga</th>
                                <th>Tanggal upload bukti transfer</th>
                                <th>Status</th>
                                <th>Foto bukti transfer</th>
                                <th>Konfirmasi</th>
                                <th>Hapus bukti transfer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBukti()}
                        </tbody>
                    </table> */}

                    </div>
                </div>
            )
        } else {
            return (
                <h1 className="text-center mt-5">
                    Halaman tidak bisa diakses
                </h1>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.id,
        user_name: state.auth.username,
        user_role: state.auth.role
    }
}

export default connect(mapStateToProps)(BuktiTransfer)