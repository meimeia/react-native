import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import {size} from "../../utils/px"
export default class  extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(size.width)
        this.props.navigation.navigate("Tabs")
    }

    render() {
        return (
            <View>
                <Image source={require("../../static/img/splash.jpg")} style={{width:size.width,height:size.height}}/>
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