import divDrop from "~/assets/audio/item_drop_divcard.wav"
import itemPickup from "~/assets/audio/item_pickup.wav"
import buttonDown from "~/assets/audio/button_down.wav"
import buttonUp from "~/assets/audio/button_up.wav"
export enum AudioFile {
    itemDDiv, itemPickUp, Button
}

export default function playSound(audio: AudioFile, volume: number) {
    let audioFileToPlay = new Audio('');
    switch (audio) {
        case AudioFile.itemDDiv:
            audioFileToPlay = new Audio(divDrop);
            break;
        case AudioFile.itemPickUp:
            audioFileToPlay = new Audio(itemPickup)
            break;
        case AudioFile.Button:
            audioFileToPlay = new Audio(buttonDown)
            let buttonUpAudio = new Audio(buttonUp)
            audioFileToPlay.addEventListener('ended', () => {
                buttonUpAudio.play();
            });
        default:
            break;
    }
    audioFileToPlay.volume = volume;
    audioFileToPlay.play();
}
