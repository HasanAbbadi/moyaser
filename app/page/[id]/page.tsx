import "./styles.css"
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

const mainApi = 'https://moyaser-api.vercel.app'

async function getPages(pageNum: number) {
    console.log(pageNum)
    const res = await fetch(`${mainApi}/pages/${pageNum}`, { cache: 'no-store' });
    return await res.json();
}

export default async function App({ params: { id } }: any) {
    const pages = await getPages(id)
    const numbers = findPage(id)
    pages.reverse()
    numbers.reverse()


    return (
        <>
            <QuranPage pages={pages} numbers={numbers} reversedNumbers={numbers.reverse()} />
        </>
    )
}