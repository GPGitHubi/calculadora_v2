const express = require("express")
const app = express()
const { MongoClient } = require("mongodb-legacy")
const ObjectId = require("mongodb-legacy").ObjectId
const url = "mongodb+srv://projetodb:projetodb@cluster0.i14o7mp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const dbClient = new MongoClient(url)
//cria o banco de dados com o nome dpessoas
const db = dbClient.db("d-pessoais");
//cria uma collection com o nome crud
const collection = db.collection('crud') 

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.get('/index', (req, res) => {
    res.render('index.ejs')
})

app.listen(3000, function(){
    console.log("o nosso servidor esta rodando na porta 3000")
})

app.get("/ver", (req, res) => {
    res.send("olá gente")
})

app.get('/', (req, res) => {
    let cursor = db.collection('crud').find()
})

app.post('/show', (req, res) => {
    collection.insertOne(req.body, (err, result) => {
        if(err) return console.log(err)
        console.log("salvou com sucesso")
        res.redirect("/show")
        collection.find().toArray((err, result) => {
            console.log(result)
        })
    })
})

app.get('/show', (req, res) => {
    collection.find().toArray((err, results) => {
        if(err) return console.log(err)
        res.render('show.ejs', {crud: results})
    })
})

app.route('/edit/:id')
.get((req, res)=>{
    var id = req.params.id

    db.collection('crud')
    .find(ObjectId(id))
    .toArray((err, result)=>{
        if(err) return res.send(err)
        res.render('edit.ejs', {crud: result})
    })
})

.post((req, res)=>{
    var id = req.params.id
    var name = req.body.name 
    var surname = req.body.surname

    db.collection('crud')
    .updateOne({_id: ObejectId(id)}, {
        $set:{
            name: name,
            surname: surname
        }
        }, (err, result)=> {
            if(err) return res.send(err)
            res.redirect('/show')
            console.log('db atualizado')
        })
    })
    