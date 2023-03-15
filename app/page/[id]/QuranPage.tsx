'use client'
import { useEffect, useState } from "react";
import BottomPlayer from "./BottomPlayer";
import Tab from "../../Tabs";
import ClickAwayListener from "react-click-away-listener";
import WordInteractions from "./wordInteractions";
import { BsArrowBarLeft, BsArrowBarRight, BsEyeFill, BsEyeSlashFill, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsFillInfoCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import Link from "next/link";
import Bookmark from "./Bookmark";

function Chapter({ chapter, setSelectedVerseId, playingVerseId, setPopUpOpen, setPopUpCoordinates }: any) {
    return (
        <div className="chapter-container">
            {chapter?.map((words: any, i: number) => {
                return (
                    <div key={i} className="line-container">
                        {words?.map((word: any, i: number) => {
                            return <WordInteractions key={i} word={word} {...{ setSelectedVerseId, playingVerseId, setPopUpOpen, setPopUpCoordinates }} />
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default function QuranPage({ pages, numbers, reversedNumbers }: any) {
    const [selectedVerseId, setSelectedVerseId] = useState<number>(0)
    const [playingVerseId, setPlayingVerseId] = useState<number>(0)
    const [verseIdToPlay, setVerseIdToPlay] = useState<number>(0)
    const [verseModalOpen, setVerseModalOpen] = useState(false)
    const [popUpOpen, setPopUpOpen] = useState(false)
    const [popUpCoordinates, setPopUpCoordinates] = useState({ x: 0, y: 0 })
    const [testMode, setTestMode] = useState(false)
    const [modalData, setModalData] = useState<any>(null)

    useEffect(() => {
        if (selectedVerseId <= 0) return;
        if (!verseModalOpen) return;
        fetch(`https://api.hefzmoyaser.net/verses/${selectedVerseId}/interactions`).then((res) => {
            return res.json()
        }).then(json => {
            const items = [
                {
                    name: "Tafseer",
                    content: (
                        <>
                            <h4>The Tafseer</h4>
                            <p>{json.tafseer.tafseer}</p>
                        </>
                    ),
                    is_active: true,
                },
                {
                    name: "Meanings",
                    content: (
                        <>
                            {json.meanings.map((meaning: any, i: number) => {
                                return (
                                    <div key={i} className={'details-list'}>
                                        <h4>{meaning.words}</h4>
                                        <p>{meaning.meaning}</p>
                                    </div>
                                )
                            })}
                        </>
                    ),
                    is_active: false,
                },
                {
                    name: "Reflections",
                    content: (
                        <>
                            {json.reflections.map((ref: any, i: number) => {
                                return (
                                    <div key={i} className={'details-list'}>
                                        <h4 className={ref.type}>{ref.type}</h4>
                                        <p>{ref.reflection}</p>
                                    </div>
                                )
                            })}
                        </>
                    ),
                    is_active: false,
                },
            ];
            setModalData(items)
        })

    }, [verseModalOpen])


    // add a class of hidden each time 
    useEffect(() => {
        const collection = document.querySelectorAll(`.line-container:has(.word.v${selectedVerseId.toString()}) ~ .line-container > .word`);
        const elements: Array<any> = Array.from(collection)

        const hiddenCollection = document.getElementsByClassName('hidden')
        const hiddenElements: Array<any> = Array.from(hiddenCollection);

        hiddenElements.forEach(element => {
            element.classList.remove('hidden')
        })

        if (!testMode) return;
        if (elements.length > 0) {
            elements.forEach(element => {
                element.classList.add('hidden')
            });
        } else {
            setTestMode(false)
        }

    }, [testMode, selectedVerseId])

    // converts arabic numerals 0-9 to hindi numerals currently used in arabia ۰-۹
    const e2a = (s: string) => s.replace(/\d/g, (d: any) => '٠١٢٣٤٥٦٧٨٩'[d])
    return (
        <>
            {popUpOpen && (
                <ClickAwayListener onClickAway={() => setPopUpOpen(false)}>
                    <div style={{ top: (popUpCoordinates.y - 70), left: (popUpCoordinates.x - 15) }} className={'popup'}>
                        <button type="button" onClick={() => { setVerseModalOpen(true); setPopUpOpen(false) }} title="info"><BsFillInfoCircleFill /></button>
                        <button type="button" onClick={() => { setTestMode(!testMode); setPopUpOpen(false) }} title="test"><BsEyeSlashFill /></button>
                        <button type="button" onClick={() => { setVerseIdToPlay(selectedVerseId); setPopUpOpen(false) }} title="play"><BsFillPlayCircleFill /></button>
                    </div>
                </ClickAwayListener>
            )}
            {verseModalOpen && (
                <div className="modal modal-open">
                    <ClickAwayListener onClickAway={() => { setVerseModalOpen(false); setModalData(null) }}>
                        <div className="modal-content">
                            {modalData && (
                                <Tab items={modalData} />
                            )}
                        </div>
                    </ClickAwayListener>
                </div>
            )}

            {testMode && (
                <div id="test-mode-container">
                    <div className="popup">
                        <button title="reveal next" onClick={() => { setSelectedVerseId(selectedVerseId + 1) }}><BsArrowBarLeft /></button>
                        <button title="hide previous" onClick={() => { setSelectedVerseId(selectedVerseId - 1) }}><BsArrowBarRight /></button>
                        <button title="show all" onClick={() => { setTestMode(false) }}><BsEyeFill /></button>
                    </div>
                </div>
            )}


            <div id="wrapper">
                <Link className="previous-next-page" href={`/page/${parseInt(numbers[0]) + 1}`}><BsFillArrowLeftCircleFill /></Link>
                <div className="pages-wrapper">

                    {
                        pages?.map((chapter: any, i: number) => {
                            return (
                                <div key={i} className={"page-container"}>
                                    <Chapter key={i} chapter={chapter} {...{ setSelectedVerseId, playingVerseId, setPopUpOpen, setPopUpCoordinates }} />
                                    <h5 className="page-number">{e2a(reversedNumbers[i].toString())}</h5>
                                </div>
                            )
                        })
                    }
                </div>
                <Link className="previous-next-page" href={`/page/${parseInt(numbers[1]) - 1}`}><BsFillArrowRightCircleFill /></Link>
            </div>
            <BottomPlayer pages={numbers} {...{ verseIdToPlay, setPlayingVerseId }} />
        </>)
}