window.onload = () => {
  let chat = document.querySelector("div.container-fluid");
  window.onclick = () => function(obj) {
    let html = document.createElement("span");
    html.className = "msg", html.innerHTML = obj, chat.appendChild(html);
  }(12);
};