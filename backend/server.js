const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("./users");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const JWT_SECRET = "jeeverse_secret_key";

/* =========================
   REGISTER API
========================= */
app.post("/api/register", async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = users.find(u => u.email === email);

    if (userExists) {
        return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);

    res.json({ message: "User registered successfully 🚀" });
});


/* =========================
   LOGIN API
========================= */
app.post("/api/login", async (req, res) => {

    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Login successful 🚀",
        token
    });
});


/* =========================
   PROTECTED ROUTE
========================= */
app.get("/api/profile", (req, res) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({
            message: "Profile data fetched",
            user: decoded
        });

    } catch (err) {
        res.json({ message: "Invalid token" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});