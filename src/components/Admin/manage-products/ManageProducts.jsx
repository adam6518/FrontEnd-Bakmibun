import React, { Component } from 'react'
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, CardImg
} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import { connect } from 'react-redux'


class ManageProducts extends Component {
    state = {
        products: [],
        inputGambar: null,
        ubahKeGambar: null,
        namaGambar: '',
        inputNama: '',
        inputkategori: '',
        inputDeskripsi: '',
        inputHarga: 0,
        // loading:false
    }

    componentDidMount() {
        this.getProducts()
        // this.setState({loading:true})
    }


    getProducts = () => {
        axios.get(
            'http://localhost:5000/menu/getproducts'
        ).then(res => {
            this.setState({
                products: res.data
            })
        })
    }

    postToProducts = () => {
        // console.log(this.state.inputGambar);

        var fd = new FormData
        fd.append('pilih_gambar', this.state.inputGambar, this.state.inputGambar.name)
        fd.append('price', this.state.inputHarga)
        fd.append('description', this.state.inputDeskripsi)
        fd.append('name', this.state.inputNama)
        fd.append('kategori', this.state.inputkategori)

        if (!fd) {
            Swal.fire('Harap isi semua detail menu !', 'Gagal', 'error')
        } else {
            axios.post(
                'http://localhost:5000/menu/posttoproducts', fd
            ).then(res => {
                Swal.fire('Berhasil menambahkan ke daftar menu', 'Sukses', 'success')
                console.log(res);

            }).catch((err) => {
                console.log(err);

            })
        }
    }

    deleteProducts = (idProduct) => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus menu ini ?',
            text: "Menu akan terhapus dari database",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ac906',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus menu !'
        }).then(result => {
            if (result.value) {
                console.log(result.value);

                axios.delete(
                    'http://localhost:5000/menu/deleteproducts', {
                    data: {
                        productID: idProduct
                    }
                }
                ).then(res => {
                    Swal.fire(
                        'Terhapus !',
                        'menuini berhasil dihapus',
                        'success'
                    )
                    this.getProducts()
                })
            }
        })
    }

    showFileName = (e) => {

        this.setState({
            ubahKeGambar: URL.createObjectURL(e.target.files[0]),
            inputGambar: e.target.files[0],
            namaGambar: e.target.files[0].name
        })

    }

    renderManage = () => {
        return this.state.products.map((product) => {
            // console.log(product);

            return (
                <div className="col-3">
                    <Card style={{ width: '400px', margin: '30px' }}>
                        <CardHeader>{product.name}</CardHeader>
                        <CardBody>
                            <CardImg src={'http://localhost:5000/' + product.image} />
                            <CardText>Product ID : {product.productID}</CardText>
                            <CardText>Kategori : {product.kategori}</CardText>
                            <CardText>Deskripsi : {product.description}</CardText>
                            <CardText>Harga : Rp. {product.price}</CardText>
                        </CardBody>
                        <CardFooter><Button onClick={() => this.deleteProducts(product.productID)} className="btn btn-danger">Hapus</Button></CardFooter>
                    </Card>
                </div>
            )
        })
    }

    renderAdd = () => {
        return (
            <div>
                <h1 className="text-center mt-4">Tambah menu</h1>
                <div style={{ marginLeft: '320px' }}>
                    <Card className="text-center" style={{ width: '400px', margin: '30px' }}>
                        <CardHeader>
                            <input onChange={e => this.setState({ inputNama: e.target.value })} className="text-center" placeholder="Masukkan nama menu" />
                        </CardHeader>
                        <CardBody>
                            <input type="file" ref="fileBtn" className="d-none" onChange={e => this.showFileName(e)} />
                            <input type="button" className="btn btn-outline-info" onClick={() => this.refs.fileBtn.click()} value="Pilih gambar" />
                            <p>
                                <img className="mt-3" src={this.state.ubahKeGambar} style={{ width: '150px' }} />
                            </p>
                            <div className="container mt-4">
                                <input onChange={e => this.setState({ inputkategori: e.target.value })} className="text-center" placeholder="Masukkan kategori" />
                                <input onChange={e => this.setState({ inputDeskripsi: e.target.value })} className="text-center" className="text-center" placeholder="Masukkan deskripsi" />
                                <input onChange={e => this.setState({ inputHarga: e.target.value })} className="text-center" placeholder="Masukkan harga" />
                            </div>
                        </CardBody>
                        <CardFooter>
                            <a href='/manageproducts'>
                                <Button onClick={this.postToProducts} className="btn btn-info">Tambahkan ke daftar menu</Button>
                            </a>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.user_role === 'admin') {
            return (
                <div>
                    <div className="row">
                        {this.renderManage()}
                    </div>
                    <div className="container">
                        {this.renderAdd()}
                    </div>
                </div>
            )
        } else {
            return (
                <h1 className="text-center mt-5">Halaman tidak bisa diakses</h1>
            )
        }

    }

}

const mapStateToProps = state => {
    return {
        user_role: state.auth.role
    }
}

export default connect(mapStateToProps)(ManageProducts)