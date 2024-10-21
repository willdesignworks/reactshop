import axios from "axios";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Cart() {
  const { cartData, getCart } = useOutletContext(); // (跨元件傳遞)
  console.log('Cart 訂單:', cartData);

  const [loadingItems, setLoadingItem] = useState([]); // 正在更新數量的品項 避免重新選取 (disabled)

  // API-刪除訂單
  const removeCartItem = async (id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
      getCart();
    } catch (error) {
      console.log(error);
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
      const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`, data,);
      
      // 避免重新選取, filter找到, 讀取(loadingObject) 跟 item.id 不相同, 就去除
      setLoadingItem(
        loadingItems.filter((loadingObject) => loadingObject !== item.id),
      );

      getCart();
    } catch (error) {
      console.log(error);
    };

  };

  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-white py-5" style={{ minHeight: "calc(100vh - 56px - 76px)" }}>
          <div className="d-flex justify-content-between">
            <h2 className="mt-2">您的購物清單</h2>
          </div>
          { cartData?.carts?.map((item) => {
            return (
              <div className="d-flex mt-4 bg-light" key={item.id}>
                <img src={item.product.imageUrl} className="object-cover" alt="" style={{width: "120px",}} />
                <div className="w-100 p-3 position-relative">
                  <button 
                   type="button" 
                   className="position-absolute btn"
                   style={{top: "5px", right: "16px",}}
                   onClick={() => removeCartItem(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
                  </button>
                  <p className="mb-0 fw-bold">{item.product.title}</p>
                  <p className="mb-1 text-muted" style={{fontSize: "14px",}}>
                    {item.product.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="input-group w-50 align-items-center">
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
                    </div>
                    <p className="mb-0 ms-auto">NT${item.final_total}</p>
                  </div>
                </div>
              </div>
            )
          })}
          <table className="table mt-4 text-muted">
            <tbody>
              <tr>
                <th scope="row" className="border-0 px-0 font-weight-normal">小計</th>
                <td className="text-end border-0 px-0">NT${cartData.final_total}</td>
              </tr>
              <tr>
                <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">優惠卷</th>
                <td className="text-end border-0 px-0 pt-0">NT$500</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">總金額</p>
            <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
          </div>
          <Link to="/checkout" className="btn btn-dark btn-block w-100 mt-4 rounded-0 py-3">
            確認送出
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cart;