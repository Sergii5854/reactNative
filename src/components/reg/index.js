import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import axios from 'axios'

export default class register extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'Register',
        headerRight:
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{margin:10,backgroundColor:'orange',padding:10}}>
                <Text style={{color:'#ffffff'}}>Home</Text>
            </TouchableOpacity>
    });

    constructor(props){
        super(props)
        this.state={
            user: [],
            name:'',
            userEmail:'',
            userPassword:''
        }
    }

    componentDidMount() {
        axios.get('https://react-native-chat.herokuapp.com/api/users')
            .then(response => this.setState({user: response.data.user}))
    }

    userRegister = () => {
        const {name} = this.state;
        const {userEmail} = this.state;
        const {userPassword} = this.state;

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if (name === "") {
            this.setState({message:'Please enter name'})
        } else if(userEmail === "") {
            this.setState({message:'Please enter Email address'})
        } else if(reg.test(userEmail) === false) {
            this.setState({message:'Email is Not Correct'})
            return false;
        } else if(userPassword === "") {
            this.setState({message:'Please enter password'})
        }

        axios.post(`https://react-native-chat.herokuapp.com/api/users`, {
            user: {
                email: this.state.userEmail,
                password: this.state.userPassword,
                name: this.state.name,
            }
        })
            .then((response) => {
                // alert(JSON.stringify(response.data.user))

                this.setState({
                    user: response.data.user,
                    name: '',
                    userEmail: '',
                    userPassword: ''
                })
            })
        .catch((error)=>{
          console.log("my reg err is : ", error)
        });
        const {navigate} = this.props.navigation;
        this.props.navigation.navigate('Chat')
        this.setState({redirect: "Login"})
    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={{padding:10,margin:10,color:'red'}}>{this.state.message}</Text>

                <TextInput
                    value={this.state.name}
                    placeholder="Enter Name"
                    style={{width:250,margin:10, borderColor:"#333", borderWidth:1}}
                    underlineColorAndroid="transparent"
                    onChangeText= {name => this.setState({name})}
                />

                <TextInput
                    value={this.state.userEmail}
                    placeholder="Enter Email"
                    style={{width:250,margin:10, borderColor:"#333", borderWidth:1}}
                    underlineColorAndroid="transparent"
                    onChangeText= {userEmail => this.setState({userEmail})}
                />

                <TextInput
                    value={this.state.userPassword}
                    placeholder="Enter Password"
                    style={{width:250,margin:10, borderColor:"#333", borderWidth:1}}
                    underlineColorAndroid="transparent"
                    onChangeText= {userPassword => this.setState({userPassword})}
                />

                <TouchableOpacity
                    onPress={this.userRegister}
                    style={{width:250,padding:10, backgroundColor:'green', alignItems:'center'}}>
                    <Text style={{color:'#fff'}}>Signup</Text>
                </TouchableOpacity>

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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    btnText: {
        color:'#000',
        fontSize: 20,
        fontWeight:'bold'
    }
});