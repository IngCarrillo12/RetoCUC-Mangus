import { create } from "zustand";
import { persist } from "zustand/middleware";
import {fetchLogin} from '../api/AuthApi.jsx'
import axios from "axios";
export const useAuthStore = create(
  
  persist(
    (set) => ({
      user: null,
      token:null,
      isAuthenticated: false, 
      loading: false,
      error: null,


      login: async (values) => {
        set({ loading: true, error: null}); 
        try {
          const data = await fetchLogin(values)
          if (data?.token) {
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              loading: false,
            });          
          }
          return  {message:data.message, Authenticated:true}
       
        } catch (error) {
          set({
            error: error.response?.data?.message || "An error occurred",
            loading: false,
          });
          return  {message:data.message, Authenticated:false}
        }
      },

      // Logout
      logout: async () => {
        set({ loading: true });
        try {
          set({
            user: null,
            token:null,
            isAuthenticated: false,
            loading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "An error occurred",
            loading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage", 
    }
  )
);

