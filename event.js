const { default: axios } = require('axios')
const event =require('events')
const eventEmitter=new event.EventEmitter()

const route=require('./route')

// const webhookEventHandler=function(payload){
//     console.log("here is webhookeventhandler",payload)
// }
// eventEmitter.on('webhook',webhookEventHandler)

// eventEmitter.emit('webhook')

// const runWebhook=(payload)=>{
//     eventEmitter.emit('webhook',payload)
// }


// const dataStore=[
//     {
//         url:'http://localhost/8000/webhook',
//         id:1
//     }
// ]

// const webhookEventHandler=function(payload){
//     const consumer=dataStore.find(data=>{
//         // if(data.id === payload){
//         //     return true
//         // }
//         console.log(data)
//     })
//        axios.post(consumer.url,payload)
//        .then(()=>console.log("success"))
//        .catch((err)=>{
//         console.log("error",err)
//        })
// }

//  eventEmitter.on('webhook',webhookEventHandler)
//  eventEmitter.emit('webhook')


const runWebhook=(payload)=>{
    eventEmitter.emit('webhook',payload)
 }


module.exports=runWebhook;




