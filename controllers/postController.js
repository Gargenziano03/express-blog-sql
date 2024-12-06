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

const store = (req, res) => {
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: [req.body.tags],
    }
    posts.push(post)

    fs.writeFileSync('./db/posts.js', `module.exports =${JSON.stringify(posts, null, 4)}`)

    console.log(req.body);

    return res.status(201).json({
        status: 201,
        data: posts,
        count: posts.length
    })
}

const update = (req, res) => {
    const post = posts.find((post) => post.title.toLowerCase() === req.params.title)
    if (!post) {
        return res.status(404).json({ error: `no post found with this ${req.params.title}` })
    }

    post.title = req.body.title
    post.slug = req.body.slug
    post.content = req.body.content
    post.image = req.body.imge
    post.tags = [req.body.tags]

    fs.writeFileSync('./db/posts.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

    res.status(200).json({
        status: 200,
        data: posts
    })
}
const destroy = (req, res) => {
    const post = posts.find((post) => post.title.toLowerCase() === req.params.title)
    if (!post) {
        return res.status(404).json({ error: `no post found with this ${req.params.title}` })
    }

    const newPosts = posts.filter(post => post.title.toLowerCase() !== req.params.title)

    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(newPosts, null, 4)}`)

    res.status(200).json({
        status: 200,
        data: newPosts
    })

}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}