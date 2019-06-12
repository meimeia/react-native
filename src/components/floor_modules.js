import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback,Image,ImageBackground} from 'react-native';
import {get} from "../utils/request"
import px,{size} from "../utils/px"

class ModuleItem extends Component {
    render() {
        const {i} = this.props
        return (<View>
            {i.tplId==16&&<View>
                {i.moduleTemplateImages.map((item,index)=><View key={item.imgId} >
                    <TouchableWithoutFeedback>
                        <Image source={{uri:item.imageUrl}} resizeMode={"contain"} style={{width:size.width,height:item.height/2}} />
                    </TouchableWithoutFeedback>
                </View>)}
            </View>}
            {i.tplId==21&&<View>
                {i.moduleTemplateImages.map((item,index)=><View key={item.imgId} >
                    <TouchableWithoutFeedback>
                        <Image source={{uri:item.imageUrl}} resizeMode={"contain"} style={{width:size.width,height:item.height/2}} />
                    </TouchableWithoutFeedback>
                </View>)}
            </View>}
            {i.tplId==17&&<View style={{width:size.width,flexDirection:"row"}}>
                {i.moduleTemplateImages.map((item,index)=><View key={item.imgId} style={{flex:1,alignItems:"center"}}>
                    <TouchableWithoutFeedback>
                        <Image source={{uri:item.imageUrl}} style={{width:item.width/2-10,height:item.height/2,borderRadius:10}} />
                    </TouchableWithoutFeedback>
                </View>)}
            </View>}
            {i.tplId==18&&<View style={{width:size.width,flexDirection:"row"}}>
                {i.moduleTemplateImages.map((item,index)=><View key={item.imgId} style={{flex:1,alignItems: "center"}}>
                    <TouchableWithoutFeedback>
                        <Image source={{uri:item.imageUrl}} style={{width:item.width/2-10,height:item.height/2,borderRadius:10}} />
                    </TouchableWithoutFeedback>
                </View>)}
            </View>}

            {/*{i.tplId==10&&<View>*/}
            {/*aa*/}
            {/*</View>}*/}
        </View>)
    }
}

export default class floor_modules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleList: []
        };
        // console.log(this.props,80);
    }

    render() {
        return (
            <View>
                {this.state.moduleList.map((item, index) => <View key={item.moduleId}>
                    <ImageBackground source={{uri:item.backgroundImg}} resizeMethod={"resize"} resizeMode={"contain"} style={{width: '100%', height:px( item.backgroundImgHeight)}}>
                        {item.moduleTemplates.map((i, _index) => <ModuleItem key={_index} i={i}></ModuleItem>)}
                    </ImageBackground>

                </View>)}


            </View>
        )
    }

    async componentWillMount() {
        let obj = {
            url: "/module/findModuleListV2.do?categoryId="
        }
        let res = await get(obj)
        this.setState({
            moduleList: res.data
        })
        // this.state.moduleList=res.data
        // console.log(this.state.moduleList, 33);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },


});