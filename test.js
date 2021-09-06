const cron = require('node-cron');
const express = require('express');
const app=express();
app.use(express.json());
const port = process.env.PORT || 8000;
const jwt=require('jsonwebtoken');
const userModel=require('./model/userSchema');
require('./model/db');
const auth=require('./middleware/auth');
const mongoose = require('mongoose');
cron.schedule('* * * * * ',()=>{
    console.log('Running a task every minute...');
});
app.post("/createuser", async (req, res) => {
    try {
      const data = new userModel(req.body);
      await data.save();
      res.status(201).send("Successfull");
    } catch (err) {
      res.status(400).send(err);
    }
  });
app.post("/loginuser", async (req, res) => {
    try {
      const user = await userModel.findByCredentials(
        req.body.username,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  });
  app.get("/validateuser", auth, async (req, res) => {
    try {
      res.send({ message: "true" });
    } catch (err) {
      res.status(400).send(err);
    }
  });

app.listen(port,()=>{
    console.log('server is running on port '+port);
});