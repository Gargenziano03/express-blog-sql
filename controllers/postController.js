//const posts = require('../db/posts.js')
const fs = require('fs')
const connection = require('../db/db')

const index = (req, res) => {
    const sql = 'SELECT * FROM posts'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });

        const responseData = {
            data: results,
            counter: results.length

        }
        res.status(200).json(responseData);
    })

};

const show = (req, res) => {
    const post = posts.find((post) => post.title.toLowerCase() === req.params.title)
    if (!post) {
        return res.status(404).json({ error: 'no post found with tha title' })
    }
    return res.status(200).json({ data: post })
};


const destroy = (req, res) => {
    console.log(req.params);

    const id = req.params.id;

    const sql = 'DELETE FROM posts WHERE id=?'

    connection.query(sql, [id], (err, results) => {
        console.log(err, results);
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) return res.status(404).json({ error: `404! No post found with the this id: ${id}` })

        return res.json({ status: 204, affectedRows: results.affectedRows })
    })
}

module.exports = {
    index,
    show,
    destroy
}