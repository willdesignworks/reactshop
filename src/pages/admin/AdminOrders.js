import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import OrderModal from "../../components/OrderModal";
import OrderDeleteModal from '../../components/OrderDeleteModal';
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";
import Loading from "../../components/Loading"; // react-loading

function AdminOrders() {
  const [orders, setOrders] = useState([]); // 所有訂單列表
  const [pagination, setPagination] = useState({});
  
  // type: 決定 modal 展開的用途
  const [type, setType] = useState('create'); // edit
  const [tempOrder, setTempOrder] = useState({}); // 儲存 選定訂單資料

  const orderModal = useRef(null); // Modal
  const orderdeleteModal = useRef(null); // Modal

  const [isLoading, setLoading] = useState(false) // react-loading

  useEffect(() => {
    // Modal
    orderModal.current = new Modal('#orderModal', {
      backdrop: 'static',
    });
    orderdeleteModal.current = new Modal('#orderdeleteModal', {
      backdrop: 'static',
    });

    getOrders(); // API-取得資料
  }, []);

  // API-取得 訂單資料
  const getOrders = async (page = 1) => {
    setLoading(true); // react-loading
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`,
    );
    console.log('訂單列表', res);
    setOrders(res.data.orders);
    setPagination(res.data.pagination);
    setLoading(false); // react-loading
  }

  //Modal
  const openOrderModal = (order) => {
    setType(type); // Modal用途
    setTempOrder(order);
    orderModal.current.show();
    console.log('opneOrderModal', order);
  }
  const closeOrderModal = () => {
    setTempOrder({});
    orderModal.current.hide();
  }
  const opneOrdeDeleteModal = (order) => {
    setTempOrder(order);
    orderdeleteModal.current.show();
    console.log('opneDeleteModal', order);
  };
  const closeOrdeDeleteModal = () => {
    setTempOrder({});
    orderdeleteModal.current.hide();
  };

  // 刪除
  const deleteOrderModa = async (id) => {
    try {
      setLoading(true); // react-loading
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`);
      if (res.data.success) {
        getOrders();
        orderdeleteModal.current.hide();
        setLoading(false); // react-loading
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='p-3'>
      <Loading isLoading={isLoading }/>
      <OrderModal
        closeProductModal={closeOrderModal}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      <OrderDeleteModal 
        closeOrdeDeleteModal={closeOrdeDeleteModal}
        text={tempOrder.id} 
        handleDelete={deleteOrderModa} 
        id={tempOrder.id}
        user={tempOrder.user?.name || '未知用戶'}
        useremail={tempOrder.user?.email || '未知郵件'}
        usertotal={tempOrder.total}
        usermessage={tempOrder.message}
      />
          <Loading isLoading={isLoading }/>
      <h3>訂單列表</h3>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>訂單 id</th>
            <th scope='col'>購買用戶</th>
            <th scope='col'>購買信箱</th>
            <th scope='col'>訂單金額</th>
            <th scope='col'>付款狀態</th>
            <th scope='col'>付款日期</th>
            <th scope='col'>留言訊息</th>
            <th scope='col'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user?.name}</td>
                <td>{order.user?.email}</td>
                <td>${order.total}</td>
                <td>
                  {order.is_paid ? (
                    <span className='text-success fw-bold'>付款完成</span>
                  ) : (
                    '未付款'
                  )}
                </td>
                <td>
                  {order.paid_date
                    ? new Date(order.paid_date * 1000).toLocaleString()
                    : '未付款'}
                </td>
                <td>{order.message}</td>

                <td>
                  <button
                    type='button'
                    className='btn btn-primary btn-sm'
                    onClick={() => {
                      openOrderModal(order);
                    }}
                  >
                    查看
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm ms-2'
                    onClick={() => {
                      opneOrdeDeleteModal(order);
                    }}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getOrders} />
    </div>
  );
}

export default AdminOrders;