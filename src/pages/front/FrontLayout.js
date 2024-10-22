import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading"; // react-loading

function FrontLayout() {

  const [cartData, setCartData] = useState({}); // 訂單
  const [isLoading, setLoading] = useState(false) // react-loading

  // 訂單-數量 (寫入)
  const getCart = async () => {
    try {
      setLoading(true); // react-loading
      
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`,);
      console.log('layout 訂單:', res);
      setCartData(res.data.data); // 訂單-數量 (寫入)

      setLoading(false); // react-loading
    } catch(error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
    <Loading isLoading={isLoading }/>
    {/*navbar*/}
    <Navbar cartData={cartData} />
    {/*home*/}
    <Outlet context={{ getCart, cartData }}></Outlet>
    {/*footer*/}
    <div className="bg-dark py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
          <a className="text-white h4" href="./index.html">XRAGE</a>
          <ul className="d-flex list-unstyled mb-0 h4">
            <li><a href="#" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
          </ul>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
          <div className="mb-md-0 mb-1">
            <p className="mb-0">02-3456-7890</p>
            <p className="mb-0">
            <a href="https://mail.google.com/mail/u/0/?view=cm&amp;fs=1&amp;tf=1&amp;to=xrage.most@gmail.com" target="_blank">
            xrage.most@gmail.com
            </a>
            </p>
          </div>
          <p className="mb-0">COPYRIGHT © 2024 XRAGE CO., LTD. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default FrontLayout;