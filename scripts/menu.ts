import env from "@/env";
import {router} from "expo-router";
import {singlePackType} from "@/constants/types";

export function createGame(packs: number[], Mode: number, Players: string[]) {
    fetch(`https://${env.API_BASE}/game`, {
        method: "POST",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            mode: Mode,
            packs: packs,
            players: Players
        })
    })
        .then(res => res.json())
        .then(res => {
            if (res.code === 401) {
                alert(`Your login session may have expired. Please login again (E4/401)`);
                router.push("/menu");
            } else if (res.code === 201) {
                let gameCode = res.data;
                router.push({
                    pathname: `/play`,
                    params: {game: gameCode}
                });
            } else if (res.code === 403) {
                alert(`You don't own the pack that you have selected. Please select another pack and try again. (E4/403)`);
                console.error(res)
            } else {
                router.push({
                    pathname: `/error`,
                    params: {
                        code: res.code,
                        error: res.message,
                        description: "Please try again or contact support for assistance.",
                        elFile: 'menu.tsx',
                        elFunc: 'createGame'
                    }
                });
            }
        })
        .catch(err => {
            router.push({
                pathname: `/error`,
                params: {
                    code: err.code,
                    error: err.message,
                    description: "Please try again or contact support for assistance.",
                    elFile: 'menu.tsx',
                    elFunc: 'createGame'
                }
            });
        })
}