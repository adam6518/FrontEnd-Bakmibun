import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../login/Login.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { onLoginUser } from '../../../redux/action/authentication'
import Swal from 'sweetalert2'


class Login extends Component {
    state = {
        inputUsername: '',
        inputPassword: '',
        username: ''
    }

    onBtnLogin = () => {
        let username = this.state.inputUsername
        let password = this.state.inputPassword
        this.props.onLoginUser(username, password)
    }

    render() {
        if (!this.props.user_name) {
            return (
                <div>
                    <div
                        style={{ fontSize: '50px' }}
                        className='text-center'>
                        LOGIN
                    </div>
                    <div className='col-sm-4 mx-auto card mt-5'>
                        <Form>
                            <FormGroup className="m-2">
                                <Label>Username :</Label>
                                <Input style={{ fontStyle: 'italic' }} onChange={e => this.setState({ inputUsername: e.target.value })} type="text" name="username" id="exampleUsername" placeholder="Masukkan username Anda"></Input>
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label for="examplePassword">Password :</Label>
                                <Input style={{ fontStyle: 'italic' }} onChange={e => this.setState({ inputPassword: e.target.value })} type="password" name="password" id="examplePassword" placeholder="Masukkan password Anda" />
                            </FormGroup>
                            <a href='/'>
                                <Button id="button" style={{ backgroundColor: '#fcba03', color: '#0a0c07' }} onClick={this.onBtnLogin} className="m-2">
                                    <span>Masuk</span>
                                </Button>
                            </a>
                        </Form>
                    </div>
                </div>
            )
        } else {
            Swal.fire('Anda sudah login')
            return (
                < Redirect to='/' />
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user_name: state.auth.username
    }
}


export default connect(mapStateToProps, { onLoginUser })(Login)