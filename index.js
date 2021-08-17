const fs = require('fs');
const axios = require('axios');

async function prepareCsv() {
  // Get all the posts
  // Get all the comments

  // Loop through posts,
  // for each post, loop through comments to find comment with postId == post.Id
  // add
  try {
    const transformedPosts = [];
    const posts = await getPosts();
    const comments = await getComments();

    posts.forEach((post) => {
      relatedComments = comments.filter(
        (comment) => comment.postId === post.id
      );

      if (relatedComments) {
        relatedComments.forEach((comment) => {
          post.comments = post.comments
            ? post.comments + ' | ' + comment.body
            : comment.body;
          transformedPosts.push(post);
        });
      }
    });

    //console.log(transformedPosts);
    fs.writeFile(
      'transformedPosts.csv',
      JSON.stringify(transformedPosts),
      (err) => {
        if (err) console.log(err);
        else {
          console.log('File written successfully\n');
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
}

async function getPosts() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
async function getComments() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/comments'
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

prepareCsv();
