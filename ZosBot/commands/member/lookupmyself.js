module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 0){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}lookupmyself`);return;}//set number
    let discordAccount = `${sender.username}#${sender.discriminator}`
    ref = firebase.database().ref("members")
    ref.orderByChild("Discord Account").equalTo(discordAccount).once("value", function(snapshot){
        snapshot.forEach(function(data){
            gw2Account = data.key
            common.methods.displayUserInfo(ref, gw2Account, sender)
        })
    })
}
module.exports.help = {
    name: "lookupmyself"//Change to name of command
}