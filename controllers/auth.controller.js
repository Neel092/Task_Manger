import db from "../config/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const signup = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // 1. Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required !" });
        }

        const checkUserQuery = "SELECT * FROM users WHERE email = ?";

        db.query(checkUserQuery, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "DB error", error: err });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            }

            // 3. Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // 4. Insert user
            const insertQuery = `
                INSERT INTO users (name, email, password)
                VALUES (?, ?, ?)
            `;

            db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Insert error", error: err });
                }

                return res.status(201).json({
                    message: "User registered successfully"
                });
            });
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Login 
const login = (req, res) => {
    const { email, password } = req.body;

    // 1. Validate
    if (!email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    // 2. Check user
    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "DB error", error: err });
        }

        if (result.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = result[0];

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 4. Generate token
        const token = jwt.sign(
            { id: user.id },
            "secretKey",
            { expiresIn: "1h" }
        );

        // 5. Send token
        res.json({
            message: "Login successful",
            token
        });
    });
};

export { signup, login };