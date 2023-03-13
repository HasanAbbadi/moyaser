'use client'
import { useState, useEffect } from "react";
import { BsBookmarksFill } from "react-icons/bs";
import { GiBookAura } from "react-icons/gi";
import { TbListSearch } from 'react-icons/tb'
import ModalButton from "./ModalButton";
import surahs from '../public/surahs.json'

export default function Home() {
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [bookmarksOpen, setBookmarksOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchData, setSearchData] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedResultId, setSelectedResultId] = useState(0)
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!searchOpen) return;
    if (searchQuery.length <= 3) return;

    fetch(`https://api.alquran.cloud/v1/search/${searchQuery}/all/quran-simple-clean`).then((res) => {
      console.log(res.status)
      if (res.status != 200) return {'res': 'No result found'}
      return res.json()
    }).then((json) => {
      setSearchData(json.data)
    })
  }, [searchQuery])

  useEffect(() => {
    if (selectedResultId <= 0) return;
    fetch(`https://api.alquran.cloud/v1/ayah/${selectedResultId}`).then((res) => {
      return res.json()
    }).then((json) => {
      location.href = `/page/${json.data.page}?verse=${selectedResultId}`
    })
  }, [selectedResultId])

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

                  <div onClick={() => { location.href = `/page/${surah.startPage}` }} key={i} className="surah-container details-list">
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

        <ModalButton title="search" icon={<TbListSearch />}
          stateOpen={searchOpen} setStateOpen={setSearchOpen}>

          <input placeholder="Search" onChange={e => setSearchQuery(e.target.value)} />
          <hr></hr>

          {searchData && (
            <div className="search-list tab-container">
              <h4>Found: {searchData.count}</h4>
              {searchData.matches.map((result: any, i: number) => {
                return (
                  <div key={i} onClick={() => { setSelectedResultId(result.number) }} className="result-container details-list">
                    <div className="result-details">
                      <h4>{result.surah.englishName}</h4>
                      <h4>{result.surah.name}</h4>
                    </div>
                    <div className="result-text">
                      <p>{result.text} ({result.numberInSurah})</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ModalButton>

      </div>
    </div>
  )
}
