import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Logo from '../img/Saly-10.png'
import { useNavigate } from 'react-router-dom'
import '../style/register.css'
import { useAuthStore } from '../store/AuthStore.jsx'

export const Register = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const { Register, error, loading } = useAuthStore()
    
    const [hoveredButton, setHoveredButton] = useState(null)
    return (
      <>
      <div className='container-register'>
        <div className='bg bg-register'></div>
        <div className='register-container-img'>
          <div className='register-img'>
            <img src={Logo} alt="" />
          </div>
        </div>
        <div className="register-form">
          <p className="form-title">Bienvenidos</p>
          <div className='form-button'>
            <button
              className={`button-login ${hoveredButton === "login" ? "active-button" : ""}`}
              onMouseEnter={() => setHoveredButton("login")}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className={`button-register ${hoveredButton === "login" ? "" : "active-button"}`}
              onMouseEnter={() => setHoveredButton("register")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Register
            </button>
          </div>
          <p className='form-subtitle'>Registrate para acceder a la plataforma de creacion de cursos de mangus</p>
          <form 
            action="POST" 
            className='form form-register' 
            onSubmit={handleSubmit(async (values) => {
              const { Registered, message } = await Register(values); // Llamar a la función Register
              
              if (Registered) {
                navigate('/home'); // Redirigir si el registro es exitoso
              } else {
                console.log(message); // Mostrar mensaje de error
              }
            })}
          >
            <div className='form-group-register'>
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">Nombre completo:</label>
                <input type="text" {...register('nombre',{required:true})} placeholder="Ej: John Deck" name="nombre" className="form-input"/>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="text" {...register('email',{required:true})} placeholder="Ej: Juan@company.com" name="email" className="form-input"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="area" className="form-label">Area del docente:</label>
              <input type="text" {...register('area',{required:true})} placeholder="Ej: Ingeniero" name="area" className="form-input"/>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input type="password" {...register('password',{required:true})} placeholder="*******" name="password" className="form-input"/>
            </div>
            <div className='container-button'>

              <button className="button" type='submit'>
                {loading ? "Loading..." : "Register"}
              </button>
              
            </div>    
          </form>
        </div>
      </div>
      </>
    )
}
