import React,{useContext}from 'react';
import { UserContext } from '../layout';

const Profile = () => {
  const context = useContext(UserContext);
  return (
    <div>Profile of {context.usuario.email}</div>
  )
};

export default Profile