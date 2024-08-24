import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchPosts } from '../../services/api';
import { Card } from 'antd';

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  subContainer: {
    width: '70%',
    display: 'flex',
    marginTop: '50px',
    zIndex: '0',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  list: {
    padding:'0px'
  },
  heading: {
    margin: '0px',
  },
  listItem: {
    listStyleType: 'none',
  },
  card: {
    margin: '10px',
    alignSelf: 'center',
  },
  postTitle: {
    margin: '0px',
  },
  postContent: {
    color: '#000000',
    margin: '0px',
  },
};

class PostList extends React.Component {
  state = {
    posts: [],
    loading: true,
  };

  componentDidMount() {
    fetchPosts()
      .then(data => {
        this.setState({ posts: data.posts, loading: false });
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }

  render() {
    const { posts, loading } = this.state;

    const jwtToken = Cookies.get('jwt_token');
    console.log(jwtToken);

    if (jwtToken === undefined) {
      return <Navigate to="/login" />;
    }

    return (
      <div style={styles.container}>
        <div style={styles.subContainer}>
          <h2 style={styles.heading}>Posts</h2>
          <ul style={styles.list}>
            {posts?.map(post => (
              <li style={styles.listItem} key={post.id} >
                <Card style={styles.card}>
                  <Link to={`/posts/${post.id}`} >
                    <h3 style={styles.postTitle}>{post.title}</h3>
                    <p style={styles.postContent}>{post.content.substring(0, 100)}...</p>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostList;
