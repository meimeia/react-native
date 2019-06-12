import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableWithoutFeedback,ImageBackground,FlatList} from 'react-native';
import {get} from "../../../../utils/request"
import Swiper from "react-native-swiper"
import px,{size} from "../../../../utils/px";
import toast from "../../../../utils/toast"
import Module from "../../../../components/floor_modules"
import Antd from "react-native-vector-icons/AntDesign"


class Banner extends Component{
    constructor(props){
        super(props);
        this.state={
            quickandBannerData:{},
            bannerList:[],
            quickList:[],
            obj:{
                url:"/banner/findBannerAndQuickList.do?categoryId=",
            }
        }
    }
    render(){
            return (
                <View style={{width:size.width,height:240}}>
                    {this.state.bannerList.length>0&&
                        <Swiper
                            showsButtons={false}
                            removeClippedSubviews={false} //这个很主要啊，解决白屏问题
                            autoplay={true}
                            horizontal ={true}
                            loop={true}
                            autoplayTimeout={3}
                            paginationStyle={{bottom:10}}
                            dotStyle={{width:10,height:2,borderRadius:0}}
                            activeDotStyle={{backgroundColor:"#fff",width:10,height:2,borderRadius:0}}
                        >

                            {this.state.bannerList.map((item,index)=>
                                <TouchableWithoutFeedback  key={index} onPress={()=>{this.goOtherPage()}}>
                                    <Image source={{uri:item.showImg}} style={{width:size.width,height:150}}/>
                                </TouchableWithoutFeedback>
                                )}



                        </Swiper>
                   }
                    {this.state.bannerList.length>0&&<ImageBackground source={{uri:this.state.quickandBannerData.quickListFullScreenImg}} style={{width:size.width,height:90,flexDirection:"row"}}>
                        {this.state.quickList.map((item,index)=><TouchableWithoutFeedback key={index} onPress={()=>this.goOtherPage(item)}
                        >
                            <View style={{flex:1}} >
                                <Image source={{uri:item.showImg}} style={{flex:1,height:90}} resizeMethod={"auto"} resizeMode={"contain"}/>
                                <Text style={{textAlign:"center"}}>{item.title}</Text>
                            </View>

                        </TouchableWithoutFeedback>)}

                    </ImageBackground>}
                    {this.state.bannerList.length==0||this.state.quickList.length==0&&<Text>数据加载中...</Text>}

                </View>


            )

    }
    goOtherPage=(item)=>{
        console.log(item,11);
        if(item.contextType=="h5"){
            this.props.navigation.navigate("Web",{
                item:item
            })
        }

    }
    async componentDidMount(){
        let res = await get(this.state.obj);
        res.data.bannerList.splice(0,1)
        // console.log(res,88);
        this.setState({
            quickandBannerData:res.data,
           bannerList:res.data.bannerList,
            quickList:res.data.quickList
        })

    }
}

class GoodItem extends Component{
    render(){
        const {good} =this.props;
        // console.log(good,98);
        return (<View style={{height:260,width:size.width/2}}>
            <TouchableWithoutFeedback onPress={()=>this.goDetail(good)}>
                <View style={{height:260,justifyContent:"center"}}>
                    <Image source={{uri:good.image}} resizeMode={"contain"} style={{width:"100%",height:150}} />
                    <Text style={{paddingLeft:3,height:20}}>{good.goodsName}</Text>
                    <View style={{flexDirection: "row",justifyContent: "space-between",width:"90%",height:100}}>
                        <Text style={{height:20,fontSize:15,textAlign:"center",color:"red"}}>￥{good.salePrice}</Text>
                        <Text onPress={()=>alert(2)}>
                            <Antd
                                name={"shoppingcart"}
                                size={25}
                                color={"gray"}
                            />
                        </Text>
                    </View>

                </View>

            </TouchableWithoutFeedback>

        </View>);
    }
    goDetail(item){
        this.props.navigation.navigate("GoodDetail",item)
    }
}
export default class JinriTemai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadText:"加载中...",
            list:[1,2,3],
            start:0,
            refreshing:false,
            isLoading:false,
            isEnd:false
        };
    }

    render() {
        return (
            <View>
                <FlatList ref="flatlist"
                          refreshing={this.state.refreshing}
                          numColumns={2}//2列
                          onRefresh={()=>this.refresh()}//刷新调用的方法
                          onEndReached={()=>this.nextPage()}//拉倒底部加载下一页
                          ListHeaderComponent={<View>
                              <Banner ref="banner" navigation={this.props.navigation}/>
                              <Module ref="module" navigation={this.props.navigation}/>
                          </View>}
                          renderItem={({ item, index }) =>
                              <GoodItem good={item}navigation={this.props.navigation}></GoodItem>
                          }
                          ListFooterComponent={<View >
                              <Text style={{textAlign: "center"}}>{this.state.loadText}</Text>
                          </View>}
                          data={this.state.list}
                />

            </View>
        )
    }
    componentDidMount(){
        this.refresh()
    }

    async refresh(){
        this.start=0
        this.state.isEnd=false
        this.setState({
            refreshing: true
        })
        let obj={
            url:`/goods/list.do?limit=20&start=${this.start}&categoryId=`
        }
        let res=await get(obj)
        // console.log(res,900);
        this.setState({
            refreshing: false,
            list:res.data.items,
        })
        if(res.data.items.length==0) {
            this.setState({
               isEnd:true,
                loadText:"已加载全部数据"
            })
        }
    }
    async nextPage(){

        if(this.state.isLoading||this.state.isEnd)return;
        this.state.isLoading=true
        this.start=this.start+1
        let obj={
            url:`/goods/list.do?limit=20&start=${this.start}&categoryId=`
        }
        let res=await get(obj)
        this.setState({
            isLoading:false
        })
        if(res.data.items.length==0){
            this.setState({
                isEnd:true,
                loadText:"已加载全部数据"
            })
        }
        // console.log(res,901);
        this.setState({
            list:this.state.list.concat(res.data.items)
        })
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },


});