import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    <div className="ht__bradcaump__area">
            <div className="ht__bradcaump__wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bradcaump__inner text-center">
                                <h2 className="bradcaump-title">訂單已送出</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div className="cart-main-area bg__white">
      <div className="container">
        <div className="mt-5 mb-7">
          <div className="row">
            <div className="col-md-6">
              <h2>訂單已送出</h2>
              <p>
                感謝您購買本公司的產品，<br/>
                如果您的送貨地址有更改，請務必來電通知。<br/><br/>
                若您於7天內沒收到貨品請與本公司聯絡。<br/>
                再次感謝您!
              </p>
              <p>此網站是範例, 並沒有真正的購物行為</p>
              <Link to='/' className="text-nowrap btn btn-dark py-2">回首頁</Link>
            </div>
            <div className="col-md-6">
              <div className="card rounded-0 py-4">
                <div className="card-header border-bottom-0 bg-white px-4 py-0">
                  <h3>訂單編號：{orderData.id}</h3>
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
                            <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">運費</th>
                            <td className="text-end border-0 px-0 pt-0">NT$0</td>
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
    </div>
    </>
  );
};

export default Success;