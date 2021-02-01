const express = require("express")
const connectDB = require("./config/db")

const app = express();

// Connect Database
connectDB();

// Init middlewares
app.use(express.json({extended: false}));

// Define Routes
app.use("/api/users", require('./routes/api/users'));
app.use("/api/auth", require('./routes/api/auth'));
app.use("/api/profile", require('./routes/api/profile'));
app.use("/api/posts", require('./routes/api/posts'));
app.use("/api/teams", require('./routes/api/teams'));

const PORT = process.env.PORT  || 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})