module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(common.methods.officerCheck(message) === "no"){sender.send("You Don't Have Permission to do that");return;}
    if(args.length !== 2){sender.send(`Incorrect number of arguments for this command\nThe format is\n${botConfig.prefix}linkmember|(Gw2 Account)|(@ mention)`);return;}//set number
    if(message.channel.type==="dm"){sender.send("This command can not be done as a whisper and should be done in the bot command channel on the server");return;}
    ref = firebase.database().ref("members")
    //gw2account
    gw2AccountIn = args[0].toLowerCase();
    gw2Account=`${gw2AccountIn.slice(0,-5)}${gw2AccountIn.slice(-4)}`;
    //discord
    discordcheck =args[1]
    if(discordcheck===""){ sender.send("An @mention of the member's discord account must be included"); return;};
    server=bot.guilds.find("name", servername)
    discordAt= server.member(message.mentions.users.first())

    if(!discordAt){ sender.send("Could not find that discord user"); return;};
    discordAccount = `${discordAt.user.username}#${discordAt.user.discriminator}`
    discordID =discordAt.user.id
    ref.orderByChild("Discord ID").equalTo(discordID).once("value", function(snapshot){
            disExistsTest = snapshot.val() !== null
            if(disExistsTest){discordTest="yes"}else{discordTest="no"}
        }).then( function(){
            memRef =ref.child(gw2Account)
            memRef.once("value")
            .then(function(snapshot) {
                let existsTest = snapshot.val() !== null
                if(existsTest){
                    if(snapshot.child("Discord ID").val()!=="none"){sender.send("This account is already linked to a Discord user");return;} 
                    if(discordTest==="yes"){sender.send(`A guild member is already associted with this discord account`);return;}
                    memRef.child("Discord Account").set(discordAccount)
                    memRef.child("Discord ID").set(discordID)
                    sender.send("Account Linked")
                }else{sender.send("Could not find a match")
            }
        })
    })
}
module.exports.help = {
    name: "linkmember"//Change to name of command
}