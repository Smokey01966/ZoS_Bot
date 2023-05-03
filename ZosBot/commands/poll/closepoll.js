module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is\n${botConfig.prefix}closepoll|(Poll Number)`);return;}//set number
    let pollNumber=args[0]
    ref=firebase.database().ref("polls")
    var pollRef =ref.child(pollNumber)
    var pollStatus =ref.child(`${pollNumber}/properties/Status`)
    ref.once("value", function(snapshot){
        if (snapshot.hasChild(pollNumber)){pollTest="yes";}else{pollTest="no"}
    }).then( function(){
        if(pollTest==="no"){sender.send("This poll number does not exist");return;}
        pollRef.once("value", function(snapshot){owner =(snapshot.child("properties/Owner").val())}).then(function(){
            if(common.methods.elevatedOfficerCheck(message)==="yes"){editTest="yes"}else{
                if(message.author.id===owner){editTest="yes"}else(editTest="no")
            }
        }).then(function(){
            if(editTest==="no"){sender.send("You do not have permission to edit this poll");return;}
            pollRef.once("value", function(snapshot){
                status = (snapshot.child("properties/Status").val())
            }).then(function(){
                if(status!=="Open"){sender.send("Only an open poll can be closed");return;}
                pollStatus.set("Closed")
                pollRef.child("properties/Close Date").set(dateJoined=moment().tz(timeZone).format().slice(0,10))
                sender.send("Poll Closed")
                common.methods.displayPoll(ref, pollNumber, sender)
            })
        })
    }) 
    


}
module.exports.help = {
    name: "closepoll"//Change to name of command
}