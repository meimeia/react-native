import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Header from "../../components/header"
import {get} from "../../utils/request"
import {size} from "../../utils/px"
import Antd from "react-native-vector-icons/AntDesign"
import {ImageModal} from "../../components/ModalView"


export default class goodDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            detail: [],
            showBuy: false,
            buyNum: 0
        };
        // console.log(this.props,9000)
        this.id = this.props.navigation.state.params.id;
        this.sku = this.props.navigation.state.params.sku;

    }
    openBigImg=()=>{
        console.log(this.refs.imgsModal,80);
        this.refs.imgsModal.open()
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title="详情页"/>
                <ScrollView>
                    <Image source={{uri: this.state.item.image}} resizeMode={"cover"} resizeMethod={"resize"}
                           style={{width: size.width, height: 250}}/>
                    <Text>{this.state.item.goodsName}</Text>
                    <Text style={{color: "red"}}>￥{this.state.item.salePrice}</Text>
                    {this.state.detail.map((item, index) => <TouchableWithoutFeedback key={item.image} onPress={()=>this.openBigImg()}><View key={index}>
                        <Image source={{uri: item.image}} style={{width: size.width, height: item.height / 2}}/>
                    </View></TouchableWithoutFeedback>)}
                </ScrollView>
                {/*底部按钮==================================================*/}
                <View style={styles.footer}>
                        <TouchableWithoutFeedback>
                            <View style={{width: 50, height: 50, alignItems: "center", justifyContent: "center"}}>
                                <Antd
                                    name={"shoppingcart"}
                                    size={30}
                                />
                                <Text style={{width:20,height:20,textAlign:"center",borderRadius:10,position:"absolute",backgroundColor:"#d0648f",color:"#fff",right:2,top:2}}>0</Text>
                            </View>


                        </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.setState({showBuy: true})}>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#d0648f"
                        }}>
                            <Text>加入购物车</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#e7895c"
                        }}>
                            <Text>立即购买</Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
                {/*弹出购买框==================================*/}
                <Modal visible={this.state.showBuy} animationType={"slide"} transparent={true}>

                    <View style={{backgroundColor: 'rgba(36, 37, 38, 0.5)', width: size.width, flex: 1}}>
                        <TouchableOpacity activeOpacity={0.9}
                                          style={{width: size.width, flex: 1}}
                                          onPress={() => this.setState({showBuy: false})}>
                        </TouchableOpacity>
                        <View style={{position: "absolute", bottom: 0, backgroundColor: "#fff", width: "100%"}}>
                            <View style={{flexDirection: "row"}}>
                                <Image source={{uri: this.state.item.image}} resizeMode={"cover"}
                                       resizeMethod={"resize"} style={{width: 150, height: 150}}/>
                                <Text>{this.state.item.goodsName}</Text>
                                <View>
                                    <TouchableWithoutFeedback onPress={() => this.setState({showBuy: false})}>
                                        <Antd
                                            name={"closecircleo"}
                                            size={20}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{height: 50,flexDirection:"row"}}>
                                <Text>数量</Text>
                                <View style={{flexDirection: "row",borderWidth:1,borderColor:"#e5e5e5",borderRadius:5,width:116,height:32}}>
                                    <TouchableWithoutFeedback
                                        onPress={this.reduce}>
                                        <View style={[styles.centerval,{width: 40, height: 30, backgroundColor: "#fff",borderRightWidth:1,borderRightColor:"#e5e5e5"}]}>
                                            <Text> - </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={{width:30}}>
                                        <TextInput style={[styles.centerval,{textAlign: "center",padding:0}]}
                                                   keyboardType={"numeric"}
                                                   value={String(this.state.buyNum)}
                                                   onChangeText={(val) => this.changeNum(val)}/>
                                    </View>
                                    <TouchableWithoutFeedback
                                        onPress={this.plus}>
                                        <View style={[styles.centerval,{width: 40, height: 30, backgroundColor: "#fff",borderLeftWidth:1,borderLeftColor:"#e5e5e5"}]}>
                                            <Text> + </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{height: 50, width: size.width, flexDirection: "row"}}>
                                <TouchableWithoutFeedback>
                                    <Text style={{flex: 1, backgroundColor: "#d0648f"}}>加入购物车</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <Text style={{flex: 1, backgroundColor: "#e7895c"}}>立即购买</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                    </View>

                </Modal>
                {/*查看大图组件========================================*/}
                <ImageModal ref='imgsModal' list={this.state.detail}/>
            </View>
        )
    }
    reduce=()=>{
        let s=this.state.buyNum
        s=s-1<=0?0:s-1;
        this.setState({
            buyNum:s
        })
    }
    plus=()=>{
        let s=this.state.buyNum
        this.setState({
            buyNum:++s
        })
    }
    changeNum(val) {
        if (val < 0) val = 0;
        alert(val)
        this.setState({buyNum: val})
    }

    async componentWillMount() {
        let url = ""
        if (this.sku) {
            url = "/goods/detail.do?sku=" + this.sku
        } else {
            url = "/goods/detail.do?id=" + this.id
        }
        let obj = {
            url: url
        }
        let res = await get(obj)
        console.log(res.data.detail, 1);
        this.setState({
            item: res.data,
            detail: [...res.data.detail.mobile_detail.list]
        })


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerval:{
        justifyContent:"center",
        alignItems:"center"
    },
    footer: {

        flexDirection: "row"
    }

});