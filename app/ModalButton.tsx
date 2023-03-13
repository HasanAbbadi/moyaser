import ClickAwayListener from "react-click-away-listener";

const delay = (ms:number) => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function ModalButton({ children, title, icon, stateOpen, setStateOpen }: any) {
    const handleOpen = async () => {
        setStateOpen(true)
        await delay(50)
        const modal = document.getElementsByClassName('modal')[0]
        await delay(50)
        modal.classList.add('modal-open')
    }

    const handleClose = async () => {
        const modal = document.getElementsByClassName('modal')[0]
        modal.classList.add('modal-close')
        await delay(200)
        setStateOpen(false)
    }


    return (
        <>
            <button className="modal-button" type="button" title={title}
                onClick={handleOpen}>{icon}
            </button>
            {
                stateOpen && (
                    <div className={`modal ${title}-modal`}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <div className="modal-content">
                                {children}
                            </div>
                        </ClickAwayListener>
                    </div>
                )
            }
        </>
    )
}