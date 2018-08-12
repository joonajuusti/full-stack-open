import axios from 'axios'
const API_URL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(API_URL)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(API_URL, newPerson)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const request = axios.delete(`${API_URL}/${id}`)
  return request.then(response => response.data)
}

const update = (id, newPerson) => {
  const request = axios.put(`${API_URL}/${id}`, newPerson)
  return request.then(response => response.data)
}

export default { getAll, create, deletePerson, update }