import axios from 'axios'
export const fetchLogin = async (values)=>{
    try {
        const { email, password } = values
       
        const {data} = await axios.post(`http://localhost:3000/api/auth/login`,{email, password}, {withCredentials: true})
     
        return data
    } catch (error) {
    
        console.log(`error ${error}`)
        return error
    }   
}

export const fetchRegister = async (values)=>{
    try{
        const {nombre, password, email, area } = values

        const {data} = await axios.post(`http://localhost:3000/api/auth/register`,{nombre, contrasena:password, email, area}, {withCredentials: true})
        return data
    }
    catch(error){
        console.log(`error ${error}`)
        return error
    }
}