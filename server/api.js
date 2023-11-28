const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const conString="mongodb://127.0.0.1:27017";
let app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

/* ********************************************************************************************************************************************* */

/* GET METHOD'S */
/* Get Users */
app.get("/getusers", (req, res)=>{
    mongoClient.connect(conString).then((response)=>{
        let database = response.db("videotutorials");
        database.collection("tblusers").find({}).toArray().then((document)=>{
            res.send(document);
            res.end();
        })
    })
});

/* Get Admin */
app.get("/getadmin", (req, res)=>{
    mongoClient.connect(conString).then((response)=>{
        let database = response.db("videotutorials");
        database.collection("tbladmin").find({}).toArray().then((document)=>{
            res.send(document);
            res.end();
        })
    })
});

/* Get Categories */
app.get("/getcategories", (req, res)=>{
    mongoClient.connect(conString).then((response)=>{
        let database = response.db("videotutorials");
        database.collection("tblcategories").find({}).toArray().then((document)=>{
            res.send(document);
            res.end();
        })
    })
});

/* Get Videos */
app.get("/getvideos", (req, res)=>{
    mongoClient.connect(conString).then((response)=>{
        let database = response.db("videotutorials");
        database.collection("tblvideos").find({}).toArray().then((document)=>{
            res.send(document);
            res.end();
        })
    })
});

/* Get Videos By ID */
app.get("/getvideo/:id", (req, res)=>{
    let id = parseInt(req.params.id);
    mongoClient.connect(conString).then((response)=>{
        let database = response.db("videotutorials");
        database.collection("tblvideos").find({VideoId:id}).toArray().then((document)=>{
            res.send(document);
            res.end();
        })
    })
});


/* POST METHOD'S */
/* POST Users */

app.post("/adduser",(req,res)=>{
    let user = {
        
UserId:req.body.UserId,
UserName:req.body.UserName,
Password:req.body.Password,
Email:req.body.Email,
Mobile:req.body.Mobile
    }

    mongoClient.connect(conString).then((response)=>{
        let database = response.db("videotutorials");
        database.collection("tblusers").insertOne(user).then(()=>{
               console.log("User Added");
               res.end();
        })
    })
});

/* POST Videos */
app.post("/addvideo", (req, res)=>{
    let video = {
        
VideoId:parseInt(req.body.VideoId),
Title:req.body.Title,
Url:req.body.Url,
Likes:parseInt(req.body.Likes),
Views:parseInt(req.body.Views),
CategoryId:parseInt(req.body.CategoryId)
    }

    mongoClient.connect(conString).then((response)=>{
        let database = response.db("videotutorials");
        database.collection("tblvideos").insertOne(video).then(()=>{
            console.log("Video Added");
            res.end();
        })
    })
});

/* PUT METHOD'S */
/* Update Video */
app.put("/updatevideo/:id", (req,res)=>{
    let id = parseInt(req.params.id);
    mongoClient.connect(conString).then((response)=>{
        let database = response.db("videotutorials");
        database.collection("tblvideos").updateOne({VideoId:id},{$set:{VideoId:parseInt(req.body.VideoId), Title:req.body.Title, Url:req.body.Url, Likes:parseInt(req.body.Likes), Views:parseInt(req.body.Views), CategoryId:parseInt(req.body.CategoryId)}}).then(()=>{
            console.log("Video Update");
            res.end();
        })
    })
});

/* DELETE METHOD'S */
/* Delete Video */
app.delete("/deletevideo/:id", (req,res)=>{
    let id = parseInt(req.params.id);
    mongoClient.connect(conString).then((response)=>{
        let database = response.db("videotutorials");
        database.collection("tblvideos").deleteOne({VideoId:id}).then(()=>{
            console.log("video Deleted");
            res.end();
        })
    })
})


app.listen("6600");
console.log("database send : http://127.0.0.1:6600");


