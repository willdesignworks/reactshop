import { useSelector } from "react-redux"; // Redux Toolkit

function MessageToast() {
  const messages = useSelector((state) => state.message); // Redux Toolkit
  //console.log('Redux傳遞:', messages);

  return (
    <>
    <div
      className='toast-container position-fixed'
      style={{ top: '50px', right: '15px', zIndex: '999999'}}
    >
      {
        messages?.map((msg) => { // 可選串聯
          return (
            <div
            key={msg.id}
            className='toast show'
            role='alert'
            aria-live='assertive'
            aria-atomic='true'
            data-delay='3000'
            >
              <div className={`toast-header text-white bg-${msg.type}`}>
                <strong className='me-auto'>{msg.title}</strong>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='toast'
                  aria-label='Close'
                />
              </div>
              <div className='toast-body'>{msg.text}</div>
            </div>
          )
        })
      }
    </div>
    </>
  );
};

export default MessageToast;