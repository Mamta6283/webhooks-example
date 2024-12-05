const userModel = require("../userModel/userModel");
const event = require("events");
const eventEmitter = new event.EventEmitter();

const createUser = async (req, res) => {

  console.log("request body ",req.body)

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
    await userData.save(userData);

    eventEmitter.emit("webhook", { name, email, phoneno });

    console.log(userData)
    res.status(200).json({
      success: true,
      message: `  ${name} userdata stored successfully`
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userAll = await userModel.find({});
    if (!userAll || userAll.length === 0) {
      res.json({
        message: "no user ",
      });
    } else {
      res.status(500).json({
        success: true,
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


  // const {name,email,phoneno}=payload
  // console.log(name,email,phoneno)
  // const {name,email,phoneno}=req.body
  // if(!name || ! email || !phoneno)
  // {
  //   res.status(400).json({
  //       success:false,
  //       message:"all fields are required"
  //   })
  // }
  // const {name,email,phoneno}=req.body

  // try{
  //      const {name,email,phoneno}=req.body

  //      const userData=new userModel({name,email,phoneno})
  //       await userData.save(userData)
  //       res.status(200).json({
  //           success:true,
  //           message:"userdata stored successfully"
  //       })

  // }
  // catch(err){
  //   res.status(500).json({
  //       success:false,
  //       message:err.message
  //   })
  // }
// };

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

module.exports = { createUser, getUser };

