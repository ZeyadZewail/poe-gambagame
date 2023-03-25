import bgm1 from "~/assets/audio/HarvestBoss.wav"
import bgm2 from "~/assets/audio/HarvestCombat.wav"
import bgm3 from "~/assets/audio/HarvestGarden.wav"
import { FC, useEffect, useRef, useState } from "react"


const BGMPlayer: React.FC = ({ }) => {
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const audioFiles = [bgm1, bgm2, bgm3];
    const audioRef = useRef(new Audio(audioFiles[currentAudioIndex]));
    const playAudio = () => {
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        audioRef.current.play();
    };
    useEffect(() => {
        playAudio();
    }, []);
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioFiles[currentAudioIndex]);
        playAudio();
    }, [currentAudioIndex]);
    const handleNextAudio = () => {
        setCurrentAudioIndex((currentAudioIndex + 1) % audioFiles.length);
    };
    audioRef.current.addEventListener('ended', handleNextAudio);
    return (<></>)
}
export default BGMPlayer;