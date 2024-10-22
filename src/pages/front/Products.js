import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading"; // react-loading

function Products() {

  const [products, setProducts] = useState([]);  // 商品狀態
  const [pagination, setPagination] = useState([]); // 分頁狀態
  const [isLoading, setLoading] = useState(false) // react-loading

  // API-取得資料
  const getProducts = async (page = 1) => {
      setLoading(true); // react-loading
      // API-列表
      const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
      console.log('products 商品:', productRes);
      setProducts(productRes.data.products);
      setPagination(productRes.data.pagination); // 分頁

      setLoading(false); // react-loading
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <>
    <Loading isLoading={isLoading }/>
    <div className="position-relative d-flex align-items-center justify-content-center" style={{minHeight: '400px',}}>
      <div className="position-absolute productstopbg"></div>
      <h2 className="fw-bold">Lorem ipsum.</h2>
    </div>
    <div className="container mt-md-5 mt-3 mb-7">
      <div className="row">
        <div className="col-md-2">
          <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
            <div className="card border-0">
              <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    服飾
                  </h4>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="card-body py-0">
                  <ul className="list-unstyled">
                    <li><a href="#" className="py-2 d-block text-muted">長袖</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    褲子
                  </h4>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="card-body py-0">
                  <ul className="list-unstyled">
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingThree" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">
                    配件
                  </h4>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="card-body py-0">
                  <ul className="list-unstyled">
                    <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
                      <p className="card-text mb-0">NT${product.price}</p>
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