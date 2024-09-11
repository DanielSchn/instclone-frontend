let fetchedPosts = [];
let likedPosts = [];
let comments = [];
let url = "http://127.0.0.1:8000"


async function show() {
  document.getElementById("postcontainer").innerHTML = "";
  if (fetchedPosts != null) {
    for (let i = 0; i < fetchedPosts.length; i++) {
      const post = fetchedPosts[i];
      const postHTML = templateOne(post, i);
      const postHtmlTwo = templateTwo(post, i);
      const postHtmlThree = templateThree(post, i);
      document.getElementById("postcontainer").innerHTML += postHTML;
      if (post["comments"] != null) {
        document.getElementById(`singleCont${i}`).innerHTML += postHtmlTwo;
      }
      document.getElementById(`singleCont${i}`).innerHTML += postHtmlThree;
      if (likedPosts[i] && likedPosts[i].liked) {
        document.getElementById(`unlikeIcon${i}`).classList.remove("d-none");
        document.getElementById(`likeIcon${i}`).classList.add("d-none");
      } else if (likedPosts[i]) {
        document.getElementById(`unlikeIcon${i}`).classList.add("d-none");
        document.getElementById(`likeIcon${i}`).classList.remove("d-none");
      }
    }
  }
  renderHeader();
  renderFooter();
}


function templateOne(post, i) {
  return /*html*/ `
    <div class="singleContainer" id="singleCont${i}">
            <div class="profileNameLogo">
                <img src="${url}${post.profile_image}" class="profile">
                <div class="profileNameText">
                    <h2>${post.username}</h2>
                    <p>${post.location}</p>
                </div>
            </div>
            <img src="${url}${post.image}" class="postImage">
                <div class="iconsBelowPicture">
                    <div class="likeButton">
                        <img src="${url}/media/icons/herz.png" class="imgLogo" id="likeIcon${i}" onclick="likePost(${post.post_id}, ${i});">
                        <img src="${url}/media/icons/herz_red.png" class="imgLogo d-none" id="unlikeIcon${i}" onclick="likePost(${post.post_id}, ${i});">
                        <img src="./img/sprechblase.png" class="imgLogo">
                        <img src="./img/senden.png" class="imgLogo">
                    </div>
                    <img src="./img/angebracht.png" class="imgLogo" id="unmarked${i}">
                    <img src="./img/angebracht_bold.png" class="imgLogo d-none" id="marked${i}">
                </div>
                <div class="likesText" id="likesTextNo${i}">
                    Gefällt ${post.likes_count} Mal
                </div>
                <div class="descriptionText">
                    <p>${post.username}</p>
                    ${post.description}
                </div>
            `;
}


function templateTwo(post, i) {
  let commentsHTML = "";
  if (post.comments.length > 0) {
    post.comments.forEach((comment) => {
      commentsHTML += `<div class="comments"><p>${comment.username}</p>${comment.content}</div>`
    });
  } else {
    commentsHTML = "";
  }
  return /*html*/ `
        <div id="commentsContainer-${post.post_id}" class="descriptionText" style="padding-top: 16px; flex-direction: column;">
            ${commentsHTML}
        </div>`;
}


function templateThree(post, i) {
  return /*html*/ `
        <div class="input">
            <input type="text" placeholder="Kommentieren..." id="commentInput${post.post_id}"><button onclick="pushComment(this)" data-post-id="${post.post_id}" data-username="${encodeURIComponent(post.username)}">Post</button>
        </div>    
    `;
}


function showMenu() {
  document.getElementById("hiddenMenu").classList.toggle("showBurger");
}


