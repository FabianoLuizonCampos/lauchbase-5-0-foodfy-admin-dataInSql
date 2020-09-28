const express = require("express")
const routes = express.Router()
const users = require("../src/app/controllers/users")
const recipes = require("../src/app/controllers/admins")
const chefs = require ("../src/app/controllers/chefs")

//First Route
routes.get("/", users.index)


// Users Route
routes.get("/about", users.about)
routes.get("/recipes", users.recipes)
routes.get("/findby", users.findby)
routes.get("/chefs", users.chefs)
routes.get("/recipe-detail/:id", users.recipe_details )


// Recipe Route

routes.get("/admin/recipes", recipes.index) // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

// Chef Route
routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/edit", chefs.edit);
routes.post("/admin/chefs", chefs.post);
routes.put("/admin/chefs", chefs.put);
routes.delete("/admin/chefs", chefs.delete);

module.exports = routes
