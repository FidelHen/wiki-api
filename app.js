const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

//App config
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

//Database config
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

//RESTful
app.route("/articles")
.get("/articles", function(req, res){
    Article.find(function(err, foundArticles){
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
})
.post("/articles", function(req, res){
    const data = req.body;

    const newArticle = new Article({
        title: data.title,
        content: data.content
    });

    newArticle.save(function(err){
        if (!err) {
            res.send("Successfully added new article");
        } else {
            res.send(err);
        }
    });
})
.delete("/articles", function(req, res){
    Article.deleteMany(function(err){
        if (!err) {
            res.send("Sucessfully deleted all articles");
        } else {
            res.send(err);
        }
    });
});

//Server listener
app.listen(3000, function() {
    console.log("Server started on port 3000");
})