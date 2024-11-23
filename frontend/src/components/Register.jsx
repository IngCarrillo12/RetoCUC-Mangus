import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import Logo from '../img/Saly-10.png'
import {useNavigate} from 'react-router-dom'
import '../style/register.css'
export const Register = () => {
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
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
        <form action="POST" className='form form-register' onSubmit={handleSubmit((values)=>{login(values)})}>
            <div className='form-group-register'>
            <div class="form-group">
      <label for="nombre" class="form-label">Nombre completo:</label>
      <input type="text" {...register('nombre',{required:true})} placeholder="Ej: John Deck" name="nombre" class="form-input"/>
  </div>
  <div class="form-group">
      <label for="email" class="form-label">Email:</label>
      <input type="text" {...register('email',{required:true})} placeholder="Ej: Juan@company.com" name="email" class="form-input"/>
  </div>
            </div>
            <div class="form-group">
      <label for="area" class="form-label">Area del docente:</label>
      <input type="text" {...register('area',{required:true})} placeholder="Ej: Ingeniero" name="area" class="form-input"/>
  </div>
  <div class="form-group">
      <label for="password" class="form-label">Password:</label>
      <input type="text" {...register('password',{required:true})} placeholder="*******" name="password" class="form-input"/>
  </div>
  <div className='container-button'>
  <button className="button" type='submit'>Register</button>
  </div>    
          </form>
      </div>
      </div>
      </>
    )
}
