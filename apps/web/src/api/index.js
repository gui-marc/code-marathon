import client from './client'

export async function login(istId) {
  const response = await client.post('/login', { istId })
  return response.data
}

export async function register({ istId, name, email }) {
  const response = await client.post('/register', { istId, name, email })
  return response.data
}
