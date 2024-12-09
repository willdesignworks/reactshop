import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import Navbar from "../../components/Navbar";
import OffsetWrapper from "../../components/OffsetWrapper";
import Loading from "../../components/Loading"; // react-loading
import MessageToast from '../../components/MessageToast'; // Redux Toolkit
import Footer from "./Footer";

function FrontLayout() {
  const [products, setProducts] = useState([]);  // 商品狀態
  const [cartData, setCartData] = useState({}); // 訂單
  const [isLoading, setLoading] = useState(false) // react-loading
  const [isCartOpen, setCartOpen] = useState(false); // cart_btn
  const [marginBottom, setMarginBottom] = useState(0); // 用來保存 margin-bottom 值
  const scrollUpAnimation = useAnimation(); // scrollUp

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

  // API-取得資料
  const getProducts = async () => {
    setLoading(true); // react-loading
    // API-列表
    const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products`);
    console.log('layout 商品:', productRes);
    setProducts(productRes.data.products);

    setLoading(false); // react-loading
  };

  useEffect(() => {
    getCart();
    getProducts();

    // 初始化
    const updateMarginBottom = () => {
      const footerHeight = document.querySelector(".htc__foooter__area").offsetHeight;
      setMarginBottom(footerHeight);
    };
    updateMarginBottom(); // 載入更新
    window.addEventListener('resize', updateMarginBottom); // 監聽視窗大小

    // scrollUp
    const handleScroll = () => {
      if (window.scrollY > 50) {
          scrollUpAnimation.start({ opacity: 1, x: 15, y: 0 });
      } else {
          scrollUpAnimation.start({ opacity: 0, x: 15, y: 15 });
      }
    };
    window.addEventListener("scroll", handleScroll); // 滾動監聽

    // 清除監聽
    return () => {
      window.removeEventListener('resize', updateMarginBottom); // 清除監聽視窗大小
      window.removeEventListener("scroll", handleScroll); // 清除滾動監聽
    };

  }, [scrollUpAnimation]);

  return (
    <>
    <div className="wrapper fixed__footer" style={{ marginBottom: `${marginBottom}px` }}>
      <Loading isLoading={isLoading }/> {/*Reducer 跨元件傳遞*/}
      <MessageToast />  {/*Redux Toolkit*/}
      <Navbar 
        cartData={cartData}
        setCartOpen={setCartOpen}
      />
      <div className={`body__overlay ${isCartOpen ? 'is-visible' : ''}`}
        onClick={() => setCartOpen(false)}
      ></div>
      <OffsetWrapper
        isCartOpen={isCartOpen}
        setCartOpen={setCartOpen}
        cartData={cartData}
        getCart={getCart}
      />
      <Outlet context={{ getCart, cartData, products, getProducts, setCartOpen }}></Outlet> {/*pag*/}
      <Footer />
      <motion.div
        initial={{ opacity: 0, x: 15, y: 0, }} // 初始
        animate={scrollUpAnimation} // 顯示
        exit={{ opacity: 0, x: 15, y: 0, }} // 退出
        transition={{ duration: 0.3 }} // 動畫時間
        style={{ position: "fixed", bottom: "15px", right: "15px", zIndex: "2147483647" }}
      >
      <Link
        id="scrollUp"
        to="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <i className="zmdi zmdi-chevron-up"></i>
      </Link>
    </motion.div>
    </div>
    </>
  );
};

export default FrontLayout;