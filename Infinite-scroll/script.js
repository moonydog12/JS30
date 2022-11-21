const postContainer = document.querySelector('.posts');
const loader = document.querySelector('.loader');
const filterInput = document.querySelector('.filter__input');
const limit = 3;
let page = 1;

// Fetch posts from API
const getPosts = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
  );

  const data = await response.json();
  return data;
};

// Show posts in DOM
const showPosts = async () => {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="post__number">${post.id}</div>
        <div class="post__info">
          <h2 class="post__title">${post.title}</h2>
          <p class="post__content">${post.body}</p>
        </div>
    `;

    postContainer.append(postEl);
  });
};

// Show loader & fetch more posts
const showLoading = () => {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
      page += 1;
      showPosts();
    }, 500);
  }, 1000);
};

// Filter posts by input
const filterPosts = (e) => {
  const term = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');
  posts.forEach((post) => {
    const currentPost = post;
    const title = currentPost.querySelector('.post__title').innerText.toLowerCase();
    const body = currentPost.querySelector('.post__content').innerText.toLowerCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      currentPost.style.display = 'flex';
    } else {
      currentPost.style.display = 'none';
    }
  });
};

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filterInput.addEventListener('input', filterPosts);
