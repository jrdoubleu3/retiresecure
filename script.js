document.addEventListener("DOMContentLoaded", function() {
    const copyButton = document.getElementById("copy-button");
    const referralSection = document.getElementById("referral-section");
    const referralLinkElement = document.getElementById("referral-link");
    const signupCountElement = document.getElementById("signup-count");

    // Fetch actual signup count from HubSpot API
    async function updateSignupCount() {
        const defaultCount = 2500;
        const hubspotAPIKey = "YOUR_HUBSPOT_API_KEY"; // Replace with your HubSpot API key

        try {
            let response = await fetch(
                `https://api.hubapi.com/crm/v3/objects/contacts?hapikey=${hubspotAPIKey}`
            );
            let data = await response.json();
            let actualCount = data.total || defaultCount;

            if (actualCount > defaultCount) {
                signupCountElement.textContent =
                    `🔥 Join ${actualCount.toLocaleString()}+ people taking control of their retirement! 🔥`;
            }
        } catch (error) {
            console.error("Error fetching signup count from HubSpot:", error);
        }
    }

    updateSignupCount();

    // Generate referral link after form submission (mock version)
    document.addEventListener("submit", function(event) {
        if (event.target.classList.contains("hs-form")) {
            setTimeout(() => {
                let emailField = document.querySelector("input[type='email']");
                if (emailField) {
                    let email = emailField.value;
                    referralSection.style.display = "block";
                    let referralLink = `https://yourdomain.com?ref=${btoa(email)}`;
                    referralLinkElement.textContent = referralLink;
                }
            }, 1000);
        }
    });

    // Copy referral link to clipboard
    copyButton.addEventListener("click", function() {
        let link = referralLinkElement.textContent;
        navigator.clipboard.writeText(link).then(() => {
            alert("Referral link copied to clipboard!");
        }).catch(err => {
            console.error("Could not copy text: ", err);
        });
    });
});
