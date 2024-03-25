// Import express
const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || PORT}`)
})
