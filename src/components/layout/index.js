import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking} from 'react-native';


export default class home extends Component{
    static navigationOptions= ({navigation}) =>({
        title: 'Welcome',
    });
    componentDidMount () {
        Linking.addEventListener('url', this.props.handleOpenURL)
        Linking.getInitialURL().then((url) => {
            if (url && this.props.logout === true) {
                this.props.handleOpenURL({ url })
            }
        })
    }

    componentWillUnmount () {
        Linking.removeEventListener('url', this.props.handleOpenURL)
    }

    loginWithFacebook () {
        Linking.openURL('https://react-native-chat.herokuapp.com/auth/facebook/callback')
    }



    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
                <Text style={styles.pageName}>User</Text>
                <TouchableOpacity
                    onPress={() => navigate('Login')}
                    style={styles.btn1}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=> navigate('Register')}
                    style={styles.btn2}>
                    <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.loginWithFacebook}
                    // onPress={this._fbAuth()}
                    style={styles.btn3}>
                    <Text style={styles.btnText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> navigate('Chat')}
                    // onPress={this._fbAuth()}
                    style={styles.btn3}>
                    <Text style={styles.btnText}>Chat</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    btn1:{
        backgroundColor:'orange',
        padding:20,
        margin:10,
        borderRadius:5,
        width:'95%'
    },
    btn2:{
        backgroundColor:'green',
        padding:20,
        margin:10,
        borderRadius:5,
        width:'95%'
    },
    btn3:{
        backgroundColor:'blue',
        padding:20,
        margin:10,
        borderRadius:5,
        width:'95%'
    },
    pageName:{
        margin:10,
        fontWeight:'bold',
        color:'#000',
        textAlign:'center',
        fontSize: 30
    },
    btnText:{
        color:'#fff',
        fontWeight:'bold',

        textAlign: 'center'
    },
});