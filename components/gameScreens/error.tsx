import {Text, View} from "react-native";
import {Link} from "expo-router";

export default function GsError() {
    return (<View className={`grid-1 gap-std padding`}>
        <Text className={`txt-6xl text-center txt-bold`}>Error</Text>
        <Text className={`txt-2xl text-center`}>x</Text>
        <View className={`py-8`}><Text>&nbsp;</Text></View>
        <View className={`grid-2 gap-std`}>
            <Link className={`btn btn-rose txt-xl text-center`} href={`/menu`}>Exit</Link>
            <Link className={`btn btn-rose txt-xl text-center`} href={`/help`}>Contact Support</Link>
        </View>
    </View>);
}