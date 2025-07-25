import React from 'react'
// import { userAuthStore } from '../../Store/authStore'
import { userAuthStore } from '../store/authStore';
import LoggedUser from './profile/LoggedUser';
import NonLoggedUser from './profile/NonLoggedUser';
const Profile = () => {
  

    const{user}= userAuthStore();
    console.log(user)
if(user){
    return (
        <div><LoggedUser/></div>
      )
}
  else{
    return (
        <div><NonLoggedUser/></div>
      )
  }
}

export default Profile