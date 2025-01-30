import React, { useEffect, useState } from 'react'
import { makeAjax, respStatus, url } from '../helpers/global_helper'
import UserUpdate from '../Popup/UserUpdate';
import UserAdd from '../Popup/UserAdd';
import DeletePopup from '../Popup/DeletePopup';
import MainPopup from '../Popup/MainPopup';

const Home = () => {
    const [userData, setUserData] = useState([]);
    const [userId, setUserId]= useState();
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    useEffect(() => {
        userFetchApi()
    }, [])

    useEffect(() => {
        userFetchApi()
    }, [showUpdatePopup, showAddPopup, showDeletePopup])

    const userFetchApi = async () => {
        const response = await makeAjax(url.CREAD_API.index);
        if(response.status === respStatus['SUCCESS']) {
            setUserData(response.data);
        }
    }

    const handlePopupOpen = (id) => {
        setUserId(id);
        setShowUpdatePopup(true);
    }

    const handleAddUser = () => {
        setShowAddPopup(true);
    }

    const handleUserDelete = (id) => {
        setUserId(id);
        setShowDeletePopup(true)
    }
    
    const handleClosePopup = () => {
        setShowUpdatePopup(false);
        setShowAddPopup(false);
        setShowDeletePopup(false);
    }

    return (
        <>
            <div className="containerHome">
                <div className="tableDivRow">
                    <div className='headerDiv'>
                        <div>
                            <button type="button" className='addBtn' onClick={handleAddUser} >ADD USER</button>
                        </div>
                        <div>
                            <h3>User List</h3>
                        </div>
                    </div>
                    <table>
                        <thead className='tableHead'>
                            <tr  className='tableRow'>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { userData.length > 0 ? (
                                userData.map((user, ind) => {
                                    return (
                                        <tr className='dataRow'>
                                            <th scope="row">{ind+1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.dob}</td>
                                            <td className='btnTd'>
                                                <button className="userBtn updateBtn" onClick={(e) => handlePopupOpen(user.id)}>Edit</button>
                                                <button className="userBtn" onClick={(e) => handleUserDelete(user.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }))
                                :
                                (
                                    <>
                                        <tr className='colSpanRow'>
                                            <td colSpan={5}>Record Not Found</td>
                                        </tr>
                                    </>
                                )
                            }
                        </tbody>
                    </table>
                    {(showAddPopup && (
                        <>
                            <MainPopup handleClosePopup={handleClosePopup}>
                                <UserAdd setShowAddPopup={setShowAddPopup} />
                            </MainPopup>
                        </>
                    ))}
                    {(showUpdatePopup && (
                        <>
                            <MainPopup handleClosePopup={handleClosePopup}>
                                <UserUpdate userId={userId} setShowUpdatePopup={setShowUpdatePopup} />
                            </MainPopup>
                        </>
                    ))}
                    {(showDeletePopup && (
                        <>
                            <DeletePopup userId={userId} handleClosePopup={handleClosePopup} />
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
