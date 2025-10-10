import {View, Text, ScrollView} from "react-native";

export default function App() {
    return (
        <ScrollView className={`grid gap-std`}>
            <View className={`header`}>
                <Text>Drinko!</Text><Text className={`align-super`}>3</Text>
            </View>
            <View className="padding text-center">
                <Text className="text-header-lg mb-6">
                    Loading...
                </Text>
            </View>
        </ScrollView>
    );
}
