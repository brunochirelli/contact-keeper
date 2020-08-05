const path = require("path");
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Look for a process port OR ...
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to ContactKeeper API" });
});

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Static Folder
  app.use(express.static("client/build"));

  // That are not any route defined...
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, console.log(`server started on ${PORT}`));
