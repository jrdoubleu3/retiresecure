document.addEventListener("DOMContentLoaded", function() {
    const signupCountElement = document.getElementById("signup-count");

    // ✅ Update signup count from Viral Loops API (if applicable)
    async function updateSignupCount() {
        const defaultCount = 2500;

        try {
            let response = await fetch("https://api.viral-loops.com/signup-count"); // Replace with actual API
            let data = await response.json();
            let actualCount = data.count || defaultCount;

            if (actualCount > defaultCount) {
                signupCountElement.textContent =
                    `🔥 Join ${actualCount.toLocaleString()}+ people taking control of their retirement! 🔥`;
            }
        } catch (error) {
            console.error("Error fetching signup count:", error);
        }
    }

    updateSignupCount();
});
