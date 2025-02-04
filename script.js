document.addEventListener("DOMContentLoaded", function() {
    const openPopupButton = document.getElementById("open-popup");

    // ✅ Open Viral Loops Popup Form
    openPopupButton.addEventListener("click", function() {
        const popupForm = document.createElement("form-widget");
        popupForm.setAttribute("mode", "popup");
        popupForm.setAttribute("ucid", "3p2Lq2L4n2t6r596nPswqj2LaFI");
        document.body.appendChild(popupForm);
    });

    // ✅ Update signup count dynamically
    async function updateSignupCount() {
        const defaultCount = 2500; // Base count to create social proof

        try {
            let response = await fetch("https://api.viral-loops.com/signup-count"); // Replace with real API if available
            let data = await response.json();
            let actualCount = data.count || defaultCount;

            if (actualCount > defaultCount) {
                document.getElementById("signup-count").textContent =
                    `🔥 Join ${actualCount.toLocaleString()}+ people taking control of their retirement! 🔥`;
            }
        } catch (error) {
            console.error("Error fetching signup count:", error);
        }
    }

    updateSignupCount();
});
