import axios from "axios";

const userRequest = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}/users`
})

// Add a response interceptor
userRequest.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error.response.data.message)
  return Promise.reject(error);
});

// 註冊
export const apiUserSignUp = (data) => userRequest.post('/sign_up', data);

// 登入
export const apiUserSignIn = (data) => userRequest.post('/sign_in', data);

// check token validation
export const apiUserCheckout = () => userRequest.get('/checkout');

// 登出
export const apiUserSignOut = (data) => userRequest.post('/sign_out', data);
