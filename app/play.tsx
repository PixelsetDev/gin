import {ScrollView, Text} from "react-native";
import {useEffect} from "react";
import startGame from "../public/js/game";

export default function App() {
    useEffect(() => {
        startGame()
    }, []);

    return <ScrollView className={`grid-1`}>
        <Text>Play</Text>
    </ScrollView>;
}