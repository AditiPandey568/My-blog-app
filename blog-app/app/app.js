const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving static files like CSS

const posts = []; // This will hold your posts temporarily

// Home Route - Display Posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Create New Post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    const newPost = { title, content, comments: [] }; // Add comments array
    posts.push(newPost);
    res.redirect('/'); // Redirect to home to view posts
});

// Edit Post Route
app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;   // Get the post ID from the URL
    const post = posts[postId];     // Retrieve the post using the ID

    if (!post) {
        return res.status(404).send('Post not found');
    }

    res.render('edit', { post, id: postId });   // Pass the post and ID to the template
});

// Update Post Route
app.post('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    // Update the post
    posts[postId] = { title, content, comments: posts[postId].comments };
    res.redirect('/'); // Redirect to home
});

// Delete Post Route
app.post('/posts/:id', (req, res) => {
    const postId = req.params.id;
    posts.splice(postId, 1); // Remove the post by index
    res.redirect('/'); // Redirect to home
});

// Add Comment Route
app.post('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const comment = req.body.comment;

    // Add comment to the post
    if (posts[postId]) {
        posts[postId].comments.push(comment);
    }

    res.redirect('/'); // Redirect to home to view posts
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
