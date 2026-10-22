# Blog React App

A full-featured blog frontend built with **React 19**, **Vite** and **Tailwind CSS**. Readers can browse, search and comment on posts. Logged-in users can write and manage posts from an admin-style dashboard.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)

<!-- Add a screenshot of your dashboard here, for example:
![Dashboard](docs/dashboard.png)
-->

## Features

- **Dashboard** with a sidebar, stat cards, a posts-by-category chart, most discussed posts, latest comments and a recent posts table
- **Authentication** with JWT login and logout
- **Posts**: create, view, list and delete
- **Categories**: choose a category when writing a post, with a category breakdown on the dashboard
- **Comments and replies** on every post
- **Search** by title, content or category
- **Pagination** on the All Posts page and the dashboard table
- **Responsive design** that works on phones, tablets and desktops

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 19, Tailwind CSS 4 |
| Routing | React Router 7 |
| HTTP | Axios |
| Build tool | Vite 8 |
| Code quality | ESLint, React Compiler |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- npm (comes with Node.js)
- The blog backend API running locally (see [Backend](#backend))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<KhushiWalmiki2003>/<Blog_Project>.git

# 2. Go into the project folder
cd blog_react_app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Checks the code with ESLint |

## Backend

This app needs a backend API for posts, comments, categories and login. Set the API base URLs in `src/api/api.js`:

```js
// src/api/api.js
// Replace these with the URLs of your backend
// e.g. http://localhost:8080/api/posts
```

Endpoints used by the app:

| Purpose | Method and path |
| --- | --- |
| Get all posts | `GET /` |
| Get one post | `GET /{id}` |
| Create a post | `POST /user/{userId}/category/{categoryId}` |
| Delete a post | `DELETE /{id}` |
| Get comments of a post | `GET /{postId}` |
| Add a comment or reply | `POST /{postId}` |

Protected requests send a `Authorization: Bearer <token>` header. The token is stored after login.

## Pages and routes

| Route | Page |
| --- | --- |
| `/` | Dashboard |
| `/Home` | Home |
| `/posts` | All posts with search and pagination |
| `/posts/:id` | Post details and comments |
| `/create-post` | Create a post (login required) |
| `/login` | Login |

## Project structure

```
src/
├── api/          API calls (PostApi, CommentApi, shared Axios instances)
├── assets/       Cover images
├── components/   Navbar, Login, PostList, PostForm, Comments, Pagination
├── context/      AuthContext (login state and token)
├── data/         Category list
├── pages/        Dashboard, Home, Posts, PostDetails, CreatePost
├── App.jsx       Routes
├── main.jsx      App entry point
└── index.css     Tailwind import
```

## Roadmap

- [ ] Edit existing posts
- [ ] Server-side pagination and search
- [ ] Post images
- [ ] Dark mode

## Contributing

1. Fork the project
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push the branch: `git push origin feature/my-feature`
5. Open a pull request

## License

Add a license for your project (for example MIT) in a `LICENSE` file.

## Author

Made by **<KhushiWalmiki2003>**. Find me on [GitHub](https://github.com/<KhushiWalmiki2003>).
