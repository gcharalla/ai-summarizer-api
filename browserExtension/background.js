chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: 'Summarize',
        id: 'summarize'
    });
});

async function summarize() {
    try {
        const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const currentUrl = currentTab.url;

        // Send URL to API
        const apiUrl = 'http://localhost:8080/api/summarize';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: currentUrl }),
        });

        const data = await response.json();
        chrome.tabs.create({ 'url': data.newUrl });

    } catch (error) {
        console.error('Error sending data to API:', error);
    }
}

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === 'summarize') {
        summarize();
    }
})

chrome.action.onClicked.addListener(() => {
    summarize();
});