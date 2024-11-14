import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap';
import { Modal } from "bootstrap";
import { motion, AnimatePresence } from 'framer-motion'; // framer-motion 動畫
import Loading from '../../components/Loading'; // react-loading
import FrontProductModal from '../../components/FrontProductModal';
import HomeBanner from '../../components/HomeBanner';

function Home() {

  const [products, setProducts] = useState([]); // 商品狀態
  const [isLoading, setLoading] = useState(false); // react-loading
  const [selectedCategory, setSelectedCategory] = useState('*'); // 預設選取的類別為所有
  const [selectedProduct, setSelectedProduct] = useState({}); // 選取的產品
  const { getCart, product } = useOutletContext(); // 訂單-數量 (跨元件傳遞)
  const navigate = useNavigate(); // 轉址
  const productModal = useRef(null); // Modal

  // API-取得資料
  const getProducts = async () => {
    try {
      setLoading(true); // react-loading
      const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
      setProducts(productRes.data.products);
      setLoading(false); // react-loading
    } catch (error) {
      setLoading(false);
      console.error('API 请求错误:', error);
    } finally {
      setLoading(false); // react-loading
    }
  };

  useEffect(() => {
    getProducts();
    productModal.current = new Modal('#productModal', {
      //backdrop: 'static',  背景關閉
    });

  }, []);

  // API-寫入購物車
  const addToCar = async (product) => {
    const data = {
      data: {
        product_id: product.id,
        qty: 1,
      },
    };
  
    try {
      setLoading(true); // react-loading
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data,);
      console.log('Detail 訂單:', res);
      getCart(); // 訂單-數量 (跨元件傳遞)
      closeProductModal();
      window.scrollTo(0, 0);
      navigate(`cart`);
      setLoading(false); // react-loading
    } catch(error) {
      setLoading(false); // react-loading
      console.log(error);
    };
  }

  //Modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    productModal.current.show();
  };
  const closeProductModal = () => {
    productModal.current.hide();
  };

  //category
  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === '*' 
    ? products.filter(product => product.category !== '輪播')
    : products.filter(product => product.category === selectedCategory); // 根據選取的類別過濾商品

  return (
    <>
      <Loading isLoading={isLoading} />
      <FrontProductModal 
        closeProductModal={closeProductModal}
        product={selectedProduct}
        getCart={getCart}
      />
      {/* Start banner */}
      <HomeBanner />
      {/* End banner */}

      {/* Start Our Product */}
      <section className="htc__product__area ptb--130 bg__white">
        <div className="container">
          <div className="htc__product__container">
            <div className="row">
            <div className="col-md-12">此網站是範例, 並沒有真正的購物行為</div>
              <div className="col-md-12">
                <div className="product__menu">
                  <button onClick={() => handleFilter('*')} className={selectedCategory === '*' ? 'is-checked' : ''}>所有</button>
                  <button onClick={() => handleFilter('服飾')} className={selectedCategory === '衣服' ? 'is-checked' : ''}>衣服</button>
                  <button onClick={() => handleFilter('褲子')} className={selectedCategory === '裤子' ? 'is-checked' : ''}>裤子</button>
                  <button onClick={() => handleFilter('配件')} className={selectedCategory === '配件' ? 'is-checked' : ''}>配件</button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              <div className="row product__list foo">
                {filteredProducts.map(product => (
                  <motion.div
                  key={product.id}
                  layout // 佈局改變時自動進行動畫過渡
                  initial={{ opacity: 0, scale: 0.9, }} // 初始
                  animate={{ opacity: 1, scale: 1, }} // 顯示
                  exit={{ opacity: 0, scale: 0.9, }} // 退出
                  transition={{ duration: 0.3 }} // 動畫時間
                  className={`col-md-3 single__pro col-lg-3 col-md-4 ${product.category} col-sm-12`}
                >
                  <div className="product">
                    <div className="product__inner">
                      <div className="pro__thumb">
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <img src={product.imageUrl} alt="product images" />
                        </Link>
                      </div>
                      <div className="product__hover__info">
                        <ul className="product__action">
                          <li>
                            <Link title="Quick View" className="quick-view modal-view detail-link"
                            onClick={(e) => {
                              e.preventDefault();
                              openProductModal(product);
                            }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                              </svg>
                            </Link>
                          </li>
                          <li>
                            <Link title="Add TO Cart" to="#"
                              onClick={(e) => {
                                e.preventDefault();
                                addToCar(product); // 加入購物車
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM6.00436 7.00265V13.0027H17.5163L19.3163 7.00265H6.00436ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z"></path>
                              </svg>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product__details">
                      <h2>
                        <Link to="/product-details">{product.title}</Link>
                      </h2>
                      <ul className="product__price">
                        <li className="new__price">NT ${product.price}</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      {/* End Our Product */}
    </>
  );
};

export default Home;