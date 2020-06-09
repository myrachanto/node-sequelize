const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const exphbs = require('express-handlebars')
const Shop = require('./models').Shop
const Coffee = require('./models').Coffee
/*
    Shop.create({
        name: 'Java'
    }).then (shop => {
        shop.createCoffee({
            name: 'Chai',
            type: 'Dark'
        }).then(() => console.log('created successfully '))
    })
    Shop.findAll({
        include:[Coffee]
    }).then(shops => {
        console.log(shops)
    })*/
const app = express()
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const PORT = process.env.port || 5000

//Routes
app.get('/', (req, res) => {
    Shop.findAll({
        include: [Coffee]
    }).then(shops => {
         res.render('index', {shops: shops})
    })
})
app.post('/shop', (req, res) => {
    Shop.create(req.body)
    .then(()=> res.redirect('/'))
})
/*/Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).then(task => {
    // you can now access the newly created task via the variable task
  })*/
app.post('/coffee/:shopid', (req, res) => {
    let ShopId = req.params.shopid
    let name = req.body.name
    let flavour = req.body.flavour
    Coffee.create({name, flavour, ShopId})
    .then(() => res.redirect('/'))
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))