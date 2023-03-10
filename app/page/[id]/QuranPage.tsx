'use client'
import { useState } from "react";
import BottomPlayer from "./BottomBar";
import DisplayVerseDetails from "./VerseDetails";

function Chapter({ chapter, setSelectedVerseId, playingVerseId }: any) {
    return (
        <div className="chapter-container">
            {chapter?.map((words: any, i: number) => {
                return (
                    <div key={i} className="line-container">
                        {words?.map((word: any, i: number) => {
                            return <DisplayVerseDetails key={i} word={word} {...{setSelectedVerseId, playingVerseId}} />
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default function QuranPage({ pages, numbers }: any) {
    const [selectedVerseId, setSelectedVerseId] = useState<number>(0)
    const [playingVerseId, setPlayingVerseId] = useState<number>(0)

    return (
        <>
            <div id="wrapper">

                {
                    pages?.map((chapter: any, i: number) => {
                        return (
                            <div key={i} className={"page-container"}>
                                <Chapter key={i} chapter={chapter} {...{setSelectedVerseId, playingVerseId}} />
                                <code>{numbers[i]}</code>
                            </div>
                        )
                    })
                }
            </div>
            <BottomPlayer pages={numbers} {...{selectedVerseId, setPlayingVerseId}} />
        </>)
}