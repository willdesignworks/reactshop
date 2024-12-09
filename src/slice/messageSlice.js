import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // Redux Toolkit, createAsyncThunk非同步方法

export const messageSlice = createSlice({
  name: 'message',
  initialState: [

  ],
  reducers: {  //狀態管理器 action
    createMessage(state, action) { // createTodo(方法) state(當前Slice的狀態), action(傳入方法相關參數)

      console.log('createMessage action傳遞:',action);
      console.log('createMessage payload傳遞:',action.payload);

      if (action.payload.success) {
        state.push({
          id: action.payload.id,
          type: 'success', // 狀態
          title: '成功', // 標題
          text: action.payload.message, // 文字訊息
        });
      } else {
        state.push({
          id: action.payload.id,
          type: 'danger',
          title: '錯誤',
          text: Array.isArray(action.payload?.message) // isArray判斷陣列格式
            ? action.payload?.message.join('、')
            : action.payload?.message,
        });
      }

    /*setTimeout(() => {
        // state 沒有辦法在 非同步的狀態下存取
        const index = state.findIndex(item => item === id);
        state.splice(index, 1);
      }, 2000); */

    },
    removeMessage(state, action) {
      console.log('removeMessage:', action.payload);
      const index = state.findIndex(item => item === action.payload);
      state.splice(index, 1);
    }
  }
});

// 這裡建立的方法, 可以被其他元件使用
// createAsyncThunk 執行, 非同步方法
// 自訂意名稱, sync function
export const createAsyncMessage = createAsyncThunk(
  'message/createAsyncMessag', // 1.自訂意名稱
  async function (payload, { dispatch, requestId }) {  // 2.async function
    //(payload, params)
      //console.log('createAsyncMessag', payload, params);
      dispatch(messageSlice.actions.createMessage({
        ...payload,
        id: requestId,
      }),
    );

    setTimeout(() => { // 3秒後移除, 非同步方法
      dispatch(messageSlice.actions.removeMessage(requestId))
    }, 3000)
  }
);

export const { createMessage } = messageSlice.actions; // 狀態管理器 匯出-action

export default messageSlice.reducer;  // 匯出-reducer
