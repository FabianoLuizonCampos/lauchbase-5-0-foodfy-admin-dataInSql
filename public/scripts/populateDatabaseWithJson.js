// THIS PROCEDURE IS JUST FOR TEST
const data = require ("../../src/database/data.json")

const db = require ("../../config/db")

function populateDB () {

    console.log("ok")

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
    })
} 


document
    .querySelector(".populateDb")
    .addEventListener("click", populateDB(data));
