import DisplayVerseDetails from "./VerseDetails";

const mainApi = 'https://moyaser-api.vercel.app'

async function getPage(pageNum: number) {
    const res = await fetch(`${mainApi}/page/${pageNum}?format=line`);
    return await res.json();
}

function Chapter({ chapter }: any) {
    return (
        <div className="chapter-container">
            {chapter?.map((words: any, i: number) => {
                return <Line key={i} words={words} />
            })}
        </div>
    )
}

function Line({ words }: any) {
    return (
        <div className="line-container">
            {words?.map((word: any, i: number) => {
                return <Word key={i} word={word} />
            })}
        </div>
    )
}

function Word({ word }: any) {
    return (
        <>
        <DisplayVerseDetails word={word} />
        </>
    )
}


export default async function QuranPage({ page }: any) {
    let chapters = await getPage(page)

    return (
        <div className="mainDiv">
            {chapters?.map((chapter: any, i: number) => {
                return <Chapter key={i} chapter={chapter} />
            })}
            <code>{page}</code>
        </div>
    )
}