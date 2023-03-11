'use client'

import { useEffect, useState } from "react"

export default function LeftSidebar({ colorschemes }: any) {
  const [theme, setTheme] = useState('nord-light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

    return (
        <form className="color-picker" action="">
          <fieldset>
            <legend className="visually-hidden">Pick a color scheme</legend>
            {colorschemes.map((cs: string, i: number) => {
              {
                return (
                  <div className="colorscheme-container" key={i}>
                    <label htmlFor={cs} className="visually-hidden">{cs}</label>
                    <input defaultChecked={localStorage.getItem('theme') === cs} type="radio" name="theme" id={cs}
                     onChange={(e:any) => {setTheme(e.target.id)}} />
                  </div>
                )

              }
            })}
          </fieldset>
        </form>

    )

}