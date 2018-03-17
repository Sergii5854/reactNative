import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    FlatList
} from 'react-native';
import io from 'socket.io-client'
import axios from 'axios'

export default class Chat extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Welcome',
    });

    constructor(props) {
        super(props);
        this.state = {
            messagesArray: [],
            text: ''
        };
        this.onMessageSend = this.onMessageSend.bind(this)
    }

    componentDidMount() {
        axios.get('https://react-native-chat.herokuapp.com/api/messages')
            .then(response => {
                this.setState({
                    messagesArray: response.data['messages']
                })
            });

        this.socket = socket = io('https://react-native-chat.herokuapp.com', {jsonp: false, transports: ['websocket']})
        socket.on('chat message', (message) => {
            let messagesArray = this.state.messagesArray;
            messagesArray.unshift(message);
            this.setState({messagesArray});
        })
    }

    onMessageSend() {
        if (this.state.text) {
            let message = {
                text: this.state.text,
                author: "Name",
                createdAt: new Date()
            };
            this.socket.emit('chat message', message)
        }
        this.setState({text: ''})
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.block}>
                <View style={styles.container}>
                    <Text style={styles.pageName}>Welcome to the public chat room!</Text>
                </View>
                <FlatList
                    keyExtractor={(item) => item._id}
                    data={this.state.messagesArray}
                    extraData={this.state}
                    renderItem={({item}) =>
                        <View>
                            <Text style={styles.author}>{item.author} at {item.createdAt}</Text>
                            <Text style={styles.text}>{item.text}</Text>

                        </View>
                    }
                />
                <View>
                    <TextInput
                        style={styles.textInput}
                        placeholter="Type you message"
                        value={this.state.text}
                        onChangeText={(text) => this.setState({text})}/>

                    <Button
                        style={styles.message}
                        title='Send Message'
                        onPress={() => this.onMessageSend()}/>
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
        fontWeight: 'bold',
       margin: 20,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        paddingLeft: 20,
        fontSize: 14,
        color: '#222',
        borderRadius: 5
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pageName: {
        margin: 10,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
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

    author: {
        paddingRight: 20,
        color: 'grey',
        fontSize: 11,
        textAlign: 'right'
    }
});