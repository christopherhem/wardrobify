import React, { useState } from 'react';

export default function HatsList(props) {
    console.log(props)
    const [presentHat, setHat] = useState(props);
    const [presentLocation, setLocation] = useState();

    const HatDetail = async () => {
        const url = `http://localhost:8090/api/hats/${presentHat.id}/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocation(data.location.closet_name);
        }
    }

    const HatDelete = async () => {
        fetch(`http://localhost:8090/api/hats/${presentHat.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.reload();
    }

    const handleClick = async (hat) => {
        console.log("present hat will be...", hat);
        setHat(hat);
        HatDetail();
    }
    return (
        <>
        <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Fabric</th>
                    <th>Style Name</th>
                    <th>Color</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                {props.hats.map(hat => {
                  return (
                    <tr key={hat.id}>
                      <td>{ hat.fabric }</td>
                      <td>{ hat.style_name }</td>
                      <td>{ hat.color }</td>

                    </tr>
                  )
                })}
                </tbody>
              </table>  
              </>
        )
    }
