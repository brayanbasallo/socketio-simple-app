const socket = io()

const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");
const inboxPeople = document.querySelector(".inbox__people");

let userName = '';

const newUserConnected = (user) => {
    userName = user || `User${Math.floor(Math.random() * 1000000)}`;
    socket.emit('new user', userName);
    setUserName(userName);
}
const addToUsersBox = (userName) => {
    if (!!document.querySelector(`.${userName}-userlist`)) {
      return;
    }
    addUserList(userName);
  };

const addNewMessage = ({ user, message }) => {
    const time = new Date();
    const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

    const receivedMsg = addReceivedMessage({ user, message, date: formattedTime });

    const myMsg = addMyMessage({ user, message, date: formattedTime });

    messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
};

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!inputField.value) {
      return;
    }
    socket.emit("chat message", {
      message: inputField.value,
      nick: userName,
    });
    inputField.value = "";
});

inputField.addEventListener("keyup", () => {
    socket.emit("typing", { isTyping: inputField.value.length > 0, nick: userName });
});

socket.on("chat message", function (data) {
    addNewMessage({ user: data.nick, message: data.message });
});

// new user is created so we generate nickname and emit event
newUserConnected();

socket.on('new user', function (data) {
    console.log('new user', data);
    data.map((user) => addToUsersBox(user));
});

socket.on('user disconnected', function (userName) {
    document.querySelector(`.${userName}-userlist`).remove();
});


socket.on('typing', function (data) {
    userTyping(data);
});