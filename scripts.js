document.getElementById('waste-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const foodType = document.getElementById('food-type').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const reason = document.getElementById('reason').value;

    // Store waste data in local storage (or a database)
    const wasteData = {
        foodType: foodType,
        quantity: quantity,
        reason: reason,
        date: new Date().toLocaleDateString()
    };

    let wasteList = JSON.parse(localStorage.getItem('wasteList')) || [];
    wasteList.push(wasteData);
    localStorage.setItem('wasteList', JSON.stringify(wasteList));

    // Update stats
    updateStats();

    // Reset form
    document.getElementById('waste-form').reset();
});

function updateStats() {
    let wasteList = JSON.parse(localStorage.getItem('wasteList')) || [];
    const statsDiv = document.getElementById('stats');

    if (wasteList.length === 0) {
        statsDiv.innerHTML = '<p>No food waste logged yet.</p>';
        return;
    }

    let totalQuantity = wasteList.reduce((total, item) => total + item.quantity, 0);

    statsDiv.innerHTML = `
        <p>Total Waste Logged: ${wasteList.length} entries</p>
        <p>Total Quantity of Waste: ${totalQuantity} kg</p>
        <ul>
            ${wasteList.map(item => `<li>${item.date}: ${item.foodType} - ${item.quantity}kg (${item.reason})</li>`).join('')}
        </ul>
    `;
}

// Call updateStats on page load
window.onload = updateStats;
