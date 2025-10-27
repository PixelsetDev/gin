import {ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";
import {Helmet} from "react-helmet";

export default function App() {
    return <ScrollView className={`grid-1`}>
        <Helmet>
            <title>Help - Drinko!³</title>
        </Helmet>
        <View className={`header`}>
            <Text className={`txt-4xl text-white text-center txt-bold`}>Support</Text>
            <Link href={`/menu`} className={`txt-xl link-header text-center text-white`}>Back to Drinko!³</Link>
        </View>
        <View className={`padding grid-1 gap-std`}>
            <View className="padding-sm card text-center grid-1 gap-sm">
                <Text className="txt-base">
                    We&apos;re sorry to hear you&apos;re having issues with Drinko! We handle all of our help and
                    support via our central support system available by clicking the link below.
                </Text>
            </View>
            <Link href={`https://support.pixelset.dev/knowledgebase.php?article=63`} className={`btn btn-rose txt-base text-center`}>
                Visit Drinko!³ Support
            </Link>
        </View>
    </ScrollView>;
}