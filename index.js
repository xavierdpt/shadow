const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect('mongodb://mongo:27017/tgw', {useNewUrlParser:true})
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res)=>{
    Item.find()
    .then(items => res.render('index', {items}))
    .catch(() => res.status(404).json({msg:'No items found'}));
});

app.post('/item/add', (req, res)=>{
    const newItem = new Item({
        name:req.body.name
    });
    newItem.save().then(()=>{
        res.redirect('/');
    });
});

const port = 3000;

app.listen(port, ()=>console.log('Server running...'));
