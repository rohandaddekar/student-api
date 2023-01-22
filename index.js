require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/studentModel");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/students-data", async (req, res) => {
  try {
    const data = await Student.find();

    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/update-student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateValue = req.body;

    const data = await Student.findOneAndUpdate({ _id: id }, updateValue, {
      new: true,
    });

    res.status(200).json({
      status: "OK",
      data,
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete-student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Student.deleteOne({ _id: id });

    res.status(200).json({
      status: "OK",
      message: "Student has been Deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
