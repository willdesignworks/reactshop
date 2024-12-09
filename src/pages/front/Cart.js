import axios from "axios";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";  // Redux Toolkit
import { createAsyncMessage } from '../../slice/messageSlice'  // Redux Toolkit
import Loading from "../../components/Loading"; // react-loading
import RelatedProducts from "../../components/RelatedProducts";

function Cart() {
  const { cartData, getCart } = useOutletContext(); // (跨元件傳遞)
  console.log('Cart 訂單:', cartData);

  const [loadingItems, setLoadingItem] = useState([]); // 正在更新數量的品項 避免重新選取 (disabled)
  const [isLoading, setLoading] = useState(false) // react-loading
  const dispatch = useDispatch(); // 啟用 Redux Toolkit

  // API-刪除訂單
  const removeCartItem = async (id) => {
    try {
      setLoading(true); // react-loading
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);

      dispatch(createAsyncMessage(res.data)); // 刪除訊息 (Redux Toolkit)

      getCart();
      console.log('car 刪除',res);
      setLoading(false); // react-loading
    } catch (error) {
      setLoading(false); // react-loading
      console.log(error);

      dispatch(createAsyncMessage(error.response.data)); // 加入失敗訊息 (Redux Toolkit)
    };
  };

  // API-更新數量
  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id, // 商品id
        qty: quantity, // 商品數量
      }
    };

    // 避免重新選取, 原本, 當前id
    setLoadingItem([...loadingItems, item.id])

    try {
      setLoading(true); // react-loading
      const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`, data,);
      console.log('car 產品id',res);
      // 避免重新選取, filter找到, 讀取(loadingObject) 跟 item.id 不相同, 就去除
      setLoadingItem(
        loadingItems.filter((loadingObject) => loadingObject !== item.id),
      );

      dispatch(createAsyncMessage(res.data)); // 加入完成訊息 (Redux Toolkit)

      getCart();
      setLoading(false); // react-loading
      
    } catch (error) {

      setLoading(false); // react-loading
      console.log(error);

      dispatch(createAsyncMessage(error.response.data)); // 加入失敗訊息 (Redux Toolkit)

      setLoadingItem(// 避免重新選取
        loadingItems.filter((loadingObject) => loadingObject !== item.id),
      );
    };

  };

  return (
    <>
    <Loading isLoading={isLoading }/>
    <div className="ht__bradcaump__area">
            <div className="ht__bradcaump__wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bradcaump__inner text-center">
                                <h2 className="bradcaump-title">您的購物清單</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    {/* cart-main-area start */}
        <div className="cart-main-area ptb--120 bg__white">
            <div className="container">
                <div className="row">
                        { cartData?.carts?.length === 0 ? ( 
                          <>
                          <div className="col-md-10 col-sm-12 col-12 no-list">  
                            <div className="cartempty">
                              <h5 className="mt-2 text-center">購物清單為空</h5>
                            </div>
                            <Link to="/products" className="btn btn-dark btn-block w-50 mt-4 rounded-0 py-3">
                            繼續購物
                            </Link>
                            <h2 className="mt-5">您可能會喜歡的商品</h2>
                            <RelatedProducts />
                          </div>
                          </>
                        ) : (
                        <>
                          <div className="col-md-12 col-sm-12 col-12">          
                            <div className="table-content table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="product-thumbnail">商品圖片</th>
                                            <th className="product-name">商品標題</th>
                                            <th className="product-price">單件價格</th>
                                            <th className="product-quantity">數量</th>
                                            <th className="product-subtotal">小計</th>
                                            <th className="product-remove">刪除</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {cartData?.carts?.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="product-thumbnail">
                                              <img src={item.product.imageUrl} alt="product img" />
                                            </td>
                                            <td className="product-name">
                                              {item.product.title}
                                            </td>
                                            <td className="product-price">
                                              <span className="amount">NT ${item.product.price}</span>
                                            </td>
                                            <td className="product-quantity">
                                              <select name="" className="form-select" 
                                                value={item.qty}
                                                disabled={loadingItems.includes(item.id)}
                                                onChange={(e) => {
                                                  updateCartItem(item, e.target.value * 1); // item(品項本身) e(用戶選擇數量 * 1 型別轉換)
                                                }}
                                              >
                                              {
                                                [...(new Array(20))].map((i, num) => {
                                                  return (
                                                    <option value={ num +1 } key={ num }>{ num +1 }</option>
                                                  );
                                                })
                                              }
                                              </select>
                                            </td>
                                            <td className="product-subtotal">
                                              NT ${item.final_total}
                                            </td>
                                            <td className="product-remove">
                                            <div className="remove__btn">
                                                <Link to="#" onClick={() => removeCartItem(item.id)}>
                                                  <i className="zmdi zmdi-close"></i>
                                                </Link>
                                            </div>
                                            </td>
                                        </tr>
                                      );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-sm-12">
                                    <div className="buttons-cart">
                                        <Link to="/products">繼續購物</Link>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 ">
                                    <div className="cart_totals">
                                        <h2>購物車總計</h2>
                                        <table>
                                            <tbody>
                                                <tr className="cart-subtotal">
                                                    <th>小計</th>
                                                    <td><span className="amount">NT ${cartData.final_total}</span></td>
                                                </tr>
                                                <tr className="shipping">
                                                    <th>運費</th>
                                                    <td>NT $0</td>
                                                </tr>
                                                <tr className="order-total">
                                                    <th>總金額</th>
                                                    <td>
                                                        <strong><span className="amount">NT ${cartData.final_total}</span></strong>
                                                    </td>
                                                </tr>                                           
                                            </tbody>
                                        </table>
                                        <div className="wc-proceed-to-checkout">
                                          <Link to="/checkout">填寫資料</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </>
                        )}
                </div>
            </div>
        </div>
        {/* cart-main-area end */}
    </>
  );
};

export default Cart;