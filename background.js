// background.js

let rebuildContextMenuTimeout;

function rebuildContextMenu() {
    clearTimeout(rebuildContextMenuTimeout);
    rebuildContextMenuTimeout = setTimeout(() => {
        chrome.contextMenus.removeAll(() => {
            chrome.storage.sync.get(['customJson'], (result) => {
                let config = { "categories": [] };
                fetch(chrome.runtime.getURL('config.json'))
                    .then(response => response.json())
                    .then(data => {
                        config.categories = data.categories;
                        if (result.customJson && Object.keys(result.customJson).length > 0) {
                            config.categories.push(result.customJson);
                        }
                        createContextMenuItems(config);
                    });
            });
        });
    }, 200); // Debounce delay (200 milliseconds)
}

function createContextMenuItems(config) {
    const categoryPromises = config.categories.map(category => {
        return new Promise(resolve => {
            chrome.contextMenus.create({
                title: category.name,
                contexts: ['editable'],
                id: category.name,
            }, resolve);
        });
    });

    Promise.all(categoryPromises).then(() => {
        config.categories.forEach(category => {
            category.subcategories.forEach(subcategory => {
                const subcategoryId = category.name + "-" + subcategory.name;
                chrome.contextMenus.create({
                    title: subcategory.name,
                    contexts: ['editable'],
                    parentId: category.name,
                    id: subcategoryId,
                }, () => {
                    subcategory.items.forEach(item => {
                        const itemId = category.name + '-' + subcategory.name + '-' + item.title;
                        chrome.contextMenus.create({
                            title: item.title,
                            contexts: ['editable'],
                            parentId: subcategoryId,
                            id: itemId,
                        });
                    });
                });
            });
        });
    });
}

chrome.runtime.onInstalled.addListener(rebuildContextMenu);
chrome.storage.onChanged.addListener(rebuildContextMenu);
rebuildContextMenu();

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    let value;
    chrome.storage.sync.get(['customJson'], (result) => {
        fetch(chrome.runtime.getURL('config.json'))
            .then(response => response.json())
            .then(data => {
                let config = { "categories": [] };
                config.categories = data.categories;
                if (result.customJson && Object.keys(result.customJson).length > 0) {
                    config.categories.push(result.customJson);
                }
                config.categories.forEach(category => {
                    category.subcategories.forEach(subcategory => {
                        subcategory.items.forEach(item => {
                            if (info.menuItemId === category.name + '-' + subcategory.name + '-' + item.title) {
                                value = item.value;
                            }
                        });
                    });
                });
                if(value !== undefined){
                    chrome.scripting.executeScript({
                        target: {tabId: tab.id},
                        files: ['content.js']
                    }, () => {
                        if (chrome.runtime.lastError) {
                            console.error("Error injecting content script:", JSON.stringify(chrome.runtime.lastError));
                        } else {
                            setTimeout(() => { // Add a delay
                                chrome.tabs.sendMessage(tab.id, { value: value }, (response) => {
                                    if (chrome.runtime.lastError) {
                                        console.error("Error sending message:", chrome.runtime.lastError.message);
                                        console.error("Error object:", JSON.stringify(chrome.runtime.lastError));
                                    }
                                });
                            }, 250); // 250ms delay
                        }
                    });
                }
            });
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.value !== undefined) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { value: request.value });
    });
  }
});