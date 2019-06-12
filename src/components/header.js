import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableWithoutFeedback} from 'react-native';
import {size} from "../utils/px";
import Ionicon from "react-native-vector-icons/Ionicons"
import FontAwesom from "react-native-vector-icons/FontAwesome"


export default class Header extends Component {
    static defaultProps = {
        title: null,
        showBack: true,
        showShare: true,
    }

    render() {
        return (
            <View style={headerStyle.top}>
                {/*/返回按钮部分*/}
                {this.props.showBack && <TouchableWithoutFeedback onPress={()=>{this.props.navigation.goBack()}}>
                    <View style={[{flex: 1}]}>
                        <Ionicon
                            name={"ios-arrow-back"}
                            size={30}
                            color={"gray"}
                        />
                    </View>
                </TouchableWithoutFeedback>}
                {this.props.leftBtn}
                {/*/中间部分*/}
                {this.props.title && <View style={[{flex: 1, alignItems: "center"}]}>
                    <Text> {this.props.title}</Text>

                </View>}
                {/*/分享部分*/}
                {this.props.middleBtn}
                {this.props.showShare &&<TouchableWithoutFeedback onPress={()=>this.shareTo()}>
                    <View style={[{flex: 1, alignItems: "flex-end"}]}>
                        <FontAwesom
                            name={"share-square-o"}
                            size={25}
                            color={"gray"}
                        />
                    </View>
                </TouchableWithoutFeedback> }
                {this.props.rightBtn}
            </View>)
    }
    shareTo(){
        this.props.shareTo&&this.props.shareTo()
    }
}
const headerStyle = StyleSheet.create({
    top: {
        height: 40,
        width: size.width,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft:15,
        paddingRight: 10
    }
})