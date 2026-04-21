import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 1. Check if header exists
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // 2. Extract token
        const token = authHeader.split(" ")[1];

        // 3. Verify token
        const decoded = jwt.verify(token, "secretKey");

        // 4. Attach user info
        req.user = decoded;

        // 5. Move forward
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export { authMiddleware };
