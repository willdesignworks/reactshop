import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";

function AdminProducts() {
  const [products, setProducts] = useState( [] ); //商 品狀態
  const [pagination, setPagination] = useState( {} ); // 分頁狀態
  
  const [type, setType] = useState('create'); // Modal用途(類型edit)
  const [temProduct, setTemProduct] = useState([]); // 編輯資料
  const productModal = useRef(null); // Modal
  const deleteModal = useRef(null); // Modal

  useEffect(() => {
    // Modal
    productModal.current = new Modal('#productModal', {
      backdrop: 'static', // 背景關閉
    });
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });

    getProducts(); // API-取得資料
  }, []);

  // API-取得資料
  const getProducts = async (page = 1) => {
      // API-產品列表
      const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`);
      console.log(productRes)
      setProducts(productRes.data.products);
      setPagination(productRes.data.pagination); // 分頁
  };

  //Modal
  const opneProductModal = (type, product) => {
    setType(type); // Modal用途
    setTemProduct(product); // 編輯資料
    productModal.current.show();
  };
  const closeProductModal = () => {
    productModal.current.hide();
  };
  const opneDeleteModal = (product) => {
    setTemProduct(product);
    deleteModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`);
      if (res.data.success) {
        getProducts();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return ( <>
    <div className="p-3">
      <ProductModal
       closeProductModal={closeProductModal}
        getProducts={getProducts} 
        type={type} 
        temProduct={temProduct}
      />
      <DeleteModal close={closeDeleteModal} 
      text={temProduct.title} 
      handleDelete={deleteProduct} 
      id={temProduct.id}/>
    <h3>產品列表</h3>
    <hr />
    <div className="text-end">
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => opneProductModal('create', {})}  
      >
        建立新商品
      </button>
    </div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">分類</th>
          <th scope="col">名稱</th>
          <th scope="col">售價</th>
          <th scope="col">啟用狀態</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <tr key={product.id}>
            <td>{product.category}</td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
            <td>
              <button type="button" className="btn btn-primary btn-sm" 
              onClick={() => opneProductModal('edit', product)}>
                編輯
              </button>
              <button type="button" className="btn btn-outline-danger btn-sm ms-2" 
              onClick={() => opneDeleteModal(product)}>
                刪除
              </button>
            </td>
          </tr>
          )
        })}
      {/*
  {Array.isArray(products) && products.length > 0 ? (
    products.map((product) => (
      <tr key={product.id}>
        <td>{product.category}</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
        <td>
          <button type="button" className="btn btn-primary btn-sm">
            編輯
          </button>
          <button type="button" className="btn btn-outline-danger btn-sm ms-2">
            刪除
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">沒有產品可顯示</td>
    </tr>
  )}
      */}
      </tbody>
    </table>
    
    <Pagination pagination={pagination} changePage={getProducts}/> 

  </div>
  </>)
};

export default AdminProducts;