document.getElementById('calculateButton').addEventListener('click', function () {
    const electricity = document.getElementById('electricity').value;
    const gas = document.getElementById('gas').value;
    const car = document.getElementById('car').value;
    const flights = document.getElementById('flights').value;

    const electricityFactor = 0.92;
    const gasFactor = 5.3;
    const carFactor = 0.411;
    const flightsFactor = 0.254;

    const electricityEmissions = electricity * electricityFactor;
    const gasEmissions = gas * gasFactor;
    const carEmissions = car * carFactor;
    const flightsEmissions = flights * flightsFactor;

    const totalEmissions = electricityEmissions + gasEmissions + carEmissions + flightsEmissions;

    document.getElementById('result').innerHTML = `
                <h3>Your Monthly Carbon Footprint</h3>
                <p>Electricity: ${electricityEmissions.toFixed(2)} kg CO2</p>
                <p>Natural Gas: ${gasEmissions.toFixed(2)} kg CO2</p>
                <p>Car Travel: ${carEmissions.toFixed(2)} kg CO2</p>
                <p>Flights: ${flightsEmissions.toFixed(2)} kg CO2</p>
                <h3>Total: ${totalEmissions.toFixed(2)} kg CO2</h3>
            `;
});

document.getElementById('contributionForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const story = document.getElementById('story').value;

    const storyElement = document.createElement('div');
    storyElement.classList.add('story');
    storyElement.innerHTML = `
                <h4>${name} (${email})</h4>
                <p>${story}</p>
            `;

    document.getElementById('submittedStories').appendChild(storyElement);

    document.getElementById('contributionForm').reset();
})