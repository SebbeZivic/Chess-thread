import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const app = express();
//Use them in my backend
app.use(cors());
app.use(express.json());

const db = new Database("../forum.db");

// Route to get all threads
app.get("/api/threads", async (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM threads");
    const questions = stmt.all(); //Use query
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// Route to get a specific thread by ID
app.get("/api/threads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare("SELECT * FROM threads WHERE threadId = ?");
    const questionWithId = stmt.get(id);
    if (!questionWithId) {
      return res.status(404).json({ message: "Thread not found" });
    }
    res.json(questionWithId);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

// Route to post a new question
app.post("/api/questions/post", async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ error: "Title, content, and category are missing." });
    }

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

// Route to get answers for a specific thread
app.get("/api/answer/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare("SELECT * FROM answer WHERE threadId = ?");
    const response = stmt.all(id);

    if (!response.length) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch answers" });
  }
});

// Route to post a new answer to a specific thread
app.post("/api/answer/post/:id", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to add answer" });
  }
});

// Starting the server and listening on port 3000
app.listen(3000, () => console.log("listening to port 3000"));
