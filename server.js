//Express module to create and set up the server
const express = require("express")
const server = express()

const db = require("./db")

//Set up static files / Configurar arquivos estáticos (css, scripts, images)
server.use(express.static("public"))

//Set up use of req.body / Habilita o uso do req.body
server.use(express.urlencoded({extended: true}))

//Set up nunjucks / Configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //Applicable troughtout development 
})

//Router created | Client's request
server.get("/", function(req, res) {
    //Info: Req has a property callde Query that pulls the data from the URL 
    //req.query
    //Verify data in the table
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)
        const lastIdeas = []
        for (idea of rows) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
        return res.render("index.html", {ideas: lastIdeas})
    })
})

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows){
        const ideas = rows
        if (err) return console.log(err)
        return res.render("ideias.html", {ideas})
    })
})

//
server.post("/", function(req, res) {
    //Insert data in the table
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
    const values =  [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]
    db.run(query, values, function(err) {
        console.log(req.body)
    //Verify data in the table
        if (err) return console.log(err) 
        return res.redirect("/ideias")
    })
})
// Server started
server.listen(3000)