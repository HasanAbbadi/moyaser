'use client';

import { useEffect } from "react";

export default function WordInteractions({ word, setSelectedVerseId, playingVerseId, setPopUpOpen, setPopUpCoordinates }: any) {

    // give the playing verse a class of playing.
    useEffect(() => {
        const collection = document.getElementsByClassName(playingVerseId);
        const elements: Array<any> = Array.from(collection)

        const playingCollection = document.getElementsByClassName('playing')
        const playingElements: Array<any> = Array.from(playingCollection);

        playingElements.forEach(element => {
            element.classList.remove("playing")
        })

        elements.forEach(element => {
            if (element.classList.contains("playing")) {
                element.classList.remove('playing')
            } else {
                element.classList.add('playing')
            }
        });

    },
        [playingVerseId])

    function handleHover(e: any) {
        const key: string = e.target.className.split(' ')[1]
        const collection = document.getElementsByClassName(key);
        const elements: Array<any> = Array.from(collection)

        const hoverCollection = document.getElementsByClassName('hover')
        const hoverElements: Array<any> = Array.from(hoverCollection);

        elements.forEach(element => {
            if (element.classList.contains("hover")) {
                element.classList.remove('hover')
            } else {
                element.classList.add('hover')
            }
        });

        hoverElements.forEach(element => {
            element.classList.remove("hover")
        })

    }

    async function handleClick(e: any) {
        setSelectedVerseId(word.verse_id)
        setPopUpOpen(true)
        setPopUpCoordinates({
            x: e.pageX,
            y: e.pageY
        })
    }


    return (
        <>
        {/*@ts-ignore*/}
            <div
                onClick={handleClick}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                className={`${word.char_type_name} ${word.verse_id} section-${word.section}`}
                style={{ backgroundColor: `var(--${word.color_code})` }}>
                {word.text_qpc_hafs}
            </div>
        </>
    )
}