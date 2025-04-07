// content.js

console.log("Content script loaded (start).");

try {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.value !== undefined) {
            console.log("Received value:", request.value);

            try {
                if (document.activeElement) {
                    document.activeElement.value = request.value;
                    sendResponse({ received: "value", success: true });
                } else {
                    console.warn("No active element found.");
                    sendResponse({ received: "value", success: false, error: "No active element" });
                }
            } catch (error) {
                console.error("Error inserting value:", error);
                sendResponse({ received: "value", success: false, error: error.message });
            }
        } else {
            console.warn("Received message without 'value' property.");
            sendResponse({ received: null, success: false, error: "No value provided" });
        }

        return true;
    });

    console.log("Message listener set up.");
} catch (error) {
    console.error("Content script initialization error:", error);
}

console.log("Content script loaded (end).");