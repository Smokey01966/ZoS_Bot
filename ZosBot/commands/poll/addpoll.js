module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 4){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}addpoll|(Question)|(Close Date[format yyyy-mm-dd])|(Rank Requierd to Vote)|(Number of Votes per Person)`);return;}//set number
    let question = args[0]
    if(question.length > 900){sender.send("The question can only be 900 characters long");return;}
    let closeDate = args[1]
    if(common.methods.isValidDate(closeDate)==="no"){sender.send(`The close date field is not a valid date it must be formated yyyy-mm-dd`);return;}
    let rankRequiredToVote =args[2]
    let rankCheck=0
    if(rankRequiredToVote==="m"){rankCheck=1}
    if(rankRequiredToVote==="o"){rankCheck=1}
    if(rankRequiredToVote==="e"){rankCheck=1}
    if(rankCheck===0){sender.send(`Rank Required to Vote is not correct. It must be either\n\"m\" to allow all members to vote and view the poll\n\"o\" to allow only ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} or ${ranksConfig.data.officerRanks.join(" or ")} to vote and view the poll\nor \"e\" to allow only${ranksConfig.data.elevatedOfficerRanks.join(" or ")} to vote and view the poll`);return;}
    let numberOfVotesPerPerson = args[3]
    numVotePat= new RegExp("^\\d{1,45}$")
    if(!numVotePat.test(numberOfVotesPerPerson)){sender.send("Number of Votes Per Person is not correct this must be a number");return;};
    let owner =message.author.id
    ref=firebase.database().ref("polls")
    ref.push({
        "properties":{
            "Owner": owner,
            "Close Date": closeDate,
            "Rank Required to Vote": rankRequiredToVote,
            "Number of Votes Per Person": numberOfVotesPerPerson,
            "Status": "Creating",
            "Question": question,
            "Options": "",
            "Vote Tallies": "",
            "Search Term":"ThisONE1!"
        }
    }).then(function(){
        ref.orderByChild("properties/Search Term").equalTo("ThisONE1!").once("value", function(snapshot){
            existsTest =snapshot.val()
            if(existsTest){
                snapshot.forEach(function(data){
                    pollNumber = data.key
                    searchRef =ref.child(`${pollNumber}/properties/Search Term`)
                    searchRef.remove()
                    common.methods.displayPoll(ref, pollNumber, sender)
                 })
            }
        })
    })
}
module.exports.help = {
    name: "addpoll"//Change to name of command
}