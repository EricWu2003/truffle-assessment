const axios = require('axios');
var assert = require('assert');

const test = async function() {
  const url = "http://localhost:3000/items"

  // Initially, there are no records.
  let res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 0);
  
  
  // Attempt adding a new bill using the POST endpoint
  let newBill = {
    patientFullName: "Eric Wu",
    patientAddr: "330 De Neve Drive, Los Angeles, CA 90024",
    hospitalName: "UCLA Ronald Reagan Medical Center",
    serviceDate: "2023-01-13",
    billAmount: 4500,
  }
  res = await axios.post(url, newBill);
  assert(res.status == 200);

  // confirm that there is 1 record after adding
  res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 1);
  assert(res.data[0].patientFullName == "Eric Wu");

  
  // Attempt adding a new bill with an extraneous field
  newBill = {
    field1: "",
    patientFullName: "Eric Wu",
    patientAddr: "330 De Neve Drive, Los Angeles, CA 90024",
    hospitalName: "UCLA Ronald Reagan Medical Center",
    serviceDate: "2023-01-13",
    billAmount: 4500,
  }
  res = await axios.post(url, newBill)
    .catch(function () {});
  // When the server gives an error, res will be undefined, so we assert !res.
  assert(!res);
  res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 1);

  // Attempt adding a new bill with an invalid name
  newBill = {
    patientFullName: 33,
    patientAddr: "330 De Neve Drive, Los Angeles, CA 90024",
    hospitalName: "UCLA Ronald Reagan Medical Center",
    serviceDate: "2023-01-13",
    billAmount: 4500,
  }
  res = await axios.post(url, newBill)
    .catch(function () {});
  assert(!res);
  res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 1);

  // Attempt adding a new bill with a missing address
  newBill = {
    patientFullName: "Eric Wu",
    hospitalName: "UCLA Ronald Reagan Medical Center",
    serviceDate: "2023-01-13",
    billAmount: 4500,
  }
  res = await axios.post(url, newBill)
    .catch(function () {});
  assert(!res);
  res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 1);

  // Attempt adding a new bill with a blank hospital name
  newBill = {
    patientFullName: "Eric",
    patientAddr: "330 De Neve Drive, Los Angeles, CA 90024",
    serviceDate: "2023-01-13",
    billAmount: 4500,
  }
  res = await axios.post(url, newBill)
    .catch(function () {});
  assert(!res);
  res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 1);

  // Attempt adding a new bill with an invalid service date
  newBill = {
    patientFullName: "Eric",
    patientAddr: "330 De Neve Drive, Los Angeles, CA 90024",
    hospitalName: "UCLA Ronald Reagan Medical Center",
    serviceDate: "2023-20-13",
    billAmount: 4500,
  }
  res = await axios.post(url, newBill)
    .catch(function () {});
  assert(!res);
  res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 1);

  // Attempt adding a new bill with an invalid service date
  newBill = {
    patientFullName: "Eric",
    patientAddr: "330 De Neve Drive, Los Angeles, CA 90024",
    hospitalName: "UCLA Ronald Reagan Medical Center",
    serviceDate: "2023",
    billAmount: 4500,
  }
  res = await axios.post(url, newBill)
    .catch(function () {});
  assert(!res);
  res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 1);

  // Attempt adding a new bill with an invalid service date
  newBill = {
    patientFullName: "Eric",
    patientAddr: "330 De Neve Drive, Los Angeles, CA 90024",
    hospitalName: "UCLA Ronald Reagan Medical Center",
    serviceDate: "01-02-2023",
    billAmount: 4500,
  }
  res = await axios.post(url, newBill)
    .catch(function () {});
  assert(!res);
  res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 1);
  
  // Attempt adding a new bill with an invalid bill amount
  newBill = {
    patientFullName: "Eric",
    patientAddr: "330 De Neve Drive, Los Angeles, CA 90024",
    hospitalName: "UCLA Ronald Reagan Medical Center",
    serviceDate: "2023-01-13",
    billAmount: -4500,
  }
  res = await axios.post(url, newBill)
    .catch(function () {});
  assert(!res);
  res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 1);

  // Attempt adding a new bill with an invalid bill amount
  newBill = {
    patientFullName: "Eric",
    patientAddr: "330 De Neve Drive, Los Angeles, CA 90024",
    hospitalName: "UCLA Ronald Reagan Medical Center",
    serviceDate: "2023-01-13",
    billAmount: 230.1,
  }
  res = await axios.post(url, newBill)
    .catch(function () {});
  assert(!res);
  res = await axios.get(url);
  assert(res.status == 200);
  assert(res.data.length == 1);


  console.log("Passed all tests!")
}

test();

