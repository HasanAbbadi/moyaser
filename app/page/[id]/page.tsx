import "./Page-modules.css"
import QuranPage from "./QuranPage";

function findPage(pageNum: any) {
    let pages: Array<number> = [];
    let secondPage: number = parseInt(pageNum) + 1

    if (pageNum % 2 === 0) {
        secondPage -= 2
    }

    pages.push(secondPage)
    pages.push(pageNum)
    pages.sort((a, b): number => b - a)
    return pages
}

export function generateMetadata({ params: { id } }: any) {
    const pages = findPage(id)
    return { title: `Page ${pages.reverse()}` }
}

export default function App({ params: { id } }: any) {
    const pages = findPage(id)

    return (
        <>
            <div id="wrapper">
                {pages.map((page: number, i: number) => {
                    return (
                        /*@ts-expect-error*/
                        <QuranPage page={page} key={i} />
                    )
                })}
            </div>
        </>
    )
}