
import React from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './src/components/layout/index';
import Login from './src/components/login/index';
import Register from './src/components/reg/';
import Chat from './src/components/chat/';


const UsersManager = StackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: Login },
    Register: {screen: Register},
    Chat: {screen: Chat},
})

export default UsersManager;