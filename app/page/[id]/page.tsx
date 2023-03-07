import "./Page-modules.css"
import QuranPage from "./QuranPage";

export default function App({params: { id }}: any) {
    return (
        <>
            {/*@ts-expect-error*/}
            <QuranPage page={id} />
        </>
    )
}