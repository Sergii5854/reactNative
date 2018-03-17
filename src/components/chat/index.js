import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Button,
    FlatList} from 'react-native';
import io from 'socket.io-client'
import axios from 'axios'


export default class Chat extends Component{
    static navigationOptions= ({navigation}) =>({
        title: 'Welcome',
    });
    constructor (props) {
        super(props)
        this.state = {
            messagesArray: [],
            text:'',
            author:'',
            createdAt:''
        }
    }

    componentDidMount () {
        axios.get('https://react-native-chat.herokuapp.com/api/messages') // <--- your server here
            .then(response => {
                this.setState({
                    messages: response.data['messages']
                })
            })

        this.socket = socket = io('https://react-native-chat.herokuapp.com', { jsonp: false, transports: ['websocket'] }) // <--- your server here
        socket.on('chat message', (msg) => {

            let messages = this.state.messages;
            messages.unshift(msg);
            this.setState({messages});
        })
    }

    onMessageSend () {
        if(this.state.text) {
            let messages = this.state.messagesArray
            messages.push({
                'text': this.state.text
            })
            this.setState ({
                messagesArray: messages,
                text: '',
                author:   "Name",
                createdAt:new Date()
            })
        }
        this.socket.emit('chat message', messages)
    }

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.block}>
                <View style={styles.container}>
                    <Text style={styles.pageName}>Welcome to the public chat room!</Text>
                </View>
                <ScrollView>
                    {this.state.messagesArray.map((mes, index) => {
                        return (
                            <View>
                                <Text style={styles.text}>{mes.text}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
                <View>
                    <TextInput
                        style={styles.textInput}
                        placeholter="Type you message"
                        value={this.state.text}
                        onChangeText={(text) => this.setState({text})}/>

                    <Button style={styles.message} title='Send Message' onPress={() => this.onMessageSend()}/>
                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    text: {
        fontWeight:'bold',
        fontSize: 15
    },
    container: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    pageName: {
        margin: 10,
        fontWeight:'bold',
        color:'#000',
        textAlign:'center',
        fontSize: 20
    },
    message: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 5,
        bottom: 0,
        right: 0,
        left: 0,
    },
    textInput: {
        height: 40,
        backgroundColor: '#FFF',

        padding: 10,
        color: '#222',

        borderColor: 'gray',
        borderWidth: 1
    },
});