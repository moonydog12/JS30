# Infinite Scroll Blog

![image](../assets/image/infinite-scroll.jpg)

Display blog posts from jsonplaceholder and add infinite scroll to fetch posts and also add filter box

## Project Specifications

- Create UI & custom CSS loader animation
- Fetch initial posts from API and display
- Scroll down, show loader and fetch next set of posts
- Add filtering for fetched posts

## Note

### **UI**

**custom CSS loader animation:**

Use `@keyframe` to create loading animation, in order to make the white circle bounce in different time. Use `nth-of-type` pseudo class to select circle separately, and set different `animation-delay` value for each of them.

```scss
.circle {
  // other properties ...
  animation: bounce 0.5s ease-in infinite;
}

.circle:nth-of-type(2) {
  animation-delay: 0.1s;
}

.circle:nth-last-of-type(3) {
  animation-delay: 0.2s;
}

@keyframes bounce {
  0% {
    transform: translateY(0.5rem);
  }
  50% {
    transform: translateY(1rem);
  }
  100% {
    transform: translateY((0));
  }
}
```

### **Script**

**Fetch initial posts from API and display:**

Don't forget to add `async` keyword and `await` for [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) in a async function.

```js
// Fetch posts from API
const getPosts = async () => {
  // Fetch data from 3rd party API
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
  );

  const data = await response.json();
  return data;
};

// Render posts in DOM
const showPosts = async () => {
  // Because getPosts() return a Promise, use await to catch it
  const posts = await getPosts();

  // Render each post information in DOM
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
```

**Scroll down, show loader and fetch next set of posts :**

- Document.documentElement
- Element.scrollTop
- Element.scrollHeight
- Element.clientHeight

Searching for these keywords in MDN if you are interested

```js
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

// Listen to scroll event
window.addEventListener('scroll', () => {
  // Get the root element(html tag) value (object destructuring)
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // If the condition matched, load more posts
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
```

**Filter for fetched posts**

The `indexOf()` method returns the first index at which a given element can be found in the array, or -1 if it is not present.

```js
// Filter posts by input
const filterPosts = (e) => {
  const term = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');
  posts.forEach((post) => {
    const currentPost = post;
    const title = currentPost.querySelector('.post__title').innerText.toLowerCase();
    const body = currentPost.querySelector('.post__content').innerText.toLowerCase();

    title.indexOf(term) > -1 || body.indexOf(term) > -1
      ? (currentPost.style.display = 'flex')
      : (currentPost.style.display = 'none');
  });
};
```

## Summary

**Key points**

- Use `Array.prototype.indexOf()` to filter/search element in an array
- Use `Element` object and provided properties to trigger some condition

**Reference:**

> [MDN - Array.prototype.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
>
> [MDN - Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
