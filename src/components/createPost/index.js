import React, { Component } from 'react';
import withRouter from '../../utils/withRouter';
import { createPost } from '../../services/api';
import Cookies from 'js-cookie';

class CreatePost extends Component {
  state = {
    title: '',
    content: '',
    loading: false,
    error: null,
    success: false,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { title, content } = this.state;
    const username = Cookies.get('username')

    if (!title.trim() || !content.trim()) {
      this.setState({ error: 'Title and content are required.' });
      return;
    }

    this.setState({ loading: true, error: null });
    const formData = { title, content,  username}

    try {
      const createdPost = await createPost(formData);
      this.setState({ loading: false, success: true, title: '', content: '' });
    } catch (error) {
      const errorMessage = error.message || 'Error creating post.';
      this.setState({ loading: false, error: errorMessage });
    }
  };

  render() {
    const { title, content, loading, error, success } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.subContainer}>
          <h2>Create New Post</h2>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>Post created successfully!</p>}
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="title" style={styles.label}>Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={this.handleInputChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="content" style={styles.label}>Content:</label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={this.handleInputChange}
                style={styles.textarea}
                required
              />
            </div>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',

  },
  subContainer: {
    marginTop: "50px"
  },
  form: {
    marginTop: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '8px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
};

export default withRouter(CreatePost);
