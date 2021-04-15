const { query } = require('express')

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {
    //Create table
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)
    // const query = `
    // INSERT INTO ideas(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?);
    // `
    // const values = [
    //     "https://www.flaticon.com/svg/vstatic/svg/2737/2737110.svg?token=exp=1618229452~hmac=f68907138362c41a0bdddbb66e25beff",
    //     "Curso de Programacão",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni eum quod vel cupiditate,",
    //     "https://github.com"
    // ]
    // db.run(query, values, function(err) {
    //     if (err) return console.log(err)
    //     console.log(this)
    // })
})

module.exports = db