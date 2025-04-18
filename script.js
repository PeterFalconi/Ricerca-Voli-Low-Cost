document.getElementById('search-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fromCity = document.getElementById('from-city').value;
  const toCity = document.getElementById('to-city').value;
  const departureDate = document.getElementById('departure-date').value;
  const adults = document.getElementById('adults').value;

  // Sostituisci questa URL con l'endpoint della tua API di Travelpayouts
  const apiUrl = `https://api.travelpayouts.com/v2/prices/latest?origin=${fromCity}&destination=${toCity}&departure_at=${departureDate}&adults=${adults}&token=YOUR_API_KEY`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Gestisci i risultati
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = ''; // Pulisce i risultati precedenti

    data.data.forEach(flight => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h3>${flight.airline} - ${flight.price} EUR</h3>
        <p>Data di partenza: ${flight.departure_at}</p>
      `;
      resultsList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Errore durante la ricerca dei voli:', error);
  }
});
