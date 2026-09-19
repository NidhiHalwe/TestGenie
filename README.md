# 🧞‍♂️ TestGenie: AI-Powered Unit Test Generator

TestGenie is a full-stack, AI-driven QA automation tool designed to generate unit test suites for JavaScript code using Large Language Models.

By leveraging the Google Gemini API, TestGenie analyzes JavaScript code, identifies standard execution paths and edge cases, and generates ready-to-run Jest test cases, helping developers reduce manual testing effort and improve code quality.

---

## 🎥 Live Demo

> [My live demo link.](https://www.loom.com/share/0c7baee0330644deadcefeaef2e23f26)



---

## ✨ Features

- 🧠 **Intelligent Code Analysis**
  - Analyzes JavaScript functions and understands their logic.
  - Identifies standard execution paths and potential edge cases.

- 🧪 **Automated Jest Test Generation**
  - Generates structured Jest test suites from JavaScript code.
  - Covers expected behavior, edge cases, and potential failure scenarios.

- 🤖 **LLM-Powered QA Automation**
  - Uses Google Gemini to reason about code behavior.
  - Converts natural-language code understanding into executable test cases.

- ⚡ **Developer Productivity**
  - Reduces repetitive manual test-writing effort.
  - Helps developers quickly create an initial test suite for a function.

- 🖥️ **Modern Developer Interface**
  - Clean two-panel interface.
  - Code input and generated tests are clearly separated.

- 🔌 **REST API Architecture**
  - React frontend communicates with a Node.js/Express backend.
  - Backend handles AI orchestration and API communication.

- 🔐 **Secure API Key Handling**
  - Gemini API credentials are stored using environment variables.
  - API keys are never exposed directly in the frontend.

---

## 🏗️ Architecture

```text
                    ┌─────────────────────────┐
                    │       Developer         │
                    │                         │
                    │  JavaScript Source Code │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    React Frontend       │
                    │                         │
                    │   Code Input Panel      │
                    └────────────┬────────────┘
                                 │
                                 │ HTTP Request
                                 ▼
                    ┌─────────────────────────┐
                    │   Node.js + Express     │
                    │                         │
                    │    Backend API Layer    │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      AI Service         │
                    │                         │
                    │     Google Gemini       │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Code Analysis        │
                    │                         │
                    │  • Logic Analysis       │
                    │  • Edge Cases           │
                    │  • Expected Behavior    │
                    │  • Failure Scenarios    │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Jest Test Suite      │
                    │                         │
                    │  Generated Test Cases   │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    React Frontend       │
                    │                         │
                    │  Generated Tests Panel  │
                    └─────────────────────────┘
````
---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS / Custom CSS
* JavaScript

### Backend

* Node.js
* Express.js
* REST API

### AI Integration

* Google Gemini API
* `@google/generative-ai`

### Testing

* Jest
* JavaScript Unit Testing

### Development Tools

* Git
* GitHub
* npm
* VS Code
* Postman

---

## 📁 Project Structure

```text
TestGenie/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   └── geminiService.js
│   │   │
│   │   ├── routes/
│   │   │   └── testRoutes.js
│   │   │
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── README.md
└── package.json
```

---

## 🚀 Getting Started

Follow the steps below to run TestGenie locally.

---

## 1. Clone the Repository

```bash
git clone https://github.com/NidhiHalwe/TestGenie.git
```

Navigate into the project:

```bash
cd TestGenie
```

---

## 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 3. Frontend Setup

Open a new terminal.

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend directory.

```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

### Environment Variable Description

| Variable         | Description                                    |
| ---------------- | ---------------------------------------------- |
| `GEMINI_API_KEY` | API key used to communicate with Google Gemini |
| `PORT`           | Port used by the Express backend               |

> Never commit your `.env` file or expose API keys publicly.

---

## 💡 How It Works

### Step 1: Enter JavaScript Code

The developer pastes a JavaScript function into the code editor.

Example:

```javascript
function calculateDiscount(price, discount) {
  return price - (price * discount) / 100;
}
```

### Step 2: Send Code to Backend

The React frontend sends the JavaScript code to the Express backend through a REST API request.

### Step 3: AI Code Analysis

The backend constructs an AI prompt containing the JavaScript source code and sends it to Google Gemini.

Gemini analyzes:

* Function behavior
* Input requirements
* Expected outputs
* Edge cases
* Invalid inputs
* Potential failure scenarios

### Step 4: Generate Jest Tests

The AI generates a structured Jest test suite based on the analyzed behavior.

### Step 5: Display Generated Tests

The generated test cases are returned to the React frontend and displayed to the developer.

---

## 🧪 Example

### Input

```javascript
function calculateDiscount(price, discount) {
  return price - (price * discount) / 100;
}
```

### Generated Jest Tests

```javascript
describe("calculateDiscount", () => {
  test("calculates discount correctly", () => {
    expect(calculateDiscount(1000, 10)).toBe(900);
  });

  test("handles zero discount", () => {
    expect(calculateDiscount(1000, 0)).toBe(1000);
  });

  test("handles 100 percent discount", () => {
    expect(calculateDiscount(1000, 100)).toBe(0);
  });

  test("handles decimal values", () => {
    expect(calculateDiscount(500.5, 10)).toBeCloseTo(450.45);
  });
});
```

---

## 🔄 Application Workflow

```text
JavaScript Code
      │
      ▼
React Frontend
      │
      │ HTTP POST
      ▼
Express Backend
      │
      ▼
Gemini API
      │
      ▼
Code Analysis
      │
      ▼
Edge Case Identification
      │
      ▼
Jest Test Generation
      │
      ▼
Express Response
      │
      ▼
React UI
      │
      ▼
Generated Test Suite
```

---

## 🎯 Real-World Use Cases

TestGenie can assist developers and QA engineers with:

* Generating initial unit test suites
* Exploring edge cases
* Improving test coverage
* Reducing repetitive test-writing work
* Understanding unfamiliar JavaScript functions
* Accelerating test-driven development
* Supporting code review workflows
* Learning JavaScript testing practices

---

## 🧠 Engineering Concepts Demonstrated

This project demonstrates practical software engineering concepts including:

* Full-stack JavaScript development
* React component architecture
* REST API design
* Node.js backend development
* Express.js middleware
* LLM API integration
* Prompt engineering
* Automated test generation
* Unit testing with Jest
* Environment variable management
* Frontend-backend communication
* API error handling
* Developer productivity automation

---

## 🔒 Security Considerations

* Gemini API credentials are stored in environment variables.
* API keys are not included in frontend source code.
* `.env` files should be excluded from Git.
* Sensitive credentials should never be committed to GitHub.
* Production deployments should use secure environment configuration.

---

## 🚧 Future Improvements

* [ ] Multi-language test generation
* [ ] TypeScript support
* [ ] Python test generation with PyTest
* [ ] Java test generation with JUnit
* [ ] Automatic code coverage analysis
* [ ] Automatic test execution
* [ ] GitHub repository integration
* [ ] GitHub Pull Request integration
* [ ] AI-generated test explanations
* [ ] Test quality scoring
* [ ] Mutation testing support
* [ ] Docker-based isolated test execution
* [ ] CI/CD integration
* [ ] GitHub Actions support
* [ ] Download generated test files
* [ ] Repository-level code analysis

---

## 📈 Future Vision

The long-term goal of TestGenie is to evolve from a test-generation assistant into an AI-powered software testing platform.

```text
Source Code
     │
     ▼
Repository Analysis
     │
     ▼
Function & Dependency Analysis
     │
     ▼
Test Case Generation
     │
     ▼
Automatic Test Execution
     │
     ▼
Coverage Analysis
     │
     ▼
Failure Detection
     │
     ▼
AI-Based Test Improvement
     │
     ▼
Pull Request / CI Integration
```

---

## 🌟 Project Highlights

```text
✔ Full-Stack JavaScript Application
✔ React + Vite Frontend
✔ Node.js + Express Backend
✔ Google Gemini API Integration
✔ LLM-Powered Code Analysis
✔ Automated Jest Test Generation
✔ Edge Case Detection
✔ REST API Architecture
✔ Developer Productivity Tool
✔ AI-Assisted QA Automation
✔ Secure Environment Configuration
✔ Real-World Software Engineering Use Case
```

---

## 👨‍💻 Author

**Nidhi Halwe**

Software Engineer | Full Stack Developer | AI Applications

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is available for educational and development purposes.

