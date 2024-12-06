const mongoose=require('mongoose')
const {notifyWebhook}=require('../controller/userController')
const userModel=require('../userModel/userModel')

const watchUsersCollection = () => {
    const changeStream = userModel.watch();
    changeStream.on("webhook", (change) => {
      if (change.operationType === "insert") {
        const newUser = change.fullDocument;
        notifyWebhook(newUser);
        // console.log(newUser)

      }
    });
  };
mongoose.connect(`mongodb+srv://mamtarani172001:mamta123@cluster0.dwrm5.mongodb.net/userInfo`)
.then(()=>{
    console.log("database connected sucessfully")
    watchUsersCollection()
})
.catch((err)=>{console.log("error",err)})

module.exports=mongoose




