import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Header from "../../components/header"
import {size}  from "../../utils/px"
export default class setting extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(1)
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={"设置"} showShare={false} rightBtn={<View style={{flex:1}}></View>}/>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.logout()}>
                    <View style={{width:"80%",height:40,alignItems:"center",backgroundColor:"#d0648f",justifyContent:"center",alignSelf:"center"}}>
                        <Text allowFontScaling={false} >退出登录</Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
    logout(){
        this.props.navigation.navigate('Login');
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


});