const setUserName = (name) => {
    const userName = document.querySelector('#UserName')
    if (userName) {
        userName.innerHTML = name;
    }
}

const addUserList = (name) => {
    const userList = document.querySelector('.inbox__people')
    if (userList) {
        const userBox = `
            <div class="px-3 py-4 flex justify-between hover:bg-indigo-50 rounded-md items-center cursor-pointer ${name}-userlist">
                <div class="flex gap-2 items-center">
                    <div class="">
                        <img class="w-10 m-auto rounded-full" src="https://xsgames.co/randomusers/avatar.php?g=pixel" alt="robot profile">
                    </div>
                    <p class="font-bold text-sm">${name} </p>
                    <span class="text-xs font-semibold text-gray-500 ${name}-typing"></span>
                </div>
            </div>
        `;
        userList.innerHTML += userBox;
    }
}


const userTyping = ({ isTyping, nick }) => {
    const typing = document.querySelector(`.${nick}-typing`)
    if (typing) {
        if (isTyping) {
            typing.innerHTML = 'typing...'
        } else {
            typing.innerHTML = ''
        }
    }
}

const addReceivedMessage = ({ user, message, date }) => {
    return`
    <div class="flex w-10/12 gap-2 items-">
        <img class="w-10 h-10 rounded-full" src="https://api.dicebear.com/7.x/pixel-art/svg" alt="robot profile">
        <div class="flex flex-col items-right">
            <div class="rounded bg-white py-3 px-3  max-w-xl text-base">
                ${message}                
            </div>
            <span class="text-xs text-gray-600 mt-2" > ${user} - ${date} </span>
        </div>
    </div>
    `;
}

const addMyMessage = ({ user, message, date }) => {
    return `
    <div class="flex flex-col items-end">
        <div class="rounded bg-blue-950 py-3 px-3 text-white max-w-xl text-base">
            ${message}
        </div>
        <span class="text-xs text-gray-600 mt-2" > ${date} </span>
    </div>
    `;
}