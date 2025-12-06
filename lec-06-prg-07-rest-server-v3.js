const express = require('express');
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));

const myManager = {
    database: {},

    create: function(id, value) {
        if (id in this.database) {
            return { [id]: "None" };
        } else {
            this.database[id] = value;
            return { [id]: this.database[id] };
        }
    },

    read: function(id) {
        if (id in this.database) {
            return { [id]: this.database[id] };
        } else {
            return { [id]: "None" };
        }
    },

    update: function(id, value) {
        if (id in this.database) {
            this.database[id] = value;
            return { [id]: this.database[id] };
        } else {
            return { [id]: "None" };
        }
    },

    delete: function(id) {
        if (id in this.database) {
            delete this.database[id];
            return { [id]: "Removed" };
        } else {
            return { [id]: "None" };
        }
    }
};

app.route('/membership_api/:member_id')
    .post((req, res) => {
        const memberId = req.params.member_id;
        const value = req.body[memberId];
        res.json(myManager.create(memberId, value));
    })
    .get((req, res) => {
        const memberId = req.params.member_id;
        res.json(myManager.read(memberId));
    })
    .put((req, res) => {
        const memberId = req.params.member_id;
        const value = req.body[memberId];
        res.json(myManager.update(memberId, value));
    })
    .delete((req, res) => {
        const memberId = req.params.member_id;
        res.json(myManager.delete(memberId));
    });

app.listen(port, () => {
    console.log(`REST API Server started on port ${port}`);
});