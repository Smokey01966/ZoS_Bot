module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length === 0){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}editvote|(Poll Number)|(New Vote)<-Repeat this argument for each vote you wish to cast`);return;}
    let pollNumber=args[0]
    ref=firebase.database().ref("polls")
    var pollRef =ref.child(pollNumber)
    let voter =message.author.id
    var voterRef =ref.child(`${pollNumber}/storedVotes/${voter}`)
    ref.once("value", function(snapshot){
        if (snapshot.hasChild(pollNumber)){pollTest="yes";}else{pollTest="no"}
    }).then( function(){
        if(pollTest==="no"){sender.send("This poll number does not exist");return;}
        voterRef.once("value",function(snapshot){
            existsTest = snapshot.val() !== null
            voteRecord = snapshot.val()
        }).then( function(){
            if(!existsTest){sender.send("You have not already voted use the /addvote command to cast your vote");return;}
            pollRef.once("value", function(snapshot){
                rankRequiredToVote = (snapshot.child("properties/Rank Required to Vote").val());
                status = (snapshot.child("properties/Status").val());
                if(status!=="Open"){sender.send("This poll is not open for voting");return;}
                if(rankRequiredToVote==="o"){if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to vote in this poll");return;}}
                if(rankRequiredToVote==="e"){if(common.methods.elevatedOfficerCheck(message) === "no"){sender.send("You Don't Have Permission to vote in this poll");return;}}
                if(rankRequiredToVote==="m"){if(common.methods.memberCheck(message) === "no"){sender.send("You Don't Have Permission to vote in this poll");return;}}
                numberOfVotesPerPerson=Number((snapshot.child("properties/Number of Votes Per Person").val()))
                if(args.length > (numberOfVotesPerPerson)+1){sender.send("You submitted too many votes");return;}
                voteTallies=(snapshot.child("properties/Vote Tallies").val())
                options=(snapshot.child("properties/Options").val())
                workingOptions=options.split("|")
                workingVoteTallies=voteTallies.split("|")
                voteCheck="Yes"
                workingVoteRecord=voteRecord.split("|")
                numberOfOldVotes=workingVoteRecord.length
                for(i=0; i<numberOfOldVotes; i++){
                    workingVoteTallies[workingVoteRecord[i]-1]--
                }
                newWorkingVoteRecord=[]
                for(i=0; i<args.length-1; i++){
                    votePat= new RegExp("^\\d*$")
                    if(!votePat.test(args[i+1])){voteCheck="No"};
                    if(args[i+1]-1>workingOptions.length|args[i+1]-1<0){voteCheck="No"}
                    workingVoteTallies[args[i+1]-1]++
                    newWorkingVoteRecord[i]=args[i+1]
                }
                if(newWorkingVoteRecord.length>1){if(common.methods.duplicateCheck(newWorkingVoteRecord)==="yes"){sender.send("You can only vote for each option once");return;}}
                if(voteCheck==="No"){sender.send("One of your votes was for an option number that does not exist please try again");return;}
                newVoteTallies=workingVoteTallies.join("|")
                newVoteRecord=newWorkingVoteRecord.join("|")
                voterRef.set(newVoteRecord)
                pollRef.child("properties/Vote Tallies").set(newVoteTallies)
                sender.send(`Your vote has been updated to a vote for option(s)${newWorkingVoteRecord.join(" ")}`)
            }) 
        })
    })
}
module.exports.help = {
    name: "editvote"//Change to name of command
}