import {ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";
import {useLocalSearchParams} from "expo-router/build/hooks";
import {Helmet} from "react-helmet";

export default function App() {
    const params = useLocalSearchParams();
    return <ScrollView className={`grid-1`}>
        <Helmet>
            <title>Error - Drinko!³</title>
        </Helmet>
        <View className={`header`}>
            <Text className={`txt-4xl text-white text-center txt-bold`}>Whoops, something went wrong</Text>
            <Link href={`/menu`} className={`txt-xl link-header text-center text-white`}>Back to Drinko!³</Link>
        </View>
        <View className={`padding grid-1 gap-std`}>
            <View className="padding-sm card text-center grid-1 gap-std">
                <Text className="txt-xl text-center txt-bold">
                    Error {params.code} - {params.error}
                </Text>
                <Text className="txt-xl text-center">
                    {params.description}
                </Text>
                <Text>&nbsp;</Text>
                <View className="txt-xl bg-black dark:bg-white p-2 grid-1">
                    <Text className={`text-red-300 dark:text-red-800`}>ErrorLoc.File: {params.elFile}</Text>
                    <Text className={`text-red-300 dark:text-red-800`}>ErrorLoc.Line: {params.elFunc}</Text>
                    <Text className={`text-red-300 dark:text-red-800`}>Vodka.ClientServer: true</Text>
                    <Text className={`text-red-300 dark:text-red-800`}>Vodka.PeerToPeer: false</Text>
                    <Text className={`text-red-300 dark:text-red-800`}>Vodka.Version: latest/main@git</Text>
                    <Text className={`text-red-300 dark:text-red-800`}>Gin.Version: latest/main@git</Text>
                </View>
            </View>
            <View className={`grid-2 gap-std`}>
                <Link href={`/menu`} className={`btn btn-neutral txt-base text-center`}>
                    Back to Drinko!³ Home
                </Link>
                <Link href={`https://support.pixelset.dev/knowledgebase.php?article=63`} className={`btn btn-neutral txt-base text-center`}>
                    Visit Drinko!³ Support
                </Link>
            </View>
        </View>
    </ScrollView>;
}