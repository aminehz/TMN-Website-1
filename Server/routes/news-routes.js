const router = require("express").Router();
const News = require("../models/news");
var fs = require('fs');



  function base64_encode(files) {
    let arr = [];
    // read binary data
    files.map((file)=>{
      var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    arr.push(new Buffer.from(bitmap).toString('base64'));
    })
    return arr;
  }


router.post("/addNews",(req, res ,next)=>{

    const news = new News ({
        title : req.body.title ,
        newsImages:req.body.newsImages,
        category :req.body.category,
        content : req.body.content,
        author :req.body.author,
        status : "on hold",
        })


news
.save()
.then(()=>{

    res.status(201).json({

        message : "news saved successfully!"
    });
})
.catch((error)=>{
    res.status(400).json({
        error:error,
        });
    });

});

//get all news 

router.get("/allNews", (req, res, next) => {
    News.find().populate("category")
      .then((news) => {
        res.status(200).json(news);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });


  // get one news 

  router.get("/oneNews/:id", (req,res,next) => {
    News.findOne({
      _id: req.params.id,
    }).populate("category")
      .then((oneNews) => {
        res.status(200).json(oneNews);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  });
  

  // delete news 

  router.delete("/deleteNews/:id", (req,res) => {
    News.remove({
      _id: req.params.id,
    })
      .then(() => {
        res.send({ message: "news deleted successfully!" });
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  });



module.exports =router ;
    

    

