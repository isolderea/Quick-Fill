document.getElementById("uploadButton").addEventListener("click", () => {
  const fileInput = document.getElementById("jsonUpload");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const customJson = JSON.parse(event.target.result);
        validateAndStore(customJson);
      } catch (error) {
        alert("Invalid JSON file.");
        console.error("JSON parsing error:", error);
      }
    };
    reader.readAsText(file);
  } else {
    alert("Please select a JSON file.");
  }
});

function validateAndStore(customJson) {
  if (
    customJson &&
    customJson.name &&
    customJson.subcategories &&
    Array.isArray(customJson.subcategories)
  ) {
    // Basic validation, add more as needed.
    chrome.storage.sync.set({ customJson: customJson }, () => {
      alert("Custom JSON uploaded successfully.");
    });
  } else {
    alert("Invalid JSON format.");
  }
}

// Download Template
document.getElementById("downloadTemplate").addEventListener("click", () => {
  const template = {
    name: "Custom",
    subcategories: [
      {
        name: "My Custom Values",
        items: [
          { title: "Custom 1", value: "custom1" },
          { title: "Custom 2", value: "custom2" },
        ],
      },
    ],
  };
  const blob = new Blob([JSON.stringify(template, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.getElementById("downloadTemplate");
  downloadLink.href = url;
});
