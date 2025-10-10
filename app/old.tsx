import {ScrollView, Text, View} from "react-native";

export default function App() {
    return <View nativeID={`screen`}>
        <ScrollView className={`grid-1`}>
            <View className={`header text-header-lg`}>
                <Text>Play older Drinko! games</Text>
            </View>
            <View className="padding text-center grid-1">
                <Text className="text-body">
                    Drinko! and Drinko!² are only available on the web. Play Drinko!³ (latest) by downloading the app or
                    visiting drinko.co.uk
                </Text>
                <Text className="text-body">
                    Play Drinko!² at 2.drinko.co.uk
                </Text>
                <Text className="text-body">
                    Play Drinko! at 1.drinko.co.uk
                </Text>
            </View>
        </ScrollView>
    </View>;
}