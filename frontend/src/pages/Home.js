// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import PostList from '../components/PostList.js';
// // import { Link } from 'react-router-dom';
// // import '../style.css'; // Import the CSS
// // import avatar from '../assets/user-circle.svg';
// // import axios from 'axios';


// // const Home = () => {
// //   const navigate = useNavigate();
// //   const [users, setUsers] = useState([]);

// //   const token = localStorage.getItem('token');
// //   if (!token) {
// //     navigate('/login');
// //   }
 

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/users/users', {
// //           headers: { Authorization: `Bearer ${token}` }, // Add authorization header if needed
// //         });
// //         setUsers(response.data); // The backend already excludes the logged-in user
// //       } catch (error) {
// //         console.error('Error fetching users:', error);
// //       }
// //     };
  
// //     fetchUsers();
// //   }, [token]); 

// //   return (
// //     <div className="container">
// //          <ul className="nav nav-pills user-profile-tab justify-content-end mt-2 bg-light-info rounded-2" id="pills-tab" role="tablist">
// //                         <li className="nav-item" role="presentation">
// //                             <button className="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true">
// //                                 <i className="fa fa-user me-2 fs-6"></i>
// //                                 <a href="/profile" className="text-decoration-none" > <span className="d-none d-md-block" >Profile</span></a>
// //                             </button>
// //                         </li>
// //                         <li className="nav-item" role="presentation">
// //                             <button className="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true">
// //                                 <i className="fa fa-user me-2 fs-6"></i>
// //                                 <a href="/profile" className="text-decoration-none" > <span className="d-none d-md-block" >Profile</span></a>
// //                             </button>
// //                         </li>
// //                     </ul>
// //       <div className="container-users">
// //       <div className="user-list">
// //         <h4 className="fw-semibold mb-3">Suggested people</h4>
// //         <div className="card shadow-none border">
// //           <div className="card-body">
// //             <div className="row">
// //               {users.map((user) => (
// //                 <div className="col-12 mb-4" key={user._id}>
// //                   <div className="text-center">
// //                     <Link to={`/users/${user._id}`}>
// //                       <img
// //                         src={user.profilePicture || avatar}
// //                         alt={user.username}
// //                         className="rounded-2 img-fluid mb-2"
// //                         style={{ width: '100px', height: '100px' }}
// //                       />
// //                       <p className="fw-semibold">{user.username}</p>
// //                     </Link>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="posts-section">
// //         <PostList />
// //       </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import PostList from '../components/PostList.js';
// import '../style.css'; // Import the CSS
// import avatar from '../assets/user-circle.svg';
// import axios from 'axios';

// const Home = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null); // Store logged-in user data

//   const token = localStorage.getItem('token');
//   if (!token) {
//     navigate('/login');
//   }

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users/users', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(response.data); // The backend already excludes the logged-in user
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     // Fetch the logged-in user's profile data
//     const fetchLoggedInUser = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setLoggedInUser(response.data);
//       } catch (error) {
//         console.error('Error fetching logged-in user:', error);
//       }
//     };

//     fetchUsers();
//     fetchLoggedInUser(); // Fetch logged-in user's data
//   }, [token]);

//   return (
//     <div className="nav-container">
//       {/* Navigation Panel */}
//       <ul
//         className="nav nav-pills user-profile-tab justify-content-between align-items-center bg-light-info rounded-2 custom-nav"
//         id="pills-tab"
//         role="tablist"
//       >
//         {/* Left - Logged-in User's Profile */}
//         <div className="d-flex align-items-center user-info">
//           {loggedInUser && (
//             <Link to="/profile" className="d-flex align-items-center text-decoration-none">
//               <img
//                 src={loggedInUser.profilePicture || avatar}
//                 alt="User Avatar"
//                 className="rounded-circle me-2"
//                 style={{ width: '40px', height: '40px' }}
//               />
//               <span className="fs-5 fw-semibold">{loggedInUser.username}</span>
//             </Link>
//           )}
//         </div>

//         {/* Right - Profile Navigation */}
//         <div className="d-flex">
//           <li className="nav-item" role="presentation">
//             <button
//               className="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
//               id="pills-home-tab"
//               data-bs-toggle="pill"
//               data-bs-target="#pills-home"
//               type="button"
//               role="tab"
//               aria-controls="pills-home"
//               aria-selected="true"
//             >
//               <i className="fa fa-home me-2 fs-6"></i>
//               <Link to="/" className="text-decoration-none">
//                 <span className="d-none d-md-block">Home</span>
//               </Link>
//             </button>
//           </li>
//         </div>
//       </ul>

//       {/* Suggested People and Posts */}
//       <div className="container-users">
//         <div className="user-list">
//           <h4 className="fw-semibold mb-3">Suggested people</h4>
//           <div className="card shadow-none border">
//             <div className="card-body">
//               <div className="row">
//                 {users.map((user) => (
//                   <div className="col-12 mb-4" key={user._id}>
//                     <div className="text-center">
//                       <Link to={`/users/${user._id}`}>
//                         <img
//                           src={user.profilePicture || avatar}
//                           alt={user.username}
//                           className="rounded-2 img-fluid mb-2"
//                           style={{ width: '100px', height: '100px' }}
//                         />
//                         <p className="fw-semibold">{user.username}</p>
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="posts-section">
//           <PostList />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PostList from '../components/PostList.js';
import '../style.css'; // Import the CSS
import avatar from '../assets/user-circle.svg';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null); // Store logged-in user data

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data); // The backend already excludes the logged-in user
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Fetch the logged-in user's profile data
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoggedInUser(response.data);
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };

    fetchUsers();
    fetchLoggedInUser(); // Fetch logged-in user's data
  }, [token]);

  return (
    <div className="nav-container">
      {/* Navigation Panel */}
      <ul
        className="nav nav-pills user-profile-tab justify-content-between align-items-center bg-light-info rounded-2 custom-nav"
        id="pills-tab"
        role="tablist"
      >
        {/* Left - Logged-in User's Profile */}
        <div className="d-flex align-items-center user-info">
          {loggedInUser && (
            <Link to="/profile" className="d-flex align-items-center text-decoration-none">
              <img
                src={loggedInUser.profilePicture || avatar}
                alt="User Avatar"
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px' }}
              />
              <span className="fs-5 fw-semibold">{loggedInUser.username}</span>
            </Link>
          )}
        </div>

        {/* Right - Profile Navigation */}
        <div className="d-flex">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <i className="fa fa-home me-2 fs-6"></i>
              <Link to="/" className="text-decoration-none">
                <span className="d-none d-md-block">Home</span>
              </Link>
            </button>
          </li>
        </div>
      </ul>

      {/* Suggested People and Posts */}
      <div className="container-users">
        <div className="user-list">
          <h4 className="fw-semibold mb-3">Suggested people</h4>
          <div className="card shadow-none border">
            <div className="card-body">
              <div className="row">
                {users.map((user) => (
                  <div className="col-12 mb-4 d-flex align-items-center user-suggestion" key={user._id}>
                    <Link to={`/users/${user._id}`} className="d-flex align-items-center">
                      <img
                        src={user.profilePicture || avatar}
                        alt={user.username}
                        className="rounded-circle me-2"
                        style={{ width: '50px', height: '50px' }}
                      />
                      <p className="fw-semibold">{user.username}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="posts-section">
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default Home;
