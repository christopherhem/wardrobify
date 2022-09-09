import React, { useState } from "react";

function ShoeList(props) {
    const [currentShoe, setCurrentShoe] = useState(props.shoes[0]);
    const [currentShoeBin, setCurrentShoeBin] = useState();
    
    const getShoeDetail = async() => {
        const url = `http://localhost:8080/api/shoes/${currentShoe.id}/`;
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setCurrentShoeBin(data.bin.closet_name);
        }
      }

    const deleteShoe = async () => {
      fetch(`http://localhost:8080/api/shoes/${currentShoe.id}/`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      window.location.reload();
    }

    const handleClick = async (shoe) => {
        setCurrentShoe(shoe);
        getShoeDetail();
        
    };
    
    return (
        <>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Name</th>
            <th>Color</th>
            <th>Bin</th>
            <th>Erase</th>
          </tr>
        </thead>
        <tbody>
            {props.shoes.map((shoe) => {
            return (
                <tr
                key={shoe.id}
                onClick={() => handleClick(shoe)}
                data-bs-toggle="modal"
                data-bs-target='#exampleModal'
                >
                    <td>{shoe.manufacturer}</td>
                    <td>{shoe.name}</td>
                    <td>{shoe.color}</td>
                    <td>{shoe.bin}</td>
                    <td>
                        <button onClick={() => deleteShoe()} type='button'>
                            Erase
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
                        <td>{currentShoeBin}</td>
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
