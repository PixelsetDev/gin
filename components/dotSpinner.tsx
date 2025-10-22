import React, { useEffect, useState } from "react";
import { Text } from "react-native";

export default function DotSpinner() {
    const frames = ["●○○○○", "○●○○○", "○○●○○", "○○○●○", "○○○○●", "○○○●○", "○○●○○", "○●○○○"]; // animation frames
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % frames.length);
        }, 300);
        return () => clearInterval(interval);
    }, [frames.length, setFrameIndex]);

    return (
        <Text>
            {frames[frameIndex]}
        </Text>
    );
}