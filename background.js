chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCookies") {
    const url = message.url;

    chrome.cookies.getAll({ url: url }, (cookies) => {
      if (!cookies.length) {
        sendResponse({ success: false, cookies: [] });
        return;
      }


      const wanted = ["live_ssoprovider_session", "spxlrn_session"];

      const filtered = cookies
        .filter(c => wanted.includes(c.name))
        .map(c => `${c.name}=${c.value}`)
        .join("; ");

      sendResponse({
        success: filtered.length > 0,
        cookies: filtered
      });
    });

    return true;
  }
});