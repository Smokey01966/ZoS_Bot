//CODE STUFF BELOW DO NOT TOUCH
var methods ={};
var data ={};
//CODE STUFF ABOVE DO NOT TOUCH
data.memberRanks=[
    //list the ranks that have no officer or elevated officer permissions you wish to use here
    //"Example format",
    //"Example format for last item"
    "Mist Zealot",
    "Veteran Zealot",
    "Zealot",
    "Initiate",
    "AWOL",
    "Developer"
]
data.elevatedOfficerRanks = [
    //list the ranks that have elevated officer permissions here.
    //"Example format",
    //"Example format for last item"
    "Arch"
]
data.officerRanks=[
    //list the ranks that have officer permissions here.
    //"Example format",
    //"Example format for last item"
    "High Zealot"
]
//CODE STUFF BELOW DO NOT TOUCH
data.ranks=data.memberRanks.concat(data.elevatedOfficerRanks.concat(data.officerRanks))
data.numberOfElevatedOfficerRanks=data.elevatedOfficerRanks.length
data.numberOfOfficerRanks=data.officerRanks.length
data.numberOfMemberRanks=data.memberRanks.length
data.numberOfRanks=data.ranks.length
exports.methods = methods;
exports.data = data;
//CODE STUFF ABOVE DO NOT TOUCH