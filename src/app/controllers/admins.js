const Admin = require("../models/admins_db")

module.exports = {
    index (req,res) {

        Admin.all ( function (recipes) {

            return res.render("admin/recipes/index", { items: recipes } )
        })
    },
    create (req,res) {

        Admin.chefsSelectOptions(function (options) {
            return res.render("admin/recipes/create", { chefOptions : options} )
        })        
    },
    show (req,res) {

        Admin.find( req.params.id, function (recipe) {
            if (!recipe) {
                return res.send("Receita não encontrada!!!")
            }
            else {

                return res.render("admin/recipes/recipe-detail", { item: recipe })
            }            
        })
    },
    edit (req,res) {

        Admin.find( req.params.id, function (recipe) {
            if (!recipe) {
                return res.send("Receita não encontrada!!!")
            }
            else {

                Admin.chefsSelectOptions(function (options) {
                    return res.render("admin/recipes/edit", { item: recipe , chefOptions : options })
                })                  
            }            
        })
    },
    post (req,res) {

        const keys = Object.keys(req.body)

        console.log(keys)

        for (const key of keys) {

            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos')            
            }        
        }

        Admin.insert(req.body, function (recipe) {
            return res.redirect("/admin/recipes") 
        })
        
    },
    put (req,res) {
        const keys = Object.keys(req.body)
        
        for (const key of keys) {

            if (req.body[key] == "") {
                return res.send('Por favor, preencha todos os campos')            
            }        
        }

        Admin.update( req.body, function () {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete (req,res) {
        Admin.delete( req.body.id, function (recipes) {
            
            Admin.all ( function (recipes) {

                return res.render("admin/recipes/index", { items: recipes } )
            })

        })
    }
}