// import './App.css';
// import React, { Component } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/header';
// import Footer from './components/footer';
// import PostList from './components/postList';
// import PostDetail from './components/postDetails';
// import Login from './components/login';
// import RegistrationForm from './components/registration';
// import CreatePost from './components/createPost';

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <div>
//           <Header /> 
//           <Routes>
//             <Route path='/login' element={<Login />} />
//             <Route exact path="/" element={<PostList />} />
//             <Route path="/posts/:id" element={<PostDetail />} />
//             <Route path="/edit-post/:id" element={<CreatePost />} />
//             <Route path="/create-post" element={<CreatePost />} />
//             <Route path="/account/register" element={<RegistrationForm />} />
//           </Routes>
//           <Footer />
//         </div>
//       </Router>
//     );
//   }
// }

// export default App;

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PostList from './components/postList';
import PostDetail from './components/postDetails';
import Login from './components/login';
import RegistrationForm from './components/registration';
import CreatePost from './components/createPost';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<PostList />} />
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="edit-post/:id" element={<CreatePost />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="account/register" element={<RegistrationForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
