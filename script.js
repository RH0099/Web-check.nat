const ctx = document.getElementById('statusChart').getContext('2d');

// Chart Configuration
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Time points
        datasets: [{
            label: 'Response Time (ms)',
            data: [],
            borderColor: '#00ff99',
            borderWidth: 2,
            backgroundColor: 'rgba(0, 255, 153, 0.1)',
            pointBackgroundColor: '#fff',
            pointBorderColor: '#00ff99',
            pointRadius: 4,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }
    }
});

const checkStatusButton = document.getElementById('checkStatus');
const websiteUrlInput = document.getElementById('websiteUrl');
const loadingMessage = document.getElementById('loadingMessage');

// Function to Ping Website
async function checkWebsiteStatus(url) {
    const startTime = Date.now();
    try {
        await fetch(url, { method: 'HEAD', mode: 'no-cors' }); // Simple HEAD request
        const responseTime = Date.now() - startTime;
        return responseTime; // Response time in milliseconds
    } catch (error) {
        return -1; // Error condition
    }
}

// Update Chart Data
function updateChart(responseTime) {
    const currentTime = new Date().toLocaleTimeString();
    chart.data.labels.push(currentTime);
    chart.data.datasets[0].data.push(responseTime);

    if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    chart.update();
}

// Event Listener for Button Click
checkStatusButton.addEventListener('click', async () => {
    const url = websiteUrlInput.value;
    if (!url) {
        alert('Please enter a website URL.');
        return;
    }

    loadingMessage.style.display = 'block';
    const intervalId = setInterval(async () => {
        const responseTime = await checkWebsiteStatus(url);
        if (responseTime === -1) {
            alert('Website is unreachable or invalid.');
            clearInterval(intervalId);
            loadingMessage.style.display = 'none';
        } else {
            updateChart(responseTime);
        }
    }, 1000);
});
        
