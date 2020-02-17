import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Swal from 'sweetalert2'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import '../register/Register.css'

const URL_API = 'http://localhost:5000/'

class Register extends Component {
    state = {
        inputUsernameRegister: '',
        inputPasswordRegister: '',
        inputEmailRegister: '',
        inputNomorHandphoneRegister: null,
        inputAlamatRegister: '',
        inputKotaRegister: '',
        inputKodePosRegister: null

    }

    onBtnRegister = () => {
        let { wanita, pria } = this.refs
        let {
            inputUsernameRegister, inputPasswordRegister, inputEmailRegister, inputAlamatRegister,
            inputKodePosRegister, inputKotaRegister, inputNomorHandphoneRegister
        } = this.state
        // this.refs.(nama ref dari tag kode jsx)
        let gender = wanita.checked ? 'wanita' : 'pria'
        if (
            !inputPasswordRegister || !inputUsernameRegister || !inputEmailRegister || !gender ||
            !inputAlamatRegister || !inputKotaRegister || !inputKodePosRegister || !inputNomorHandphoneRegister
        ) {
            Swal.fire('Invalid', 'Harap isi semua form', 'error')
        } else {
            if (
                inputPasswordRegister && inputUsernameRegister && inputEmailRegister && gender && inputAlamatRegister,
                inputKodePosRegister, inputKotaRegister, inputNomorHandphoneRegister
            ) {
                axios.post(URL_API + 'auth/register', {
                    username: inputUsernameRegister,
                    password: inputPasswordRegister,
                    email: inputEmailRegister,
                    sex: gender,
                    alamat: inputAlamatRegister,
                    kota: inputKotaRegister,
                    kodePos: inputKodePosRegister,
                    nomorHandphone: inputNomorHandphoneRegister
                })
                    .then(res => {
                        if (res.data.status === '201') {
                            Swal.fire('Registered!', res.data.message, 'success')
                        } else if (res.data.status === '400') {
                            Swal.fire('invalid!', res.data.message, 'error')
                        }
                    })
                    .catch(err => {
                        console.log(err);

                    })
                Swal.fire('Registered!', 'Your account has been registed', 'success')
            } else {
                Swal.fire('Invalid', "Your passwords haven't match", 'error')
            }
        }
    }

    render() {
        if (!this.props.user_id) {
            return (
                <div>
                    <div
                        style={{ fontSize: '50px' }}
                        className='text-center'>
                        REGISTER
                </div>
                    <div className='col-sm-4 mx-auto card mt-5'>
                        <Form className="mb-5">
                            <FormGroup className="m-2">
                                <Label>Username</Label>
                                <Input style={{ fontStyle: 'italic' }} type="text" onChange={e => this.setState({ inputUsernameRegister: e.target.value })} name="username" id="exampleUsername" placeholder="Buat username Anda" ref="username" />
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label>Email</Label>
                                <Input style={{ fontStyle: 'italic' }} type="email" onChange={e => this.setState({ inputEmailRegister: e.target.value })} name="email" id="exampleEmail" placeholder="Masukkan alamat email Anda" ref="email" />
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label>Password</Label>
                                <Input style={{ fontStyle: 'italic' }} type="password" onChange={e => this.setState({ inputPasswordRegister: e.target.value })} name="password" id="examplePassword" placeholder="Buat password Anda" ref="password" />
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label>Nomor Handphone</Label>
                                <Input style={{ fontStyle: 'italic' }} type="number" onChange={e => this.setState({ inputNomorHandphoneRegister: e.target.value })} name="nomorhandphone" id="exampleNomorHandphone" placeholder="Gunakan +62 (contoh : +628xxxxxxxx)" ref="nomorhandphone" />
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label>Alamat</Label>
                                <Input style={{ fontStyle: 'italic' }} type="text" onChange={e => this.setState({ inputAlamatRegister: e.target.value })} name="alamat" id="exampleAlamat" placeholder="Masukkan alamat Anda" ref="alamat" />
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label>Kota</Label>
                                <Input style={{ fontStyle: 'italic' }} type="text" onChange={e => this.setState({ inputKotaRegister: e.target.value })} name="kota" id="exampleKota" placeholder="Masukkan Kota tempat Anda tinggal" ref="kota" />
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label>Kode pos</Label>
                                <Input style={{ fontStyle: 'italic' }} type="number" onChange={e => this.setState({ inputKodePosRegister: e.target.value })} name="kodepos" placeholder="Masukkan kode pos Anda" ref="kodepos" />
                            </FormGroup>
                            <FormGroup className="m-2" tag="fieldset">
                                <legend>Jenis kelamin :</legend>
                                <FormGroup check>
                                    <Label check>
                                        <input ref="pria" type="radio" name="kelamin" value="pria" />{' '}
                                        Pria
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <input ref="wanita" defaultChecked type="radio" name="kelamin" value="wanita" />{' '}
                                        Wanita
                                </Label>
                                </FormGroup>
                            </FormGroup>
                            <a href='/register'>
                                <Button id="button" style={{ backgroundColor: '#fcba03', color: '#0a0c07' }} onClick={this.onBtnRegister} className="m-2 mb-3">Daftar</Button>
                            </a>
                            <div className="mt-2 mb-2">
                                Sudah punya akun? silahkan klik <NavLink to="/login">disini</NavLink> untuk login
                        </div>
                        </Form>
                    </div>
                </div>
            )
        } else {
            return (
                <Redirect to='/' />
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.id
    }
}

export default connect(mapStateToProps)(Register)

