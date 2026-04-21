import db from "../config/db.config.js";

//  CREATE TASK
export const createTask = (req, res) => {
    const { title, description, dueDate, status, priority } = req.body;
    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const query = `
        INSERT INTO tasks (title, description, dueDate, status, priority, userId)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const formattedDate = dueDate
        ? new Date(dueDate).toISOString().split("T")[0]
        : null;

    db.query(
        query,
        [title, description, formattedDate, status, priority, userId],
        (err) => {
            if (err) {
                console.error("DB Error in createTask:", err);
                return res.status(500).json({ message: "DB error", error: err });
            }

            res.status(201).json({ message: "Task created successfully" });
        }
    );
};

// GET TASKS (WITH FILTERING)
export const getTasks = (req, res) => {
    const userId = req.user.id;
    const { status } = req.query;

    let query = "SELECT * FROM tasks WHERE userId = ?";
    let values = [userId];

    if (status) {
        query += " AND status = ?";
        values.push(status);
    }

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "DB error", error: err });
        }

        res.json(result);
    });
};

//  UPDATE TASK
export const updateTask = (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.id;

    const { title, description, dueDate, status, priority } = req.body;

    const formattedDate = dueDate
        ? new Date(dueDate).toISOString().split("T")[0]
        : null;

    const query = `
        UPDATE tasks
        SET title = ?, description = ?, dueDate = ?, status = ?, priority = ?
        WHERE id = ? AND userId = ?
    `;

    db.query(
        query,
        [title, description, formattedDate, status, priority, taskId, userId],
        (err, result) => {
            if (err) {
                console.error("DB Error in updateTask:", err);
                return res.status(500).json({ message: "DB error", error: err });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found or unauthorized" });
            }

            res.json({ message: "Task updated successfully" });
        }
    );
};

// DELETE TASK
export const deleteTask = (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.id;

    const query = "DELETE FROM tasks WHERE id = ? AND userId = ?";

    db.query(query, [taskId, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "DB error", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.json({ message: "Task deleted successfully" });
    });
};