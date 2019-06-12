import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, BackHandler, ToastAndroid,TouchableWithoutFeedback} from 'react-native';
import {size} from "../../../utils/px"
import SearchHeader from "../../../components/header"
import AntDesign from "react-native-vector-icons/AntDesign"
import EviIcon from "react-native-vector-icons/EvilIcons"
import ScrollableTabView, { ScrollableTabBar,DefaultTabBar }  from 'react-native-scrollable-tab-view';
import OtherPage from "../../admin/home/subpages/otherpage";
import JinriTemai from "../../admin/home/subpages/JinriTemai";
import Share,{SHARETYPE} from "../../../components/shareView"

export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabShow: false,
            label: [],
            navtitle:[
                {title:"今日特卖",path:"JinriTemai"},
                {title:"好东西",path:"Haodongxi"},
                {title:"美妆个护",path:"MeizhuangGehu"},
                {title:"食品生鲜",path:""},
                {title:"家居生活",path:""},
                {title:"服饰鞋包",path:""},
                {title:"母婴童装",path:""},
                {title:"健康保健",path:""},
                {title:"苏宁易购",path:""},
            ]
        };

        this.state.navtitle.map((item,index)=>{
            this.state.label.push(item.title)
        })
        // console.log(this.state.label,89)
    }


    backHandle=()=> {

            if (this.lastBackPressed && Date.now() - this.lastBackPressed < 2000) {
                BackHandler.exitApp()
                return ;
            }
            this.lastBackPressed = Date.now();
                ToastAndroid.show("再按一次退出应用", ToastAndroid.SHORT)

            return true

    }
    shareTo(){
        this.refs.shareView.openShare()
    }
    // 滑动tab
    renderScrollableTab() {
            // tabBarUnderlineStyle={styles.tabBarUnderline}
            return (
                <ScrollableTabView
                    style={{backgroundColor:"#fff"}}
                    renderTabBar={() =>
                        <ScrollableTabBar
                            style={{height:40}}
                            tabStyle={{height:34,paddingLeft: 15,paddingRight: 15,}}
                        />
                    }
                    tabBarBackgroundColor='#fff'
                    tabBarActiveTextColor='#b4282d'
                    tabBarInactiveTextColor='#333'
                    // tabBarUnderlineStyle={styles.tabBarUnderline}
                >
                    {
                        this.state.label.map((item, index) => {
                            if (item == '今日特卖') {
                                return (
                                    <JinriTemai tabLabel={item} key={index} navigation={this.props.navigation}/>
                                )
                            } else {
                                return (
                                    <OtherPage tabLabel={item} key={index} />
                                )
                            }
                        })
                    }
                </ScrollableTabView>
            )

    }
    render() {
        return (
            <View style={styles.container}>
                <SearchHeader shareTo={this.shareTo} navigation={this.props.navigation} showBack={false} showShare={false} leftBtn={
                    <TouchableWithoutFeedback onPress={()=>this.shareTo()}>
                        <View style={{flex: 1}}>
                            <AntDesign
                                name={"message1"}
                                size={23}
                                color={"gray"}
                            />
                        </View>
                    </TouchableWithoutFeedback>} middleBtn={  <TouchableWithoutFeedback
                    onPress={()=>{
                        this.props.navigation.navigate("Search")
                    }}
                ><View style={{width:size.width-50,height:"80%",marginTop:5,flexDirection:"row",backgroundColor:"#EFEFEF",alignItems:"center",}}>

                        <EviIcon
                            name={"search"}
                            size={20}
                            color={"black"}
                        />
                        <Text>BIOE品牌团</Text>


                </View></TouchableWithoutFeedback>}
                />
                {/*搜索栏结束=======================================*/}

                    {this.renderScrollableTab()}

                <Share ref={"shareView"} types={[SHARETYPE.WEIXIN, SHARETYPE.PENGYOUQUAN, SHARETYPE.LIANJIE, SHARETYPE.ERWEIMA]} />

            </View>
        )
    }
    componentWillMount() {
        this.props.navigation.addListener(
            'willFocus',
            (obj)=>{
                // console.log(obj,90);
                BackHandler.addEventListener("hardwareBackPress", this.backHandle)
            }
        )
        this.props.navigation.addListener(
            'willBlur',
            (obj)=>{
                // console.log(obj,91)
                BackHandler.removeEventListener("hardwareBackPress",this.backHandle)
            }
        )



    }
    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress",this.backHandle)

    }
    componentDidMount() {

    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },


});