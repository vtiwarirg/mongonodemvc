const bucketlist = require('../models/lists');
module.exports = {
    index(req, res) {
        bucketlist.getAllLists((err, lists) => {
            if (err) {
                res.json({ success: false, message: `Failed to load all lists. Error: ${err}` });
            } else {
                res.write(JSON.stringify({ success: true, lists: lists }, null, 2));
                res.end();
            }
        });
    },
    create(req, res, next) {
        let newList = new bucketlist({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        });
        bucketlist.addList(newList, (err, list) => {
            if (err) {
                res.json({ success: false, message: `Failed to create a new list. Error: ${err}` });
            } else {
                res.json({ success: true, message: "Added successfully." });
            }
        });
    },
    delete(req, res, next) {
        //access the parameter which is the id of the item to be deleted
        let id = req.params.id;
        //Call the model method deleteListById
        bucketlist.deleteListById(id, (err, list) => {
            if (err) {
                res.json({ success: false, message: `Failed to delete the list. Error: ${err}` });
            } else if (list) {
                res.json({ success: true, message: "Deleted successfully" });
            } else {
                res.json({ success: false });
            }
        });
    }
}