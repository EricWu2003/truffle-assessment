const express = require('express')
const app = express()
const port = process.env.PORT || 3000


// bills is a javascript array that stores all bills in memory. (No persistent database storage)
// all fields except for billAmount should be non-empty strings, and serviceDate should be
// an ISO-8601 date string.
// billAmount is a field that represents the total cost in cents, and should therefore be an integer.
let bills = [
  {
    patientFullName: "Eric Wu",
    patientAddr: "330 De Neve Drive, Los Angeles, CA 90024",
    hospitalName: "UCLA Ronald Reagan Medical Center",
    serviceDate: "2023-01-13",
    billAmount: 4500,
  }
]


app.get('/items', (req, res) => {
  res.json(bills)
})

// app.post('/items', (req, res) => {
//   res.json(bills)
// })


// Handle requests that did not match any path
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404: Path Not found')
})


app.listen(port,
  () => console.log(`Running server on port ${port}`)
)