module.exports.run = async (bot, message, args) => {
    let sender = message.author;
    message.delete().catch(O_o=>{});
    if(args.length !== 1){sender.send(`Incorrect number of arguments for this command\nThe format is:\n${botConfig.prefix}lookupguildmessage|(Day of the Week[if left blank defaults to curent day of the week])`);return;}//set number
    let day = args[0]
    if(day===""){
        var weekday = new Array(7);
            weekday[0] =  "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            day = weekday[moment().tz(timeZone).day()];
        }
    feildCheck=0
    if(day === "Monday"){feildCheck=1}
    if(day === "Tuesday"){feildCheck=1}
    if(day === "Wednesday"){feildCheck=1}
    if(day === "Thursday"){feildCheck=1}
    if(day === "Friday"){feildCheck=1}
    if(day === "Saturday"){feildCheck=1}
    if(day === "Sunday"){feildCheck=1}
    if(feildCheck===0){sender.send("That is not a valid field");return;}
    ref=firebase.database().ref("guildmessages")
    common.methods.displayGuildMessage(ref, day, sender)

}
module.exports.help = {
    name: "lookupguildmessage"//Change to name of command
}