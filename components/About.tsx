import { ScrollView } from "react-native";
import { View, Text } from "react-native";

export const Disclaimer = () => {
    return (
        <ScrollView className={`grid gap-std`}>
            <View className={`header`}>
                <Text>Drinko!</Text><Text className={`align-super`}>3</Text>
            </View>
            <View className="padding text-center">
                <Text className="text-header-lg mb-6">
                    Drinko!
                </Text>
                <Text className="text-body mb-1">
                    Welcome to Drinko!², the sequel to the much loved game Drinko!
                </Text>
                <Text className="text-body mb-6">
                    Do not refresh the page or use the browser's back button whilst playing, this will delete your game.
                </Text>
                <Text className="text-body mb-1 text-bold">
                    Disclaimer
                </Text>
                <Text className="text-body mb-1">
                    This game is dirty and contains adult themes, don't play it with your parents.
                </Text>
                <Text className="text-body mb-1">
                    You must be 18+ to play.
                </Text>
                <Text className="text-body mb-6">
                    This game will get you drunk. Always drink responsibly. When the fun stops, stop.
                </Text>
                <Text className="btn btn-green">
                    Let's go!
                </Text>
                <Text className="absolute bottom-0 left-0">V3.0.0-BETA</Text>
                <a href="/select"
                   className="absolute bottom-0 right-0 text-center underline">Play older versions of Drinko!</a>
            </View>
        </ScrollView>
    )
};