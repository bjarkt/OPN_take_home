const express = require("express")
const mysql = require("mysql")
const bodyParser = require('body-parser');
const cors = require("cors")

const pool  = mysql.createPool({
  connectionLimit: 10,
  host: "db",
  user: "root",
  password: "password",
  database: "people"
});
const port = process.env.PORT || 3000

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const getPeople = (callback) => {
  pool.query("SELECT * FROM people", (error, results, fields) => {
    callback(error, results)
  });
}

const insertPerson = (firstName, lastName, callback) => {
  pool.query("INSERT INTO people (PersonID, Firstname, Lastname) VALUES (DEFAULT, ?, ?)", [firstName, lastName], (error, results) => {
    callback(error, results)
  });
}

app.post("/insertPerson", (req, res) => {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  if (firstname && lastname) {
    insertPerson(firstname, lastname, (error, dbResult) => {
      if (error) { console.error(error) }
      if (dbResult) {
        res.json({ insertId: dbResult.insertId })
      } else {
        res.json({message: "something bad happened"})
      }
    })
  } else {
    res.json({message: "firstname and lastname not supplied"})
  }
})

app.get("/getPersons", (req, res) => {
  getPeople((error, people) => {
      if (error) { console.error(error) }
      res.json(people)
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
