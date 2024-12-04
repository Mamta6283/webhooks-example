const express=require('express')
const port=8000;
const app=express()
const body_parser=require('body-parser')
const crypto = require('crypto');
const cors=require('cors')
const routes=require('./route')

app.use(body_parser.urlencoded({extended:false}))
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



app.listen(port,()=>{
    console.log(`click here: http://localhost:${port}`)
})

// C:\Users\mamta\AppData\Local/ngrok/ngrok.yml---path of configuration file of authorize



