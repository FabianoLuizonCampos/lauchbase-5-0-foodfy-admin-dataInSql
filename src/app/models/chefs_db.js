const { date } = require('../../lib/utils')
const db = require("../../config/db")

module.exports = {
    all (callback) {
        
        const query = `
                       SELECT chefs.*, chefs.name as author 
                       FROM chefs 
                       ORDER BY name ASC
        ` 
   
        db.query (query, function (err, results) {
            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows)            
        })
    },
    find(id, callback) {
        
       const query = `SELECT chefs.* 
                      FROM chefs
                      WHERE chefs.id = $1
        `        
        
        db.query (query, [id], function (err, results) {

            if (err) throw `Database Error!!! - ${err}`

            callback( results.rows[0] )            
        })
    },
    findRecipes(id, callback) {

        const query = `SELECT recipes.*
                       FROM recipes
                       WHERE recipes.chef_id = $1
        `        
         
         db.query (query, [id], function (err, results) {
 
             if (err) throw `Database Error!!! - ${err}`
            
             //console.log(results.rows)
             callback( results.rows )            
         })
    },
    insert(data, callback) {
        
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)   
            RETURNING id     
        `

        const values = [
            data.name,
            data.avatar_url,          
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results) {
       
            if (err) 
                throw `Database Error!!! - ${err}`

            callback( results.rows[0] )
        })
    },
    update (data, callback) {

        const query = `
            UPDATE chefs SET 
                name = ($1),
                avatar_url = ($2)
            WHERE id = $3
        `
        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        console.log(data.id)

        db.query(query, values, function (err, results) {
       
            if (err) {
                console.log(err)
                throw `Database Error  ${err}`
            } 

            callback()
        })

    },
    delete(id, callback) {

        const query = `DELETE
                       FROM chefs 
                       WHERE id = $1`        

        db.query (query, [id], function (err, results) {
            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows[0])            
        })
    }   
}

