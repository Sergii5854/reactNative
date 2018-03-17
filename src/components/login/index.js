import React, {Component} from 'react'
import axios from 'axios'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native'

export default class Login extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Login',
        headerRight:
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{margin: 10, backgroundColor: '#F5FCFF', padding: 10}}>
                <Text style={{color: 'black'}}>Home</Text>
            </TouchableOpacity>
    });

    constructor(props) {
        super(props)
        this.state = {
            user: [],
            userEmail: '',
            userPassword: '',
            registerUser: '',
            registered: false
        }

    }

    componentDidMount() {
        axios.get('https://react-native-chat.herokuapp.com/api/users')
            .then(response => this.setState({user: response.data.events}))
    }

    login = () => {

        const {userEmail, userPassword} = this.state

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (userEmail === '') {
            this.setState({message: 'Please enter Email address'})
        } else if (reg.test(userEmail) === false) {
            this.setState({message: 'Email is Not Correct'})
            return false
        } else if (userPassword === '') {
            this.setState({message: 'Please enter password'})
        }

        this.state.user.forEach((data) => {
            // alert(JSON.stringify( data));
            if (data.email === this.state.userEmail) {

                if (data.email === this.state.userEmail) {
                    const {navigate} = this.props.navigation;
                    this.setState({registered: true});
                    this.props.navigation.navigate('Chat')
                } else {
                    alert("Incorrect email address or password. please try again");
                    this.props.navigation.navigate('Login')
                }
            }
            // else {
            //     alert("Incorrect email address or password. please try again");
            //     this.props.navigation.navigate('Register')
            // }
        })
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={{padding: 10, margin: 10, color: 'red'}}>{this.state.message}</Text>

                <TextInput
                    value={this.state.userEmail}
                    placeholder="Enter Email"
                    style={styles.textInput}

                    underlineColorAndroid="transparent"
                    onChangeText={userEmail => this.setState({userEmail})}
                />

                <TextInput
                    value={this.state.userPassword}
                    placeholder="Enter Password"
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                    onChangeText={userPassword => this.setState({userPassword})}

                />

                <TouchableOpacity
                    onPress={this.login}
                    style={{padding: 10, width: 200, padding: 10, backgroundColor: 'orange', alignItems: 'center',borderRadius:5}}>
                    <Text style={{color: 'white'}}>Login</Text>
                </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    textInput: {
        padding: 10,
        width: 200,
        margin: 10,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius:5

    },
    btnText: {
        borderRadius:5,
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    }
});