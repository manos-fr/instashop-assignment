const Parse = require('parse/node');

const logIn = async (req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  try {
    await Parse.User.logIn(req.body.username, req.body.password);
    const currentUser = Parse.User.current();
    const user = {
      objectId: currentUser.id,
      username: currentUser.get('username'),
      sessionToken: currentUser.get('sessionToken'),
    };

    const acl = currentUser.get('ACL').permissionsById;
    const role = Object.keys(acl)[0];
    const rolePermissions = acl[role];
    console.log('perms: ', acl[role]);
    user.permissions = rolePermissions;
    console.log('user: ', user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: 'Invalid username or password. Please try again!' });
  }
};

const logOut = async (req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  try {
    await Parse.User.logOut();
    res.status(200).json({ message: 'User Successfully Logged Out' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  logIn,
  logOut,
};
