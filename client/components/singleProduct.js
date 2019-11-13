import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectedProductsThunk} from '../store/products'
import {addToCart, addToCartThunk, removeFromCartThunk} from '../store/cart'
import {addOrderThunk, getPendingOrderThunk} from '../store/orders'
import {cartLocal} from './cart'
import {Link} from 'react-router-dom'
//import Button from 'react-bootstrap/Button'

class SingleProduct extends Component {
  componentDidMount() {
    const prodId = this.props.match.params.id
    this.props.fetchProduct(prodId)
  }

  handleClick(selectedProduct) {
    this.props.addToCart(selectedProduct)
    this.props.addOrder(this.props.userId)
  }

  render() {
    const selectedProduct = this.props.selectedProduct
    // const order = this.props.order
    // const addOrder = this.props.addOrder
    //Checking for an id works better because an empty obj would still be truthy
    if (selectedProduct === null) {
      return (
        <h1 style={{color: 'black', fontFamily: 'Lemon, curisve'}}>
          No shoes for you!
        </h1>
      )
    }
    if (selectedProduct.id) {
      return (
        <div className="single_component">
          <h1 style={{color: 'black', fontFamily: 'Lemon, curisve'}}>
            {selectedProduct.name}
          </h1>
          <h2 style={{color: 'black', fontFamily: 'Lemon, curisve'}}>
            Brand: {selectedProduct.brand}
          </h2>
          <img src={selectedProduct.imageUrl} />
          <br />
          <button
            style={{color: 'black', fontFamily: 'Lemon, curisve'}}
            type="button"
            className="button"
            onClick={() => this.handleClick(selectedProduct)}
          >
            Add to Cart
          </button>
          <h3 style={{color: 'black', fontFamily: 'Lemon, curisve'}}>
            Gender: {selectedProduct.gender}
          </h3>
          <h3 style={{color: 'black', fontFamily: 'Lemon, curisve'}}>
            Price: ${selectedProduct.price / 100}
          </h3>
          <h3 style={{color: 'black', fontFamily: 'Lemon, curisve'}}>
            Sizes:{' '}
            <select>
              {selectedProduct.size.map(size => {
                return <option>{size}</option>
              })}
            </select>{' '}
          </h3>
        </div>
      )
    } else {
      return 'Loading'
    }
  }
}
//{selectedProduct.size.join(', ')}
//with a sub reducer it goes a level deep
const productMapStateToProps = state => ({
  userId: state.user.id,
  selectedProduct: state.products.selectedProduct,
  pendingOrder: state.orders.pendingOrder
})

const productMapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(selectedProductsThunk(id)),
  addToCart: selectedProduct => dispatch(addToCartThunk(selectedProduct)),
  addOrder: userId => dispatch(addOrderThunk(userId))
})

const connectSingleProduct = connect(
  productMapStateToProps,
  productMapDispatchToProps
)(SingleProduct)

export default connectSingleProduct
