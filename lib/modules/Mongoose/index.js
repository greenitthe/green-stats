const mongoose = require('mongoose')

/**********************
** Mongoose Database **
**********************/
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/green-stats-data')

var Schema = mongoose.Schema

//Scheming
var memberSchema = new Schema({
  UUID: {type: String, require: true, unique: true },
  aliases: [],
  skills: {}
})
var serverMetaSchema = new Schema({
  serverID: {type: String, require: true, unique: true},
  takenAliases: [],
  knownSkills: []
})

var Member = mongoose.model('Member', memberSchema)
var ServerMeta = mongoose.model('ServerMeta', serverMetaSchema)

//Saves an updated server or creates one if no current entry passed
module.exports = {
  saveServer: function(serverID, callback, server) {
    var newServer = new ServerMeta({
      serverID: serverID,
      takenAliases: server.takenAliases || [],
      knownSkills: server.knownSkills || []
    })
  },
  getServerMeta: function(serverID, callback) {
    ServerMeta.findOne({ 'serverID': serverID }).exec(function(err, result) {
      cb(result)
    })
  },
  saveMember: function(memberUUID, callback, member) {
    var newMember = new Member({
      UUID: memberUUID,
      aliases: member.aliases || [],
      skills: member.skills || {}
    })
    newMember.save(callback)
  },
  getMember: function(memberUUID, callback) {
    Member.findOne({ 'UUID': memberUUID }).exec(function(err, result) {
      console.log(result)
      cb(result)
    })
  }
}
