// Sample data for demonstration
const data = [
    { category: "A", value: 2 },
    { category: "B", value: 5 },
    { category: "C", value: 7 },
    { category: "D", value: 10 },
];

let isChartsGenerated = false;

// Function to generate the data table
function generateTable() {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.category}</td>
            <td>${item.value}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to generate the interactive graph using Chart.js
function generateGraph() {
    if (isChartsGenerated) return; // Check if charts are already generated
    const ctx = document.getElementById('lineChart').getContext('2d');
    const labels = data.map(item => item.category);
    const values = data.map(item => item.value);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Value',
                data: values,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: '#007bff',
                pointBorderColor: 'white',
                pointBorderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
            },
            legend: {
                display: false,
            },
        }
    });

    isChartsGenerated = true; // Set flag to indicate charts are generated
}

// Function to generate the pie chart using Chart.js
function generatePieChart() {
    if (isChartsGenerated) return; // Check if charts are already generated
    const ctx = document.getElementById('pieChart').getContext('2d');
    const labels = data.map(item => item.category);
    const values = data.map(item => item.value);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
            },
            legend: {
                position: 'bottom',
            },
        }
    });

    isChartsGenerated = true; // Set flag to indicate charts are generated
}

// Function to handle CSV download
function downloadCSV() {
    const csvContent = "Category,Value\n" + data.map(item => `${item.category},${item.value}`).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event listener for CSV download button
document.getElementById('csvButton').addEventListener('click', downloadCSV);

// Initial function calls
generateTable();
generateGraph();
generatePieChart();
