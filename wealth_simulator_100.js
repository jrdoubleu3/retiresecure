// Wealth Simulator - 100% S&P 500
document.addEventListener('DOMContentLoaded', function() {
    // Initialize state
    let age = 30;
    let retirementAge = 67;
    let initialWealth = 100000;
    let income = 80000;
    let optimalSavingsPercentage = 100; // Default to 100% optimal savings
    let results = null;

    // Get DOM elements
    const ageInput = document.getElementById('age');
    const retirementAgeInput = document.getElementById('retirement-age');
    const wealthInput = document.getElementById('initial-wealth');
    const incomeInput = document.getElementById('income');
    const optimalSavingsInput = document.getElementById('optimal-savings-percentage');
    const simulateButton = document.getElementById('simulate-button');
    const resultsContainer = document.getElementById('simulation-results');

    // Initialize inputs
    ageInput.value = age;
    retirementAgeInput.value = retirementAge;
    wealthInput.value = initialWealth;
    incomeInput.value = income;
    optimalSavingsInput.value = optimalSavingsPercentage;

    // Add event listeners
    ageInput.addEventListener('change', e => age = +e.target.value);
    retirementAgeInput.addEventListener('change', e => retirementAge = +e.target.value);
    wealthInput.addEventListener('change', e => initialWealth = +e.target.value);
    incomeInput.addEventListener('change', e => income = +e.target.value);
    optimalSavingsInput.addEventListener('change', e => optimalSavingsPercentage = +e.target.value);
    simulateButton.addEventListener('click', simulate);

    function simulate() {
        const mu = 0.0712;         // Expected return (7.12%)
        const sigma = 0.1754;      // Return volatility (17.54%)
        const rf = 0.0425;        // Risk-free rate
        const rho = 0.02;         // Risk premium
        const theta = 0.025;      // Inflation
        const g = 0.025;          // Income growth
        const lifespan = 100;
        const years = retirementAge - age;
        const n = 10000;
        const finalWealths = [];

        for (let sim = 0; sim < n; sim++) {
            let W = initialWealth;
            for (let t = 0; t < years; t++) {
                const currentAge = age + t;
                const yearsToLive = lifespan - currentAge;
                const incomeThisYear = income * Math.pow(1 + g, t);

                // Calculate human capital
                const remainingYears = retirementAge - currentAge - 1;
                const futureIncome = Array.from(
                    { length: remainingYears > 0 ? remainingYears : 0 },
                    (_, i) => income * Math.pow(1 + g, t + i + 1) / Math.pow(1 + rf + rho, i + 1)
                );
                const HC = futureIncome.reduce((sum, y) => sum + y, 0);

                const K = theta / (1 - Math.pow(1 + theta, -yearsToLive));
                const consumption = (W + incomeThisYear + HC) * K;
                const optimalSavings = incomeThisYear - consumption;
                
                // Apply user's optimal savings percentage only if optimal savings is positive
                let actualSavings;
                if (optimalSavings <= 0) {
                    actualSavings = optimalSavings; // Use 100% of optimal savings if negative
                } else {
                    actualSavings = optimalSavings * (optimalSavingsPercentage / 100);
                }

                const r = mu + sigma * randomNormal();
                W = W * (1 + r) + actualSavings;
            }
            finalWealths.push(W);
        }

        const sorted = finalWealths.slice().sort((a, b) => a - b);
        const mean = sorted.reduce((a, b) => a + b, 0) / n;
        const median = sorted[Math.floor(n / 2)];

        // Create bins for histogram
        const binCount = 50;
        const maxW = Math.max(...finalWealths);
        const binSize = maxW / binCount;
        const bins = Array.from({ length: binCount }, (_, i) => ({
            bin: Math.round(i * binSize),
            count: 0
        }));
        finalWealths.forEach(w => {
            const index = Math.min(Math.floor(w / binSize), binCount - 1);
            bins[index].count++;
        });

        displayResults({ bins, mean, median });
    }

    function randomNormal() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    function displayResults(results) {
        const meanFormatted = results.mean.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        });
        const medianFormatted = results.median.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        });

        // Create results HTML
        const resultsHTML = `
            <div class="results-header">
                <h2>Wealth at Retirement (Age ${retirementAge})</h2>
                <div class="results-summary">
                    <div class="mean">Mean: ${meanFormatted}</div>
                    <div class="median">Median: ${medianFormatted}</div>
                </div>
            </div>
            <div class="chart-container">
                <canvas id="wealth-chart"></canvas>
            </div>
        `;

        resultsContainer.innerHTML = resultsHTML;

        // Create chart using Chart.js
        const ctx = document.getElementById('wealth-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: results.bins.map(bin => bin.bin.toLocaleString()),
                datasets: [{
                    label: 'Frequency',
                    data: results.bins.map(bin => bin.count),
                    backgroundColor: '#60a5fa',
                    borderColor: '#000',
                    borderWidth: 0.5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Wealth ($)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Frequency'
                        }
                    }
                },
                plugins: {
                    annotation: {
                        annotations: {
                            meanLine: {
                                type: 'line',
                                xMin: results.mean,
                                xMax: results.mean,
                                borderColor: 'red',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                label: {
                                    content: 'Mean',
                                    enabled: true
                                }
                            },
                            medianLine: {
                                type: 'line',
                                xMin: results.median,
                                xMax: results.median,
                                borderColor: 'green',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                label: {
                                    content: 'Median',
                                    enabled: true
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}); 