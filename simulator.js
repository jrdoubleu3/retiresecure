// Simple input handling for currency fields
function handleCurrencyInput(input) {
    input.addEventListener('input', function(e) {
        // Remove all non-numeric characters
        let value = e.target.value.replace(/[^0-9]/g, '');
        
        // Only format if there's a value
        if (value) {
            // Format with commas
            e.target.value = new Intl.NumberFormat('en-US').format(value);
        }
    });
}

// Simple input handling for number fields
function handleNumberInput(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value;
        // Ensure value is within min/max bounds
        if (value < this.min) value = this.min;
        if (value > this.max) value = this.max;
        e.target.value = value;
    });
}

// Format currency for display
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(value);
}

// Calculate future value
function calculateFutureValue(annualSavings, years, initialWealth, returnRate, inflationRate) {
    let futureValue = initialWealth;
    const realReturnRate = (1 + returnRate) / (1 + inflationRate) - 1;
    
    for (let i = 0; i < years; i++) {
        futureValue = futureValue * (1 + realReturnRate) + annualSavings;
    }
    
    return futureValue;
}

// Handle form submission
document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get input values
    const age = parseInt(document.getElementById('age').value);
    const retirementAge = parseInt(document.getElementById('retirement-age').value);
    const income = parseInt(document.getElementById('income').value.replace(/[^0-9]/g, ''));
    const initialWealth = parseInt(document.getElementById('initial-wealth').value.replace(/[^0-9]/g, '') || 0);
    const savingsRate = parseInt(document.getElementById('savings-rate').value) / 100;
    
    // Calculate years until retirement
    const yearsUntilRetirement = retirementAge - age;
    
    // Calculate annual savings
    const annualSavings = income * savingsRate;
    
    // Run simulations
    const optimalWealth = calculateFutureValue(annualSavings, yearsUntilRetirement, initialWealth, 0.08, 0.02);
    const sixtyFortyWealth = calculateFutureValue(annualSavings, yearsUntilRetirement, initialWealth, 0.06, 0.02);
    const hundredWealth = calculateFutureValue(annualSavings, yearsUntilRetirement, initialWealth, 0.10, 0.02);
    
    // Update results
    document.getElementById('optimal-wealth').textContent = formatCurrency(optimalWealth);
    document.getElementById('sixty-forty-wealth').textContent = formatCurrency(sixtyFortyWealth);
    document.getElementById('hundred-wealth').textContent = formatCurrency(hundredWealth);
});

// Handle currency input formatting
document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value) {
            e.target.value = new Intl.NumberFormat('en-US').format(value);
        }
    });
});

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set up currency inputs
    const currencyInputs = document.querySelectorAll('input[type="text"]');
    currencyInputs.forEach(handleCurrencyInput);
    
    // Set up number inputs
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(handleNumberInput);
}); 