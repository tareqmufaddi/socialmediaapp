const express = require("express");
var pool = require("./config/db");

const app = express();

// Init Middleware, to get req.body in user authentication (email, password, etc.)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("el API Shaghal"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/project", require("./routes/api/project"));
app.use("/api/unit", require("./routes/api/unit"));
app.use("/api/submittal", require("./routes/api/submittal"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Connected | Port ${PORT}`));
