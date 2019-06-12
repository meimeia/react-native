import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Header from "../../components/header"
export default class search extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
               <Header navigation={this.props.navigation}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },


});