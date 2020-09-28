const Chefs = require("../models/chefs_db")

module.exports = {

    index (req, res) {
        
        Chefs.all ( function (chefs) {

            return res.render("admin/chefs/index", { items: chefs } )

        })
    },
    create (req, res) {

        //return res.send("OK")
        return res.render("admin/chefs/create")
                
    },
    show (req,res) {

        //console.log("show")
        
        Chefs.find( req.params.id, function (chef) {

            console.log(chef)
            if (!chef) {
                return res.send("Chef não encontrada!!!")
            }
            else {

                Chefs.findRecipes( req.params.id, function (recipes) {
                    if (!recipes) {
                        return res.send("Receita não encontrada!!!")
                    }
                    else {
                       const totalReceitas = recipes.length
                       return res.render("admin/chefs/show", { chef, recipes, totalReceitas })
                    }            
                })
                
            }            
        })
    },
    edit (req,res) { 

        Chefs.find( req.params.id, function (chef) {

            if (!chef) {
                return res.send("Chefe não encontrada!!!")
            }
            else {
                return res.render("admin/chefs/edit", { chef } )                                
            }            
        })
        
    },
    post (req,res) { 

        const keys = Object.keys(req.body)

        for (const key of keys) {

            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos')            
            }        
        }

        Chefs.insert(req.body, function (chef) {

            Chefs.all ( function (chefs) {

                return res.render("admin/chefs/index", { items: chefs } )
    
            })
        })

    },
    put (req,res) { 

        const keys = Object.keys(req.body)

        console.log(req.body)
        
        for (const key of keys) {

            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos')            
            }        
        }

        Chefs.update( req.body, function () {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
        
        
    },
    delete (req,res) { 

        Chefs.findRecipes ( req.body.id, function (recipes) {

            console.log(recipes.length)
            if (recipes.length) {
                return res.send("Chef não pode ser deletado pois ainda existe receitas em seu nome!!!")
            }
            else {

                Chefs.delete( req.body.id, function (chef) {
            
                    Chefs.all ( function (chefs) {
        
                        return res.render("admin/chefs/index", { items: chefs } )
            
                    })
        
                })
            }
        })  
    }
}