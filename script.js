function calculateSavings() {
    const age = parseFloat(document.getElementById('age').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const retirementAge = 67;

    if (!age || !hours || !rate || age >= retirementAge) {
        document.getElementById('total-dollars-saved').textContent = "Please enter valid values. Age must be less than 67.";
        document.getElementById('total-growth').textContent = "";
        document.getElementById('result').textContent = "";
        return;
    }

    const years = retirementAge - age;
    const annualSavings = hours * rate * 52;
    let totalSavings = 0;
    let totalDollarsSaved = 0;

    for (let i = 0; i < years; i++) {
        totalDollarsSaved += annualSavings;
        totalSavings += annualSavings;
        totalSavings *= 1.10;
    }

    const totalGrowth = totalSavings - totalDollarsSaved;

    document.getElementById('total-dollars-saved').textContent = `Total Dollar Amount Saved: $${Math.round(totalDollarsSaved).toLocaleString('en-US')}`;
    document.getElementById('total-growth').textContent = `Total Investment Growth: $${Math.round(totalGrowth).toLocaleString('en-US')}`;
    document.getElementById('result').textContent = `Total Savings at Retirement: $${Math.round(totalSavings).toLocaleString('en-US')}`;
}
