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
}) 