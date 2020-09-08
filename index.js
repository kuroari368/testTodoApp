const express = require('express')
const mongoose = require('mongoose')
const exphdb = require('express-handlebars')
const keys = require('./config/keys')
const todoRoutes = require('./routes/todos')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
const hbd = exphdb.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbd.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todoRoutes)

async function start(){
    try{
        await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {console.log('Server is running')})
    } 
    catch(e){
        console.log(e)
    }
}

start()



