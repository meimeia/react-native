import {Dimensions} from "react-native"

const size = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
}
function px(val) {
    return size.width / 750 * val;
}


exports.size=size

export default px;