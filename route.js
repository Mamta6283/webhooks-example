const express=require('express')
const router=express.Router()
const runWebhook=require('./event')
router.get('/',(req,res)=>{
    res.send("webhook example")
})
router.post('/webhook', (req, res) => {
    const event = req.body; 
    console.log('Received webhook event:', event);
     res.status(200).send('Webhook received!');
});

router.post('/user',(req,res)=>{
    res.send("user info added ")
})

router.get('/user',(req,res)=>{
    res.send('all info get')
})


router.get('/test', (req, res) => {
    runWebhook('test')
    res.json('provider work!')
})


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

module.exports=router;


