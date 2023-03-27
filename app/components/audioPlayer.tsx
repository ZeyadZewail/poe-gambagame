import divDrop from "~/assets/audio/item_drop_divcard.wav"
import itemPickup from "~/assets/audio/item_pickup.wav"
import buttonDown from "~/assets/audio/button_click_down.wav"
import buttonUp from "~/assets/audio/button_click_up.wav"
import harvestCraft from "~/assets/audio/harvestcraft.wav"
import { atom } from "jotai"
export enum AudioFile {
    itemDDiv, itemPickUp, ButtonDown, ButtonUp, harvestCraft
}

const buttonAudioVol = atom(0.3);
export { buttonAudioVol }
export default function playSound(audio: AudioFile, volume: number) {
    let audioFileToPlay = new Audio('');
    switch (audio) {
        case AudioFile.itemDDiv:
            audioFileToPlay = new Audio(divDrop);
            break;
        case AudioFile.itemPickUp:
            audioFileToPlay = new Audio(itemPickup)
            break;
        case AudioFile.ButtonDown:
            audioFileToPlay = new Audio(buttonDown)
            break;
        case AudioFile.ButtonUp:
            audioFileToPlay = new Audio(buttonUp)
            break;
        case AudioFile.harvestCraft:
            audioFileToPlay = new Audio(harvestCraft)
            break;
        default:
            break;
    }
    audioFileToPlay.volume = volume;
    audioFileToPlay.play();
}
