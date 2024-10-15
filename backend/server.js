const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Todo = require('./models/todoModel')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server started. Listening on port " + process.env.PORT)
        })
    })
    .catch((e) => {
        console.log(e)
    })

const db = mongoose.connection

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    const getTodos = async () => {
        const todos = await Todo.find({})
        res.status(200).json(todos)
    }
    getTodos()
})

app.post('/', async (req, res) => {
    const { title, description, complete } = req.body
    try{
        const todo = await Todo.create({ title, description, complete })
        res.status(200).json(todo)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})