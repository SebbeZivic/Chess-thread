import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const db = new Database("../forum.db");

app.get("/api/threads", (req, res) => {
  const stmt = db.prepare("SELECT * FROM threads");
  const questions = stmt.all();
  res.json(questions);
});

app.get("/api/threads/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("SELECT * FROM threads WHERE threadId = ?");
  const questionWithId = stmt.get(id);
  if (!questionWithId) {
    return res.status(404).json({ message: "Thread not found" });
  }
  res.json(questionWithId);
});

app.post("/api/questions/post", (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ error: "Title, content, and category are missing." });
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO threads (title, content, category) VALUES (?, ?, ?)"
    );
    const result = stmt.run(title, content, category);
    res.status(201).json({ message: "Thread added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the thread." });
  }
});

app.get("/api/answer/get/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("SELECT * FROM answer WHERE threadId = ?");
  const response = stmt.all(id);

  if (!response) {
    return res.status(404).json({ error: "Thread not found" });
  }

  res.json(response);
});

app.post("/api/answer/post/:id", (req, res) => {
  const { id } = req.params;
  const { content, contributor } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Answer is missing" });
  }

  const stmt = db.prepare(
    "INSERT INTO answer(threadId, answerContent, contributor) VALUES (?,?,?)"
  );

  const result = stmt.run(id, content, contributor);

  res.status(201).json({ message: "Answer added successfully" });
});

app.listen(3000, () => console.log("listening to port 3000"));
