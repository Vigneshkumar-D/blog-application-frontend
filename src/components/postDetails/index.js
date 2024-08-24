import React from 'react';
import { fetchPostById, createComment } from '../../services/api';
import withRouter from '../../../src/utils/withRouter';

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  subContainer: {
    width: '70%',
    display: 'flex',
    marginTop: "50px",
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  postTitle: {
    marginBottom: '10px',
  },
  postContent: {
    margin: '0px',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  commentsHeader: {
    margin: '0px',
    borderBottom: '1px solid #ddd',
  },
  commentsList: {
    listStyleType: 'none',
    padding: 0,
  },
  commentItem: {
    marginBottom: '15px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  commentContent: {
    margin: '0',
    fontSize: '16px',
  },
  commentMetadata: {
    display: 'block',
    color: '#555',
  },
  commentDetails: {
    fontSize: '14px',
  },
  separator: {
    margin: '0 5px',
  },
  addCommentHeader: {
    margin: '0px',
  },
  form: {
    marginTop: '20px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: '10px',
    alignSelf: 'flex-end',
  },
};

class PostDetail extends React.Component {
  state = {
    postData: null,
    comments: [],
    newComment: '',
    loading: true,
  };

  componentDidMount() {
    const { id } = this.props.params;
    fetchPostById(id)
      .then(data => {
        const parsedComments = typeof data.post.comments === 'string'
          ? JSON.parse(data.post.comments)
          : data.post.comments;
        console.log(data);

        this.setState({ postData: data.post, comments: parsedComments || [], loading: false });
      })
      .catch(error => console.error('Error fetching post:', error));
  }

  handleCommentChange = (event) => {
    this.setState({ newComment: event.target.value });
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const { id } = this.props.params;
    const { newComment } = this.state;

    if (newComment.trim()) {
      createComment(id, newComment)
        .then(comment => {
          this.setState(prevState => ({
            comments: [...prevState.comments, comment.comment],
            newComment: '',
          }));
        })
        .catch(error => console.error('Error adding comment:', error));
    }
  };

  render() {
    const { postData, comments, newComment, loading } = this.state;

    console.log("com", comments);

    return (
      <div style={styles.container}>
        <div style={styles.subContainer}>
          <h2 style={styles.postTitle}>{postData?.title}</h2>
          <p style={styles.postContent}>{postData?.content}</p>
          <p>
            <span style={styles.boldText}>Posted On:</span> {postData?.createdAt}
          </p>

          <h3 style={styles.commentsHeader}>Comments</h3>
          <ul style={styles.commentsList}>
            {comments?.map((comment, index) => (
              <li key={index} style={styles.commentItem}>
                <p style={styles.commentContent}>{comment.content}</p>
                <small style={styles.commentMetadata}>
                  <em style={styles.commentDetails}>
                    <span style={styles.boldText}>Commented by:</span> {comment.username}
                    <span style={styles.separator}>|</span>
                    <span style={styles.boldText}>On:</span> {comment?.createdAt}
                  </em>
                </small>
              </li>
            ))}
          </ul>

          <h4 style={styles.addCommentHeader}>Add a Comment</h4>
          <form onSubmit={this.handleCommentSubmit} style={styles.form}>
            <textarea
              value={newComment}
              onChange={this.handleCommentChange}
              style={styles.textarea}
              placeholder="Write your comment here..."
            />
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}


export default withRouter(PostDetail);
