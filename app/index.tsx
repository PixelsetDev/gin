import {View, Text, ScrollView} from "react-native";
import {Link, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import env from "@/env";
import DotSpinner from "@/components/dotSpinner";

export default function App() {
    const [Loaded, setLoaded] = useState(0);
    useEffect(() => {
        fetch(`https://${env.API_BASE}/status`)
            .then(response => {
                if (response.status === 200) {
                    setLoaded(2);
                } else {
                    setLoaded(1);
                }
            })
    }, []);

    return (
        <ScrollView className={`grid gap-std`}>
            <View className={`header fixed top-0 left-0 right-0 bottom-0 txt-bold`}>
                <Text className={`txt-6xl text-white text-center txt-bold`}>Drinko!³</Text>
                {Loaded === 0?(
                    <Text className="txt-xl text-center">
                        <DotSpinner/>
                    </Text>
                ): Loaded === 1? (
                    <Text className="txt-xl text-center">
                        Sorry, we are having issues connecting to the server. Please try again later.
                    </Text>
                ):(
                    <View className={`grid gap-std`}>
                        <Text className="txt-xl text-center bg-red-700">
                            This game is currently being tested. It will have bugs and issues. You must be added to the
                            testing group to be able to play, for access email drinko-testing@pixelset.dev
                        </Text>
                        <Text className="txt-xl text-center">
                            Welcome to Drinko!³, the third edition of the much loved game Drinko!
                        </Text>
                        <Text className="txt-xl text-center">
                            This game is dirty and contains adult themes, don&apos;t play it with your parents. You
                            must be 18+ to play. This game will get you drunk. Always drink responsibly. When the fun
                            stops, stop.
                        </Text>
                        <Link href={`/menu`} className={`btn btn-rose txt-xl text-center`}>
                            Let&apos;s go!
                        </Link>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
