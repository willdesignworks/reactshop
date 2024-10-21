import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Success() {
  const { orderId } = useParams(); // 付款完成 訂單id
  const [ orderData, setOrderData ]  = useState({});

  const getCart = async (orderId) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`,);
    console.log('success 付款成功', res);

    setOrderData(res.data.order); // 取得 結帳完成資料
  };

  useEffect(() => {
    getCart(orderId);
  }, [orderId]);

  return (
    <>
    <div className="container">
      <div style={{minHeight: '400px', backgroundImage: 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
      backgroundPosition: 'center center',}}>
      </div>
      <div className="mt-5 mb-7">
        <div className="row">
          <div className="col-md-6">
            <h2>訂單已送出</h2>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea</p>
            <a href="./index.html" className="btn btn-outline-dark me-2 rounded-0 mb-4">Back To Home</a>
          </div>
          <div className="col-md-6">
            <div className="card rounded-0 py-4">
              <div className="card-header border-bottom-0 bg-white px-4 py-0">
                <h2>Order Detail</h2>
              </div>
              <div className="card-body px-4 py-0">
                <ul className="list-group list-group-flush">
                  {/* data物件格式 轉 陣列  || {} 預設空陣列*/}
                  {Object.values(orderData?.products || {}).map((item) => {
                    return (
                      <li className="list-group-item px-0" key={item.id}>
                      <div className="d-flex mt-2">
                        <img src={item.product.imageUrl} alt="" className="me-2" style={{width: '60px', height: '60px', objectFit: 'cover',}} />
                        <div className="w-100 d-flex flex-column">
                          <div className="d-flex justify-content-between fw-bold">
                            <h5>{item.product.title}</h5>
                            <p className="mb-0">x{item.product.unit}</p>
                          </div>
                          <div className="d-flex justify-content-between mt-auto">
                            <p className="text-muted mb-0"><small>NT${item.product.price}</small></p>
                            <p className="mb-0">NT${item.product.price}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    )
                  })}
                  <li className="list-group-item px-0 pb-0">
                    <table className="table text-muted">
                      <tbody>
                        <tr>
                          <th scope="row" className="border-0 px-0 font-weight-normal">小計</th>
                          <td className="text-end border-0 px-0">NT${orderData.total}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">Payment</th>
                          <td className="text-end border-0 px-0 pt-0">ApplePay</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between mt-2">
                      <p className="mb-0 h4 fw-bold">總金額</p>
                      <p className="mb-0 h4 fw-bold">NT${orderData.total}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Success;