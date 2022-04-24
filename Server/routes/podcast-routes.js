const router = require("express").Router();
const Podcast =require("../models/podcast");


//post a new podcast

router.post("/addPodcast", (req, res) => {
    const podcast = new Podcast({
      title: req.body.title,
      author:req.body.author,
      guests: req.body.guests,
      category: req.body.category,
      podcastLink : req.body.podcastLink,
      details:req.body.details,
      status:"on hold",

    });
  
    podcast
      .save()
      .then(() => {
        res.status(201).json({
          message: "podcast saved successfully !",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });


  //get all news 

router.get("/allPodcasts", (req, res, next) => {
  Podcast.find().populate("category")
    .then((podcasts) => {
      res.status(200).json(podcasts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});


// get one news 

router.get("/allPodcasts/:id", (req,res,next) => {
  Podcast.findOne({
    _id: req.params.id,
  }).populate("category")
    .then((onePodcast) => {
      res.status(200).json(onePodcast);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});


// delete news 

router.delete("/allPodcast/:id", (req,res) => {
 Podcast.remove({
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
