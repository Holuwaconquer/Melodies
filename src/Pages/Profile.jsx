import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import BackArrow from '../assets/back-arrow.png'

const Profile = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch();

  const { id } = useParams()

  const selectedUser = useSelector((state) => state.usersDetails.sender)
  useEffect(() => {
    if (!selectedUser || Object.keys(selectedUser).length === 0) {
      axios.get('https://api.audius.co/v1/tracks/trending')
        .then((response) => {
          const allSongs = response.data.data;
          const filteredUser = allSongs.filter((artist) => artist.user.name === id);
          setUser(filteredUser);
        })
        .catch((error) => {
          console.error('Error fetching trending tracks:', error);
        });
    } else {
      setUser(selectedUser);
    }
  }, [selectedUser, id]);

    const navigate = useNavigate()
    console.log(user)
    const navigateBack = () =>{
      navigate('/')
    }

  return (
    <>
      {
      user ? (
        <div className='w-full h-[400px] rounded-[10px]' style={{background: `linear-gradient(to right, #333333a9, #333333a9), url(${user.user.cover_photo?.['640x']}) center center no-repeat`, backgroundSize: 'cover', marginBottom: '20px', padding: '20px'}}>
          <div className='flex flex-col justify-between h-full w-full'>
            <div>
              <img className='cursor-pointer' onClick={navigateBack} src={BackArrow} alt="" />
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-4'>
                <div className='w-[100px] h-[100px] object-fit-cover rounded-[50%]'>
                  <img className='w-full h-full object-fit-cover rounded-[50%]' src={user.user.profile_picture?.['480x480']} alt="" />
                </div>
                <div>
                  <h1 className='text-white text-4xl'>{user.user.name}</h1>
                  <p className='text-gray-400 w-3/4'>{user.user.bio}</p>
                </div>
              </div>

              {/* track count */}
              <div className='flex flex-col items-center'>
                <h1 className='text-white text-3xl'>{user.user.track_count}</h1>
                <p className='text-gray-300'>No of Tracks</p>
              </div>
            </div>
          </div>
        </div>
      ) : <h1>Loading</h1>
    }
          <div>
            <h1 className='text-3xl text-white'>Popular</h1>
          </div>
    </>
  )
}

export default Profile


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function UserTracks() {
//   const [user, setUser] = useState(null);
//   const { id } = useParams();
//   const selectedUser = useSelector((state) => state.usersDetails.sender);

//   useEffect(() => {
//     if (!selectedUser || Object.keys(selectedUser).length === 0) {
//       axios.get('https://api.audius.co/v1/tracks/trending')
//         .then((response) => {
//           const allTracks = response.data.data;
//           const filteredUser = allTracks.filter((track) => track.user.name === id);
//           setUser(filteredUser);
//         })
//         .catch((error) => {
//           console.error('Error fetching trending tracks:', error);
//         });
//     } else {
//       setUser([selectedUser]); // wrap in array for consistency
//     }
//   }, [selectedUser, id]);

//   return (
//     <div>
//       <h2>Tracks by {id}</h2>

//       {user ? (
//         user.length > 0 ? (
//           <ul>
//             {user.map((track) => (
//               <li key={track.id}>
//                 <strong>{track.title}</strong><br />
//                 ❤️ {track.favorite_count} | ▶️ {track.play_count}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No tracks found for user: {id}</p>
//         )
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default UserTracks;
