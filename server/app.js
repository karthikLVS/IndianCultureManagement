const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

//Configuration (MONGODB)
var curl = "mongodb://localhost:27017";
var client = new MongoClient(curl); 

//TESTING
app.get('/klef/test', async function(req, res){
    //res.send("Koneru Lakshmaiah Education Foundation");
    res.json("Koneru Lakshmaiah Education Foundation");
});

app.post('/klef/cse', async function(req, res){
    res.json(req.body);
    //res.json("Computer Science and Engineering");
});

//REGISTRATION MODULE
app.post('/registration/signup', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('skillpro');
        users = db.collection('stakeholders');
        data = await users.insertOne(req.body);
        conn.close();
        res.json("Registered successfully...");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//LOGIN MODULE
app.post('/login/signin', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('skillpro');
        users = db.collection('stakeholders');
        data = await users.count(req.body);
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//HOME MODULE
app.post('/home/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('skillpro');
        users = db.collection('stakeholders');
        data = await users.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/menu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('skillpro');
        menu = db.collection('menu');
        data = await menu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/menus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('skillpro');
        menus = db.collection('menus');
        data = await menus.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/profile', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('skillpro');
        users = db.collection('stakeholders');
        // Assuming the email ID is stored in req.body.emailid
        data = await users.findOne({ emailid: req.body.emailid });
        conn.close();
        res.json(data); // Assuming user data is returned as JSON
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//CHANGE PASSWORD
app.post('/cp/updatepwd', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('skillpro');
        users = db.collection('stakeholders');
        data = await users.updateOne({emailid : req.body.emailid}, {$set : {pwd : req.body.pwd}});
        conn.close();
        res.json("Password has been updated");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

// app.post('/rating-section/handleSubmitReview', async function(req, res){
//     try
//     {
//         conn = await client.connect();
//         db = conn.db('skillpro');
//         users = db.collection('ratings');
//         data = await users.insertOne(req.body);
//         conn.close();
//         res.json("Saved successfully...");
//     }catch(err)
//     {
//         res.json(err).status(404);
//     }
// });

app.post('/submit-review', async (req, res) => {
    try {
        conn = await client.connect();
        db = conn.db('skillpro');
        users = db.collection('ratings');
        const { rating } = req.body;
        const review = new Review({ rating });
        await review.save();
        conn.close();
        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
      console.error('Failed to submit review:', error);
      res.status(500).json({ error: 'Failed to submit review' });
    }
  });