import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import CouponModal from "../../components/CouponModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";

function AdminCoupons() {
  const [coupons, setCoupons] = useState( [] ); //商 品狀態
  const [pagination, setPagination] = useState( {} ); // 分頁狀態
  
  const [type, setType] = useState('create'); // Modal用途(類型edit)
  const [tempCoupon, setTempCoupon] = useState([]); // 編輯資料
  const couponModal = useRef(null); // Modal
  const deleteModal = useRef(null); // Modal

  useEffect(() => {
    // Modal
    couponModal.current = new Modal('#productModal', {
      backdrop: 'static', // 背景關閉
    });
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });

    getCoupons(); // API-取得資料
  }, []);

  // API-取得資料
  const getCoupons = async (page = 1) => {
      // API-列表
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`);
      console.log(res)
      setCoupons(res.data.coupons);
      setPagination(res.data.pagination); // 分頁
  };

  //Modal
  const openCouponModal = (type, item) => {
    setType(type); // Modal用途
    setTempCoupon(item); // 編輯資料
    couponModal.current.show();
  };
  const closeModal = () => {
    couponModal.current.hide();
  };
  const opneDeleteModal = (product) => {
    setTempCoupon(product);
    deleteModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };
  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`);
      if (res.data.success) {
        getCoupons();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return ( <>
    <div className="p-3">
      <CouponModal
       closeModal={closeModal}
       getCoupons={getCoupons} 
        type={type} 
        tempCoupon={tempCoupon}
      />
      <DeleteModal close={closeDeleteModal} 
      text={tempCoupon.title} 
      handleDelete={deleteCoupon} 
      id={tempCoupon.id}/>
    <h3>優惠卷列表</h3>
    <hr />
    <div className="text-end">
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => openCouponModal('create', {})}  
      >
        建立新優惠卷
      </button>
    </div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">標題</th>
          <th scope="col">折扣</th>
          <th scope="col">到期日</th>
          <th scope="col">優惠碼</th>
          <th scope="col">啟用狀態</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        {coupons.map((product) => {
          return (
            <tr key={product.id}>
            <td>{product.title}</td>
            <td>{product.percent}</td>
            <td>{new Date(product.due_date).toDateString()}</td>
            <td>{product.code}</td>
            <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
            <td>
              <button type="button" className="btn btn-primary btn-sm" 
              onClick={() => openCouponModal('edit', product)}>
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
    
    <Pagination pagination={pagination} changePage={getCoupons}/> 

  </div>
  </>)
};

export default AdminCoupons;