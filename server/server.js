const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.send({"message": 'Hello World'});
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});