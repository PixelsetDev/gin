import {Text, View} from "react-native";
import {Link} from "expo-router";
import DotSpinner from "@/components/dotSpinner";

export default function GsLoading() {
    return (<View className={`grid-1 gap-std padding`}>
        <Text className={`txt-6xl text-center txt-bold`}>Drinko!³</Text>
        <Text className={`txt-2xl text-center`}>Loading...</Text>
        <View className={`lg:py-8 py-24`}><Text>&nbsp;</Text></View>
        <Text className={`txt-2xl text-center`}><DotSpinner/></Text>
    </View>);
}