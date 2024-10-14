import { useState } from "react";
import axios from "axios";

function Login() {
  // 儲存資料
  const [data, setData] = useState({
    username: '',
    password:''
  });

  // 寫入資料
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value}); 
    //console.log(data);
  }

  // API-登入驗證
  const submit = async (e) => {
    const res = await axios.post(`/v2/admin/signin`, data);
    // console.kog(res)
    const { taken } = res.data;
    axios.defaults.headers.common['Authorization'] = taken;

    const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
    console.log(productRes)
  }

  return (<div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>登入帳號</h2>

        <div className="alert alert-danger" role="alert">
          錯誤訊息
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label w-100">
            Email
            <input id="email" className="form-control" name="username" type="email" placeholder="Email Address"
             onChange={handleChange}/>
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label w-100">
            密碼
            <input type="password" className="form-control"  name="password" id="password" placeholder="name@example.com" onChange={handleChange}/>
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={submit}>登入</button>
      </div>
    </div>
  </div>)
}

export default Login;