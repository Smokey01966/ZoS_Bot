module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}editmyself|(Field)|(Data)`);return;}//set number
    let discordAccount = `${sender.username}#${sender.discriminator}`
    let field = args[0]
    let input = args[1]
    ref = firebase.database().ref("members")
    ref.orderByChild("Discord Account").equalTo(discordAccount).once("value", function(snapshot){
        snapshot.forEach(function(data){
            gw2Account = data.key
            var fieldRef = ref.child(`${gw2Account}/${field}`)
            if((memberFieldsConfig.data.editFields.indexOf(field)) === -1){sender.send("That is not a valid field");return;}
            fieldRef.set(input)
            sender.sendMessage("Member Updated")
            common.methods.displayUserInfo(ref, gw2Account, sender)
        })
    })
}
module.exports.help = {
    name: "editmyself"//Change to name of command
}