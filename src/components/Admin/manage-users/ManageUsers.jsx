import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import {
    Input, ButtonGroup, Button, Card, CardTitle, CardText,
    CardHeader, CardBody, CardFooter
} from 'reactstrap'
import '../manage-users/ManageUsers.css'


class ManageUsers extends Component {

    state = {
        users: [],
        input: ''
    }

    componentDidMount() {
        // this.searchUers()
        this.getDataUsers()
    }

    getDataUsers = () => {
        axios.get('http://localhost:5000/admin/getusers')
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
    }

    deleteUsers = (idUsers) => {
        axios.delete('http://localhost:5000/admin/deleteusers', {
            data: {
                idUsers: idUsers
            }
        }).then(res => {
            console.log(res.data);

            if (res.data.message == 'Anda tidak dapat menhapus admin') {
                Swal.fire('Anda tidak dapat menghapus admin !', 'Hati - hati', 'warning')
                this.getDataUsers()
            } else {
                Swal.fire('User berhasil di hapus !', 'Berhasil', 'success')
                this.getDataUsers()
            }
        })
    }

    searchUers = () => {
        axios.get(`http://localhost:5000/admin/searchusers`, {
            params: {
                userName: this.state.input
            }
        }).then(res => {
            this.setState({
                users: res.data
            })
            console.log(this.state.users)
        })
    }

    renderUsers = () => {
        return this.state.users.map((user) => {
            return (
                <div className="row col-11 ml-5 mt-5" >
                    <Card body inverse color="info">
                        <CardHeader style={{ fontWeight: 'bolder' }}>Profile {user.username}</CardHeader>
                        <CardBody>
                            <CardTitle style={{ fontWeight: 'bold' }}>Data user : </CardTitle>
                            <CardText>User ID : {user.id}</CardText>
                            <CardText>Username : {user.username}</CardText>
                            <CardText>Email : {user.email}</CardText>
                            <CardText>Jenis kelamin : {user.sex}</CardText>
                            <CardText>Nomor handphone : {user.phone}</CardText>
                            <CardText>Alamat : {user.alamat}</CardText>
                            <CardText>Kota : {user.kota}</CardText>
                            <CardText>Kodepos : {user.kodepos}</CardText>
                        </CardBody>
                        <CardFooter><Button onClick={() => { this.deleteUsers(user.id) }} className='btn btn-warning'>Delete</Button></CardFooter>
                    </Card>
                </div>
            )
        })
    }

    render() {
        if (this.props.user_role === 'admin') {
            return (
                <div>
                    <h1 className='display-4 text-center'>Our customers data</h1>
                    <ButtonGroup className="button-group">
                        <Input onChange={e => this.setState({ input: e.target.value })} style={{ width: '900px' }} placeholder="Cari username customer..." />
                        <Button onClick={this.searchUers}>Search</Button>
                    </ButtonGroup>
                    <div className="row ml-5">
                        {this.renderUsers()}
                    </div>
                </div>
            )
        } else {
            return (
                <h1 className="text-center mt-5">
                    Halaman tidak dapat diakses
                </h1>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user_role: state.auth.role,
        user_id: state.auth.id
    }
}

export default connect(mapStateToProps)(ManageUsers)