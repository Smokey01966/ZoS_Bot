module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is\n${botConfig.prefix}lookuppoll|(Poll Number)`);return;}//set number
    let pollNumber=args[0]
    ref=firebase.database().ref("polls")
    var pollRef =ref.child(pollNumber)
    ref.once("value", function(snapshot){
        if (snapshot.hasChild(pollNumber)){pollTest="yes";}else{pollTest="no"}
    }).then( function(){
        if(pollTest==="no"){sender.send("This poll number does not exist");return;}
        pollRef.once("value", function(snapshot){
            rankRequiredToVote = (snapshot.child("properties/Rank Required to Vote").val());
            if(rankRequiredToVote==="o"){if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to view this poll");return;}}
            if(rankRequiredToVote==="e"){if(common.methods.elevatedOfficerCheck(message) === "no"){sender.send("You Don't Have Permission to view this poll");return;}}
            if(rankRequiredToVote==="m"){if(common.methods.memberCheck(message) === "no"){sender.send("You Don't Have Permission to view this poll");return;}}
            common.methods.displayPoll(ref, pollNumber, sender)
        }) 
    })
}
module.exports.help = {
    name: "lookuppoll"//Change to name of command
}