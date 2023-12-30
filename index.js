const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ramo0404",
  database: "crud_app",
});


app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get("/api/get", (req, res) => {
//     const sql  = "SELECT * FROM movie_reviews"
//     db.query(sql,  (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     })
// });

app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sql  = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)"
    db.query(sql,[movieName, movieReview],  (err, result) => {
        if (err) throw err;
        console.log(result);
    })
});

// app.delete("/api/delete/:movieName", (req, res) => {
//     const name = req.params.movieName;
//     const sql  = "DELETE FROM movie_reviews WHERE movieName=?"
//     db.query(sql, name,  (err, result) => {
//         if (err) console.log(err);;
//     })
// });

// app.put("/api/update", (req, res) => {
//     const name = req.body.movieName;
//     const review = req.body.movieReview;
//     const sql  = "UPDATE movie_reviews SET movieReview = ?  WHERE movieName=?"
//     db.query(sql, [review, name],  (err, result) => {
//         if (err) console.log(err);;
//     })
// });



// app.get("/", (req, res) => {
//   res.send("hello ramazan");
// });

app.listen(3001, () => {
  console.log("listening on 3001");
});
