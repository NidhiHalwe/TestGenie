# 🧞‍♂️ TestGenie: AI-Powered Unit Test Generator

TestGenie is a full-stack, AI-driven QA automation tool designed to generate unit test suites for JavaScript code using Large Language Models.

By leveraging the Google Gemini API, TestGenie analyzes JavaScript code, identifies standard execution paths and edge cases, and generates ready-to-run Jest test cases, helping developers reduce manual testing effort and improve code quality.

---

## 🎥 Live Demo

> Add your Loom or YouTube demo link here after recording the project walkthrough.

**Demo:** Coming Soon

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
