var Clapp = require('../modules/clapp-discord');

var allowed = ["172392020969521154"]
var members = [new Member("Greenitthe")]
var Member = function (uuid) {
  this.UUID = uuid,
  this.aliases = [],
  this.skills = {}
}
var skills = []

//SET
module.exports = new Clapp.Command({
  name: "set",
  desc: "Sets someone's skill to a value",
  fn: (argv, context) => {
    console.log('Author ID: ' + context.authorID)
    if ( allowed.indexOf(context.authorID) != (-1) ) {
      var memberName = argv.args.user;
      var thisMember = members.filter(function (obj) {
        if (obj.UUID === memberName || obj.aliases.indexOf(memberName) != -1) return true
        return false
      })[0]
      if (!thisMember) return "No user found with ID or name " + memberName
      console.log(thisMember)
      console.log("skills list: " + skills)
      return "Setting " + argv.args.user + "'s " + argv.args.skill_name + " stat to " + argv.args.skill_level;
    }
    return "Silly " + context.authorName + ", you can't do that. Commands are for admins!"
  },
  args: [
    {
      name: 'user',
      desc: 'UUID/alias of the person you want to update',
      type: 'string',
      required: true,
      default: '',
      validations: [
        {
          errorMessage: 'Must supply a UUID/alias for the person you want to update',
          validate: value => {
            if (value == '') return false
            return true
          }
        }
      ]
    },
    {
      name: 'skill_name',
      desc: 'Identifies the name of the skill you want to set',
      type: 'string',
      required: true,
      default: '',
      validations: [
        {
          errorMessage: 'Must include a selector for Skill Name',
          validate: value => {
            if (value == '') return false
            return true
          }
        }
      ]
    },
    {
      name: 'skill_level',
      desc: 'The level you want to set this skill to',
      type: 'number',
      required: true,
      default: 0,
      validations: [
        {
          errorMessage: 'Must provide a level to set the skill to',
          validate: value => {
            //Check against database for whether already exists
            return true
          }
        }
      ]
    }
  ]
});
