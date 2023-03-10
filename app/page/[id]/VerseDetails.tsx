'use client';

import { useEffect, useState } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import Tab from "./Tabs";

export default function DisplayVerseDetails({ word, setSelectedVerseId, playingVerseId }: any) {
    const [verseModalOpen, setVerseModalOpen] = useState(false)
    const [data, setData] = useState<any>(null)

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
        // setVerseModalOpen(!verseModalOpen)
        // const res = await fetch(`https://api.hefzmoyaser.net/verses/${word.verse_id}/interactions`)
        // const json = await res.json()
        // const items = [
        //     {
        //         name: "Tafseer",
        //         content: (
        //             <>
        //                 <h4>The Tafseer</h4>
        //                 <p>{json.tafseer.tafseer}</p>
        //             </>
        //         ),
        //         is_active: true,
        //     },
        //     {
        //         name: "Meanings",
        //         content: (
        //             <>
        //                 {json.meanings.map((meaning: any, i: number) => {
        //                     return (
        //                         <div key={i} className={'details-list'}>
        //                             <h4>{meaning.words}</h4>
        //                             <p>{meaning.meaning}</p>
        //                         </div>
        //                     )
        //                 })}
        //             </>
        //             ),
        //         is_active: false,
        //     },
        //     {
        //         name: "Reflections",
        //         content: (
        //             <>
        //                 {json.reflections.map((ref: any, i: number) => {
        //                     return (
        //                         <div key={i} className={'details-list'}>
        //                             <h4 className={ref.type}>{ref.type}</h4>
        //                             <p>{ref.reflection}</p>
        //                         </div>
        //                     )
        //                 })}
        //             </>
        //             ),
        //         is_active: false,
        //     },
        // ];

        // setData(items)
        // console.log(data)
    }


    return (
        <>
            <Modal isOpen={verseModalOpen}
                handleClose={() => setVerseModalOpen(false)}>
                {data && (
                    <Tab items={data} />
                )}
            </Modal>
            <p
                // onClick={() => { router.push(pathname + '?id=' + word.verse_id) }}
                onClick={handleClick}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                className={`${word.char_type_name} ${word.verse_id} section-${word.section}`}
                style={{ backgroundColor: `var(--${word.color_code})` }}>
                {word.text_qpc_hafs}
            </p>
        </>
    )
}