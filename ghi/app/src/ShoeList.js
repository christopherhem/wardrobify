import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import loadInventory from ".";


function ShoeList(props) {
    useEffect(() => {
      loadInventory(ShoeList);
    }, [])
    const [currentShoe, setCurrentShoe] = useState([props.shoes]);
    const [currentShoeBin, setCurrentShoeBin] = useState();

    const getShoeDetail = async() => {
        const url = `http://localhost:8080/api/shoes/${currentShoe.id}/`;
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          setCurrentShoeBin(data.bin.closet_name);
        }
      }

    const deleteShoe = async (shoe) => {
      const response = await fetch(`http://localhost:8080/api/shoes/${shoe}/`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      if (response.ok) {
        loadInventory();

      }
    }

    const handleClick = async (shoe) => {
        setCurrentShoe(shoe);
    };
    
    return (
        <>
        <div className="container"></div>
        <hr></hr>
        <h2>List of Shoes</h2>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">Click Here to Create a Shoe!</Link></div>
        <hr></hr>
        <table className="table table-striped">
        
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Name</th>
            <th>Color</th>
            <th>Bin</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
            {props.shoes.map((shoe) => {
            return (
                <tr
                key={shoe.id}
                onClick={() => handleClick(shoe)}
                >
                    <td><img src={shoe.picture_url} data-bs-toggle="modal"
                data-bs-target='#exampleModal' className="img-thumbnail" /></td>
                    <td>{shoe.manufacturer}</td>
                    <td>{shoe.color}</td>
                    <td>{shoe.bin}</td>


                  
                    <td>
                        <button onClick={() => deleteShoe(shoe.id)} type='button'>
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
                    <img src={currentShoe.picture_url} className="rounded mx-auto d-block img-fluid"/>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th>Manufacturer</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Bin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{currentShoe.manufacturer}</td>
                        <td>{currentShoe.name}</td>
                        <td>{currentShoe.color}</td>
                        <td>{currentShoe.bin}</td>
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
export default ShoeList;
