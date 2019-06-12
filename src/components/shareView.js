import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Image,Clipboard} from 'react-native';
import {size} from "../utils/px"

export default class shareView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showShare: false,
            list: [],
            link:""
        };
        this.list = this.renderTypes(this.props.types)
    }

    render() {
        return (
            <Modal visible={this.state.showShare} transparent={true} animationType={"slide"}>

                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,.5)',
                }}>
                    <TouchableWithoutFeedback onPress={() => this.cancel()}>
                        <View style={{flex:1}} ></View>
                    </TouchableWithoutFeedback>
                    <View style={{backgroundColor: "#fff", position: "absolute", bottom: 0, width: size.width}}>
                        <View style={{height: 50, justifyContent: "center", alignItems: "center"}}>
                            <Text>分享到</Text>
                        </View>
                        <View style={{flexDirection:"row",height:80}}>
                            {this.state.list.map(item => item)}
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.cancel()}>
                            <View style={{height: 50, justifyContent: "center", alignItems: "center"}}>
                                <Text>取消</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </View>
            </Modal>
        )
    }
    cancel(){
        this.setState({showShare: false})
    }
    openShare() {
        this.setState({showShare: true})
    }

    weiFriend() {
alert(1)
    }

    weiPyq() {
        alert(2)
    }

    weiLink() {
        Clipboard.setString(this.state.link)
        alert("复制成功!")
    }

    weiCode() {

    }

    renderTypes=(types)=> {
        types.map(item => {
            this.state.list.push((<TouchableWithoutFeedback key={item.url} onPress={this[item.method]}>
                <View style={{flex:1,alignItems:"center"}}>
                    <Image source={{uri: item.url}} style={{width:40,height:40}}/>
                    <Text>{item.txt}</Text></View>
            </TouchableWithoutFeedback>))
        })
    }
}
exports.SHARETYPE = {
    WEIXIN: {
        method: "weiFriend", url: require('../static/img/icon-weixin'), txt: '微信好友'
    },
    PENGYOUQUAN: {
        method: 'weiPyq', url: require('../static/img/icon-wei'), txt: '朋友圈'
    },
    LIANJIE: {
        method: 'weiLink', url: require('../static/img/icon-share-link'), txt: '链接'
    },
    /**
     * 二维码
     */
    ERWEIMA: {
        method: 'weiCode', url: require('../static/img/icon-share-code'), txt: '二维码'
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


});