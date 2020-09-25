import React, { Component } from 'react'
import axios from 'axios'
import Carousel from '../../component/carousel/Carousel'
import ProductItem from '../../Products/product-item/ProductItem'
import { connect } from 'react-redux'
import {
    ButtonGroup,
    Button,
    ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap'
import '../home/Home.css'

class Home extends Component {
    state = {
        products: []
    }

    getData = () => {
        axios.get(
            'http://localhost:5000/menu/getproducts'
        ).then(res => {
            this.setState({
                products: res.data,
            })
        })
    }

    getFilterData = () => {
        axios.get('http://localhost:5000/menu/filterproducts', {
            params: {
                inputan: this.props.key_word
            }
        })
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
    }

    getMakanan = () => {
        axios.get('http://localhost:5000/menu/getmakanan')
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
    }

    getMinuman = () => {
        axios.get('http://localhost:5000/menu/getminuman')
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
    }

    getEs = () => {
        axios.get('http://localhost:5000/menu/getes')
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
    }

    componentDidMount() {
        if (!this.props.key_word) {
            // console.log('masuk ke sini')
            this.getData()
        } else {
            this.getFilterData()
        }
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        console.log(prevProps.key_word);

        if (prevProps.key_word != this.props.key_word) {
            this.getFilterData()
        }
    }


    renderMenu = () => {
        return this.state.products.map((val, idx) => {
            // console.log(val)
            return (
                <div classname="col-12">
                    <ProductItem barang={val} popId={idx} key={val.productID} />
                </div>
            )
        })
    }

    render() {
        console.log(this.state.products)
        console.log(this.props.key_word)
        return (
            <div id="background" className="row">
                <div className="col-2" >
                    <ButtonGroup className="side-menu" vertical>
                        <Button className="rounded-pill" onClick={this.getData} style={{ fontSize: '30px', backgroundColor: '#0a0c07' }}>Semua menu</Button>
                        <Button className="rounded-pill" onClick={this.getMakanan} style={{ fontSize: '50px', backgroundColor: '#0a0c07' }}>Makanan</Button>
                        <Button className="rounded-pill" onClick={this.getMinuman} style={{ fontSize: '50px', backgroundColor: '#0a0c07' }}>Minuman</Button>
                        <Button className="rounded-pill" onClick={this.getEs} style={{ fontSize: '50px', backgroundColor: '#0a0c07' }}>Es</Button>
                    </ButtonGroup>
                </div>
                <div id="karosel" className="container col-10 mt-4">
                    <div className="karosel rounded">
                        <Carousel />
                    </div>

                </div>
                <div className="row ml-5">
                    {this.renderMenu()}
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        key_word: state.filter.keyword
    }
}

export default connect(mapStateToProps)(Home)