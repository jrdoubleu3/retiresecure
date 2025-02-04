document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get("ref") || "";

    // ✅ Save referrer info in localStorage (persists even if they navigate)
    if (referrer) {
        localStorage.setItem("referralCode", referrer);
    }

    // ✅ Prefill the referral code in the Viral Loops form (if applicable)
    function prefillReferralCode() {
        let referralField = document.querySelector("input[name='referralCode']");
        if (referralField) {
            referralField.value = localStorage.getItem("referralCode") || "";
        }
    }

    setTimeout(prefillReferralCode, 1000); // Ensure form loads first

    // ✅ Modify the referral link to use your domain
    function generateReferralLink(userCode) {
        return `https://yourdomain.com?ref=${userCode}`;
    }

    // ✅ Listen for Viral Loops referral link generation
    document.addEventListener("VLReferralGenerated", function(event) {
        let userCode = event.detail.referralCode;
        let referralLink = generateReferralLink(userCode);

        document.getElementById("referral-link").textContent = referralLink;
        document.getElementById("referral-section").style.display = "block";
    });
});
