//Express module to create and set up the server
const express = require("express")
const server = express()

const ideas = [
    {
        img: "https://www.flaticon.com/svg/vstatic/svg/2737/2737110.svg?token=exp=1618229452~hmac=f68907138362c41a0bdddbb66e25beff",
        title: "Curso de Programacão",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni eum quod vel cupiditate,",
        url: "https://github.com"
    },
    {
        img: "https://www.flaticon.com/svg/vstatic/svg/2737/2737379.svg?token=exp=1618229396~hmac=1861680c0eb73b531b6b9d9f90535c96",
        title: "Videogame",
        category: "Diversao",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni eum quod vel cupiditate,",
        url: "https://github.com"
    },
    {
        img: "https://www.flaticon.com/svg/vstatic/svg/3081/3081474.svg?token=exp=1618229579~hmac=b68269aa6abe329a86944d0c51a4f795",
        title: "Meditacão",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni eum quod vel cupiditate,",
        url: "https://github.com"
    },
    {
        img: "https://www.flaticon.com/svg/vstatic/svg/2933/2933488.svg?token=exp=1618264584~hmac=cc6bb9ff85b317908a48b3a40c435c08",
        title: "Leitura",
        category: "Educação",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni eum quod vel cupiditate,",
        url: "https://github.com"
    },
]

//Set up static files (css, scripts, images)
server.use(express.static("public"))

//Set up nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //Applicable troughtout development 
})

//Router created | Client's request
server.get("/home", function(req, res) {
    const lastIdeas = []
    for (idea of ideas) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }
    return res.render("index.html", {ideas: lastIdeas})
})

server.get("/ideias", function(req, res) {
    return res.render("ideias.html", {ideas})
})

// Server started
server.listen(3000)