const userModel = require("../userModel/userModel");
const event = require("events");
const eventEmitter = new event.EventEmitter();
const axios = require("axios");

const createUser = async (req, res) => {
  // console.log("request body ",req.body)

  const { name, email, phoneno } = req.body;
  if (!name || !email || !phoneno) {
    res.status(400).json({
      success: false,
      message: "all fields are required",
    });
  }

  try {
    // const { name, email, phoneno } = req.body;

    const userData = new userModel({ name, email, phoneno });
    //  const userData= await userModel.find({})
    // if (!userData) {
    //   userData = new userModel({name,email,phoneno, interactions: 1 });
    // } else {
    //   // Increment the interaction count
    //   userData.interactions += 1;
    // }

    await userData.save(userData);

    await notifyWebhook(userData);
  watchUsersCollection(userData)
    console.log(userData);
    eventEmitter.emit("webhook", { name, email, phoneno });

    res.status(200).json({
      success: true,
      message: `  ${name} userdata stored successfully`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// Function to notify webhook
const notifyWebhook = async (user) => {
  const webhookUrl =" https://483e-2409-40d1-1126-b952-a0a7-3fda-d7fa-29bc.ngrok-free.app/webhook"
  // "https://webhook.site/a89e3c04-1895-40b1-95e6-a5b60c17f7a2/webhook"
  // "https://webhooks-example-46g4issny-mamta6283s-projects.vercel.app/webhook"

  // "https://webhooks-example-46g4issny-mamta6283s-projects.vercel.app/?vercelToolbarCode=8zmSVU07CPqcpmj/webhook"
  // "https://webhooks-example-two.vercel.app/?vercelToolbarCode=3b7PDOaHAM2Vc9V/webhook"
  //  "https://webhooks-example-46g4issny-mamta6283s-projects.vercel.app/webhook";
  //  https://9aa0-59-183-150-103.ngrok-free.app

  try {

      const response = await axios.post(webhookUrl, user)
      //   {
      //   headers: {
      //     Authorization: `Bearer MbyVmyl8kaJyaDp6s0ATRXSI`, // Replace with your actual token
      //     "Content-Type": "application/json",
      //   },
      // });
        // {
    //   headers: {
    //     "Content-Type": "application/json", // Specify JSON content type
    //   },
    // });
    

    console.log("Webhook notification sent successfully:", response.data);
    console.log("this is response", response);
  } 
 
  catch (error) {
    console.error("Error sending webhook notification:", error.message);

    // Log detailed error for debugging
    if (error.response) {
      // console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error in request setup:", error.message);
    }
  }
}
// };

const watchUsersCollection = async () => {
  const changeStream = userModel.watch();
  changeStream.on("webhook", (change) => {
    if (change.operationType === "insert") {
      const newUser = change.fullDocument;
        notifyWebhook(newUser);
      // console.log(newUser)

    }
  });
};

const getUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const totalUsers = await userModel.countDocuments(); //this is used to count the users in database
    const userAll = await userModel
      .find({})
      .skip((page - 1) * limit) //skip the previous page and data which is already displayed in previous page
      .limit(limit); //limit to current page

    console.log(userAll);

    if (!userAll || userAll.length === 0) {
      res.json({
        message: "no user ",
      });
    } 
    
    else
     {
      res.status(500).json({
        success: true,
        totalUsers, //totalusers
        currentPage: page,
        // totalpages: Math.ceil(totalUsers/limit),  //calculating the pages
        message: userAll,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// const webhookEventHandler = function (payload) {
//   console.log("webhook", payload);


// eventEmitter.on("webhook", createUser);

// eventEmitter.emit("webhook");

// const runWebhook = (payload) => {
//   eventEmitter.emit("webhook", payload);
// };

// module.exports = {runWebhook};

// Webhook Event Listener

eventEmitter.on("webhook", (payload) => {
  console.log("Webhook triggered:", payload);
});

// module.exports={notifyWebhook}
module.exports = { createUser, getUser, notifyWebhook };

// const mongoose = require("mongoose");
// const axios = require("axios");

// // Define your user schema and model
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   createdAt: { type: Date, default: Date.now },
// });
// const User = mongoose.model("User", userSchema);

// // Function to notify webhook
// const notifyWebhook = async (user) => {
//   const webhookUrl = "https://example.com/webhook";
//   try {
//     const response = await axios.post(webhookUrl, user);
//     console.log("Webhook notification sent successfully:", response.data);
//   } catch (error) {
//     console.error("Error sending webhook notification:", error.message);
//   }
// };

// Add a new user and call webhook
// const addUser = async (userData) => {
//   const newUser = new User(userData);
//   await newUser.save();

//   // Call the webhook
//   await notifyWebhook(newUser);
// };

// MongoDB Change Streams for Real-time Notifications
// const watchUsersCollection = () => {
//   const changeStream = User.watch();
//   changeStream.on("change", (change) => {
//     if (change.operationType === "insert") {
//       const newUser = change.fullDocument;
//       notifyWebhook(newUser);
//     }
//   });
// };

// Connect to MongoDB and Start Watching
// mongoose
//   .connect("mongodb://localhost:27017/yourDatabaseName", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     watchUsersCollection();
//   })
//   .catch((error) => console.error("Error connecting to MongoDB:", error));



//back end ko server pe pana padega
//api/v1/admin



