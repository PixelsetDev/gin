import {ScrollView, Text, View} from "react-native";

export default function App() {
    return <View nativeID={`screen`}>
        <ScrollView className={`grid-1`}>
            <View className={`header text-header-lg`}>
                <Text>Drinko!³</Text>
            </View>
            <View className="padding text-center grid-1">
                <Text className="text-header">
                    About Drinko!³
                </Text>
                <Text className="text-body">
                    Drinko!³ is developed by Pixelset.
                </Text>
                <Text className="text-body">
                    Drinko!³ is the third version of the much-loved drinking game Drinko initially developed in 2022.
                    Drinko! began it's like as a drinking game for flatmates at University and quickly grew to be a
                    globally loved game. After moving out, Drinko!³ was developed in 2025 as a way to continue playing
                    the game from afar.
                </Text>
                <Text className="text-body">
                    Authors: Lewis Milburn &lt;lewis@pixelset.dev&gt;
                </Text>
                <Text className="text-header">
                    We're open source!
                </Text>
                <Text className="text-body">
                    Gin (Application): https://github.com/pixelset/gin
                </Text>
                <Text className="text-body">
                    Vodka (Server/API): https://github.com/pixelset/vodka
                </Text>
                <Text className="text-header">
                    Older versions
                </Text>
                <Text className="text-body">
                    You can play older versions of Drinko! by visiting drinko.co.uk/old
                </Text>
            </View>
        </ScrollView>
    </View>;
}