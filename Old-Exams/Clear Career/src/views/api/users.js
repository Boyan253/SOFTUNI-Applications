import { clearUserData, setUserData } from "../util.js";
import { get,post } from "./api.js";



export async function login(email, password) {

   const res = await post('/users/login', { email, password })

   const userData = {
      id: res._id,
      email: res.email,
      accessToken: res.accessToken
   }
   setUserData(userData)

   return res

}
export async function register(email, password) {
   const res = await post('/users/register', { email, password })
   const userData = {
      id: res._id,
      email: res.email,
      accessToken: res.accessToken
   }
   setUserData(userData)
   return res
}
export function logout() {
   get('/users/logout');
   clearUserData()


}