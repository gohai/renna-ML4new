let commentsDiv = document.getElementById("comments-div");



function updateComments(response) {
    for (let i = 0; i < response.length; i++) {
        let comment = document.createElement("div");
        comment.className = "comment-div";
        commentsDiv.appendChild(comment);
        comment.style.display = "flex";

        // div for user profile
        let imgDiv=document.createElement("div");
        imgDiv.className="img-div";
        comment.appendChild(imgDiv);

        let img = document.createElement("img");
        img.className="profile-img";
        img.src = "assets/profile.jpg";
        imgDiv.appendChild(img);

        // div for texts (ID + Comment)
        let txtDiv = document.createElement("div");
        txtDiv.className="txt-div";
        comment.appendChild(txtDiv);
        txtDiv.style.paddingLeft = "1vw";

        let ID = document.createElement("p");
        ID.className="id";
        ID.textContent = response[i].id;
        txtDiv.appendChild(ID);
        let Comment = document.createElement("p");
        Comment.className="comment";
        Comment.textContent = response[i].comment;
        txtDiv.appendChild(Comment);
    }
}

function submittedAction() {
    commentsDiv.style.display = "block";

    let bar = document.getElementById("bar");
    bar.style.display = "none";
    let bar2 = document.getElementById("bar2");
    bar2.style.display = "block";

    sendMessage();
}