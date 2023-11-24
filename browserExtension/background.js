chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: 'Summarize',
        id: 'summarize'
    });
});

function changeCursor(wait) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'changeCursor', wait: wait });
    });
}

async function summarize() {
    changeCursor(true);
    try {
        const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const currentUrl = currentTab.url;

        // Send URL to API
        const apiUrl = 'http://localhost:8080/api/summarize'; // Cambiado a HTTPS
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: currentUrl }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.newUrl) {
            changeCursor(false);
            chrome.tabs.create({ url: data.newUrl });
        } else {
            throw new Error('Unexpected response from the server');
        }

    } catch (error) {
        console.error('Error summarizing:', error);
        changeCursor(false);
    }
}

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === 'summarize') {
        summarize();
    }
});

chrome.action.onClicked.addListener(() => {
    summarize();
});
