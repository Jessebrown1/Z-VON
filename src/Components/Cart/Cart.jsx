import { motion, AnimatePresence } from "framer-motion";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart({
  open,
  onClose,
  cartItems = [],
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {

  const navigate = useNavigate();


  // =========================
  // 💰 SUBTOTAL
  // =========================

  const subtotal = cartItems.reduce((sum, item) => {

    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;


    if (item.freeGift) return sum;


    return sum + price * qty;


  }, 0);



  // =========================
  // CLOSE
  // =========================

  const handleClose = (e) => {

    if (e) e.stopPropagation();

    onClose?.();

  };



  return (

    <AnimatePresence>

      {open && (

        <>


          {/* OVERLAY */}

          <motion.div

            className="cart-overlay"

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

            onClick={handleClose}

          />





          {/* DRAWER */}

          <motion.aside

            className="cart"

            initial={{
              x: "100%"
            }}

            animate={{
              x: 0
            }}

            exit={{
              x: "100%"
            }}

            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}

            onClick={(e) => e.stopPropagation()}

          >




            {/* HEADER */}

            <div className="cart-header">


              <h2>
                Shopping Bag
              </h2>


              <button

                className="cart-close"

                onClick={handleClose}

              >

                ✕


              </button>


            </div>






            {/* BODY */}

            <div className="cart-body">


              {cartItems.length === 0 ? (



                <div className="cart-empty">


                  <h3>
                    Your bag is empty
                  </h3>


                  <p>
                    Discover timeless pieces crafted for modern luxury.
                  </p>


                </div>



              ) : (



                cartItems.map((item) => (



                  <motion.div


                    key={`${item.id}-${item.size}`}


                    className="cart-item"


                    initial={{
                      opacity: 0,
                      y: 8
                    }}


                    animate={{
                      opacity: 1,
                      y: 0
                    }}


                    transition={{
                      duration: 0.2
                    }}


                  >





                    {/* IMAGE */}

                    <img

                      src={
                        item.image?.[0] ||
                        "/placeholder.png"
                      }

                      alt={
                        item.title?.main ||
                        "Product"
                      }

                    />






                    {/* INFO */}

                    <div className="cart-info">



                      <h4>
                        {item.title?.main}
                      </h4>




                      <p>
                        Size {item.size}
                      </p>






                      {/* GIFT */}

                      {item.freeGift && (

                        <div className="gift-tag locked">

                          🎁 Complimentary ZÉVON 10ml Perfume × {item.quantity}

                        </div>

                      )}







                      {/* NORMAL PRODUCT CONTROLS */}

                      {!item.freeGift && (

                        <div className="cart-controls">


                          <button

                            onClick={() =>
                              decreaseQuantity(
                                item.id,
                                item.size
                              )
                            }

                          >

                            −

                          </button>




                          <span>
                            {item.quantity}
                          </span>




                          <button

                            onClick={() =>
                              increaseQuantity(
                                item.id,
                                item.size
                              )
                            }

                          >

                            +

                          </button>



                        </div>

                      )}






                    </div>








                    {/* PRICE */}

                    <div className="cart-price">



                      <p>

                        {item.freeGift

                          ? "FREE"

                          : `₵${(
                              Number(item.price || 0) *
                              Number(item.quantity || 1)
                            ).toFixed(2)}`

                        }

                      </p>







                      {/* REMOVE ONLY REAL PRODUCTS */}

                      {!item.freeGift && (

                        <button

                          onClick={() =>
                            removeFromCart(
                              item.id,
                              item.size
                            )
                          }

                        >

                          Remove

                        </button>

                      )}




                    </div>






                  </motion.div>



                ))

              )}



            </div>








            {/* FOOTER */}

            <div className="cart-footer">



              <div className="subtotal">


                <span>
                  Subtotal
                </span>



                <strong>
                  ₵{subtotal.toFixed(2)}
                </strong>



              </div>






              <button

                className="checkout-btn"

                onClick={() => {

                  onClose?.();

                  navigate("/checkout");

                }}

              >

                Secure Checkout


              </button>




            </div>






          </motion.aside>




        </>

      )}

    </AnimatePresence>

  );

}