import { create } from "zustand";
const useStore = create((set) => ({
  isLoggedIn: null,
  userdata: null,
  setuserdata: (userinfo) =>
    set((state) => ({
      isLoggedIn: userinfo === null ? false : true,
      userdata: {
        ...state.userdata,
        ...userinfo,
      },
    })),
  cleardata: () => set({ isLoggedIn: false, userdata: null }),
}));

export default useStore;
