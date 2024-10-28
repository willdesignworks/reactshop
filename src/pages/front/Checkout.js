import axios from 'axios';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import RelatedProducts from "../../components/RelatedProducts";

 // react-hook-form
import { useForm } from 'react-hook-form';
import { Input } from '../../components/FormElements';
import { Textarea } from '../../components/FormElements';

function Checkout () {
  const { cartData } = useOutletContext(); // 取得 購物車資料
  const {getCart} = useOutletContext(); // 重啟購物車 數量歸 0

  const navigate = useNavigate(); // 付款完成 轉址到 Success.js

  // react-hook-form
  const {
    register, // 資料狀態 取出資料傳給data
    handleSubmit, // 表單送出管理方法
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  // 送出訂單 方法
  const onSubmit = async (data) => {
    const { name, email, tel, address, message } = data; // 解構取出資料
    //console.log(name, email, tel, address, message);
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
        message,
      },
    };
    const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/order`, form,);
    console.log('送出訂單', res);
    getCart(); // 重啟購物車 數量歸 0
    navigate(`/success/${res.data.orderId}`); // 付款完成 轉址到 Success.js
  };

  return (
    <>
    <div className="ht__bradcaump__area">
            <div className="ht__bradcaump__wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bradcaump__inner text-center">
                                <h2 className="bradcaump-title">訂單資料</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <section className="our-checkout-area ptb--120 bg__white">
    <div className='container'>
    { cartData?.carts?.length === 0 ? ( 
      <>
        <div className='row'>
                          <div className="col-md-10 col-sm-12 col-12 no-list">  
                            <div className="cartempty">
                              <h5 className="mt-2 text-center">購物清單為空</h5>
                            </div>
                            <Link to="/products" className="btn btn-dark btn-block w-50 mt-4 rounded-0 py-3">
                            繼續購物
                            </Link>
                            <h2 className="mt-5">你可能會喜歡的商品</h2>
                            <RelatedProducts />
                          </div>
        </div>                
      </>
    ) : (
    <>
      <div className='row flex-row-reverse justify-content-center pb-5'>
        <div className='col-md-4'>
          <div className='border p-4 mb-4'>
            <p>選購商品</p>
            {cartData?.carts?.map((item) => {
              return (
                <div className='d-flex mb-4' key={item.id}>
                  <img src={item.product.imageUrl} alt='' className='me-2' style={{width: '48px', height: '48px', objectFit: 'cover',}} />
                  <div className='w-100'>
                    <div className='d-flex justify-content-between'>
                      <p className='mb-0 fw-bold'>{item.product.title}</p>
                      <p className='mb-0'>NT${item.product.price}</p>
                    </div>
                    <p className='mb-0 fw-bold'>數量:{item.qty}</p>
                  </div>
                </div>
              )
            })}
            <table className='table mt-4 border-top border-bottom text-muted'>
              <tbody>
                <tr>
                  <th scope='row' className='border-0 px-0 pt-4 font-weight-normal'>小計</th>
                  <td className='text-end border-0 px-0 pt-4'>NT${cartData.final_total}</td>
                </tr>
                <tr>
                  <th scope='row' className='border-0 px-0 pt-0 pb-4 font-weight-normal'>運費</th>
                  <td className='text-end border-0 px-0 pt-0 pb-4'>NT$0</td>
                </tr>
              </tbody>
            </table>
            <div className='d-flex justify-content-between mt-4'>
              <p className='mb-0 h4 fw-bold'>總金額</p>
              <p className='mb-0 h4 fw-bold'>NT${cartData.final_total}</p>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>客戶資料</p>
            <div className='mb-4'>
              <Input 
                  id='email' 
                  type='email' 
                  errors={errors}
                  labelText='Email'
                  register={register}
                  className='form-control' 
                  rules={{
                    required: 'Email 為必填',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Email 格式不正確',
                    },
                  }}
                ></Input>
            </div>
            <div className='mb-4'>
              <Input 
                id='name'
                type='text' 
                errors={errors}
                labelText='收件者名稱'
                register={register}
                className='form-control' 
                rules={{
                  required: '收件者名稱 為必填',
                  maxLength: {
                    value: 10,
                    message: '收件者名稱 長度不超過 10',
                  },
                }}
              ></Input>
            </div>
            <div className='mb-4'>
              <Input 
                  id='tel' 
                  type='tel' 
                  errors={errors}
                  labelText='連絡電話'
                  register={register}
                  className='form-control' 
                  rules={{
                    required: '連絡電話 為必填',
                    minLength: {
                      value: 6,
                      message: '連絡電話 不少於 6 碼',
                    },
                    maxLength: {
                      value: 12,
                      message: '連絡電話 不超過 12 碼',
                    },
                  }}
                ></Input>
            </div>
            <div className='mb-4'>
            <Input 
                  id='address' 
                  type='address' 
                  errors={errors}
                  labelText='收件地址'
                  register={register}
                  className='form-control' 
                  rules={{
                      required: '收件地址 為必填',
                  }}
                ></Input>
            </div>
            <div className='mb-2'>
                <Textarea 
                  id='message' 
                  type='text' 
                  labelText='留言訊息'
                  register={register}
                  className='form-control' 
                  rows='3'
                ></Textarea>
            </div>
            <div className='d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100'>
            <Link to='/products' className='text-dark mt-md-0 mt-3'>
              <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m15 19-7-7 7-7'/>
              </svg> 繼續購物
            </Link>
            <button type='submit' className='btn btn-dark py-3 px-7'>填寫完成</button>
          </div>
          </form>
        </div>
      </div>
    </>
    )}
    </div>
    </section>
    </>
  );
};

export default Checkout;