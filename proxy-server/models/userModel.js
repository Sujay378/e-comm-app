const fs = require('fs');
const { getUserDBPath } = require('../helpers/getFilePath');

class User {
  constructor() {}

  fetchAllUsers(cb) {
    fs.readFile(getUserDBPath(), 'utf-8', (err, data) => {
      if(err) return;
      cb(JSON.parse(data));
    })
  }

  writeUserFile(newData, cb) {
    fs.writeFile(getUserDBPath(), JSON.stringify(newData), err => {
      cb(err);
    })
  }

  getSingleUser(email, cb) {
    this.fetchAllUsers(data => {
      const { users } = data;
      const desiredUser = users.find(user => user.email === email);
      cb(desiredUser);
    })
  }

  updateUser(updatedData, cb) {
    this.fetchAllUsers(data => {
      const { users } = data;
      const filteredUsers = users.filter(user => !(user.id === updatedData.id));
      this.writeUserFile({users: [...filteredUsers, updatedData]}, cb);
    })
  }

  deleteUser(email, cb) {
    this.fetchAllUsers(data => {
      const allUsers = data['users'];
      const filteredUsers = allUsers.filter(user => !(user.email === email));
      const newData = {
        users: [
          ...filteredUsers
        ]
      }
      this.writeUserFile(newData, cb);
    })
  }

  registerNewUser(newUser, cb) {
    this.fetchAllUsers(data => {
      const newData = {
        users: [
          ...data['users'],
          newUser
        ]
      };
      this.writeUserFile(newData, cb);
    })
  }

  logger() {
    console.log("User model working")
  }
}

module.exports = new User();
