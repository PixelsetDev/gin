import {router} from "expo-router";
import env from "../../env";

let activities;

export default function startGame() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('game').trim() === "" || typeof urlParams.get('game') === "undefined") {
        alert("Game not found.");
        router.push("/menu");
    } else {
        fetch(`https://${env.API_BASE}/game`, {
            method: "PUT",
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: urlParams.get('game').trim(),
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                alert("Sorry, something went wrong. Please try again later (E3)")
                console.error(err)
            })
    }
}