const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const app = express()
// edit here
mongoose.connect('mongodb+srv://<username>:<password>@cluster0-s8mpa.mongodb.net/omnistack?retryWrites=true&w=majority',{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
//middlewares
app.use(cors()) // liberar acesso a aplicacao, se nao passar parametro na funcao ele libera pra todos { origin: 'http://localhost:3000'}
app.use(express.json()) // dizendo para o express que sera utilizado json em todas as rotas
app.use(routes)


app.listen(5000)