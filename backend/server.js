require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const nurseRoutes = require('./routes/nurses');
const requestRoutes = require('./routes/requests');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nurseoncall';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error', err));

app.use('/api/auth', authRoutes);
app.use('/api/nurses', nurseRoutes);
app.use('/api/requests', requestRoutes);

app.get('/', (req,res)=> res.send({ ok: true, message: 'NurseOnCall API' }));

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
