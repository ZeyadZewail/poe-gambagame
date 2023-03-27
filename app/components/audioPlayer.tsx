import divDrop from "~/assets/audio/item_drop_divcard.wav"
import itemPickup from "~/assets/audio/item_pickup.wav"
import buttonDown from "~/assets/audio/button_click_down.wav"
import buttonUp from "~/assets/audio/button_click_up.wav"
import harvestCraft from "~/assets/audio/harvestcraft.wav"
import { atom } from "jotai"
export enum AudioFile {
    itemDDiv, itemPickUp, ButtonDown, ButtonUp, harvestCraft
}

const itemVolume = 0.3;
const buttonVolume = 0.3;
export default function playSound(audio: AudioFile) {
    let audioFileToPlay = new Audio('');
    switch (audio) {
        case AudioFile.itemDDiv:
            audioFileToPlay = new Audio(divDrop);
            audioFileToPlay.volume = itemVolume;
            break;
        case AudioFile.itemPickUp:
            audioFileToPlay = new Audio(itemPickup)
            audioFileToPlay.volume = itemVolume;
            break;
        case AudioFile.ButtonDown:
            audioFileToPlay = new Audio(buttonDown)
            audioFileToPlay.volume = buttonVolume;
            break;
        case AudioFile.ButtonUp:
            audioFileToPlay = new Audio(buttonUp)
            audioFileToPlay.volume = buttonVolume;
            break;
        case AudioFile.harvestCraft:
            audioFileToPlay = new Audio(harvestCraft)
            audioFileToPlay.volume = itemVolume;
            break;
        default:
            break;
    }
    audioFileToPlay.play();
}
