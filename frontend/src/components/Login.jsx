import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {useAuthStore} from '../store/AuthStore.jsx'
import {useNavigate} from 'react-router-dom'
import '../style/login.css'
import logo from '../img/saly-11.png'


export const Login = () => {
  const {register, handleSubmit} = useForm()
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate()
  const [hoveredButton, setHoveredButton] = useState(null)
  return (
    <>
    <div className='container-login'>
      <div className='bg'></div>
      <div className='login-container-img'>
      <div className='login-img'>
        <img src={logo} alt="" />
      </div>
      </div>
      
      <div className="login-form">
      <p className="form-title">Bienvenidos</p>
      <div className='form-button'>
      <button
        className={`button-login ${hoveredButton === "register" ? "" : "active-button"}`}
        onMouseEnter={() => setHoveredButton("login")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        Login
      </button>
      <button
        className={`button-register ${hoveredButton === "register" ? "active-button" : ""}`}
        onMouseEnter={() => setHoveredButton("register")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={() => navigate("/register")}
      >
        Register
      </button>
      </div>
      <p className='form-subtitle'>Inicia sesión para acceder a la plataforma de creacion de cursos de mangus</p>
      <form action="POST" className='form' onSubmit={handleSubmit(async(values)=>{
      const {Authenticated, message} = await login(values)
      if(Authenticated){navigate('/home')}else{console.log(message)}
          
        })}>
      <div className="form-group">
    <label htmlFor="email" className="form-label">Email:</label>
    <input type="text" {...register('email',{required:true})} placeholder="Juan@company.com" name="email" className="form-input"/>
</div>
<div className="form-group">
    <label htmlFor="password" className="form-label">Password:</label>
    <input type="password" {...register('password',{required:true})} placeholder="*******" name="password" className="form-input"/>
</div>  


      <button className="button"  type='submit'> {loading ? "Loading..." : "Login"}</button>


       
        </form>
    </div>
    </div>
    </>
  )
}

