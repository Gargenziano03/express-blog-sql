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
    const id = req.params.id

    const sql = `SELECT * FROM pizzas WHERE id = ?`

    const tagsSql = `
    SELECT tags.*
    FROM tags
    JOIN post_tag ON tag.id = post_tag.tag.id
    WHERE post_tag.post_id ?
    `;

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) return res.status(404).json({ error: `404! Not found` });

        const post = results[0]
        console.log('Post ogj', pizza);

        connection.query(tagsSql, [id], (err, taagsResults) => {

            if (err) return res.status(500).json({ error: err })

            post.tags = taagsResults;

            const responseData = {
                data: post
            }

            console.log(responseData);


            res.status(200).json(responseData);
        })

    });

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