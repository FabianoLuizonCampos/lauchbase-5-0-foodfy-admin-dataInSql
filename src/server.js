// Frameworks
const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")

// method-override
const methodOverride = require("method-override")

// Backend Server
const server = express()

// Middleware Config
server.use(express.urlencoded({ extended: true }))  // Utilizado para receber requisições tipo body
server.use(methodOverride('_method'))  // Deve-se colocar antes da rota para poder sobrescrever

server.use(express.static('public'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express:server,
    autoescape: false, 
    noCache: true
})


// Page Not-Found!!!!

server.use(function(req, res) {
    res.status(404).render("user/not-found");
  });

// Server Execution
server.listen(5000, function () {
    console.log("server is running")    
})  
