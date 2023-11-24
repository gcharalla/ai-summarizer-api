chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === 'changeCursor') {
        console.log('Cambiando el cursor a:', request.wait ? 'wait' : 'default');
        document.body.style.cursor = request.wait ? 'wait' : 'default';
      }
    }
  );
  