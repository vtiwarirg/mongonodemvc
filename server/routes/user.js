const user = require('../controllers/users');
var { auth } = require('../../config/jwtauth');

module.exports = (app) => {
    //POST HTTP method to login
    app.route('/user/login').post(user.login);
    //POST HTTP method to register
    app.route('/user/register').post(user.register);
    //DELETE HTTP method to profile. Here, we pass in a params which is the object id.
    app.route('/user/profile').get(auth, user.profile);
};