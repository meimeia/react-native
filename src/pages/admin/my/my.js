import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableWithoutFeedback,ScrollView,Linking} from 'react-native';
import Header from "../../../components/header"
import Antd from "react-native-vector-icons/AntDesign"
import {UserInfo} from "../../../service/data"
export default class my extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <Header navigation={this.props.navigation} title={"我的"} showShare={false} rightBtn={<TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("Setting")}>
                    <View style={{flex:1,alignItems:"flex-end",}}>
                        <Antd
                            name={"setting"}
                            size={30}
                        />
                    </View>

                </TouchableWithoutFeedback>} />
                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate("Login")}>
                    <View style={{width:750,height:50,backgroundColor:"pink"}}>
                        <Text allowFontScaling={false} >登录</Text>
                    </View>

                </TouchableWithoutFeedback>
                {/*头部结束=======================================*/}
                <ScrollView>
                    <TouchableWithoutFeedback onPress={()=>Linking.openURL('tel://400-005-5566')}>
                        <View>
                            <Text allowFontScaling={false} >客服电话</Text>
                            <Text allowFontScaling={false} style={{ color: '#44b7ea' }}>400-005-5566</Text>
                        </View>

                    </TouchableWithoutFeedback>
                  
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },


});