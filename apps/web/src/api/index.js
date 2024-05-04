import client from './client'

export async function login(istId) {
  const response = await client.post('/auth/login', { istId })
  return response.data
}

export async function register({ istId, name, email }) {
  const response = await client.post('/auth/register', { istId, name, email })
  client.defaults.headers.common['Authorization'] = `Bearer ${response.data.id}`
  return response.data
}
