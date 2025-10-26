//jshint esversion:6 : https://github.com/londonappbrewery/Build-Your-Own-RESTful-API

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://AshutoshBirje:nojd2wsTSPH7D4Ma@clusterone.lg23t.mongodb.net/WikiDB", {useNewUrlParser: true})

const articleSchema = {
    title: String,
    content: String
} 
const Article = mongoose.model("Article", articleSchema);

//TODO

app.get('/', (req,res)=>{
    res.send("Hello World")
});

app.route('/articles')
.get(async (req, res) => {
  try {
    const articles = await Article.find();
    if (articles.length > 0) {
      res.json(articles); // no need to manually stringify
    } else {
      res.send("No articles currently in wikiDB.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching articles.");
  }
})

.post( async (req, res) => {
  try {
    const { title, content } = req.body;
    const newArticle = await Article.create({ title, content });
    res.status(201).json(newArticle);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding article.");
  }
})

.delete(async (req, res) => {
  try {
    const result = await Article.deleteMany();
    res.status(200).json({
      message: "All articles deleted successfully.",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting articles.");
  }
});

app.route('/articles/:articleTitle')

  .get(async (req, res) => {
    try {
      const article = await Article.findOne({ title: req.params.articleTitle });

      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).send("No article found with that title.");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching article.");
    }
  })

  .put(async (req, res) => {
    try {
      const { title, content } = req.body;
      const updatedArticle = await Article.replaceOne(
        { title: req.params.articleTitle },
        { title, content }
      );

      if (updatedArticle.matchedCount > 0) {
        res.status(200).send("Article replaced successfully.");
      } else {
        res.status(404).send("No article found to replace.");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error replacing article.");
    }
  })

  .patch(async (req, res) => {
    try {
      const updatedArticle = await Article.updateOne(
        { title: req.params.articleTitle },
        { $set: req.body }
      );

      if (updatedArticle.matchedCount > 0) {
        res.status(200).send("Article updated successfully.");
      } else {
        res.status(404).send("No article found to update.");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating article.");
    }
  })

  .delete(async (req, res) => {
    try {
      const deletedArticle = await Article.deleteOne({ title: req.params.articleTitle });

      if (deletedArticle.deletedCount > 0) {
        res.status(200).send("Article deleted successfully.");
      } else {
        res.status(404).send("No article found to delete.");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting article.");
    }
  });

app.listen(4000, function() {
  console.log("Server started on port 4000");
});