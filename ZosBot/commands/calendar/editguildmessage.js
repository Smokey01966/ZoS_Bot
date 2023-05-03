module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}editguildmessage|(Day or \"Header\")|(Message)`);return;}//set number
    let field=args[0]
    feildCheck=0
    if(field === "Header"){feildCheck=1}
    if(field === "Monday"){feildCheck=1}
    if(field === "Tuesday"){feildCheck=1}
    if(field === "Wednesday"){feildCheck=1}
    if(field === "Thursday"){feildCheck=1}
    if(field === "Friday"){feildCheck=1}
    if(field === "Saturday"){feildCheck=1}
    if(field === "Sunday"){feildCheck=1}
    if(feildCheck===0){sender.send("That is not a valid field");return;}
    let gMessage=args[1]
    if(gMessage===""){gMessage="None"}
    if(gMessage.length > 900){sender.send("The message can only be 900 characters long");return;}
    ref=firebase.database().ref(`guildmessages/${field}`)
    ref.set(gMessage)
    ref.once("value", function(snapshot){
        let messageEmbed =new discord.RichEmbed()
        .setTitle(field)
        .setColor("#3d7d05")
        .addField("Updated to", (snapshot.val()))
    sender.send(messageEmbed)
    })

}
module.exports.help = {
    name: "editguildmessage"//Change to name of command
}