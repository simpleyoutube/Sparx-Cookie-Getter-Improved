document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("copyCookiesBtn");
  const status = document.getElementById("status");

  const setStatus = (msg, type = "") => {
    status.textContent = msg;
    status.className = type;
  };

  btn.addEventListener("click", async () => {
    btn.classList.add("loading");
    setStatus("Extracting cookies...");

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      const response = await chrome.runtime.sendMessage({
        action: "getCookies",
        url: tab.url
      });

      if (!response || !response.success) {
        setStatus("No cookies found", "error");
        btn.classList.remove("loading");
        return;
      }

      await navigator.clipboard.writeText(response.cookies);

      setStatus("Copied to clipboard ✔", "success");
    } catch (err) {
      console.error(err);
      setStatus("Error occurred", "error");
    }

    btn.classList.remove("loading");
  });
});