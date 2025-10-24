import {router} from "expo-router";
import env from "@/env";

export default async function startGame(game: string): Promise<[number, {
    mode: number;
    host: string;
    packs: [string];
    players: [string];
    activities: any[];
}|string]> {
    if (!game || Object.keys(game).length === 0) {
        alert("Game not found.");
        router.push("/menu");
        return [-1, "Game not found"];
    }

    try {
        const res = await fetch(`https://${env.API_BASE}/game`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: game }),
        });

        const data = await res.json();

        if (data.code !== 200) {
            return [data.code, data.message + " - " + data.data];
        } else {
            return [1, data.data];
        }
    } catch (err) {
        alert("Sorry, something went wrong. Please try again later (E3)");
        console.error(err);
        const msg = err instanceof Error ? err.message : String(err);
        return [-1, msg];
    }
}
