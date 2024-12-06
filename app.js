const express = require('express')
const cors = require('cors')
const app = express()
const postRoutes = require('./routes/post.js')
const notFoundMiddleware = require('./middlewares/notFound.js')
const loggerMiddleware = require('./middlewares/loggerMiddleware.js')


app.use(express.json())
app.use(cors())
app.use(express.static('public'))


app.get('/posts/:id', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.listen(3000, () => {
    console.log('server started on port 3000');
});

/*app.use('/posts', (req, res, next) => {
    throw new Error('you bike everything dude!');
})
app.use('/posts', loggerMiddleware)*/
app.use('/posts', postRoutes)
/*app.use(notFoundMiddleware)

app.use((err, req, res, next) => {
    //console.log('Error:', err.message);
    console.error(err.stack);
    res.status(500).send({
        message: 'Something went wrong',
        error: err.message
    })
});*/
