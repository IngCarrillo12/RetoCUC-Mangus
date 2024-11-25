import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchLogin, fetchRegister } from "../api/AuthApi.jsx";

export const useAuthStore = create(
  
  persist(
    (set) => ({
      user: null,
      token:null,
      isAuthenticated: false, 
      loading: false,
      error: null,


      login: async (values) => {
        set({ loading: true, error: null }); 
        try {
          const data = await fetchLogin(values);
          if (data?.token) {
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              loading: false,
            });          
          }
          return { message: data.message, Authenticated: true };
        } catch (error) {
          // Manejo de errores con validación de la respuesta
          const message = error.response?.data?.message || "An error occurred";
          set({
            error: message,
            loading: false,
          });
          return { message: message, Authenticated: false }; // Usar el mensaje correcto
        }
      },
      

      Register: async (values) => {
        set({ loading: true, error: null });
        try {
            // Obtener los datos de registro
            const { user, token, message } = await fetchRegister(values);
    
            // Validar si el token es válido para el redireccionamiento
            if (token) {
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    loading: false,
                });
                // Si el token es válido, devolver el mensaje de éxito y registro exitoso
                return { message, Registered: true };
            } else {
                // Si no se obtiene un token válido, devolver un mensaje de error
                return { message: "No se pudo registrar al usuario. Intenta nuevamente.", Registered: false };
            }
        } catch (error) {
            // Manejar errores
            const errorMessage = error.response?.data?.message || "Ha ocurrido un error durante el registro.";
            set({
                error: errorMessage,
                loading: false,
            });
            return { message: errorMessage, Registered: false };
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

