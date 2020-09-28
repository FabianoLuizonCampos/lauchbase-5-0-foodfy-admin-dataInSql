const db = require("../../config/db")

module.exports = {
    all (callback) {
        const query = `
                       SELECT recipes.*, chefs.name as author 
                       FROM recipes 
                       LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                       ORDER BY title ASC
        ` 
   
        db.query (query, function (err, results) {
            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows)            
        })
    },
    find(id, callback) {

        const query = `SELECT recipes.*, chefs.name as author 
                       FROM recipes
                       LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                       WHERE recipes.id = $1
        `        
        
        db.query (query, [id], function (err, results) {

            if (err) throw `Database Error!!! - ${err}`

            callback( results.rows[0] )            
        })
    },
    allChefs (callback) {
        const query = `
                       SELECT chefs.*, chefs.name as author, count (recipes) AS totalRecipes 
                       FROM chefs
                       LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                       GROUP BY chefs.id
                       ORDER BY totalRecipes DESC
        ` 
   
        db.query (query, function (err, results) {
            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows)            
        })
    },
    paginate(params) {

        const { filter, limit, offset, callback } = params

        let query = "", 
            filterQuery = "", 
            totalQuery = `( SELECT count (*) FROM recipes ) AS total `

            

        if ( filter ) {

            filterQuery = `
                WHERE recipes.title ILIKE '%${filter}%' 
            `

            totalQuery = `( SELECT count (*) FROM recipes ${filterQuery} ) 
            AS total `
        }

        query = `
                    SELECT recipes.*, ${totalQuery}, chefs.name AS author
                    FROM recipes
                    LEFT JOIN chefs ON (recipes.chef_id = chefs.id) 
                    ${filterQuery}
                    LIMIT $1 OFFSET $2
        `


        db.query(query, [limit, offset], function (err, results) {

            if (err) throw `Database Error!!! - ${err}`

            
            callback(results.rows)
        })

    } 
}