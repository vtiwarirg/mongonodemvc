const bucketlist = require('../controllers/bucketlist');

module.exports = (app) => {
    //GET HTTP method to /bucketlist
    app.route('/bucketlist').get(bucketlist.index);
    //POST HTTP method to /bucketlist
    app.route('/bucketlist').post(bucketlist.create).get(bucketlist.index);
    //DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
    app.route('/bucketlist/:id').delete(bucketlist.delete);
};