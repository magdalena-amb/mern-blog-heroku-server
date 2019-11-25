const Post = require('../models/post.model');
const uuid = require('uuid');

// get all posts
exports.getPosts = async (req, res) => {
    try {
      res.status(200).json(await Post.find());
    } catch(err) {
      res.status(500).json(err);
    }

};

// get single post
exports.getSinglePost = async (req, res ) => {
    try {
        let post = await Post.findOne({id:req.params.post_id});
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
}

// add post
exports.addPost = async (req, res) => {
  try {
    let newPost = new Post(req.body)
    newPost.id = uuid();

    postSaved = await newPost.save();
    res.status(200).json(postSaved);

  } catch(err) {
    res.status(500).json(err);
  }
}

// edit post
exports.editPost = async (req, res) => {
 
  try {
      let editedPost = await Post.updateOne(
        {id:req.params.post_id}, 
        {
          author: req.body.author,
          content: req.body.content,
          title: req.body.title,
        }
        );
    
      res.status(200).json(editedPost);
    
  } catch(err) {
    res.status(500).json(err);
  }
}

// get posts by range
exports.getPostsByRange = async function (req, res) {

  try {
    let { startAt, limit } = req.params;

    startAt = parseInt(startAt);
    limit = parseInt(limit);
    
    const posts = await Post.find().skip(startAt).limit(limit);
    const amount = await Post.countDocuments();

    res.status(200).json({
      posts, 
      amount
    });

  } catch(err) {
    res.status(500).json(err);
  }

};

// get random post
exports.getRandomPost = async function (req, res) {

  try {

    const count = await Post.countDocuments();
     // Get a random post
    const random = Math.floor(Math.random() * count);
    const randomPost = await Post.findOne().skip(random);

    res.status(200).json(randomPost);
    
  }
  catch(err) {
    res.status(500).json(err);
  }
};

