const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Post = require('../models/Posts');

// Get Post
router.get('/', async (req, res) => {
  // res.send(`On Posts`);
  try{
  const allPosts = await Post.find();
  res.json(allPosts);
  }catch{
    res.json({message : error})
  }
});

// Submitting a Post
router.post('/', (req, res) => {
  const post = new Post({
    title : req.body.title,
    description : req.body.description,
    price : req.body.price,     
  })

  post.save()
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    res.json({message : error})
  })
});

// Getting a specific Post
router.get('/:postId', async (req, res) => {
  const getPost = await Post.findById(req.params.postId)
  res.json(getPost);
});

// Delete a specific Post
router.delete('/:postId', async (req, res) => {
  const removePost = await Post.remove({_id : req.params.postId});
  res.json(removePost);
})

// Updating a Post
router.patch('/:postId', async (req, res) => {
  const updatedPost = await Post.updateOne(
    {_id : req.params.postId}, 
    {$set : {description : req.body.description}
  });
  res.json(updatedPost);
});

module.exports = router;