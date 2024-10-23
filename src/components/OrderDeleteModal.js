function OrderDeleteModal({ closeOrdeDeleteModal, text, handleDelete, id, user, useremail, usertotal, usermessage })  {
  return (
    <div
      className='modal fade'
      tabIndex='-1'
      id='orderdeleteModal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header bg-danger'>
            <h1 className='modal-title text-white fs-5' id='exampleModalLabel'>
              刪除訂單
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close' 
              onClick={closeOrdeDeleteModal}
            />
          </div>
          <div className='modal-body'>
            <p>訂單編號: {text}</p>
            <p>購買用戶: {user}</p>
            <p>購買信箱: {useremail}</p>
            <p>訂單金額: ${usertotal}</p>
            <p>留言訊息: {usermessage}</p>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={closeOrdeDeleteModal}>
              取消
            </button>
            <button type='button' className='btn btn-danger' 
            onClick={() => handleDelete(id)}>
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default OrderDeleteModal;