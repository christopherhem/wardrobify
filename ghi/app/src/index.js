import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


export default async function loadInventory() {
  const hatsResponse = await fetch('http://localhost:8090/api/hats/');
  const shoesResponse = await fetch('http://localhost:8080/api/shoes/');

  if (hatsResponse.ok && shoesResponse.ok) {
    const hatData = await hatsResponse.json();
    const shoeData = await shoesResponse.json();
    root.render(
      <React.StrictMode>
        <App hats={hatData.hats} shoes={shoeData.shoes}/>
      </React.StrictMode>
    );
  } else {
    console.error(hatsResponse || shoesResponse);
  }
}
loadInventory();