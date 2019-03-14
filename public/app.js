//get username --> listen to io chat messages, push them to the ul
//

if(io && username){
    const socket = io();

    document.querySelector('#chatApp button').addEventListener('click', () => {
        let message = document.querySelector('#chatApp input').value;
        if(message !== ""){
            console.log(message);
            socket.emit('chat message', {username: username, message: message});
        }
        document.querySelector('#chatApp input').value = ''
    })

    socket.on('chat message', function(data){
        let li = document.createElement('li')
        li.textContent = `${data.username}: ${data.message}`
        document.querySelector('#chatApp ul').appendChild(li)
      });
}