import {ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";

export default function App() {
    return <ScrollView className={`grid-1`}>
        <View className={`header`}>
            <Text className={`txt-4xl text-white text-center txt-bold`}>About Drinko!³</Text>
            <Link href={`/menu`} className={`txt-xl link-header text-center text-white`}>Back</Link>
        </View>
        <View className={`padding grid-1 gap-std`}>
            <View className="padding-sm card text-center grid-1">
                <Text className="txt-xl txt-bold">
                    About Drinko!³
                </Text>
                <Text className="txt-base">
                    Drinko!³ is developed by Pixelset.
                </Text>
                <Text className="txt-base">
                    Drinko!³ is the third version of the much-loved drinking game Drinko initially developed in 2022.
                    Drinko! began it&apos;s like as a drinking game for flatmates at University and quickly grew to be a
                    globally loved game. After moving out, Drinko!³ was developed in 2025 as a way to continue playing
                    the game from afar.
                </Text>
                <Text className="txt-base">
                    Authors: Lewis Milburn &lt;lewis@pixelset.dev&gt;
                </Text>
            </View>
            <View className="padding-sm card text-center grid-1">
                <Text className="txt-xl txt-bold">
                    We&apos;re open source!
                </Text>
                <Text className="txt-base">
                    Gin (Website &amp; App): <Link href={`https://github.com/pixelset/gin`} className={`link-inline`}>https://github.com/pixelset/gin</Link>
                </Text>
                <Text className="txt-base">
                    Vodka (Server/API): <Link href={`https://github.com/pixelset/vodka`} className={`link-inline`}>https://github.com/pixelset/vodka</Link>
                </Text>
            </View>
            <View className="padding-sm card text-center grid-1">
                <Text className="txt-xl txt-bold">
                    Older versions
                </Text>
                <Text className="txt-base">
                    You can play older versions of Drinko! including Classic Drinko! and Drinko!² by visiting&nbsp;
                    <Link href={`/old`} className={`link-inline`}>drinko.co.uk/old</Link>
                </Text>
            </View>
        </View>
    </ScrollView>;
}