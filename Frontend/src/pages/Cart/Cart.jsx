import React from "react";
import "./Cart.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, food_list, removeCartItems, getTotalCartAmount,url } =
    useContext(StoreContext);
  return (
    <div className="cart">
      <div className="cart-items">
        <h2 className="cart-menu">Cart Menu</h2>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br></br>
        <hr></hr>
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/image/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p> &#2547;{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p> &#2547;{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeCartItems(item._id)}
                    className="cross"
                  >
                    x
                  </p>
                </div>
                <hr></hr>
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="item-total">
          <h2 className="cart-menu">Cart Total</h2>
          <div className="item-total-details">
            <p>SubTotal</p>
            <p>&#2547;{getTotalCartAmount()}</p>
          </div>
          <hr></hr>
          <div className="item-total-details">
            <p>Delivery Fee</p>
            <p> &#2547;{80}</p>
          </div>
          <hr></hr>
          <div className="item-total-details">
            <p>
              <b>Total</b>
            </p>
            {getTotalCartAmount() ? (
              <p>&#2547;{getTotalCartAmount() + 80}</p>
            ) : (
              <p>&#2547;0</p>
            )}
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promo-code">
          <p>If You Have a Promo Code!Enter it here!</p>
          <div className="promocode-input">
            <input type="text" placeholder="Enter promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
