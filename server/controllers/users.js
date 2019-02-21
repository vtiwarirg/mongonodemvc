const user = require('../models/users');
const passport = require('passport');
module.exports = {
    register(req, res) {
        let newUser = new user();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.setPassword(req.body.password);
        newUser.save(function (err) {
            var token;
            token = newUser.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        });
    },
    login(req, res) {
        passport.authenticate('local', function (err, user, info) {
            var token;
            // If Passport throws/catches an error
            if (err) {
                res.status(404).json(err);
                return;
            }
            // If a user is found
            if (user) {
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token": token
                });
            } else {
                // If user is not found
                res.status(401).json(info);
            }
        })(req, res);
    },

    profile(req, res) {
        if (!req.payload._id) {
            res.status(401).json({
                "message": "UnauthorizedError: private profile"
            });
        } else {
            user
                .findById(req.payload._id)
                .exec(function (err, user) {
                    res.status(200).json(user);
                });
        }
    },

}