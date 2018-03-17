import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity} from 'react-native';
// import FBSDK, { LoginManager } from 'react-native-fbsdk'

export default class home extends Component{
    static navigationOptions= ({navigation}) =>({
        title: 'Welcome',
    });

    // _fbAuth () {
    //   LoginManager.logInWithReadPermissions(['public_profile']).then(
    //     function(result) {
    //       if (result.isCancelled) {
    //         alert('Login cancelled');
    //       } else {
    //         alert('Login success with permissions: ' +result.grantedPermissions.toString());
    //       }
    //     },
    //     function(error) {
    //       alert('Login fail with error: ' + error);
    //     }
    //   );
    // }

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
                    onPress={()=> navigate('Facebook')}
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