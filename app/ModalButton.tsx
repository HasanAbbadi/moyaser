
import ClickAwayListener from "react-click-away-listener";

export default function ModalButton({ children, title, icon, stateOpen, setStateOpen }: any) {
    return (
        <>
            <button className="modal-button" type="button" title={title}
                onClick={() => setStateOpen(true)}>{icon}
            </button>
            {
                stateOpen && (
                    <div className={`modal ${title}-modal`}>
                        <ClickAwayListener onClickAway={() => { setStateOpen(false) }}>
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