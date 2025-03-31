# 📈 RobinHood_96 – AI Stock Advisor

A fullstack web app that helps retail traders make informed investment decisions using real-time AI-generated stock recommendations powered by DeepSeek's language model.

Built with:

- 🧠 **LLM API**: DeepSeek (OpenAI-compatible SDK)
- 🐍 **Backend**: Flask + Gunicorn + SQLAlchemy
- ⚛️ **Frontend**: React
- ☁️ **Deployment**: Render (Web Service)

---

## 🧠 Features

- 🔍 **AI Investment Assistant**  
  Users can ask stock-related questions and get tailored advice from an LLM via `/recommendations`.

- 🌐 **RESTful Flask API**  
  Clean, JSON-based endpoints built using Flask Blueprints and deployed with Gunicorn.

- 🧠 **DeepSeek-OpenAI SDK Integration**  
  Used the community OpenAI-compatible SDK with `base_url="https://api.deepseek.com"` and `OpenAI(api_key=...)`.

- 🔐 **Secure API Key Management**  
  Environment variables handled with `python-dotenv` for local and Render deployment.

---

## 🚀 Getting Started

### Backend (Flask)

```bash
pipenv install
pipenv shell

# Set environment variables (see .env.example)
flask run
```

### Frontend (React)

```bash
cd react-vite
npm install
npm run dev

```

## 🔁 Example API Request

```bash
curl -X POST http://localhost:5000/recommendations \
 -H "Content-Type: application/json" \
 -d '{"query": "Should I invest in Apple stock this week?"}'
```

## 🛠 .env Example

DEEPSEEK_API_KEY=your_deepseek_api_key
SECRET_KEY=supersecret
DATABASE_URL=sqlite:///dev.db
SCHEMA=flask_schema

## 📄 License - MIT
