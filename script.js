document.addEventListener("DOMContentLoaded", function() {
    const joinButton = document.getElementById("join-button");
    const copyButton = document.getElementById("copy-button");
    const emailInput = document.getElementById("email");
    const referralSection = document.getElementById("referral-section");
    const referralLinkElement = document.getElementById("referral-link");
    const signupCountElement = document.getElementById("signup-count");

    joinButton.addEventListener("click", function() {
        let email = emailInput.value;
        if (!email.trim()) {
            alert("Please enter your email.");
            return;
        }
        referralSection.style.display = "block";
        let referralLink = `https://yourdomain.com?ref=${btoa(email)}`;
        referralLinkElement.textContent = referralLink;
    });

    copyButton.addEventListener("click", function() {
        let link = referralLinkElement.textContent;
        navigator.clipboard.writeText(link).then(() => {
            alert("Referral link copied to clipboard!");
        }).catch(err => {
            console.error("Could not copy text: ", err);
        });
    });

    // Simulate fetching actual signup count (replace with real API call if needed)
    async function updateSignupCount() {
        const defaultCount = 2500;
        try {
            let response = await fetch('/api/get-signups'); // Replace with actual API
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
