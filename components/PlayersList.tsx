import {Image, Text, View} from "react-native";
import env from "@/env";

export default function PlayersList({ players }: { players: string[] }) {
    let i = 0;
    return (<View className={`menu-overflow`}>
        {players && players.length > 0 ? players.map((player, index) => (
            <View key={`player-${index}`} className="w-48 btn-card btn-neutral-disabled">
                <Image source={{ uri: `https://${env.API_BASE}/static/user-icons/${(index % 3) + 1}.png` }} className="w-full h-24" />
                <Text className="txt-base text-white text-center px-3 py-2">{player}</Text>
            </View>
        )) : (
            <Text className="text-white text-center">Who are you playing with today?</Text>
        )}

    </View>);
}