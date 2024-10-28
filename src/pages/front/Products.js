import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading"; // react-loading
import ProductsCategorySidebar from "../../components/ProductsCategorySidebar";

function Products() {

  const [products, setProducts] = useState([]);  // 商品狀態
  const [isLoading, setLoading] = useState(false) // react-loading
  const [visibleCount, setVisibleCount] = useState(6); // 當前可見的商品數量

  // API-取得資料
  const getProducts = async (pageNumber = 1) => {
      setLoading(true); // react-loading
      try {
      // API-列表
      const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
      console.log('products 商品:', productRes);

      setProducts(productRes.data.products);
      setLoading(false); // react-loading
    } catch (error) {
      console.error('API 請求錯誤:', error);
      setLoading(false); // react-loading
    } 
  };

  useEffect(() => {
    getProducts();
  }, [visibleCount]);

  // 載入更多
  const loadMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 6); // 每次增加可見的商品
  };

  // 只顯示已可見的商品
  const visibleProducts = products.filter((product) => product.category !== '輪播').slice(0, visibleCount);

  return (
    <>
    <Loading isLoading={isLoading }/>
    {/* Start Bradcaump area */}
    <div className="ht__bradcaump__area">
      <div className="ht__bradcaump__wrap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bradcaump__inner text-center">
                <h2 className="bradcaump-title">全部商品</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Bradcaump area */}

    <section className="htc__product__area ptb--130 bg__white">
      <div className="container">
        <div className="htc__product__container">
          <div className="row">
            <div className="col-md-2">
              <ProductsCategorySidebar activeAccordion="one" />
            </div>
            <div className="col-md-10">
              <div className="row">
                {visibleProducts.map((product, index) => (
                    <div className="col-md-4" key={`${product.id}-${index}`}>
                      <div className="card border-0 mb-4 position-relative position-relative">
                        <Link to={`/product/${product.id}`}>
                          <img src={product.imageUrl} className="card-img-top rounded-0 object-cover" alt="..." />
                        </Link>
                        <div className="card-body p-0">
                          <h4 className="mb-0 mt-3">
                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                          </h4>
                          <p className="card-text mb-0">NT ${product.price}</p>
                          <p className="text-muted mt-3"></p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
              {/* 載入更多按鈕 */}
              {products.filter((product) => product.category !== '輪播').length > 0 && (
                <div className="htc__loadmore__btn text-center mt-4">
                  <Link
                    to="#"
                    onClick={(event) => {
                      event.preventDefault();
                      loadMoreProducts();
                    }}
                    className={visibleCount >= products.filter((product) => product.category !== '輪播').length ? 'disabled-link' : ''}
                  >
                    {isLoading 
                      ? '載入中...' 
                      : (visibleCount >= products.filter((product) => product.category !== '輪播').length ? '沒有更多商品' : '載入更多')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    {/*<div className="bg-light py-4">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
          <p className="mb-0 fw-bold">Lorem ipsum dolor sit amet.</p>
          <div className="input-group w-md-50 mt-md-0 mt-3">
            <input type="text" className="form-control rounded-0" placeholder="" />
            <div className="input-group-append">
              <button className="btn btn-dark rounded-0" type="button" id="search">
                Lorem ipsum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>*/}
    </>
  );
};

export default  Products;