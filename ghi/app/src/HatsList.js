import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loadInventory from '.';

function HatColumn(props) {

  return (
    <div className="col">
      {props.list.map(data => {
        const hat = data
        return (
          <div key={hat.id} className="card mb-3 shadow">
            <img src={hat.picture_url} className="card-img-top" />
            <div key={hat} className="card-body">
              <h5 className="card-title">{hat.style_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Closet: {hat.location.closet_name}</h6>
              <h6 className="card-subtitle mb-2 text-muted">Shelf: {hat.location.shelf_number}</h6>
              <h6 className="card-subtitle mb-2 text-muted">Section: {hat.location.section_number}</h6>
            </div>
            <button onClick={() => HatDelete(hat)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

async function HatDelete(hat) {
  const HatDeleteUrl = `http://localhost:8090/api/hats/${hat.id}`
  const fetchConfig = {
    method: "delete"
  }
  const response = await fetch(HatDeleteUrl, fetchConfig);
  if (response.ok) {
    window.location.reload()


  }
}

class HatsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hatColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8090/api/hats/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        const requests = [];
        for (let hat of data.hats) {
          const detailUrl = `http://localhost:8090/api/hats/${hat.id}`;
          requests.push(fetch(detailUrl));
        }

        const responses = await Promise.all(requests);

        const hatColumns = [[], [], []];

        let i = 0;
        for (const hatResponse of responses) {
          if (hatResponse.ok) {
            const details = await hatResponse.json();
            hatColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(hatResponse);
          }
        }

        this.setState({ hatColumns: hatColumns });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <hr></hr>
          <h2>List of Hats</h2>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/locations/new" className="btn btn-primary btn-lg px-4 gap-3">Add Hat Location</Link>
            <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Add Hat</Link>
          </div>
          <hr></hr>
          <div className="row">
            {this.state.hatColumns.map((hatList, index) => {
              return (
                <HatColumn key={index} list={hatList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default HatsList;
