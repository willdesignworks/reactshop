import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading"; // react-loading
import ProductsCategorySidebar from "../../components/ProductsCategorySidebar";

function CategoryGoods() {

  const [products, setProducts] = useState([]);  // 商品狀態
  const [pagination, setPagination] = useState([]); // 分頁狀態
  const [isLoading, setLoading] = useState(false) // react-loading

  // API-取得資料
  const getProducts = async (page = 1, category = '配件') => {
    setLoading(true);
    try {
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}&category=${category}`);
        console.log('products 配件:', productRes);
        setProducts(productRes.data.products);
        setPagination(productRes.data.pagination);
    } catch (error) {
        console.error('API 請求錯誤:', error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
  getProducts(1, '配件');
}, []);


  return (
    <>
    <Loading isLoading={isLoading }/>
    <div className="position-relative d-flex align-items-center justify-content-center" style={{minHeight: '400px',}}>
      <div className="position-absolute productstopbg"></div>
      {/*<h2 className="fw-bold">Lorem ipsum.</h2>*/}
    </div>
    <div className="container mt-md-5 mt-3 mb-7">
      <div className="row">
        <div className="col-md-2">
          <ProductsCategorySidebar activeAccordion="three" />
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
    </>
  );
};

export default  CategoryGoods;