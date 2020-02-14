import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:5000' // passar o ip da maquina que esta rodando o servidor do node
})

export default api