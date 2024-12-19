document.getElementById('calculate-button').addEventListener('click', function () {
    const hours = parseFloat(document.getElementById('hours').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const age = parseFloat(document.getElementById('age').value);
    const retirementAge = 67;

    if (!hours || !rate || !age || age >= retirementAge) {
        document.getElementById('result').textContent = "Please enter valid values.";
        return;
    }

    const years = retirementAge - age;
    const annualSavings = hours * rate * 52;
    let totalSavings = 0;

    for (let i = 0; i < years; i++) {
        totalSavings += annualSavings;
        totalSavings *= 1.10; // Growth rate
    }

    document.getElementById('result').textContent = `Estimated Savings: $${totalSavings.toFixed(2)}`;
});
