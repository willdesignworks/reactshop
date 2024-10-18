import axios from "axios";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

function FrontLayout() {

  const [carData, setCarData] = useState({}); // 訂單

  // 訂單-數量 (寫入)
  const getCart = async () => {
    try {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`,);
      console.log('訂單', res);
      setCarData(res.data.data); // 訂單-數量 (寫入)
    } catch(error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
    {/*navbar*/}
    <Navbar carData={carData}/>
    {/*home*/}
    <Outlet context={{ getCart }}></Outlet>
    {/*footer*/}
    <div className="bg-dark py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
          <a className="text-white h4" href="./index.html">LOGO</a>
          <ul className="d-flex list-unstyled mb-0 h4">
            <li><a href="#" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
          </ul>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
          <div className="mb-md-0 mb-1">
            <p className="mb-0">02-3456-7890</p>
            <p className="mb-0">service@mail.com</p>
          </div>
          <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default FrontLayout;