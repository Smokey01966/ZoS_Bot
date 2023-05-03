module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is\n${botConfig.prefix}publishpoll|(Poll Number)`);return;}//set number
    let pollNumber=args[0]
    ref=firebase.database().ref("polls")
    var pollRef =ref.child(pollNumber)
    var pollStatus =ref.child(`${pollNumber}/properties/Status`)
    var pollVoteRef =ref.child(`${pollNumber}/properties/Vote Tallies`)
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
                options = (snapshot.child("properties/Options").val())
            }).then(function(){
                if(status!=="Creating"){sender.send("This poll is already open or has been closed");return;}
                pollStatus.set("Open")
                workingOptions=options.split("|")
                numberOfOptions=workingOptions.length
                workingVoteTallies=[]
                for(i=0; i<numberOfOptions; i++){
                    workingVoteTallies[i]=0
                }
                voteTallies=workingVoteTallies.join("|")
                pollVoteRef.set(voteTallies)
                sender.send("Poll Opened")
                common.methods.displayPoll(ref, pollNumber, sender)
            })
        })
    }) 
    


}
module.exports.help = {
    name: "publishpoll"//Change to name of command
}