import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewHatLocation() {
    const navigate = useNavigate()
    const [state, setState] = useState({
        closet_name:'',
        section_number:'',
        shelf_number:'',
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = state;
        
        const url = 'http://localhost:8100/api/locations/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            navigate('/hats')
        }
    }
    const handleChange = event => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }
    return (
        <>
        <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create Hat location</h1>
            <form onSubmit={handleSubmit} id="create-hat-location">
            <div className="form-floating mb-3">
                <input onChange={handleChange} value={state.closet_name} placeholder="Closet Name" required type="text" name="closet_name" id="closet_name" className="form-control" />
                <label htmlFor="closet_name">Closet Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} value={state.section_number} placeholder="Section Number" required type="number" name="section_number" id="section_number" className="form-control" />
                <label htmlFor="section_number">Section Number</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} value={state.shelf_number} placeholder="Shelf Number" required type="number" name="shelf_number" id="shelf_number" className="form-control" />
                <label htmlFor="shelf_number">Shelf Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>
    </div>
</>
    )
}
export default NewHatLocation;