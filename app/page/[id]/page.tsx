import "./Page-modules.css"
import QuranPage from "./QuranPage";

export default async function App({params: { id }}: any) {
    return (
        <>
            <QuranPage page={id} />
        </>
    )
}