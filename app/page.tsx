'use client'
import { useState } from "react";
import { BsBookmarksFill } from "react-icons/bs";
import { GiBookAura } from "react-icons/gi";
import ModalButton from "./ModalButton";
import surahs from '../public/surahs.json'

export default function Home() {
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [bookmarksOpen, setBookmarksOpen] = useState(false)
  const [query, setQuery] = useState("")

  return (
    <div className="center-content">
      <h2>Start Memorizing.</h2>
      <div className="modal-buttons">

        <ModalButton title="navigate" icon={<GiBookAura />}
          stateOpen={navigationOpen} setStateOpen={setNavigationOpen}>

          <input placeholder="Search" onChange={e => setQuery(e.target.value)} />
          <hr></hr>
          <div className="surahs-list">
            {surahs && (
              surahs.filter(surah => {

                if (query === '') {
                  return surah;
                } else if (surah.englishName.toLowerCase().includes(query.toLowerCase()) ||
                  // surah.name.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, '').includes(query) ||
                  surah.englishNameTranslation.toLowerCase().includes(query.toLowerCase()) ||
                  surah.number === parseInt(query)
                ) {
                  return surah;
                }
              }).map((surah, i: number) => {
                return (

                    <div onClick={() => {location.href = `/page/${surah.startPage}`}} key={i} className="surah-container details-list">
                      <div className="surah-titles">
                        <h4>{surah.name}</h4>
                        <h4>{surah.englishName}</h4>
                      </div>
                      <div className="surah-details">
                        <p>{surah.number}</p>
                        <p>{surah.englishNameTranslation}</p>
                        <p>{surah.numberOfAyahs}</p>
                      </div>
                    </div>

                )
              }))}
          </div>

        </ModalButton>

        <ModalButton title="bookmarks" icon={<BsBookmarksFill />}
          stateOpen={bookmarksOpen} setStateOpen={setBookmarksOpen}>

        </ModalButton>

      </div>
    </div>
  )
}
