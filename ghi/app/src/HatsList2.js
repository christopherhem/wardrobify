import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import loadInventory from ".";

function HatList2(props) {
    useEffect(() => {
      loadInventory(HatList2);
    }, [])
    const [currentHat, setCurrentHat] = useState([props.hats]);
    console.log("HEYYYYYYYYYYY")
    console.log(props.hats);
    const [currentHatLocation, setCurrentHatLocation] = useState();

    const getHatDetail = async(hat) => {
        const url = `http://localhost:8090/api/hats/${hat.id}/`;
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          setCurrentHatLocation(data.location.closet_name);
        }
      }

    const deleteHat = async (hat) => {
      const response = await fetch(`http://localhost:8090/api/hats/${hat}/`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      if (response.ok) {
        loadInventory();

      }
    }

    const handleClick = async (hat) => {
        setCurrentHat(hat);
    };
    
    return (
        <>
        <div className="container"></div>
        <hr></hr>
        <h2>List of Hats</h2>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Click Here to Create a Hat!</Link></div>
        <hr></hr>
        <table className="table table-striped">
        
        <thead>
          <tr>
            <th>Closet</th>
            <th>Name</th>
            <th>Color</th>
            <th>Location</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
            {props.hats.map((hat) => {
            return (
                <tr
                key={hat.id}
                onClick={() => handleClick(hat.id)}
                >
                    <td><img src={hat.picture_url} data-bs-toggle="modal"
                data-bs-target='#exampleModal' className="img-thumbnail" /></td>
                    <td>{hat.style_name}</td>
                    <td>{hat.color}</td>
                    <td>{hat.location.closet_name}</td>
                    <td>
                        <button onClick={() => deleteHat(hat.id)} type='button'>
                            Remove
                        </button>
                    </td>
                </tr>
            )
            })}
        </tbody>
      </table>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              data-bs-dismiss="modal"
            ></button>
                </div>
                <div className="modal-body">
                    <img src={currentHat.picture_url} className="rounded mx-auto d-block img-fluid"/>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Style Name</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{currentHat.manufacturer}</td>
                        <td>{currentHat.name}</td>
                        <td>{currentHat.color}</td>
                        <td>{currentHat.location}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
      </>
    )
};
export default HatList2;
