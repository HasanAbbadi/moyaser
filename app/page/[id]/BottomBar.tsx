'use client'
import { useEffect, useRef, useState } from "react";
// icons
import {
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from 'react-icons/io5';

const audioApi = 'https://api.alquran.cloud/v1/page'
const reciter = 'ar.abdullahbasfar'

const Controls = ({ audioRef, ayat, ayahIndex, setAyahIndex, setAyah, isPlaying, setIsPlaying, ayahLoopTimes, setAyahLoopTimes, handleNext }: any) => {
    const [volume, setVolume] = useState(60);

    const togglePlayPause = () => {
        setIsPlaying((prev: number) => !prev);
    };

    // handle clicking on previous ayah button
    const handlePrevious = () => {
        if (ayahIndex === 0) {
            let lastAyahIndex = ayat.length - 1;
            setAyahIndex(lastAyahIndex);
            setAyah(ayat[lastAyahIndex]);
            setIsPlaying(true)
        } else {
            setAyahIndex((prev: number) => prev - 1);
            setAyah(ayat[ayahIndex - 1]);
            setIsPlaying(true)
        }
    };

    const handleLoop = () => {
        if (ayahLoopTimes < 5) {
            setAyahLoopTimes(ayahLoopTimes + 1)
        } else {
            setAyahLoopTimes(1)
        }

    }

    // self explanatroy
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, audioRef]);

    // change audio volume on slider change
    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume, audioRef]);

    return (
        <div className="controls-wrapper">
            <div className="controls">
                <button type="button" onClick={handlePrevious} title="playBack"> <IoPlayBackSharp /> </button>
                <button type="button" onClick={togglePlayPause} title="play" id="playPauseButton"> {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />} </button>
                <button type="button" onClick={handleNext} title="playForward"> <IoPlayForwardSharp /> </button>
            </div>
            <div className="volume-controls slidecontainer">
                <input
                    type="range"
                    title="volumeSlider"
                    className="slider"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                />
            </div>
            <div className="loop-controls">
                <button type="button" onClick={handleLoop} title="loop ayah">{ayahLoopTimes}</button>
            </div>
        </div>
    );
};


const DisplayAyah = ({ currentAyah, audioRef, handleNext, isPlaying, ayahLoopTimes }: any) => {
    let looped = 0;
    const canPlay = () => {
        if (isPlaying) {
            audioRef.current?.play()
        }
    }

    const onSeeked = () => {
        looped++;
        if (looped >= ayahLoopTimes) {
            handleNext()
            looped = 0
        }
    }

    return (
        <div>
            {/* <div className="text">
                <p className="title">{currentAyah.text}</p>
                <p>{currentAyah.numberInSurah}</p>
            </div> */}
            <audio src={currentAyah.audio} ref={audioRef} onSeeked={onSeeked} onCanPlay={canPlay} onEnded={handleNext} loop={true} />
        </div>
    );
};

export default function BottomPlayer({ pages, selectedVerseId, setPlayingVerseId }: any) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [ayahIndex, setAyahIndex] = useState(0);
    const [ayahLoopTimes, setAyahLoopTimes] = useState(1);
    const [ayat, setAyat]: any = useState(null)
    const [ayah, setAyah] = useState<any>(null);
    const audioRef = useRef<HTMLAudioElement>();

    const handleNext = () => {
        if (ayahIndex >= ayat.length - 1) {
            setAyahIndex(0);
            setAyah(ayat[0]);
        } else {
            setAyahIndex((prev: number) => prev + 1);
            setAyah(ayat[ayahIndex + 1]);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef?.current?.play();
        } else {
            audioRef?.current?.pause();
        }
    }, [isPlaying, audioRef]);


    // get data for both pages from api
    useEffect(() => {
        const urls: Array<string> = pages.map((page: number) => {
            return `${audioApi}/${page}/${reciter}`
        })
        Promise.all(urls.map((url: string) =>
            fetch(url).then(resp => resp.json())
        )).then((data: any) => {
            let all:Array<any> = data[0].data.ayahs.concat(data[1].data.ayahs)
            setAyat(all)
            setAyah(all[ayahIndex])
        })
    }, [])

    // on verse click change the offset to the corresponding verse
    useEffect(() => {
        if (ayat) {
            const index = ayat.findIndex((x: any) => {
                return x.number === selectedVerseId
            })
            setAyahIndex(index)
            setAyah(ayat[index])
        }
    }, [selectedVerseId])

    useEffect(() => {
        if (ayah && isPlaying) {
            setPlayingVerseId(ayah.number)
        }
    }, [ayah, isPlaying])

    return (
        <div id="audio-player">
            <div className="inner">
                {ayah &&
                    <>
                        <DisplayAyah currentAyah={ayah} {...{ audioRef, handleNext, isPlaying, ayahLoopTimes, setAyahLoopTimes }} />
                        <Controls {...{ audioRef, ayat, ayahIndex, setAyahIndex, setAyah, isPlaying, setIsPlaying, ayahLoopTimes, setAyahLoopTimes, handleNext }} />
                    </>
                }
            </div>
        </div>
    )
}