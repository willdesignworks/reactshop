import { useContext } from "react";
import { MessageContext } from "../store/messageStore";

function Message() {
  //const [message, dispatch] = useContext(MessageContext); // Reducer 跨元件傳遞
  const [message] = useContext(MessageContext); // Reducer 跨元件傳遞

  return (
    <>
    {/*<button type="button" onClick={() => {
      dispatch({
        type: 'POST_MESSAGE', //messageStore.js (跨元件傳遞)
      });
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_MESSAGE',
        });
      }, 3000);
    }}>
      測試訊息
    </button>*/}
    <div
      className='toast-container position-fixed'
      style={{ top: '50px', right: '15px', zIndex: '9999'}}
    >
      {message.title && (
        <div
        className='toast show'
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
        data-delay='3000'
        >
          <div className={`toast-header text-white bg-${message.type}`}>
            <strong className='me-auto'>{message.title}</strong>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='toast'
              aria-label='Close'
            />
          </div>
          <div className='toast-body'>{message.text}</div>
        </div>
      )}

    </div>
    </>
  );
};

export default Message;