chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: 'Summarize',
        id: 'summarize'
    });
});

async function getActiveTab() {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return activeTab;
}

async function changeCursor(wait) {
    const { id } = await getActiveTab();
    chrome.scripting.executeScript({
        target: { tabId: id },
        function: (wait) => {
            console.log('Changing cursor:', wait ? 'wait' : 'default');
            document.body.style.cursor = wait ? 'wait' : 'default';
        },
        args: [wait],
    });
}

async function summarize() {
    try {
        changeCursor(true);

        const { url } = await getActiveTab();

        // Send URL to API
        const apiUrl = 'http://localhost:8080/api/mock';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.newUrl) {
            chrome.tabs.create({ url: data.newUrl });
        } else {
            throw new Error('Unexpected response from the server');
        }

    } catch (error) {
        console.error('Error summarizing:', error);
    } finally {
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
