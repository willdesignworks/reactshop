import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading"; // react-loading
import ProductsCategorySidebar from "../../components/ProductsCategorySidebar";

function CategoryShirts() {

  const [products, setProducts] = useState([]);  // 商品狀態
  const [pagination, setPagination] = useState([]); // 分頁狀態
  const [isLoading, setLoading] = useState(false) // react-loading

  // API-取得資料
  const getProducts = async (page = 1, category = '服飾') => {
      setLoading(true); // react-loading
      try {
      // API-列表
      const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}&category=${category}`);
      console.log('products 服飾:', productRes);

      setProducts(productRes.data.products);
      setPagination(productRes.data.pagination); // 分頁
      setLoading(false); // react-loading

    } catch (error) {
      console.error('API 請求錯誤:', error);
      setLoading(false); // react-loading
    } 
  };

  useEffect(() => {
    getProducts(1, '服飾');
  }, []);

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
                <h2 className="bradcaump-title">服飾</h2>
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
              <ProductsCategorySidebar activeAccordion="shirts" />
            </div>
            <div className="col-md-10">
              <div className="row">
                {products.map((product) => {
                  return (
                    <div className="col-md-6" key={product.id}>
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
                  );
                })}
              </div>
              <nav className="d-flex justify-content-center">
                <Pagination pagination={pagination} changePage={getProducts}/>
              </nav>
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

export default  CategoryShirts;