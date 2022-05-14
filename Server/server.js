const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
const app = express();
//app.use(express.json());
app.use(cors());
app.use(express.json({limit: '15000kb', extended: true}));
app.use(express.urlencoded({limit: '15000kb', extended: true, parameterLimit:50000 }));
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

//database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.get("/", (req, res) => {
  res.send("test1 ");
});

// Routes
const userRoutes = require("./routes/auth-route");
const categoryRoutes = require("./routes/category-route");
const adminRoutes = require("./routes/admin-routes");
const coAdminRoutes = require("./routes/coadmin-routes");
const blogRoutes = require("./routes/blog-route");
const usersRoutes = require("./routes/user-routes");
const eventRoutes = require("./routes/event-routes");
const newsRoutes = require("./routes/news-routes");
const podcastRoutes=require("./routes/podcast-routes");
app.use("/api/auth", userRoutes);
app.use("/api/categorys", categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/coadmin", coAdminRoutes);
app.use("/api/blogs",blogRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/news",newsRoutes);
app.use("/api/podcasts",podcastRoutes);
app.use('/images',express.static(path.join(__dirname,'../','images')));

//Error handler
app.use((req, res, next) => {
  res.status(404);
  res.send({
    error: "not found",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
