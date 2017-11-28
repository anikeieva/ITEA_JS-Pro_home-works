const Post = (bird) => ({
  post: () => console.log(`${bird.name} can post ${bird.whatPost}`)
});

export default Post;
