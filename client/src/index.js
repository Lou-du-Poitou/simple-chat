const userID = window.navigator.userAgent.replace(/\D+/g, "")
+ window.screen.height || "";
+ window.screen.width || "";
+ window.screen.pixelDepth || "";

console.log(`WEBSITE MADE BY V / LOU DU POITOU - YOUR ID IS : ${userID}`);

String.prototype.encodeHTML = function()  {
    return this.replace(/[\u00A0-\u9999<>\&]/g, (elem) => {
        return "&#" + elem.charCodeAt() + ";";
    });
};

if (!localStorage.getItem("pseudo")) {
    const pseudo = window.prompt("Merci de choisir un pseudo !");
    if (pseudo.trim()) {
        localStorage.setItem("pseudo", pseudo.trim());
    } else {
        localStorage.setItem("pseudo", `User-${Math.floor(Math.random()*100)}`);
    }
}

const formSubmit = document.querySelector("#submit");
const pseudoInput = document.querySelector("#pseudo");
const messageTextarea = document.querySelector("#message");
const thread = document.querySelector("main");

pseudoInput.value = localStorage.getItem("pseudo");
pseudoInput.addEventListener("change", (e) => {
    localStorage.setItem("pseudo", e.target.value.trim());
});

(function () {
    const socket = io.connect(`${location.protocol}//${document.domain}:${location.port}`, {
        forceNew: true,
        transports: ["polling"]
    });
    
    formSubmit.addEventListener("submit", (e) => {
        e.preventDefault();

        if (messageTextarea.value.length <= 1500 && localStorage.getItem("pseudo").length <= 100) {
            socket.emit("message", {
                userID: userID, 
                pseudo: localStorage.getItem("pseudo").trim(), 
                message: messageTextarea.value.trim()
            });
    
            messageTextarea.value = null;
        } else {
            window.alert("Votre message ou votre pseudo est trop long !");
        }
    });
    
    socket.on("message", (data) => {
        const messageBox = document.createElement("div");
        messageBox.className = "message-box";
        messageBox.innerHTML = `<center class="pseudo">${data.pseudo.encodeHTML() || "User"}</center><md-block class="content">${data.message.encodeHTML()}</md-block><center class="id">${data.userID.encodeHTML()}</center>`;
        thread.append(messageBox);
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 0);

        if (thread.children.length >= 100) {
            thread.firstChild.remove();
        }
    });
}());
