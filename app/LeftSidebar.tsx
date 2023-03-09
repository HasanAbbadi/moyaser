
export default function LeftSidebar({ colorschemes }: any) {
    return (
        <form className="color-picker" action="">
          <fieldset>
            <legend className="visually-hidden">Pick a color scheme</legend>
            {colorschemes.map((cs: string, i: number) => {
              {
                return (
                  <div className="colorscheme-container" key={i}>
                    <label htmlFor={cs} className="visually-hidden">{cs}</label>
                    <input defaultChecked={colorschemes[0] === cs} type="radio" name="theme" id={cs} />
                  </div>
                )

              }
            })}
          </fieldset>
        </form>

    )

}