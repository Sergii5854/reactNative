import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native';

export default class login extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'Facebook',
        headerRight:
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{margin:10,backgroundColor:'#F5FCFF',padding:10}}>
                <Text style={{color:'black'}}>Home</Text>
            </TouchableOpacity>
    });
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Facebook</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});