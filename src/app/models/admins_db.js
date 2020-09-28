const { age, date } = require('../../lib/utils')

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
    insert (data, callback) {

        const query = `
            INSERT INTO recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparations,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)   
            RETURNING id     
        `

        const values = [
            data.author,
            data.image,
            data.title,
            data.ingredients,
            data.preparations,
            data.information,            
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
            UPDATE recipes SET 
                chef_id = ($1),
                image = ($2),
                title = ($3), 
                ingredients = ($4),
                preparations = ($5),
                information = ($6)
            WHERE id = $7
        `
        const values = [
            data.author,
            data.image,
            data.title,
            data.ingredients,
            data.preparations,
            data.information,
            data.id
        ]

        //console.log(data.id)

        db.query(query, values, function (err, results) {
       
            if (err) {
                console.log(err)
                throw `Database Error  ${err}`
            } 

            callback()
        })

    } , 
    chefsSelectOptions(callback) {

        const query = `
                        SELECT name, id 
                        FROM chefs
                      `        

        db.query (query, function (err, results) {
            if (err) throw `Database Error!!! - ${err}`

            //console.log(results.rows)
            callback(results.rows)            
        })
    },  
    delete(id, callback) {

        const query = `DELETE
                       FROM recipes 
                       WHERE id = $1`        

        db.query (query, [id], function (err, results) {
            if (err) throw `Database Error!!! - ${err}`

            callback(results.rows[0])            
        })
    }
}