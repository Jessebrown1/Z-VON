import { useCart } from "../../Components/Cart/CartContext";
import Navbar from "../../Components/Navbar/Navbar";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";


export default function Checkout() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();


  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;

    if (item.freeGift) return sum;

    return sum + price * qty;
  }, 0);


  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal + shipping;


  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <div className="checkout-empty">
          <h2>Your bag is empty</h2>

          <p>
            Return to the store to discover new drops.
          </p>

          <button onClick={() => navigate("/collections")}>
            Continue Shopping
          </button>
        </div>
      </>
    );
  }


  return (
    <>
      <Navbar />

      <div className="checkout-page">

        <div className="checkout">

          {/* LEFT - ITEMS */}
          <div className="checkout-left">

            <h1>Checkout</h1>


            {cartItems.map((item) => (

              <div
                key={`${item.id}-${item.size}`}
                className="checkout-item"
              >

                <img
                  src={item.image?.[0]}
                  alt={item.title?.main}
                />


                <div className="checkout-info">

                  <h3>
                    {item.title?.main}
                  </h3>


                  <p>
                    Size: {item.size}
                  </p>


                  <div className="qty">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id, item.size)
                      }
                    >
                      −
                    </button>


                    <span>
                      {item.quantity}
                    </span>


                    <button
                      onClick={() =>
                        increaseQuantity(item.id, item.size)
                      }
                    >
                      +
                    </button>

                  </div>


                  <button
                    className="remove"
                    onClick={() =>
                      removeFromCart(item.id, item.size)
                    }
                  >
                    Remove
                  </button>


                </div>


                <div className="checkout-price">

                  ₵{(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(2)}

                </div>


              </div>

            ))}

          </div>




          {/* RIGHT - SUMMARY */}
          <div className="checkout-right">

            <div className="summary">

              <h2>
                Order Summary
              </h2>


              <div className="row">
                <span>
                  Subtotal
                </span>

                <span>
                  ₵{subtotal.toFixed(2)}
                </span>
              </div>



              <div className="row">

                <span>
                  Shipping
                </span>

                <span>
                  ₵{shipping.toFixed(2)}
                </span>

              </div>



              <div className="row total">

                <span>
                  Total
                </span>

                <span>
                  ₵{total.toFixed(2)}
                </span>

              </div>



              <button className="pay-btn">
                Pay Securely
              </button>



              <p className="secure-note">
                🔒 Secure checkout powered by ZÉVON
              </p>


            </div>

          </div>


        </div>

      </div>
    </>
  );
}