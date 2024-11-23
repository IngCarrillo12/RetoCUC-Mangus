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