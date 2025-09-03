import { create } from 'zustand';
const useStore = create((set) => ({
  isLoggedIn : false,
  userdata : null,
  setuserdata : (userinfo)=> set({isLoggedIn : true , userdata : userinfo}),
  cleardata : ()=>set({isLoggedIn : false , userdata : null})
}))

export default useStore;