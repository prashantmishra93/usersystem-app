import React from 'react'
import "../../assets/css/popup.css";
import { makeAjax, respStatus, url } from '../helpers/global_helper'

const DeletePopup = (props) => {
    const { userId, handleClosePopup, headerText } = props

    const handleDeleteUser = async () => {
        const formData = {id:userId}
        try {
            const response = await makeAjax(url.CREAD_API.userDestroy, formData);
            if(response.status === respStatus["SUCCESS"]) {
                console.log(response);
                handleClosePopup()
            }
        } catch (error) {
            console.error("Error while submitting the form:", error);
        }
    }
    return (
        <>
            <div className="mainDiv">
                <div className='body_overlay' onClick={handleClosePopup}></div>
                <div className='mainContainer cancelDiv'>
                    <div className='popupModal'>
                        <div className='modal_head'>
                            <h3>{headerText ? headerText : "User Delete"}</h3>
                            <p onClick={handleClosePopup}>&times;</p>
                        </div>
                        <div className='modal_body'>
                            <div className='main_body_scroll deleteBody'>
                                <button className="btn btn-success" onClick={handleDeleteUser}>Confirm</button>
                                <button className="btn btn-danger" onClick={handleClosePopup}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletePopup
