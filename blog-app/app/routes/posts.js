const express = require('express');
const router = express.Router();

// Assuming posts is an array or object containing post data
const posts = [
    { title: 'Post 1', content: 'Content of post 1' },
    { title: 'Post 2', content: 'Content of post 2' }
];

// Edit post route
router.get('/edit/:id', (req, res) => {
    const postId = req.params.id;   // Get the post ID from the URL
    const post = posts[postId];     // Retrieve the post using the ID

    if (!post) {
        return res.status(404).send('Post not found');
    }

    res.render('edit', { post, id: postId });   // Pass the post and ID to the template
});

module.exports = router;
