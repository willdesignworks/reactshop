import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MessageContext, handleSuccessMessage, handleErrorMessage } from "../store/messageStore";

function ProductModal({ closeProductModal, getProducts, type, temProduct}) {
  // 資料狀態
  const [tempData, setTempData] = useState({
    "title": "",
    "category": "",
    "origin_price": 100,
    "price": 300,
    "unit": "",
    "description": "",
    "content": "",
    "is_enabled": 1,
    "imageUrl": "",
    "imagesUrl": ["", "", "", "", ""]
  });

  const [, dispatch] = useContext(MessageContext); // Reducer messageStore.js (跨元件傳遞)

  // Modal用途
  useEffect(() => {
    if (type === 'create') {
      setTempData({
        "title": "",
        "category": "",
        "origin_price": 100,
        "price": 300,
        "unit": "",
        "description": "",
        "content": "",
        "is_enabled": 1,
        "imageUrl": "",
        "imagesUrl": ["", "", "", "", ""]
      });
    } else if (type === 'edit') {
      setTempData({
        ...temProduct,
        // 確保 imagesUrl 為 undefined，設置預設值為空陣列
        imagesUrl: Array.isArray(temProduct.imagesUrl) ? temProduct.imagesUrl : ["", "", "", "", ""]
      });
    }
  }, [type, temProduct])

  // 資料寫入
  const handleChange = (e, index = null) => {

    const { value, name } = e.target;

    // 更新 imagesUrl 陣列中的指定索引
    if (name === 'imagesUrl') {
      setTempData(prevData => {
        const newImagesUrl = [...prevData.imagesUrl]; // 先複製陣列
        newImagesUrl[index] = value; // 更新指定索引的值
        return {
          ...prevData,
          imagesUrl: newImagesUrl, // 更新 imagesUrl
        };
      });

    } else if (['price', 'origin_price'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value), // 數字型別
      });
    } else if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: +e.target.checked, // boolean
      });
    } else {
      setTempData({
        ...tempData,
        [name]: value,
      });
    }
  };

  // API-寫入資料
  const submit = async () => {
    try {

      // API-新增 (預設)
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = 'post'

      // API-編輯
      if (type === 'edit') {
        api =  `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${temProduct.id}`;
        method = 'put' 
      };

      const res = await axios[method](
        api, {
          data: tempData,
        }

      );
      console.log(res); // API-取得資料

      handleSuccessMessage(dispatch, res); // 成功Reducer messageStore.js (跨元件傳遞)
      closeProductModal(); // 關閉Modal
      getProducts(); // API-取得資料

    } catch(error) {
      console.log(error);
      handleErrorMessage(dispatch, error); // 失敗Reducer messageStore.js (跨元件傳遞)
    }

  }
  return (
    <div
      id="productModal"
      className='modal fade'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              {type === 'create' ? '建立新商品' : `編輯 ${tempData.title}`}
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close' 
              onClick={closeProductModal}
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入主圖片網址
                    <input
                      type='text'
                      name='imageUrl'
                      id='imageUrl'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={handleChange} 
                      value={tempData.imageUrl}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片1網址
                    <input
                      type='text'
                      name='imagesUrl'
                      id='image0'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={(e) => handleChange(e, 0)} // 使用新函數
                      value={tempData.imagesUrl[0]} // 讀取第一個圖片網址
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片2網址
                    <input
                      type='text'
                      name='imagesUrl'
                      id='image1'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={(e) => handleChange(e, 1)} // 使用新函數
                      value={tempData.imagesUrl[1]} // 讀取第二個圖片網址
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片3網址
                    <input
                      type='text'
                      name='imagesUrl'
                      id='image3'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={(e) => handleChange(e, 2)}
                      value={tempData.imagesUrl[2]}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片4網址
                    <input
                      type='text'
                      name='imagesUrl'
                      id='image4'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={(e) => handleChange(e, 3)}
                      value={tempData.imagesUrl[3]}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片5網址
                    <input
                      type='text'
                      name='imagesUrl'
                      id='image5'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={(e) => handleChange(e, 4)}
                      value={tempData.imagesUrl[4]}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='customFile'>
                    或 上傳圖片
                    <input
                      type='file'
                      id='customFile'
                      className='form-control'
                    />
                  </label>
                </div>
                <img src="" alt='' className='img-fluid' />
              </div>
              <div className='col-sm-8'>
                {/*<pre>{ JSON.stringify(tempData) }</pre>*/}
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='title'>
                    標題
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入標題'
                      className='form-control' 
                      onChange={handleChange} 
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='category'>
                      分類
                      <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='請輸入分類'
                        className='form-control' 
                        onChange={handleChange} 
                        value={tempData.category}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='unit'>
                      單位
                      <input
                        type='unit'
                        id='unit'
                        name='unit'
                        placeholder='請輸入單位'
                        className='form-control' 
                        onChange={handleChange} 
                        value={tempData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='origin_price'>
                      原價
                      <input
                        type='number'
                        id='origin_price'
                        name='origin_price'
                        placeholder='請輸入原價'
                        className='form-control' 
                        onChange={handleChange} 
                        value={tempData.origin_price}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='price'>
                      售價
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='請輸入售價'
                        className='form-control' 
                        onChange={handleChange} 
                        value={tempData.price}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='description'>
                    產品描述
                    <textarea
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入產品描述'
                      className='form-control' 
                      onChange={handleChange} 
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='content'>
                    說明內容
                    <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
                      className='form-control' 
                      onChange={handleChange} 
                      value={tempData.content}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_enabled'
                    >
                      是否啟用
                      <input
                        type='checkbox'
                        id='is_enabled'
                        name='is_enabled'
                        placeholder='請輸入產品說明內容'
                        className='form-check-input' 
                        onChange={handleChange} 
                        checked={Boolean(tempData.is_enabled)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={closeProductModal}>
              關閉
            </button>
            <button type='button' className='btn btn-primary' onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;