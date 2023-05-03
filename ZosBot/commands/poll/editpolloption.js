module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 3){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}editpolloption|(Poll Number)|(Option Number)|(New Option)`);return;}//set number
    let pollNumber=args[0]
    let optionNumber=args[1]-1
    let option=args[2]
    if(option.length > 900){sender.send("The option can only be 900 characters long");return;}
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
            pollRef.once("value", function(snapshot){
                options =(snapshot.child("properties/Options").val())
                status = (snapshot.child("properties/Status").val())
            }).then(function(){
                if(status!=="Creating"){sender.send("This poll is not in a status that allows editing");return;}
                workingOptions=options.split("|")
                if(workingOptions[0]===""){sender.send("The poll has no options use /addpolloption to add options");return;}
                if(workingOptions.length<optionNumber+1){sender.send("This poll option number does not exist");return;}
                workingOptions[optionNumber]=option
                newOptions=workingOptions.join("|")
                pollOptionRef=ref.child(`${pollNumber}/properties/Options`)
                pollOptionRef.set(newOptions)
                common.methods.displayPoll(ref, pollNumber, sender)
            })
        })
    }) 
    


}
module.exports.help = {
    name: "editpolloption"//Change to name of command
}