function pushComment(button) {
  let postId = button.getAttribute('data-post-id');
  let username = decodeURIComponent(button.getAttribute('data-username'));
  let commentInput = document.getElementById(`commentInput${postId}`);
  let commentText = commentInput.value.trim();
  if (commentText) {
    fetch(`${url}/submit-comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id: postId,
        comment: commentText,
        user: username
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          updateComments(postId);
          commentInput.value = '';
          postId = '';
          username = '';
          commentText = '';
        } else {
          console.error("Fehler beim kommentieren:", data.error);
        }
      })
      .catch(error => console.error("Fehler:", error));
  } else {
    console.warn("Kommentar darf nicht leer sein!");
  }
}


function renderHeader() {
  document.getElementById('headerrender').innerHTML =
    /*html*/ `
        <div class="siteFormat">
      <header>
        <div class="danjogram">
          <a href="./index.html" class="danjogram"><img src="./img/logo_dsc.svg" alt="Logo" class="logo" />
          <h1>Danjogram</h1></a>
        </div>
        <div>
          <a href="./index.html"><img src="./img/haus.png" alt="Home" class="headerIcons"></a>
          <img src="./img/briefumschlag.png" alt="Message" class="headerIcons">
          <img src="./img/kompass.png" alt="Kompass" class="headerIcons">
          <img src="./img/herz.png" alt="Heart" class="headerIcons">
          <img src="./img/daniel.png" alt="Profile" class="headerIcons">
          <img src="./img/bar.png" alt="Bar" class="burgerMenu" onclick="showMenu()">
        </div>
        <button onclick = "window.location.href='create.html';">CREATE POST</button>
      </header>
      <div id="hiddenMenu" class="burgerContainer">
        <a href="./index.html"><img src="./img/haus.png" alt="Home" class="burgerIcons" onclick="showMenu()"></a>
        <img src="./img/briefumschlag.png" alt="Message" class="burgerIcons" onclick="showMenu()">
        <img src="./img/kompass.png" alt="Kompass" class="burgerIcons" onclick="showMenu()">
        <img src="./img/herz.png" alt="Heart" class="burgerIcons" onclick="showMenu()">
        <img src="./img/daniel.png" alt="Profile" class="burgerIcons" onclick="showMenu()">
      </div>
  `;
}


function renderFooter() {
  document.getElementById('footerrender').innerHTML =
    /*html*/ `
    <footer>
        <div class="copyrightContainer">
          <img src="./img/copyright.png" alt="(C)" class="copyright">
          <p>Copyright by</p>
          <img src="./img/danielschneider.svg" alt="" class="footerLogo">
        </div>
        <div>
          <a href="./impressum.html">Impressum</a> |
          <a href="./dsgvo.html">Datenschutz</a>
      </div>
      </footer>
  `;
}


async function fetchData() {
  try {
    fetchedPosts = [];
    await getLikedPosts();
    const response = await fetch(`${url}/posts/`);
    const posts = await response.json();
    posts.forEach(post => {
      fetchedPosts.push(post);
    });
    show();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}


function likePost(postId,  i) {
  console.log(postId, i);
  
  fetch(`${url}/like-post/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      post_id: postId,
      // user_id: userId
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("successfully");
        document.getElementById(`unlikeIcon${i}`).classList.toggle("d-none");
        document.getElementById(`likeIcon${i}`).classList.toggle("d-none");
      } else {
        console.log("Error:", data.error);
      }
    })
    .catch(error => console.error('Error:', error));
}


async function getLikedPosts() {
  fetch(`${url}/get-posts-with-like/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.posts) {
        data.posts.forEach(post => {
          likedPosts.push(post);
        });
      } else {
        console.log("Error fetching", data.error);
      }
    })
    .catch(error => console.error("error", error));
}


function updateComments(postId) {
  fetch(`${url}/get-comments/${postId}`)
    .then(response => response.json())
    .then(data => {
      const commentsSection = document.getElementById(`commentsContainer-${postId}`);
      commentsSection.innerHTML = '';
      data.comments.forEach(comment => {
        commentsSection.innerHTML += `<div class="comments"><p>${comment.user}</p>${comment.content}</div>`;
      });
    })
    .catch(error => console.error("Fehler beim abrufen:", error));
}