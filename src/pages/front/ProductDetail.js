import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import RelatedProducts from "../../components/RelatedProducts";
import RelatedNavbar from "../../components/RelatedNavbar";
import Carousel from "../../components/Carousel";
import Loading from "../../components/Loading"; // react-loading

function ProductDetail() {
  window.scrollTo(0, 0);
  const [product, setProduct] = useState({}); // 商品狀態
  const [carQuantity, setcarQuantity] = useState(1); // 商品-數量
  const [isproLoading, setIsproLoading] = useState(false); // 商品-讀取
  const [isAddedToCart, setIsAddedToCart] = useState(false); // 商品是否已加入購物車
  const { getCart } = useOutletContext(); // 訂單-數量 (跨元件傳遞)
  const [isLoading, setLoading] = useState(false) // react-loading
  const navigate = useNavigate();

  const { id } = useParams();
  //console.log(id);

  // API-取得資料
  const getProduct = async (id) => {
    setLoading(true); // react-loading
    // API-列表
    const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
    console.log('Detail 商品:', productRes);
    setProduct(productRes.data.product);

    setLoading(false); // react-loading
  };

  // API-商品
  const addToCar = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: carQuantity,
      },
    };
    setIsproLoading(true);
    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data,);
      console.log('Detail 訂單:', res);
      getCart(); // 訂單-數量 (跨元件傳遞)
      setIsAddedToCart(true); // 標記商品已加入購物車
      setIsproLoading(false);
    } catch(error) {
      console.log(error);
      setIsproLoading(false);
    };
  }

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <>
    <Loading isLoading={ isLoading }/>
    <div className="container ProductDetail">
    <div className="row align-items-center">
        <div className="col-md-7">
          <Carousel product={product}/>
        </div>
        <div className="col-md-5">
          <RelatedNavbar /*current="Detail"*//>
          <h2 className="fw-bold h1 mb-2">{product.title}</h2>
          <p className="productpromotionstag mb-3">全店，NT4500免運費</p>
          <p className="h4 fw-bold" >NT${product.price}</p>
          <div className="row align-items-center">
            <div className="col-12">
              <p className="mt-5">數量</p>
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
               className={`text-nowrap btn ${isAddedToCart ? 'btn-secondary' : 'btn-dark'} w-100 py-2`} 
               onClick={isAddedToCart ? null : addToCar} 
               disabled={isproLoading || isAddedToCart}
              >
              {isAddedToCart ? '已加入購物車' : '加入購物車'}
              </button>
            </div>
            <div className="col-6">
              <button
               type="button" 
               className={`text-nowrap btn ${isAddedToCart ? 'btn-secondary' : 'btn-org'} w-100 py-2`} 
               onClick={() => {
                addToCar(); // 加入購物車
                navigate('/Checkout'); // 跳轉到購物車
              }}
               disabled={isproLoading || isAddedToCart}
              >
              {isAddedToCart ? '已經購買' : '立即購買'}
                
              </button>
            </div>
          </div>
          <div className="deliveryoption">
            <h5>送貨方式</h5>
            <ul>
              <li>7-11 取貨付款(3-5天)</li>
              <li>7-11 純取貨(3-5天)</li>
              <li>全家 取貨付款(3-5天)</li>
              <li>全家 純取貨(3-5天)</li>
              <li>新竹物流 運費NT130 (約3-5天)</li>
              <li>順豐快遞(中國大陸)(3-5天)</li>
              <li>順豐快遞(香港)(3-5天)</li>
              <li>順豐快遞(澳門)(3-5天)</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-12">
          <div dangerouslySetInnerHTML={{ __html: product.content }} />
        </div>
      </div>
      <h3 className="fw-bold">你可能會喜歡的商品</h3>
      <RelatedProducts setIsAddedToCart={setIsAddedToCart}/>
    </div>
    </>
  );
};

export default ProductDetail;