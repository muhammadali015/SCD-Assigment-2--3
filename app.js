const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.get('/todo/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching todo with id: ${id}`);
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log('Response data:', json);
        res.json(json);
    } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});
