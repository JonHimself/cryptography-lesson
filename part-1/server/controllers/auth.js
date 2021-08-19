const bcryptjs = require('bcryptjs');
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const exsisting = bcryptjs.compareSync(password, users[i].passwordHash);
        if (username && exsisting) {
          // users[i].username.push(username)
          console.log('success', users)
          let userToReturn = {...users[i]}
          delete userToReturn.passwordHash
          res.status(200).send(users[i])
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      let {username, email, firstName, lastName, password} = req.body
      const salt = bcryptjs.genSaltSync(5)
      const passwordHash = bcryptjs.hashSync(password, salt)
      let userObj = {
        username,
        email,
        firstName,
        lastName,
        passwordHash
      }
        console.log('Registering User')
        users.push(userObj)
        let userToReturn = {...userObj};
        delete userToReturn.passwordHash;
        res.status(200).send(userToReturn)
        console.log('new user', users)
    }
}