import React, { useEffect, useState } from 'react'
import "../../assets/css/popup.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeAjax, respStatus, url } from '../helpers/global_helper'

const UserUpdate = (props) => {
    const {userId, setShowUpdatePopup} = props
    const [formData, setFormData] = useState({});
    useEffect(()=> {
        fetchUserDetail()
    }, [])
    
    const fetchUserDetail = async () => {
        const viewForm = {id : userId}
        const response = await makeAjax(url.CREAD_API.userEditView, viewForm);
        if(response.status === respStatus["SUCCESS"]) {
            setFormData(response.data);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        try {
            const response = await makeAjax(url.CREAD_API.userUpdate, data);
            if(response.status === respStatus["SUCCESS"]) {
                setFormData({});
                setShowUpdatePopup(false)
            }
        } catch (error) {
            console.error("Error while submitting the form:", error);
        }
    }
    
    return (
        <div className='card p-4'>
            <form className="row g-3" method="POST" onSubmit={(e) => handleFormSubmit(e)} enctype="multipart/form-data">
                <div className="col-md-12">
                    <label for="inputEmail" className="form-label">Email</label>
                    <input type="text" name='email' value={formData.email} onChange={handleInputChange} className="form-control" id="inputEmail" readOnly />
                </div>
                <div className="col-6">
                    <label for="inputName" className="form-label">Name</label>
                    <input type="text" name='name' value={formData.name} onChange={handleInputChange} className="form-control" id="inputName" />
                </div>
                <div className="col-6">
                    <label for="inputdob" className="form-label">DOB</label>
                    <input type="text" name="dob" value={formData.dob} onChange={handleInputChange} className="form-control" id="inputdob" />
                </div>
                <div className="col-6">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" name='password' onChange={handleInputChange} className="form-control" id="inputPassword" />
                </div>
                <div className="col-12">
                    <button type="submit" className="form-control btn btn-success">Update User</button>
                </div>
            </form>
        </div>
    )
}

export default UserUpdate
