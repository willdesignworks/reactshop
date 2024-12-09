import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";  // Redux Toolkit
import { createAsyncMessage } from '../slice/messageSlice'  // Redux Toolkit
import { useNavigate } from "react-router-dom";
import Loading from "./Loading"; // react-loading

function OffsetWrapper({ isCartOpen, setCartOpen, cartData, getCart }) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false) // react-loading
  const dispatch = useDispatch(); // 啟用 Redux Toolkit

  // API-刪除訂單
  const removeCartItem = async (id) => {
    try {
      setLoading(true); // react-loading
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
      
      dispatch(createAsyncMessage(res.data)); // 刪除訊息 (Redux Toolkit)
      
      getCart();
      setLoading(false); // react-loading
    } catch (error) {
      console.log(error);
      dispatch(createAsyncMessage(error.response.data)); // 加入失敗訊息 (Redux Toolkit)
    };
  };

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setCartOpen(false);
    navigate(path); // 跳轉到指定路徑
  };

  return (
    <>
    <Loading isLoading={isLoading }/>
      <div className="offset__wrapper">
          <div className={`shopping__cart ${isCartOpen ? "shopping__cart__on" : ""}`}>
            {/*  Start Cart Panel */}
            <div className="shopping__cart__inner">
                  <div className="shp__cart__title">
                      <h2 className="bradcaump-title">購物車</h2>
                      <div className="offsetmenu__close__btn">
                        <Link to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCartOpen(false);
                          }}
                        >
                          <i className="zmdi zmdi-close"></i>
                        </Link>
                      </div>
                  </div>
                  <div className="shp__cart__content">
                  { cartData?.carts?.length === 0 ? ( 
                      <>
                      <div className="cartempty">
                            <h5 className="mt-2 text-center">購物清單為空</h5>
                      </div>
                      <ul className="shopping__btn">
                        <li className="shp__checkout">
                          <Link to="products" onClick={(e) => handleLinkClick(e, "products")}>
                            繼續購物
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : (
                  <>
                    <div className="shp__cart__wrap">
                          {cartData?.carts?.map((item) => {
                            return (
                            <div className="shp__single__product" key={item.id}>
                                <div className="shp__pro__thumb">
                                    <Link to="/products">
                                        <img src={item.product.imageUrl} alt="product images" />
                                    </Link>
                                </div>
                                <div className="shp__pro__details">
                                    <h2><a href="product-details.html">{item.product.title}</a></h2>
                                    <span className="quantity">數量: {item.qty}</span>
                                    <span className="shp__price">NT ${item.final_total}</span>
                                </div>
                                <div className="remove__btn">
                                    <Link to="#" onClick={() => removeCartItem(item.id)}>
                                      <i className="zmdi zmdi-close"></i>
                                    </Link>
                                </div>
                            </div>
                          )})
                        }
                    </div>
                    <ul className="shoping__total">
                        <li className="subtotal">小計: <span className="total__price">NT ${cartData.final_total}</span></li>
                        <li className="subtotal">運費: <span className="total__price">NT $0</span></li>
                    </ul>
                    <ul className="shoping__total">
                        <li className="lump">總金額: <span className="total__price">NT ${cartData.final_total}</span></li>
                    </ul>
                    <ul className="shopping__btn">
                      <li>
                        <Link to="cart" onClick={(e) => handleLinkClick(e, "/cart")}>
                          查看購物車
                        </Link>
                      </li>
                      <li className="shp__checkout">
                        <Link to="checkout" onClick={(e) => handleLinkClick(e, "/checkout")}>
                          送出訂單
                        </Link>
                      </li>
                    </ul>
                    </>
                  )}
                  </div>
            </div>
            {/* End Cart Panel */}
          </div>
      </div>
    </>
  );
};

export default OffsetWrapper;