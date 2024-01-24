const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample in-memory database
const users = [];

app.use(express.static('public')); // Serve static files (like HTML, CSS, and images)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Landing page route
app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if the username is already taken
    if (users.some(user => user.username === username)) {
        return res.status(400).send('Username already taken');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user data in the in-memory database (replace this with a real database)
    users.push({ username, password: hashedPassword });

    res.redirect('/login');
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user in the in-memory database (replace this with a real database)
    const user = users.find(u => u.username === username);

    if (user) {
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            req.session.userId = user.username; // Store user ID in the session
            return res.redirect('/');
        }
    }

    res.status(401).send('Invalid username or password');
});

// Logout endpoint
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/login');
    });
});

// Login page route
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
