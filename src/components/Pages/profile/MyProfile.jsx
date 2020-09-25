import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, CardImg } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogoutUser } from '../../../redux/action/authentication'
import '../profile/MyProfile.css'


class MyProfile extends Component {
    componentDidMount() {
        console.log(this.props.user_name);
    }


    render() {
        if (this.props.user_name) {
            return (
                <div className="col-sm-4 mx-auto card mt-5">
                    <h2>Your profile : </h2>
                    <Form className="mt-5">
                        <FormGroup>
                            <Label>Username : <h6>{this.props.user_name}</h6></Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password : <h6>{this.props.pass_word}</h6></Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Email : <h6>{this.props.e_mail}</h6></Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Phone : <h6>{this.props.ph_one}</h6></Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Alamat : <h6>{this.props.ala_mat}</h6></Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Kota : <h6>{this.props.ko_ta}</h6></Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Kode pos : <h6>{this.props.kode_pos}</h6></Label>
                        </FormGroup>
                    </Form>
                </div>
            )
        } else {
            return (
                <Redirect to='/'/>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user_name: state.auth.username,
        pass_word: state.auth.password,
        e_mail: state.auth.email,
        ph_one: state.auth.phone,
        ala_mat: state.auth.alamat,
        ko_ta: state.auth.kota,
        kode_pos: state.auth.kodepos
    };

}

export default connect(mapStateToProps, { onLogoutUser })(MyProfile)