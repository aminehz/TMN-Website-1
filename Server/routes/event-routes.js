const router = require("express").Router();
const Event = require("../models/event");
var fs = require('fs');


  function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
  }


router.post(
  "/addEvent", 
  (req, res, next) => {

  
    const event = new Event({

      title: req.body.title,
      date: req.body.date,
      hour : req.body.hour,
      location :req.body.location,
      eventPoster: base64_encode(req.body.eventPoster),
      details:req.body.details,
      status :"on hold",
      
    });
  

    event
      .save()
      .then(() => {
        res.status(201).json({
          message: "event saved successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  }
); 

// all event 

router.get("/allEvents", (req, res, next) => {
  Event.find()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

//one event 

router.get("/allEvents/:id", (req,res, next) => {
  Event.findOne({
    _id: req.params.id,
  })
    .then((oneEvent) => {
      res.status(200).json(oneEvent);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});



router.delete("/deleteEvents/:id", (req,res) => {
  Event.remove({
    _id: req.params.id,
  })
    .then(() => {
      res.send({ message: "event deleted successfully!" });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});


module.exports = router ;