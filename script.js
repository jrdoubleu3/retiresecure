document.addEventListener("DOMContentLoaded", function() {
    const openPopupButton = document.getElementById("open-popup");

    // ✅ Open Viral Loops Popup Form
    openPopupButton.addEventListener("click", function() {
        const popupForm = document.createElement("form-widget");
        popupForm.setAttribute("mode", "popup");
        popupForm.setAttribute("ucid", "WClmOWJjVXgykVGp03wI6dIQbS0");
        document.body.appendChild(popupForm);
    });

    // ✅ Update signup count dynamically
    async function updateSignupCount() {
        const defaultCount = 2500; // Base count for social proof

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

    // ✅ Fetch and Display Waitlist Position and Referral Count
    async function updateWaitlistInfo() {
        try {
            let userEmail = localStorage.getItem("userEmail"); // Assuming you store email after signup
            if (!userEmail) return;

            let response = await fetch(`https://api.viral-loops.com/get-waitlist?email=${userEmail}`);
            let data = await response.json();

            document.getElementById("waitlist-position").textContent = data.position || "N/A";
            document.getElementById("referral-count").textContent = data.referrals || "0";
        } catch (error) {
            console.error("Error fetching waitlist info:", error);
        }
    }

    updateWaitlistInfo();
});
