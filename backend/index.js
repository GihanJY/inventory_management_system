const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

app.use('/items', itemRoutes);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send("Inventory Management API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
