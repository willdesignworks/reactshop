import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // 引入 需要Swiper的模組
import 'swiper/swiper-bundle.css'; // 引入 Swiper 樣式

import { Link } from 'react-router-dom';

function RelatedProducts() {
  const [relatedProducts, setRelatedProducts] = useState([]); // 商品狀態
  const navigate = useNavigate(); // 你可能會喜歡的商品

  // API-取得資料
  const getRelatedProducts = async (id) =>  {
    try {
      // API-列表
      const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products`);
      console.log('RelatedProducts 你可能喜歡:', productRes);

      // 過濾掉類別為 '輪播' 的產品
      const filteredProducts = productRes.data.products.filter(product => product.category !== '輪播');

      setRelatedProducts(filteredProducts || []);
    } catch (error) {
      console.error(error);
    }

  };
  useEffect(() => {
    getRelatedProducts();
  }, []);


  // 你可能會喜歡的商品
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };
  

  return (
    <>
      <Swiper
         //navigation 啟用導航按鈕（左右箭頭）
        pagination={{ clickable: true }} // 啟用可點擊的分頁指示器
        spaceBetween={30} // 幻燈片之間的間距設置為 30 像素
        slidesPerView={'auto'} // 設置顯示4張 auto
        centeredSlides={true} // 設定為 false，以讓滑塊不居中，而是從左邊開始排列
        loop={relatedProducts.length > 3} // 只有在產品數量足夠時啟用循環
        autoplay={{
          delay: 2500, // 自動播放間隔
          disableOnInteraction: true, // 互動後停止自動播放
        }}
        className="mt-4 mb-5"
        modules={[Navigation, Pagination, Autoplay]} // 添加模組
        breakpoints={{ // 添加響應式設置
          767: { // 當屏幕寬度大於等於 767 像素時
            slidesPerView: 3, // 顯示 3 張幻燈片
            spaceBetween: 30 // 幻燈片間距設置為 30 像素
          }
        }}
      >
        {/* 添加多個 SwiperSlide */}
        {relatedProducts.slice(0, 6).map((product) => (
          <SwiperSlide key={product.id}>
            <div className="card border-0 mb-4 position-relative"
             onClick={() => handleProductClick(product.id)}
            >
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.imageUrl} 
                  className="card-img-top rounded-0" 
                  alt="..."
                />
              </Link>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3">
                  <Link to={`/product/${product.id}`}>
                  {product.title}
                  </Link>
                </h4>
                <p className="card-text mb-0">NT${product.price}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default RelatedProducts;