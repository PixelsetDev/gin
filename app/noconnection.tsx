import {ScrollView, Text, View} from "react-native";

export default function App() {
    return <ScrollView className={`grid-1`}>
            <View className={`header text-header-lg`}>
                <Text>Unable to connect to the server.</Text>
            </View>
            <View className={`padding text-center grid-1`}>
                <Text className={`text-body`}>
                    Retry
                </Text>
            </View>
        </ScrollView>;
}