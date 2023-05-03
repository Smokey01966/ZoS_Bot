module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 3){sender.send(`Incorrect number of arguments for this command\nThe format is\n${botConfig.prefix}editpollproperties|(Poll Number)|(Field)|(Data)`);return;}//set number
    let pollNumber=args[0]
    let field=args[1]
        feildCheck=0
        if(field === "Close Date"){feildCheck=1}
        if(field === "Number of Votes Per Person"){feildCheck=1}
        if(field === "Question"){feildCheck=1}
        if(field === "Rank Required to Vote"){feildCheck=1}
        if(feildCheck===0){sender.send("That is not a valid field");return;}
    let data=args[2]
        if(field==="Question"){if(data.length > 900){sender.send("The question can only be 900 characters long");return;}}
        if(field==="Close Date"){if(common.methods.isValidDate(data)==="no"){sender.send(`The close date field is not a valid date it must be formated yyyy-mm-dd`);return;}}
        if(field==="Rank Required to Vote"){
            let rankCheck=0
            if(data==="m"){rankCheck=1}
            if(data==="o"){rankCheck=1}
            if(data==="e"){rankCheck=1}
            if(rankCheck===0){sender.send(`Rank Required to Vote  is not correct. It must be either\n\"m\" to allow all members to vote and view the poll\n\"o\" to allow only ${ranksConfig.data.elevatedOfficerRanks.join(" or ")} or ${ranksConfig.data.officerRanks.join(" or ")} to vote and view the poll\nor \"e\" to allow only${ranksConfig.data.elevatedOfficerRanks.join(" or ")} to vote and view the poll`);return;} 
        }
        if(field==="Number of Votes Per Person"){
            numVotePat= new RegExp("^\\d{1,45}$")
            if(!numVotePat.test(data)){sender.send("Number of Votes Per Person is not correct this must be a number");return;};
        }
    ref=firebase.database().ref("polls")
    var pollRef =ref.child(pollNumber)
    var fieldRef =ref.child(`${pollNumber}/properties/${field}`)
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
                options =(snapshot.child("properties/Options").val())
                status = (snapshot.child("properties/Status").val())
            }).then(function(){
                if(status!=="Creating"){sender.send("This poll is not in a status that allows editing");return;}
                fieldRef.set(data)
                sender.send("Poll Property Updated")
                common.methods.displayPoll(ref, pollNumber, sender)
            })
        })
    }) 
    


}
module.exports.help = {
    name: "editpollproperties"//Change to name of command
}