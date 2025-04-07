# Quick-Fill Chrome Plugin

Welcome to this repository, which contains a copy of the Quick-Fill Chrome plugin—an exploratory testing assistant for Chrome. This tool adds common test values and edge cases to the context menu (right-click) for editable elements, enabling testers to quickly populate web forms during testing sessions.

## Overview

Quick-Fill is a lightweight, open-source Chrome extension designed to streamline testing by providing instant access to predefined values, such as boundary cases, invalid inputs, and special characters. It integrates into your browser’s context menu and works on input fields, text areas, and content-editable elements.

- **Features**:
  - Quick insertion of test data (e.g., invalid emails, large numbers, special characters).
  - Supports input fields, text areas, and content-editable DIVs.
  - Minimal overhead (<1k per page), no external dependencies, and entirely passive.
  - Customizable with user-defined config files.

This repository hosts a copy of the Quick-Fill source code for preservation, modification, or personal use.

## Installation

To install this copy of Quick-Fill as a Chrome extension:

**Clone or Download the Repository**:
   ```bash
   git clone https://github.com/isolderea/Quick-Fill
```

**Alternatively, download the ZIP file and extract it.**

### Load the Extension in Chrome
- Open Chrome and go to `chrome://extensions/`.
- Enable "Developer mode" in the top-right corner.
- Click "Load unpacked" and select the folder containing this repository’s files (e.g., the root directory or a `chrome` subdirectory if present).

### Verify Installation
- The Quick-Fill extension should appear in your Chrome extensions list. Pin it to your toolbar for easy access if desired.

## Usage
1. Visit a webpage with editable elements (e.g., forms, text areas).
2. Right-click on an input field or editable area.
3. Find the "Quick-Fill" submenu in the context menu.
4. Choose a value or category (e.g., "Invalid Email," "Large Number") to insert it into the field.

To customize the tool:
- Modify or create a `config.json` file to add your own test values (check the source code or documentation for format details).
- Load custom config files via the "Configure Quick-Fill" option in the context menu, if available.

## Contributing
Contributions are welcome! To enhance this copy of Quick-Fill:
1. Fork this repository.
2. Create a new branch for your changes

## Credits
This repository is a copy of the Quick-Fill Chrome plugin. If this is based on an existing project, credit goes to the original authors and contributors. 

