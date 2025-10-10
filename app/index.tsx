import {View, Text, ScrollView} from "react-native";
import {Link, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import env from "@/env";

export default function App() {
    const router = useRouter();
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
                        Loading...
                    </Text>
                ): Loaded === 1? (
                    <Text className="txt-xl text-center">
                        Sorry, we are having issues connecting to the server. Please try again later.
                    </Text>
                ):(
                    <View className={`grid gap-std`}>
                        <Text className="txt-xl text-center">
                            Thank you for agreeing to test the latest version of Drinko! Your account should now be
                            activated and ready to go. If you think of anything at all, no matter how big or small,
                            if it is a bug/issue you&apos;ve found, design choice you question, or idea you have, we
                            want to hear about it! Thank you for your time!
                        </Text>
                        <Text className="txt-xl text-center bg-rose-600">
                            Do you have an Android phone? Would you like to test a new app? Let us know! We&apos;re
                            looking to launch Drinko! on Google Play and need testers to help us make sure our app is
                            not crap!
                        </Text>
                        <Text className="txt-xl text-center">
                            To contact us about either of the above, email drink-testing@pixelset.dev or DM @letsdrinko
                            on Instagram. Thank you!
                        </Text>
                        <Link href={`/menu`} className={`btn btn-rose txt-xl text-center`}>
                            Proceed to Drinko!
                        </Link>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
