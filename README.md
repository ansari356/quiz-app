# 🧠 QuizApp

A sleek and responsive Quiz Application built using **React**, **TypeScript**, and **Tailwind CSS**. This app allows users to test their general knowledge across various topics with real-time scoring, difficulty indicators, detailed review, and smooth UI transitions.

---

## 📸 UI Screenshots

| Quiz View | Result Summary | Question Review |
|-----------|----------------|-----------------|
| ![Quiz View](../quiz-app/src//assets/quiz-view.png) | ![Result Summary](../quiz-app//src/assets/result-summary.png) | ![Review](../quiz-app//src/assets/question-review.png) |


---

## ✨ Features

- 📚 Multiple-choice questions categorized by topic and difficulty.
- 🚥 Dynamic progress tracking.
- ✅ Immediate answer selection with response feedback.
- 🏆 Detailed result screen with score, time spent, and review.
- 🔁 Option to retake the quiz.
- 🎨 Styled using Tailwind CSS with responsive layout and gradient backgrounds.
- ⚙️ Built-in state management using `useState` and `useEffect`.

---

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React Icons**

---

## 📂 Folder Structure

📦QuizApp
┣ 📜QuizApp.tsx // Main component with quiz logic and UI
┣ 📁screenshots // UI screenshots for README
┗ 📜README.md // You're here!

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
2. Install dependencies
bash
Copy
Edit
npm install
3. Run the app locally
bash
Copy
Edit
npm run dev
The app will be available at http://localhost:5173/ (if using Vite).

🧪 Mock Data
The quiz uses mock data internally for demonstration purposes. You can replace mockQuizData with an API call or dynamic content source.

🧩 Components and Logic
Quiz Initialization: Loads mock quiz data with a simulated delay.

Question Navigation: Progresses through questions one-by-one.

Answer Selection: Allows single-answer choice with visual feedback.

Score Calculation: Calculates percentage score and tracks time spent.

Review Screen: Highlights correct vs. incorrect answers with icons.

Reset Functionality: Resets all states to allow a fresh attempt.

📌 To-Do / Improvements
 Integrate real API (e.g., Open Trivia DB or custom backend).

 Add user authentication and leaderboard.

 Add animations for transitions using Framer Motion.

 Store results in local storage or database.

📄 License
This project is licensed under the MIT License.