const User = require("../models/users_db")

module.exports = {
    index (req, res) {

        console.log("index")
        User.all ( function (recipes) {

            return res.render("user/index", { items: recipes} )
        })
    },
    about (req, res) {
        return res.render("user/about")
    },
    recipes (req, res) {

        User.all ( function (recipes) {

            return res.render("user/recipes", { items: recipes} )
        })
    },    
    chefs (req, res) {

        User.allChefs ( function (chefs) {

            //console.log(chefs)
            return res.render("user/chefs", { items : chefs } )
        })
    },
    recipe_details (req, res) { //show

        User.find( req.params.id, function (recipe) {
            if (!recipe) {
                return res.send("Receita não encontrada!!!")
            }
            else {

                //recipe.ingredients =  recipe.ingredients.split(',')

                //console.log(recipe.preparations)
                
                return res.render("user/recipe-detail", { item : recipe } )
            }
            
        })
    },    
    findby (req,res) { 
        
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2

        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit, 
            offset,
            callback(recipes) { 

                if (recipes.length > 0) {
                    const pagination = {
                        total: Math.ceil(recipes[0].total / limit),
                        page
                    }    
                    return res.render("user/findby", { items: recipes,  filter, pagination } )
                }
                else {
                    return res.render("user/findby", { items: recipes,  filter, } )
                }  
                
                //console.log(recipes)
               
            }
        }

        User.paginate(params)
    }

}