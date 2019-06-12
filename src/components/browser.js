import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, WebView} from 'react-native';
import Header from "./header"
import {getHeader,getHeaders} from "../utils/request"
export default class browser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: " ",
            context: " "
        };
    }

//     //启用安卓的js功能
//     javaScriptEnabled={true}
//     //正常的滚动停止速度
//     decelerationRate="normal"

//     //显示loading动画
//     startInLoadingState={true}
//     //去掉dom本地存储
//     domStorageEnabled={false}
//     //开启缩放
//     scalesPageToFit={true}

// onError={(e) => {
//     log('网页加载失败', e.nativeEvent)
// }}
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title={this.state.title}/>
                <WebView
                    ref={"webview"}
                    source={{uri: this.state.context}}
                    //     //允许https和http一起使用
                    mixedContentMode="always"
                    scalesPageToFit={true}
                    //网页互动消息通知
                    onMessage={(t) => this.onMessage(t)}
                    onLoad={(e) => {
                        this.loaded()

                    }}
                    // onNavigationStateChange={(e) => this.webChange(e)}
                />
            </View>
        )
    }
    // ;(function(win,undefined){
    //     var sdk_list=["addCart","openDetail","buy","openCart",
    //         "orderPage","login","setTitle","wxpay","alipay","myOrderPage",
    //         "orderPage","myOrderDetail","orderDetail",];
    //     function sdk_fun(name,arr){
    //         var data=[name].concat(arr);
    //         window.postMessage(JSON.stringify(data));
    //     }
    //     var _sdk=win.SDK||{};
    //     _sdk.current="${getHeader('platform')}";
    //     _sdk.xc_role="${getHeader('xcrole')}";
    //     _sdk.utoken='${getHeader("utoken")}';
    //     _sdk.uid='${getHeader("uid")}';
    //     _sdk.header=${JSON.stringify(getHeaders())};
    //     for(var i=0,j=sdk_list.length;i<j;i++){
    //         ;(function(){
    //             var name=sdk_list[i];
    //             _sdk[name]=function(){
    //                 var arr=Array.prototype.slice.apply(arguments);
    //                 sdk_fun.call(SDK,name,arr);
    //             }
    //         })()
    //     }
    //     win.SDK=_sdk;
    //     win.title&&_sdk.setShareInfo(win.title,win.desc,null,win.image,win.viewUrl);
    //     win.Ready&&window.Ready();
    //     _sdk.emit&&_sdk.emit("ready");
    // })(window);
    javascript = `window.postMessage("44")`

    //网页加载成功之后
    async loaded() {
       await this.refs.webview.injectJavaScript(this.javascript);
    }

    //网页回调消息到APP
    onMessage(t) {

        try {
            t.persist()
            console.log(t,12)
            let data = t.nativeEvent.data;
            // if (data) {
            //     let args = JSON.parse(data);
            //     let name = args.shift();
            //     if (this[name]) this[name].call(this, ...args)
            // }
            console.log(data,13)
        } catch (e) {
            console.log(e.message)
        }
    }


    // openDetail(id) {
    //     if (/^[0-9]+$/.test(id + '')) {
    //         this.props.navigation.navigate('Goods', {
    //             id: id
    //         });
    //     } else {
    //         this.props.navigation.navigate('Goods', {
    //             sku: id
    //         });
    //     }
    // }
    // setShareInfo(title, desc, shareList, img, viewurl) {
    //     this.setState({
    //         title: title,
    //     });
    // }

    //网页跳转
    // webChange(event) {
    //     if (!event || !event.title) return;
    //     if (event.title.indexOf("http") < 0 && event.title.indexOf("about:") < 0) {
    //         this.setState({
    //             title: event.title
    //         });
    //     }
    // }
    componentDidMount() {
        // console.log(this.props.navigation.state, 12);
        let title = this.props.navigation.state.params.item.title;
        let url = this.props.navigation.state.params.item.context
        this.setState({
            title: title,
            context: url,
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


});