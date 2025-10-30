const mongoose = require("mongoose");
const express = require("express");
const Router = express.Router();
const Student = require("./studentschema.js")
const connectDB = require('./db.js');

connectDB();

Router.get("/", (req, res) => {
  res.send("API Working ✅");
});

Router.post("/save", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.send("User Created Successfully ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while creating student");
  }
});

// ✅ Find all students (async/await)
Router.get("/findall", async (req, res) => {
  try {
    const data = await Student.find();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

Router.get("/findone", async (req, res) => {
  try {
    const data = await Student.findOne({ StudentId: { $gt: 100 }});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

Router.delete("/delete", async (req, res) => {
  try {
    const { StudentId } = req.query;

    if (!StudentId) {
      return res.status(400).send("StudentId is required");
    }

    const result = await Student.deleteOne({ StudentId });

    if (result.deletedCount === 0) {
      return res.status(404).send("Student not found");
    }

    res.send("Student deleted successfully ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting data");
  }
});

Router.put("/update/:StudentId", async (req, res) => {
  try {
    const { StudentId } = req.params;

    const updatedData = req.body;

    const result = await Student.findOneAndUpdate(
      { StudentId: StudentId }, 
      updatedData, 
      { new: true } // return updated doc
    );

    if (!result) {
      return res.status(404).send("Student not found");
    }

    res.send({
      message: "Student updated successfully ✅",
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating data");
  }
});


module.exports = Router;
