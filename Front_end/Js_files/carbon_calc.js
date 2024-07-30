// Carbon footprint calculation logic
function calculateEmissions(electricity, gas, car, flights) {
    const electricityFactor = 0.92;
    const gasFactor = 5.3;
    const carFactor = 0.411;
    const flightsFactor = 0.254;

    const electricityEmissions = electricity * electricityFactor;
    const gasEmissions = gas * gasFactor;
    const carEmissions = car * carFactor;
    const flightsEmissions = flights * flightsFactor;

    const totalEmissions = electricityEmissions + gasEmissions + carEmissions + flightsEmissions;
    return totalEmissions;
}

function updateResult(totalEmissions) {
    document.getElementById('result').innerHTML = `
    <h3>Your Monthly Carbon Footprint</h3>
    <p>Electricity: ${totalEmissions.toFixed(2)} kg CO2</p>
    <p>Natural Gas: ${gasEmissions.toFixed(2)} kg CO2</p> 
    <p>Car Travel: ${carEmissions.toFixed(2)} kg CO2</p> 
    <p>Flights: ${flightsEmissions.toFixed(2)} kg CO2</p> 
    <h3>Total: ${totalEmissions.toFixed(2)} kg CO2</h3>
  `;
}

document.getElementById('calculateButton').addEventListener('click', function () {
    const electricity = document.getElementById('electricity').value;
    const gas = document.getElementById('gas').value;
    const car = document.getElementById('car').value;
    const flights = document.getElementById('flights').value;

    const totalEmissions = calculateEmissions(electricity, gas, car, flights);
    updateResult(totalEmissions);
});
