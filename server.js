const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware, to get req.body in user authentication (email, password, etc.)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("el API Shaghal mallion"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Shabkeen 3a Port ${PORT} ya 3asal ;)`));
