import express, { json } from "express"
import db from "./config/db.config.js"
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";


const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send("Server is running properly");
});

//  start Server
app.listen(PORT, () => {
    console.log(`Server in running on localhost i.e http://localhost:${PORT}`);
});

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

