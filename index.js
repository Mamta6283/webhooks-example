const express=require('express')
const port=8000;
const app=express()
const body_parser=require('body-parser')
const crypto = require('crypto');
const cors=require('cors')
const routes=require('./route')
const mongoose=require('./database/db_connect')
app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())
app.use(cors())
app.use(express.json())
// app.use( express.json( { verify: ( req, res, buffer ) => { req.rawBody = buffer; } } ) );
app.use('/',routes)

// app.get('/',(req,res)=>{
//     res.send("webhook example")
// })


// app.get('/webhook', (req, res) => {
//     const event = req.body; 
//     console.log('Received webhook event:', event);
//      res.status(200).send('Webhook received!');
// });

// app.post('/webhook', (req, res) => {
//     const event = req.body; 
//     console.log('Received webhook event:', event);
//      res.status(200).send('Webhook received!');
// });




// const API_SECRET = 'secret';
// app.post( '/', ( req, res ) => {
//     const signature = _generateSignature( req.method, req.url, req.headers[ 'x-cs-timestamp' ], req.rawBody );

//     if ( signature !== req.headers[ 'x-cs-signature' ] ) {
//         return res.sendStatus( 401 );
//     }

//     console.log( 'received webhook', req.body );
//     res.sendStatus( 200 );
// } );



// function _generateSignature( method, url, timestamp, body ) {
//     const hmac = crypto.createHmac( 'SHA256', API_SECRET );

//     hmac.update( `${ method.toUpperCase() }${ url }${ timestamp }` );

//     if ( body ) {
//         hmac.update( body );
//     }

//     return hmac.digest( 'hex' );
// }


// const SECRET = "your-super-secure-secret"; // Your shared secret
// const SECRET = crypto.randomBytes(32).toString('hex');

// app.post("/webhook-testing", (req, res) => {
//   const payload = JSON.stringify(req.body);
//   const signature = req.headers["x-hub-signature-256"];

//   if (!signature) {
//     return res.status(403).send("No signature found");
//   }

//   // Generate the hash
//   const hash = `sha256=${crypto.createHmac("sha256", SECRET).update(payload).digest("hex")}`;

//   // Compare the hashes securely
//   if (crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature))) {
//     console.log("Webhook verified:", req.body);
//     res.status(200).send("Webhook received!");
//   } else {
//     console.error("Invalid signature");
//     res.status(403).send("Invalid signature");
//   }
// });


// app.post("/webhook-testing", async (req, res) => {
//     try {
//       const payload = JSON.stringify(req.body); // Convert request body to JSON
//       const signature = req.headers["x-hub-signature-256"]; // GitHub's signature header
  
//       if (!signature) {
//         // Send response if the signature is missing
//         res.status(403).send("No signature found");
//         return; // Ensure no further processing happens
//       }
  
//       // Generate hash using the secret
//       const hash = `sha256=${crypto.createHmac("sha256", SECRET).update(payload).digest("hex")}`;
  
//       if (hash !== signature) {
//         // Send response if the signature doesn't match
//         res.status(403).send("Invalid signature");
//         return; // Ensure no further processing happens
//       }
  
//       // Simulate an async operation (e.g., saving data to the database)
//       console.log("Webhook verified:", req.body);
//       await new Promise((resolve) => setTimeout(resolve, 500)); // Simulated delay
  
//       // Send success response
//       res.status(200).send("Webhook received and verified!");
//     } catch (error) {
//       console.error("Error processing webhook:", error);
  
//       // Handle unexpected errors
//       if (!res.headersSent) {
//         res.status(500).send("Internal server error");
//       }
//     }
//   });
  


  
app.listen(port,'0.0.0.0',()=>{
    console.log(`click here: http://localhost:${port}`)
})


// C:\Users\mamta\AppData\Local/ngrok/ngrok.yml---path of configuration file of authorize



