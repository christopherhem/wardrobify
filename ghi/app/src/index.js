import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadInventory() {
  const hatsResponse = await fetch('http://localhost:8090/api/hats/');

  if (hatsResponse.ok) {
    const hatData = await hatsResponse.json();
    root.render(
      <React.StrictMode>
        <App hats={hatData.hats} />
      </React.StrictMode>
    );
  } else {
    console.error(hatsResponse);
  }
}
loadInventory();