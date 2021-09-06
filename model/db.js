const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://nadeem:nadeem@cluster0.yvked.mongodb.net/mohd?retryWrites=true&w=majority",{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    
}).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err);
});