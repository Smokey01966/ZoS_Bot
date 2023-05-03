module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is\n${botConfig.prefix}deletepoll|(Poll Number)|(Poll Number)`);return;}//set number
    let pollNumber=args[0]
    let verify=args[1]
    ref=firebase.database().ref("polls")
    var pollRef =ref.child(pollNumber)
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
            if(pollNumber!==verify){sender.send("The poll numbers did not match");return;}
            common.methods.displayPoll(ref, pollNumber, sender); 
            setTimeout(function(){
            pollRef.remove()
            sender.send("This poll has been deleted")}, 500);
        })
    }) 
    


}
module.exports.help = {
    name: "deletepoll"//Change to name of command
}