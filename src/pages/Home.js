import React from 'react'
import PrimarySearchAppBar from '../components/AppBar';
import SignInSide from '../components/SignInSide';
import BottomAppBar from '../components/BottomAppBar';

const Home = () => {

  return (
    <div>
      <PrimarySearchAppBar />
      <SignInSide />
      <BottomAppBar />
    </div>
  )
}

export default Home