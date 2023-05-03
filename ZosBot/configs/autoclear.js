//CODE STUFF BELOW DO NOT TOUCH
var methods ={};
var data ={};
//CODE STUFF ABOVE DO NOT TOUCH
data.autoClear=[
    //list the channel names that you wish to automatically clear
    //"Example format",
    //"Example format for last item"
]
//CODE STUFF BELOW DO NOT TOUCH
data.numberOfAutoClear=data.autoClear.length
methods.validate = function(){
    let check = 1
   for(i=0; i<data.numberOfAutoClear; i++){
    channel=`${data.autoClear[i]}`
    if(bot.channels.find("name", channel)===null){check=0; console.log(`Could not find the ${channel} on the server check configs/autoclear.js`);}
    }
return(check);
}
exports.methods = methods;
exports.data = data;
//CODE STUFF ABOVE DO NOT TOUCH