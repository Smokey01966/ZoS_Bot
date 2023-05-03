module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length === 0){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}addvote|(Poll Number)|(Vote)<-Repeat this argument for each vote you wish to cast`);return;}
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
        }).then( function(){
            if(existsTest){sender.send("You have already voted use the /editvote command to change your vote");return;}
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
                workingVoteRecord=[]
                for(i=0; i<args.length-1; i++){
                    votePat= new RegExp("^\\d*$")
                    if(!votePat.test(args[i+1])){voteCheck="No"};
                    if(args[i+1]-1>workingOptions.length|args[i+1]-1<0){voteCheck="No"}
                    workingVoteTallies[args[i+1]-1]++
                    workingVoteRecord[i]=args[i+1]
                }
                if(workingVoteRecord.length>1){if(common.methods.duplicateCheck(workingVoteRecord)==="yes"){sender.send("You can only vote for each option once");return;}}
                if(voteCheck==="No"){sender.send("One of your votes was for an option number that does not exist please try again");return;}
                newVoteTallies=workingVoteTallies.join("|")
                newVoteRecord=workingVoteRecord.join("|")
                voterRef.set(newVoteRecord)
                pollRef.child("properties/Vote Tallies").set(newVoteTallies)
                sender.send(`Your vote has been recorded as a vote for option(s)${workingVoteRecord.join(" ")}`)
            }) 
        })
    })
}
module.exports.help = {
    name: "addvote"//Change to name of command
}