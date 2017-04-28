var Clapp = require('../modules/clapp-discord');
const database = require('../modules/Mongoose')

var allowed = ["172392020969521154"]
var members = []
var Member = function (username) {
  this.UUID = "",
  this.aliases = [],
  this.skills = {}
}
var skills = []

//NEW
module.exports = new Clapp.Command({
  name: "new",
  desc: "Creates a new thing",
  fn: (argv, context) => {
    console.log('Author ID: ' + context.authorID)
    if ( allowed.indexOf(context.authorID) != (-1) ) {
      if (argv.args.target_option == "user") members.push(new Member(argv.args.identifier))
      if (argv.args.target_option == "skill") skills.push(argv.args.identifier)
      console.log("Members List: " + members)
      console.log("Skills List: " + skills)
      return 'Creating new ' + argv.args.target_option + ', with ID ' + argv.args.identifier;
    }
    return "Silly " + context.authorName + ", you can't do that. Commands are for admins!"
  },
  args: [
    {
      name: 'target_option',
      desc: 'Select either user or skill as the target for new',
      type: 'string',
      required: true,
      default: 'SKILL',
      validations: [
        {
          errorMessage: 'Must either select user or skill',
          validate: value => {
            if (value == "user" || value == "skill") return true
            return false
          }
        }
      ]
    },
    {
      name: 'identifier',
      desc: 'Identifies either the UUID or the skill name you want to create',
      type: 'string',
      required: true,
      default: '',
      validations: [
        {
          errorMessage: 'Must include a selector for UUID or Skill Name',
          validate: value => {
            if (value == '') return false
            //Check against database for whether already exists
            return true
          }
        }
      ]
    }
  ]
});
