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
      setError: (error) => set({ error }),
  
      // Acción para establecer el estado de carga
      setLoading: (loading) => set({ loading }),

      login: async (values) => {
        set({ loading: true, error: null }); 
    
            const data = await fetchLogin(values); // Llamada a la API para login
    
            if (data?.token) {
                set({
                    user: data.user,
                    token: data.token,
                    isAuthenticated: true,
                    loading: false,
                });          
            } else {
              set({
                error: data.error,
                loading: false,
            });
            }

          },
    
      

      Register: async (values) => {
        set({ loading: true, error: null });

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
              set({
                error: data.error,
                loading: false,
            });
            }
 
            // Manejar errores
            const errorMessage = error.response?.data?.message || "Ha ocurrido un error durante el registro.";
            set({
                error: errorMessage,
                loading: false,
            });
            return { message: errorMessage, Registered: false };
     
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
            localStorage.removeItem('auth-storage');  
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

