const comments = [];

const inputContainer = document.createElement('div');
const input = document.createElement('input');
const commentsContainer = document.querySelector("#comments-container");

input.classList.add('input');

input.addEventListener("keydown", e => {
    handleEnter(e, null);
});

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);
input.focus();


function handleEnter(e, current) {

    if (e.key === 'Enter' && e.target.value.trim() != '') {
        const newComment = {
            text: e.target.value,
            likes: 0,
            responses: []
        }

        if (current === null) {
            comments.unshift(newComment);
        } else {
            current.responses.unshift(newComment);
        }

        e.target.value = '';
        commentsContainer.innerHTML = '';
        commentsContainer.appendChild(inputContainer);
        input.value = "";
        input.focus();
        renderComments(comments, commentsContainer);
    }
}


function renderComments(arr, parent) {
    arr.forEach(element => {
        const commentsContainer = document.createElement('div');
        commentsContainer.classList.add('comment-container');

        const responsesContainer = document.createElement('div');
        responsesContainer.classList.add('responses-container');

        const replyButton = document.createElement('button');
        const likeButton = document.createElement('button');

        const textContainer = document.createElement('div');
        textContainer.textContent = element.text;

        const actionsContainer = document.createElement('div');

        replyButton.textContent = 'Reply';

        let buttonText;
        if (element.likes == 0) {
            buttonText = "like";
        } else if (element.likes == 1) {
            buttonText = "1 like";
        } else {
            buttonText = `${element.likes} likes`;
        }

        likeButton.textContent = buttonText;

        replyButton.addEventListener('click', e => {

            let inputsAbiertos = document.getElementsByClassName("input");
            for (let i = 1; i < inputsAbiertos.length; i++) {
                inputsAbiertos[i].parentElement.removeChild(inputsAbiertos[i]);
            }
            input.value = "";
            let newInput = inputContainer.cloneNode(true);
            newInput.addEventListener("keydown", e => {
                handleEnter(e, element);
            })
            commentsContainer.insertBefore(newInput, responsesContainer);
            newInput.firstElementChild.focus();
        })

        likeButton.addEventListener('click', e => {
            element.likes++;

            if (element.likes == 0) {
                buttonText = "like";
            } else if (element.likes == 1) {
                buttonText = "1 like";
            } else {
                buttonText = `${element.likes} likes`;
            }    
    
            likeButton.textContent = buttonText;

        })

        commentsContainer.appendChild(textContainer);
        commentsContainer.appendChild(actionsContainer);
        actionsContainer.appendChild(replyButton);
        actionsContainer.appendChild(likeButton);
        commentsContainer.appendChild(responsesContainer);

        if (element.responses.length > 0) {
            renderComments(element.responses, responsesContainer);
        }
        parent.appendChild(commentsContainer);
    });
}