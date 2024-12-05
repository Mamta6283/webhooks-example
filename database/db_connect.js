const mongoose=require('mongoose')

mongoose.connect(`mongodb+srv://mamtarani172001:mamta123@cluster0.dwrm5.mongodb.net/userInfo`)
.then(()=>{console.log("database connected sucessfully")})
.catch((err)=>{console.log("error",err)})

module.exports=mongoose