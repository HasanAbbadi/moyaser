'use client';

import { useEffect } from "react";
import surahs from "../../../public/surahs.json"

function changeClass(key: any, status: string, scroll: boolean = false) {
    const collection = document.getElementsByClassName(key);
    const elements: Array<any> = Array.from(collection)

    const activeCollection = document.getElementsByClassName(status)
    const activeElements: Array<any> = Array.from(activeCollection);

    if (scroll) {
        activeElements.forEach(element => {
            element.classList.remove(status)
        })
    }

    elements.forEach(element => {
        if (element.classList.contains(status)) {
            element.classList.remove(status)
        } else {
            element.classList.add(status)
        }
    });

    if (!scroll) {
        activeElements.forEach(element => {
            element.classList.remove(status)
        })
    }

    if (scroll && collection[0]) {
        collection[0].scrollIntoView({ behavior: 'smooth' })
    }

}

export default function WordInteractions({ word, setSelectedVerseId, playingVerseId, setPopUpOpen, setPopUpCoordinates }: any) {

    // highlight searched verse
    useEffect(() => {
        if (location.href.split('=').pop()) {
            changeClass(location.href.split('=').pop(), 'highlight', true)
        }
    })

    // give the playing verse a class of playing.
    useEffect(() => {
        changeClass(playingVerseId, 'playing', true)
    },
        [playingVerseId])

    function handleHover(e: any) {
        const key: string = e.target.className.split(' ')[1]
        changeClass(key, 'hover')
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
            {word.location.split(':').slice(1, 3).join(':') === '1:1' && (
                <div className="chapter-info">
                    <p>{surahs[word.chapter_id - 1].number}</p>
                    <div className="titles">
                        <h1>{surahs[word.chapter_id - 1].name}</h1>
                        <h1>{surahs[word.chapter_id - 1].englishName}</h1>
                    </div>
                    <p>{surahs[word.chapter_id - 1].numberOfAyahs}</p>
                </div>
            )}

            <div
                onClick={handleClick}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                className={`${word.char_type_name} ${word.verse_id} section-${word.section}`}
                style={word.color_code !== null ? { backgroundColor: `var(--${word.color_code})` } : {}}>
                {word.text_qpc_hafs}
            </div>
        </>
    )
}