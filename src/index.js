import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createMaterialTopTabNavigator
} from "react-navigation"
import Splash from "./pages/splash/splash"
import Search from "./pages/search/search"
import Home from "./pages/admin/home/home"
import Products from "./pages/admin/products/products"
import ShopCart from "./pages/admin/shop_cart/shop_cart"
import My from "./pages/admin/my/my"
import GoodDetail from "./pages/goodDetail/goodDetail"
import Web from "./components/browser"
import Setting from "./pages/setting/setting"
import Login from "./account/login"
import Submit from "./pages/order/submit"


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Font5 from "react-native-vector-icons/FontAwesome5"
import CartList from "../src/service/cart";

const Tabs = createMaterialTopTabNavigator({
        "Home": {
            screen: Home,
            navigationOptions: ({navigation}) => {
                return {
                    tabBarLabel: "首页",
                    tabBarIcon: (opt) => {
                        if (opt.focused) {
                            return <FontAwesome
                                name={'home'}
                                size={30}
                                color={"red"}
                            />;
                        }
                        return <FontAwesome
                            name={'home'}
                            size={30}
                            color={"gray"}
                        />

                    }
                }

            }
        },
        "Products": {
            screen: Products,
            navigationOptions: () => {
                return {
                    tabBarLabel: "产品分类",
                    tabBarIcon: ({focused}) => {
                        if (focused) return <Image source={require("../src/static/img/category_active.png")}
                                                   style={styles.icon}/>
                        return <Image source={require("../src/static/img/category.png")} style={styles.icon}/>
                    }
                }
            }
        },
        "Shop_Cart": {
            screen: ShopCart,
            navigationOptions: (context) => {
                return {
                    tabBarLabel: "购物车",
                    tabBarIcon: ({focused}) => {
                        if (focused) return <FontAwesome
                            name={"shopping-cart"}
                            size={30}
                            color={"red"}
                        />
                        return <FontAwesome
                            name={"shopping-cart"}
                            size={30}
                            color={"gray"}
                        />
                    }
                }


            }
        },
        "My": {
            screen: My,
            navigationOptions: (context) => {
                return {
                    tabBarLabel: "我的",
                    tabBarIcon: ({focused}) => {
                        if (focused) return <FontAwesome
                            name={"user"}
                            size={30}
                            color={"red"}
                        />
                        return <FontAwesome
                            name={"user"}
                            size={30}
                            color={"gray"}
                        />
                    }
                }
            }
        }
    }, {
        swipeEnabled: true,
        animationEnabled: true,
        tabBarPosition: "bottom", //如果在顶部，就是 top
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: '#111111',
            showIcon: true, // 是否显示图s标, 默认为false
            showLabel: true, // 是否显示label
            labelStyle: {
                fontSize: 12,
            },
            style: {
                height:60,
                backgroundColor: '#fff',
                borderTopWidth: 0.5,
                borderTopColor: 'grey',
            },
            indicatorStyle: {
                height: 0, // 不显示indicator
            },
        }
    }
)


const Pages = createStackNavigator({
    'Splash': {
        screen: Splash,
    },
    'Search': {
        screen: Search,
    },
    'Web':{
      screen:Web
    },
    'Tabs': {
        screen: Tabs,
    },
    'GoodDetail':{
        screen:GoodDetail
    },
    'Setting':{
        screen:Setting
    },
    'Login':{
        screen:Login
    },
    'Submit':{
        screen:Submit
    }
}, {
    initialRouteName: "Splash",
    headerMode: "none"
})
let App = createAppContainer(Pages)
//创建一个自己的容器,方便以后对路由做一些处理
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <App onNavigationStateChange={this.listenChange.bind(this)}></App>;
    }
    componentDidMount(){
        CartList.init();
    }
    //监听路由的跳转
    listenChange(state1, state2, action) {

    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    icon: {width: 30, height: 30}

});