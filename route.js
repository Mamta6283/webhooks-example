const express=require('express')
const router=express.Router()
const runWebhook=require('./controller/userController')
const{createUser,getUser}=require('./controller/userController')
const userModel=require('./userModel/userModel')
router.get('/',(req,res)=>{
    res.send("webhook example")
})

// router.post('/webhook', createUser,(req,res)=> {
//     // const event = req.body; 
//     // console.log('Received webhook event:', event);
    
//      const{name} = req.body;
//      console.log(`${name} has successfully stored in database`)
//      res.status(200).json({
//         success:true,
//         messagae:`${name} has succesfully stored in database`
//      });
// });


router.post('/webhook',createUser)


//cerateuser
// router.post('/user',createUser)

//getuser
// router.get('/user',getUser)


// router.get('/user',(req,res)=>{
//     res.send('all info get')
// })


// router.get('/webhook', getUser, (req, res) => {
//   const {name}=req.body
//   console.log(name)
//     const user=getUser
//     console.log(user)
//     runWebhook(user)

//     res.json({
//         success:true,
//         message:"provider works"
//     })
// })

router.get('/webhook',getUser)

// router.get('/test',(req,res)=>{
//     runWebhook('test')
//     res.json({
//         success:true,
//         message:"provider works"
//     })
// })


// router.post('/customer',(req,res)=>{
//   runWebhook({
//     consumerId:1,
//     event:"customer_created",
//     data:{
//         id:req.body.customerId
//     }
//   })
//   res.json("provide customer create work")
// })


// router.post('/webhook',(req,res)=>{
//     console.log("webhook works")
//     console.log("with the following payload",req.body)

//     res.json('webhook works')
// })


// GitHub Webhook Listener
// router.post("/github-webhook", async (req, res) => {
//     try {
//       const { action, repository, sender } = req.body;
  
//       // Simulate adding user data based on webhook event
//       const userData = {
//         name: sender?.login || "Unknown User",
//         email: `${sender?.login || "unknown"}@github.com`, // Placeholder email
//         phoneno: "1234567890", // Placeholder phone number
//       };
  
//       const newUser = new userModel(userData);
//       await newUser.save();
  
//       console.log("User added from GitHub webhook:", userData);
  
//       return res.status(200).json({
//         success: true,
//         message: "User added automatically from GitHub webhook",
//       });
//     } catch (err) {
//       console.error("Error processing GitHub webhook:", err.message);
//       return res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   });

//  To store accumulated data
let webhookData = [];

// POST endpoint to add data
router.post('/add-data', (req, res) => {
    const { name, age } = req.body;

    // Validate if both name and age are provided
    if (!name || !age) {
        return res.status(400).json({ status: 'error', message: 'Name and Age are required' });
    }

    // Add the data to webhookData array
    webhookData.push({ name, age });

    res.status(200).json({
        status: 'success',
        message: 'Data added successfully',
        data: { name, age }
    });
});


// Webhook endpoint to view accumulated data
router.get('/webhook-test', (req, res) => {

    // Print the accumulated data
    console.log('Webhook received data:', webhookData);

    // Respond back with the accumulated data
    res.status(200).json({

        status: 'success',
        message: 'Webhook received the data',
        data: webhookData
        
    });
});


module.exports=router;


