const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());


// bills is a javascript array that stores all bills in memory. (No persistent database storage)
// all fields except for billAmount should be non-empty strings, and serviceDate should be
// an ISO-8601 date string.
// billAmount is a field that represents the total cost in cents, and should therefore be a 
// positive integer.
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


const compareDates = (date1, date2) => {
  if (date1 < date2) {
    return -1;
  } else if (date2 < date1) {
    return 1;
  }
  return 0;
}


app.post('/items', (req, res) => {
  const body = req.body;

  if (body === undefined) {
    res.status(400).send("Bad request: request must contain a JSON body.")
    return;
  }

  if (!(body.patientFullName && typeof body.patientFullName == "string" && body.patientFullName.length > 0)) {
    res.status(400).send("Bad request: request must contain a valid patientFullName field.");
    return;
  }
  if (!(body.patientAddr && typeof body.patientAddr == "string" && body.patientAddr.length > 0)) {
    res.status(400).send("Bad request: request must contain a valid patientAddr field.");
    return;
  }
  if (!(body.hospitalName && typeof body.hospitalName == "string" && body.hospitalName.length > 0)) {
    res.status(400).send("Bad request: request must contain a valid hospitalName field.");
    return;
  }
  if (!(body.serviceDate && typeof body.serviceDate == "string" && body.serviceDate.length > 0)) {
    res.status(400).send("Bad request: request must contain a valid serviceDate field.");
    return;
  }
  if (!/^\d{4}-[01]\d-[0-3]\d$/.test(body.serviceDate)) {
    res.status(400).send("Bad request: serviceDate must be a valid date.");
    return;
  }

  if (!(body.billAmount && typeof body.billAmount == "number" && body.billAmount > 0 && Number.isInteger(body.billAmount))) {
    res.status(400).send("Bad request: request must contain a valid billAmount field.");
    return;
  }

  bills.push(body);
  bills.sort((bill1, bill2) => compareDates(bill1.serviceDate, bill2.serviceDate));
  res.status(200).send("OK")
})


// Handle requests that did not match any path
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404: Path Not found')
})


app.listen(port,
  () => console.log(`Running server on port ${port}`)
)