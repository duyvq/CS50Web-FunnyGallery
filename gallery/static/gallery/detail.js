const sendButton = document.querySelector('.btn.btn-primary');
const commentText = document.querySelector('textarea[id~=comment]');
const photoId = window.location.pathname.replace('/picture/','');
const commentSection = document.querySelector('#comment-section > .card');
var replyBox = document.querySelectorAll('.reply-list');
var replyText;
var commentIdList = [];
var replyIdList = [];
var replyId;
var commentId;

document.addEventListener('DOMContentLoaded', () => {
    sendButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (commentText.value.trim().length >= 25) {
            sendComment();
            commentText.value = ''
        }
    });
    loadAllComment();
    
})


// Get csrf token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  };


function sendComment() {
    const csrftoken = getCookie('csrftoken');
    fetch('/comment', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            commentContent: commentText.value,
            photoId: photoId
        })
    })
    .then(response => response.json())
    .then(comment => renderComment(comment))
}


function loadAllComment() {
    fetch(`/load_all_comment/${photoId}`)
    .then(response => response.json())
    .then(comments => {
        comments.forEach(elem => {
            renderComment(elem);
        })
    })
    // Add event to open reply box
    .then(result => {
        document.querySelectorAll('.reply').forEach((elem) => {
            elem.addEventListener('click', () => {
                    var parent = elem.parentElement.parentElement;
                    if (document.querySelectorAll('.reply-list').length > 0) {
                        document.querySelectorAll('.reply-list').forEach(e => e.remove())
                    }  
                    openReplyBox(parent);
                }
            )
        })
    })
    // Index comment to reply function
    .then(result => {
        commentIdList = commentIdList.reverse();
        // console.log(commentIdList)
        var list = document.querySelectorAll('.reply');
        var replyIdList = Array.prototype.slice.call(list)
        replyIdList.forEach((elem) => {
            elem.addEventListener('click', () => {
                replyId = replyIdList.indexOf(elem);
                // console.log(replyId)
            })
        })
    })
    .then(result => loadAllReply())
}


function renderComment(elem) {
    commentTable = document.createElement('table');
    commentTable.className = 'comment-table';
    commentTable.innerHTML = `
    <tbody class="comment-tablebody">
        <tr class="comment-row1">
            <td><b>${elem.username} - ${elem.timeStamp}:</b></td>
            <td class="reply"><a href="javascript:void(0)">Reply</a></td>
        </tr>  
        <tr><td>${elem.commentContent}</td></tr>
    </tbody>`;
    commentSection.insertBefore(commentTable, commentSection.children[0]);
    commentIdList.push(elem['id'])
}


function openReplyBox(parent) {
    replyBox = document.createElement('div');
    replyBox.className = 'reply-list';
    replyBox.innerHTML = `
        <form action="#" method="post">
            <div class="form-floating mb-3" 
                                style="box-shadow: 0px 0px 0px 1px #ced4da;
                                border-radius: 0.5rem !important;">
                <textarea class="form-control rounded-3" id="floatingInput reply" placeholder="(Optional) Description - max: 200 chars" rows="3" maxlength="200" 
                                    name="photoDescription"
                                    style="padding-top: 0px;
                                    border-color: white currentcolor currentcolor;
                                    border-style: solid none none;
                                    border-width: 30px 0px 0px;
                                    border-image: none 100% / 1 / 0 stretch;
                                    min-height: 100px;
                                    resize: none"></textarea>
                <label for="floatingInput">Reply - 25 to 200 chars</label>
            </div>
            <div>
                <button class="btn btn-primary" type="submit" value="Reply">Send</button>
                <button class="btnr btn-primary" type="button" value="Cancel">Cancel</button>
            </div>
        </form>
    `;
    parent.append(replyBox);
    
    document.querySelector('button[value=Cancel]').onclick = () => replyBox.remove();

    replyText = document.querySelector('textarea[id~=reply]');
    document.querySelector('button[value=Reply]').onclick = (e) => {
        e.preventDefault(); 
        replyComment();
        replyBox.remove();
    }
}


function replyComment() {
    const csrftoken = getCookie('csrftoken');
    commentId = commentIdList[replyId];

    fetch('/reply', {
        method: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin',
        body: JSON.stringify({
            replyTo: commentId,
            replyContent: replyText.value
        })
    })
    .then(response => response.json())
    .then(reply => renderReply(reply))
    
}


function loadAllReply() {
    // console.log(commentIdList)
    commentIdList.forEach((id) => {
        fetch(`/load_all_reply/${id}`)
        .then(response => response.json())
        .then(replies => {
            replies.forEach(elem => {
                // console.log(elem);
                renderReply(elem)
            })
        })
    });
    
}


function renderReply(elem) {
    var position = commentIdList.indexOf(elem.replyTo);
    originalComment = document.querySelectorAll('tbody[class=comment-tablebody]')[position];
    replyTable = document.createElement('table');
    replyTable.className = 'reply-table';
    replyTable.innerHTML = `
    <tbody class="reply-tablebody">
        <tr class="reply-row1">
            <td>${"&nbsp".repeat(10)}</td>
            <td><b>${elem.username} - ${elem.timeStamp}:</b></td>
        </tr>  
        <tr>
            <td>${"&nbsp".repeat(10)}</td>
            <td>${elem.replyContent}</td>
        </tr>
    </tbody>`;
    originalComment.append(replyTable);
}