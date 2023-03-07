import React, { useEffect } from "react";


interface VerseModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}


const Modal = ({ children, isOpen, handleClose }: VerseModalProps) => {
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) =>
            e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    if (!isOpen) return null;

    return (
        <div className="modal">
            <button onClick={handleClose} className="close-btn">
                Close
            </button>
            <div className="modal-content">{children}</div>
        </div>
    );
};

export default Modal;