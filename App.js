
import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './src/components/layout/index';
import Login from './src/components/login/index';
// import Register from './app/components/register';
// import Facebook from './app/components/facebook';
// import Chat from './app/components/chat';


const UsersManager = StackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: Login },

})

export default UsersManager;