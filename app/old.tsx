import {ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";

export default function App() {
    return <ScrollView className={`grid-1`}>
        <View className={`header`}>
            <Text className={`txt-4xl text-white text-center txt-bold`}>Play older Drinko! games</Text>
            <Link href={`/menu`} className={`txt-xl link-header text-center text-white`}>Back to Drinko!³</Link>
        </View>
        <View className={`padding grid-1 gap-std`}>
            <View className="padding-sm card text-center grid-1 gap-sm">
                <Text className="txt-xl txt-bold">
                    Drinko!³
                </Text>
                <Text className="txt-base">
                    Drinko!³ is the latest and greatest member of the Drinko! family. We recommend playing this version
                    of the game for the best experience, but if you&apos;re looking for some nostalgia, we have kept
                    older versions of the game alive for you!
                </Text>
                <Text className="txt-base">
                    Drinko!³ has all the same content and more, with additional packs and multiplayer support added.
                </Text>
                <Text className="txt-base">
                    Play Drinko!³ at <Link href={`https://letsdrinko.com`} className={`link-inline`}>letsdrinko.com</Link>
                </Text>
            </View>
            <View className={`grid-2 gap-std`}>
                <View className="padding-sm card text-center grid-1 gap-sm">
                    <Text className="txt-xl txt-bold">
                        Drinko!²
                    </Text>
                    <Text className="txt-base">
                        Drinko!² was created to solve the mess that was Drinko!, the codebase for the game was
                        &#34;unfortunate&#34; and needed replacing to be expandable. The new version added an extra pack
                        and fixed a tonne of issues.
                    </Text>
                    <Text className="txt-base">
                        This version of the game has some bugs, and may crash. For a smoother experience, play the
                        latest version of Drinko!, it has all the same content!
                    </Text>
                    <Text className="txt-base">
                        Play it at <Link href={`https://2.letsdrinko.com`} className={`link-inline`}>2.letsdrinko.com</Link>
                    </Text>
                </View>
                <View className="padding-sm card text-center grid-1 gap-sm">
                    <Text className="txt-xl txt-bold">
                        Classic Drinko!
                    </Text>
                    <Text className="txt-base">
                        Drinko! was created by Lewis in his second year University flat after getting somewhat bored of
                        the drinking games available on the app store. Whilst he didn&apos;t know how to make apps, he
                        did know how to make websites - and Drinko! was born!
                    </Text>
                    <Text className="txt-base">
                        This version of the game has some bugs, and may crash. For a smoother experience, play the
                        latest version of Drinko!, it has all the same content!
                    </Text>
                    <Text className="txt-base">
                        Play it at <Link href={`https://1.letsdrinko.com`} className={`link-inline`}>1.letsdrinko.com</Link>
                    </Text>
                </View>
            </View>
        </View>
    </ScrollView>;
}