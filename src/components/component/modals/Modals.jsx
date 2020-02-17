// import React, { useState } from 'react';
import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'

class Modals extends Component {
    // const {
    //     buttonLabel,
    //     className
    // } = props;

    // const [modal, setModal] = useState(false);

    // const toggle = () => setModal(!modal);
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }


    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>Pembayaran</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Warning</ModalHeader>
                    <ModalBody>
                        Jika tidak ingin membeli lagi maka Anda akan diarahkan ke halaman pembayaran
                    </ModalBody>
                    <ModalFooter>
                        <Link to = '/checkout'>
                            <Button color="primary" onClick={this.toggle}>Lanjut ke pembayaran</Button>{' '}</Link>
                        <Link to = '/'>
                            <Button color="secondary" onClick={this.toggle}>Saya ingin membeli lagi</Button>
                        </Link>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Modals