// function setupLikeButton(likeContentDiv) {
//   const heartIcon = likeContentDiv.querySelector(".heart-icon");

//   likeContentDiv.addEventListener("click", function (event) {
//     event.stopPropagation();
//     const likeCountSpan = likeContentDiv.querySelector("span");
//     const currentLikes = parseInt(likeCountSpan.textContent);

//     if (likeContentDiv.classList.contains("liked")) {
//       likeContentDiv.classList.remove("liked");
//       likeCountSpan.textContent = currentLikes - 1;
//     } else {
//       likeContentDiv.classList.add("liked");
//       likeCountSpan.textContent = currentLikes + 1;
//     }

//     heartIcon.classList.add("heart-icon--animated");
//     setTimeout(function () {
//       heartIcon.classList.remove("heart-icon--animated");
//     }, 1000);
//   });
// }

// const likeContentDivs = document.querySelectorAll(".like-content");

// likeContentDivs.forEach(function (likeContentDiv) {
//   setupLikeButton(likeContentDiv);
// });
