import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState({}); // 商品狀態
  const [carQuantity, setcarQuantity] = useState(1); // 商品-數量
  const [isLoading, setIsLoading] = useState(false); // 商品-讀取
  const { getCart } = useOutletContext(); // 訂單-數量 (跨元件傳遞)

  const { id } = useParams();
  //console.log(id);

  // API-取得資料
  const getProduct = async (id) => {
    // API-列表
    const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
    console.log('商品', productRes);
    setProduct(productRes.data.product);
  };

  // API-商品
  const addToCar = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: carQuantity,
      },
    };
    setIsLoading(true);
    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data,);
      console.log('訂單', res);
      getCart(); // 訂單-數量 (跨元件傳遞)
      setIsLoading(false);
    } catch(error) {
      console.log(error);
      setIsLoading(false);
    };
  }

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <>
    <div className="container">
    <div className="row align-items-center">
        <div className="col-md-7">
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={product.imageUrl} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" className="d-block w-100" alt="..." />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="col-md-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white px-0 mb-0 py-3">
              <li className="breadcrumb-item"><a className="text-muted" href="./index.html">Home</a></li>
              <li className="breadcrumb-item"><a className="text-muted" href="./product.html">Product</a></li>
              <li className="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </nav>
          <h2 className="fw-bold h1 mb-1">{product.title}</h2>
          <p className="mb-0 text-muted text-end"><del>NT${product.price}</del></p>
          <p className="h4 fw-bold text-end">NT${product.price}</p>
          <div className="row align-items-center">
            <div className="col-6">

              <div className="input-group my-3 bg-light rounded">
                <div className="input-group-prepend">
                  <button 
                    className="btn btn-outline-dark border-0 py-2" 
                    type="button" 
                    id="button-addon1"
                    onClick={() => setcarQuantity((pre) => pre === 1 ? pre : pre - 1)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 11H5V13H19V11Z"></path></svg>
                  </button>
                </div>
                <input 
                  type="text" 
                  readOnly 
                  className="form-control border-0 text-center my-auto shadow-none bg-light" 
                  placeholder="" 
                  aria-label="Example text with button addon" 
                  aria-describedby="button-addon1"
                  value={carQuantity}
                />
                <div className="input-group-append">
                  <button 
                    className="btn btn-outline-dark border-0 py-2"
                    type="button" 
                    id="button-addon2"
                    onClick={() => setcarQuantity((pre) => pre + 1)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                  </button>
                </div>
              </div>
              
            </div>
            <div className="col-6">
              <button
               type="button" 
               className="text-nowrap btn btn-dark w-100 py-2" 
               onClick={() => addToCar()} 
               disabled={isLoading}
              >
              加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-12">
          <p>{product.content}</p>
        </div>
      </div>
      {/*<h3 className="fw-bold">Lorem ipsum dolor sit amet</h3>
      <div className="swiper-container mt-4 mb-5">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0" alt="..." />
              <a href="#" className="text-dark">
              </a>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
                <p className="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0" alt="..." />
              <a href="#" className="text-dark">
              </a>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
                <p className="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0" alt="..." />
              <a href="#" className="text-dark">
              </a>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
                <p className="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0" alt="..." />
              <a href="#" className="text-dark">
              </a>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
                <p className="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0" alt="..." />
              <a href="#" className="text-dark">
              </a>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
                <p className="text-muted mt-3"></p>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
    </div>
    </>
  );
};

export default ProductDetail;