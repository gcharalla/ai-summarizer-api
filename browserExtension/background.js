chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: 'Summarize It!!!',
        id: 'summarize'
    });
});


function callAdmin() {
    chrome.tabs.create({
        'url': 'chrome://bookmarks/?id=2'
    })
}

async function summarize() {

    try {
        const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const currentUrl = currentTab.url;

        // Envía la URL a la API (sustituye 'API_URL' con tu URL real)
        const apiUrl = 'http://localhost:8080/api/summarize';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: currentUrl }),
        });

        const data = await response.json();
        console.log('API response:', data);
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