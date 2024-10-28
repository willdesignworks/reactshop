import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from 'axios';

function FrontProductModal({ closeProductModal, product, getCart }) {

  const { setCartOpen } = useOutletContext(); // (跨元件傳遞)
  const [carQuantity, setcarQuantity] = useState(1); // 商品-數量

  // API-寫入購物車
  const addToCar = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: carQuantity,
      },
    };

    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data,);
      console.log('Detail 訂單:', res);
      getCart(); // 訂單-數量 (跨元件傳遞)
      closeProductModal();
      setCartOpen(true)
    } catch(error) {
      console.log(error);
    };
  }

  return (
    <>
    <div className="modal fade" id="productModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal__container" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between">
            <h5 className="modal-title">產品資訊</h5>
            <button type="button" className="close" onClick={closeProductModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-product">
              <div className="product-images">
                <div className="main-image images">
                  <img alt="big images" src={product.imageUrl} />
                </div>
              </div>
              <div className="product-info">
                <h1>{product.title}</h1>
                <div className="price-box-3">
                  <div className="s-price-box">
                    <span className="new-price">NT ${product.price}</span>
                  </div>
                </div>
                <div className="quick-desc">
                  <div dangerouslySetInnerHTML={{ __html: product.content }} />
                </div>
                <div className="social-sharing">
                  <div className="widget widget_socialsharing_widget">
                    <h3 className="widget-title-modal">產品數量</h3>
                  </div>
                </div>
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
                <div className="input-group-prepend">
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
                <div className="addtocart-btn">
                  <button 
                    className="btn btn-dark border-0 py-2 w-100"
                    onClick={() => {
                      addToCar(); // 加入購物車
                    }}
                  >加入購物車</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FrontProductModal;