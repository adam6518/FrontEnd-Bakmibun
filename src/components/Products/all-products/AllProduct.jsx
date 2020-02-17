import React, { Component } from 'react'
import ProductItem from '../product-item/ProductItem'
import axios from 'axios'

class AllProduct extends Component {
    state = {
        allProduct: []
    }

    renderAllMenu = () => {
        return this.state.allProduct.map((val, idx) => {
            console.log(val)
            return (
                <div classname="col-12">
                    <ProductItem barang={val} key={idx} />
                </div>
            )
        })
    }

    getData = () => {
        axios.get(
            'http://localhost:5000/menu/getproducts'
        ).then(res => {
            console.log(res.data);
            
            this.setState({
                allProduct: res.data,
            })
        })
    }

    componentDidMount() {
        this.getData()
    }



    render() {
        return (
            <div className="row">
                {this.renderAllMenu()}
            </div>
        )
    }
}

export default AllProduct