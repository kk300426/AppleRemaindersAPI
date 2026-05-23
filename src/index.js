<<<<<<< HEAD
import express from 'express'; 
import reminderRoutes from './routes/reminderRoutes.js';

const app = express()
const port =process.env.PORT || 3002;

app.use(express.json())
app.use('/reminders', reminderRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
=======
import express from 'express'; 

const app = express()
const port =process.env.PORT || 3002;

app.get('/remainders', (req, res) => {
  res.send('Get all remainders')
}) 

app.get('/remainders/:id', (req, res) => {
  res.send('Get remainder by ID')
}) 

app.post('/remainders', (req, res) => {
  res.send('Create new remainder')
}) 

app.patch('/remainders/:id', (req, res) => {
  res.send('update old remainders')
}) 

app.delete('/remainders/:id', (req, res) => {
  res.send('delete old remainders')
}) 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
>>>>>>> 8fbc8afe6410900c762f9dc96eb049f4db7e9f45
}) 