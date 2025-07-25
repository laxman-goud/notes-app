![GitHub repo size](https://img.shields.io/github/repo-size/laxman-goud/notes-app)
![GitHub forks](https://img.shields.io/github/forks/laxman-goud/notes-app)
![GitHub stars](https://img.shields.io/github/stars/laxman-goud/notes-app)
![GitHub issues](https://img.shields.io/github/issues/laxman-goud/notes-app)

# 📝 Notes App

A full-stack Note-Taking Web App built with **Node.js**, **Express**, **MongoDB**, and **EJS**, featuring **Google OAuth login**, session-based access, and a responsive UI.

---

## 🔑 Features

* 🔐 Google OAuth Authentication (via Passport.js)
* 🗒️ Create, Edit, and Delete Notes
* 🔍 Search notes by title or content
* 📃 Pagination support
* 🧠 EJS templating with Bootstrap 5 layout
* 💾 Session storage with MongoDB using connect-mongo
* ❌ Custom 404 error page
* 🧩 Dynamic layout switching based on login status

---

## 🛠️ Tech Stack

| Layer         | Technology                      |
| ------------- | ------------------------------- |
| Frontend      | EJS, Bootstrap 5, Custom CSS    |
| Backend       | Node.js, Express.js             |
| Auth          | Passport.js (Google OAuth 2.0)  |
| Database      | MongoDB + Mongoose              |
| Session Store | express-session + connect-mongo |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/laxman-goud/notes-app.git
cd notes-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory using the provided `.env.example`:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

### 4. Run the Application

```bash
npm run dev
```

Visit: [http://localhost:5000](http://localhost:5000)

---

## 📁 Folder Structure

```
notes-app/
├── app.js                  # Entry point
├── .env.example            # Sample environment variables
├── public/                 # Static files (CSS, images)
├── server/
│   ├── config/             # DB connection
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Mongoose models
│   └── routes/             # Express routes
├── views/                  # EJS templates
│   ├── layouts/            # Layout templates
│   ├── partials/           # Header/Footer includes
│   ├── dashboard/          # Dashboard views
│   └── 404.ejs             # Custom 404 page
```



---

## 🌐 Deployment

You can deploy this app on:

* **Render**
* **Vercel (for frontend only + API)**
* **Heroku**

Make sure to update your `.env` `GOOGLE_CALLBACK_URL` to match your deployed URL (e.g. `https://yourapp.onrender.com/google/callback`).

---
## 🙋‍♂️ Author

Made with ❤️ by [**Laxman Goud**](https://github.com/laxman-goud)

---

## 🤝 Contributions

Contributions are welcome! To contribute:

1. Fork this repo
2. Create a new branch: `git checkout -b feature/feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature/feature-name`
5. Open a Pull Request 🚀
