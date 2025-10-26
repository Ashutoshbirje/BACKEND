import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static('dist'));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/Tags", (req, res) => {
  const tags = [
    {
      id: 1,
      title: "Virat Kholi",
      content: "1% chance is enough to get 99% rewards",
    },
    {
      id: 2,
      title: "Elon Musk",
      content:
        "When something is important enough, you do it even if the odds are not in your favor",
    },
    {
      id: 3,
      title: "Albert Einstein",
      content: "Imagination is more important than knowledge",
    },
    {
      id: 4,
      title: "Steve Jobs",
      content: "Stay hungry, stay foolish",
    },
    { 
      id: 5,
      title: "Nelson Mandela",
      content: "It always seems impossible until it’s done",
    },
    {
      id: 6,
      title: "Oprah Winfrey",
      content: "Turn your wounds into wisdom",
    },
  ];
  res.send(tags);
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
