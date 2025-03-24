// Backend: Node.js + Express
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// JwtToken Verification
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    let jwtToken;
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(' ')[1]
    }
    if (jwtToken === undefined) {
        res.status(401)
        res.send('User not logged in')
    } 
    else{
        jwtToken.verify(jwtToken, 'MY_SECRET_TOKEN', async(err, decoded) => {
            if (err){
                res.status(401)
                res.send({ message: "Invalid JWT Token" });
            }
            else{
                req.user = decoded;
                next();
            }
        });
    }
};





   




// Login API
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = [{ id: 1, username: 'testuser', password: 'password123' }];

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, username: user.username }, "MY_SECRET_TOKEN", { expiresIn: '1h' });

    res.json({ token });
});


//Home API
app.get('/', authenticate, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` });
});

// Dashboard API
app.get('/dashboard', authenticate, (req, res) => {
    res.json({ cards: [ { id: 1, title: "View Map" }, {id: 2, title:"View Map"}] });
});


// Map API
app.get('/map', authenticate, (req, res) => {
    res.json({ map: "India with current location" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app