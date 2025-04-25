const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port =process.env.PORT || 3000

//define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath=path.join(__dirname,'../templatesfld/views')
const partialsPath=path.join(__dirname,'../templatesfld/partials')

//setup handlebars engine and views path
app.set('view engine','hbs')
app.set('views',viewspath) //by default it look at views directory
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=> {
    res.render('index',{
        title:'Analytics App',
        name:'Harsh Garg'
    })
})

app.get('/about',(req,res)=> {
    res.render('About',{
        title:'About Me',
        name:'Harsh Garg'
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title:'Help',
        name:'Harsh Garg',
        helpText:'this is helpful Text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You Must Provide an address'
            })
    }

    geocode(req.query.address, (error, {add}={}) => {
        if (error) {
            return res.send({error})
        }

        forecast(add, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                currentweather: forecastData,
                address:req.query.address
                })
        })
    })
    
    // res.send({
    // forecast: 'It is snowing',
    // location: 'Philadelphia',
    // address:req.query.address
    // })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error:'You Must Provide a Search term'
            })
    }

    console.log(req.query.search)
    res.send({
    products:[]
    })
})

app.get('/help/{*any}',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Harsh Garg',
        errorMessage:'Help Article Not Found'
    })
})

app.get('/{*any}',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'Harsh Garg',
        errorMessage:'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})