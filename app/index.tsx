import { Disclaimer } from "@/components/Disclaimer";
import "/../assets/css/styles.css"
import {View} from "react-native";

export default function App() {
    return <View nativeID={`screen`}>
        <Disclaimer/>
    </View>;
}