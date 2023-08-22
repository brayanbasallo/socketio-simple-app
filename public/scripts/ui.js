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
                        <img class="w-10 m-auto rounded-full" src="https://media.istockphoto.com/id/1191411980/vector/blue-cute-robot.jpg?s=612x612&w=0&k=20&c=gYPQin21qVIgQ2vmCrSgBiUswlk233CYORcfBa_Qe4g=" alt="robot profile">
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