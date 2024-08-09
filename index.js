const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3001;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://test:test@cluster0.pmnd5t2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
   
).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Define routes
app.post('/user', userController.createUser);
app.get('/users', userController.getUsers);
app.get('/usersbyage/:age', userController.getUsersByAge);
app.get('/usersaboveage/:age', userController.getUsersAboveAge);
app.get('/users/name/:name', userController.getUsersByName);
app.get('/users/orderByName', userController.getUsersOrderedByName);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);
app.delete('/users/email/:email', userController.deleteUsersByEmail);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
