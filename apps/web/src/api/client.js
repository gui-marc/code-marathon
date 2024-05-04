import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    
  },
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Request failed')
    console.log(error.message)

    return error
  },
)

export default client
