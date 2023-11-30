// const express = require("express");
// const { Worker } = require("worker_threads");
import express from "express";
import { Worker } from "worker_threads";
const app = express();
const port = process.env.PORT || 3300;

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

function calculateCount() {
  return new Promise((resolve, reject) => {
    let counter = 0;
    for (let i = 0; i < 100_000_000_000; i++) {
      counter++;
    }
    resolve(counter);
  });
}

app.get("/blocking", async (req, res) => {
  // const worker = new Worker("./worker.js");
  // worker.on("message", (data) => {
  //   console.time("count");
  //   res.status(200).send(`result is ${data}`);
  //   console.timeEnd("count");
  // });
  // worker.on("error", (msg) => {
  //   res.status(404).send(`An error occurred: ${msg}`);
  // });
  const data = await calculateCount();
  res.status(200).send(`result is ${data}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
