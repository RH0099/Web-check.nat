const ctx = document.getElementById('lightGraph').getContext('2d');

const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

const data = {
    labels: Array.from({ length: 20 }, (_, i) => i + 1), // Time points
    datasets: [{
        label: 'Live Data',
        data: Array.from({ length: 20 }, () => Math.random() * 100), // Random data
        borderColor: '#00ff00',
        borderWidth: 3,
        fill: true,
        backgroundColor: gradient,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#00ff00',
        pointRadius: 5,
        pointHoverRadius: 10
    }]
};

const config = {
    type: 'line',
    data: data,
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
        },
        elements: {
            point: {
                radius: 6,
                hoverRadius: 8,
                backgroundColor: 'rgba(255, 255, 0, 0.8)',
                borderColor: '#fff',
                hoverBorderColor: 'rgba(255, 0, 0, 0.9)',
                shadowBlur: 10,
                shadowColor: 'rgba(255, 255, 255, 0.8)'
            }
        }
    }
};

const chart = new Chart(ctx, config);

// Update the graph data dynamically
setInterval(() => {
    data.datasets[0].data.shift();
    data.datasets[0].data.push(Math.random() * 100);
    chart.update();
}, 1000);
          
