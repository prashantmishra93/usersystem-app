import React from 'react'
import "../../assets/css/popup.css";

const MainPopup = (props) => {
    const { handleClosePopup, headerText, children } = props

    return (
        <>
            <div className="mainDiv">
                <div className='body_overlay' onClick={handleClosePopup}></div>
                <div className='mainContainer'>
                    <div className='popupModal'>
                        <div className='modal_head'>
                            <h3>{headerText ? headerText : "User Details"}</h3>
                            <p onClick={handleClosePopup}>&times;</p>
                        </div>
                        <div className='modal_body'>
                            <div className='main_body_scroll'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPopup
