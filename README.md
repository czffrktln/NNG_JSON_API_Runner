# JSON API Runner

**JSON API Runner** is a JSON-driven API execution system. It allows users to trigger various backend services through structured JSON input. The system processes requests asynchronously and returns the results to the user.

---

## 🚀 Installation & Running the Server

```bash
npm install
node server.js
```

The backend server will run by default at:
http://localhost:3000

Once the server is running, open your browser and navigate to:
http://localhost:3000

## 📥 Example Input Format

```
[
  {
    "method": "getFibonacci",
    "params": {"number": 4}
  },
  {
    "method": "multiplyMatrices",
    "params": { "A": [[1, 2],[3, 4]], "B": [[5, 6],[7, 8]]}
  }
]
```

