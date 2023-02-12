# Bill Upload service for Truffle Health

This repository contains a coding challenge for truffle health, where the assignment is to create
a simple API service to allow API users to upload and view medical bills. Here is an example
of a medical bill:

```json
{
  "patientFullName": "Eric Wu",
  "patientAddr": "330 De Neve Drive, Los Angeles, CA 90024",
  "hospitalName": "Ronald Reagan Medical Center",
  "serviceDate": "2023-01-13",
  "billAmount": 4500,
}
```

## Running the app

To run this application, clone this repository repository by running

```bash
git clone git@github.com:EricWu2003/truffle-assessment.git
```

followed by:

```bash
cd truffle-assessment
npm install
```

to install dependencies. Finally, use

```bash
npm start
```

to run the server.

## Running tests

To run the included tests, first start the server using `npm start`. Then run `npm test` in a
new terminal. Note that the test cases must be started from a newly initialized server instance
since the tests assume that the server's initial memory is empty.

## Demonstration and code walk-through

You can find a video demonstration of the project here:
[https://youtu.be/knEiJ-IDtBc](https://youtu.be/knEiJ-IDtBc)
