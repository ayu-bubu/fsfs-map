// server/index.js
import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3000;

// JSONファイルのパス
const __dirname = path.resolve();
const markersFile = path.join(__dirname, "markers.json");
const typesFile = path.join(__dirname, "types.json");
const labelsFile = path.join(__dirname, "labels.json");


// ミドルウェア設定
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// ----- API: マーカー一覧 -----
app.get("/api/markers", (req, res) => {
  if (fs.existsSync(markersFile)) {
    const data = fs.readFileSync(markersFile, "utf-8");
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

// ----- API: マーカー保存 -----
app.post("/api/markers", (req, res) => {
  try {
    console.log("POST body:", req.body);
    fs.writeFileSync(markersFile, JSON.stringify(req.body, null, 2));
    res.json({ message: "保存しました！" });
  } catch (err) {
    console.error("markers.json 書き込みエラー:", err);
    res.status(500).json({ error: err.message });
  }
});


// ----- API: 種類一覧 -----
app.get("/api/types", (req, res) => {
  if (fs.existsSync(typesFile)) {
    const data = fs.readFileSync(typesFile, "utf-8");
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

// ----- API: 種類保存 -----
app.post("/api/types", (req, res) => {
  fs.writeFileSync(typesFile, JSON.stringify(req.body, null, 2));
  res.json({ message: "種類を保存しました！" });
});

// ----- API: ラベル一覧 -----
app.get("/api/labels", (req, res) => {
  if (fs.existsSync(labelsFile)) {
    const data = fs.readFileSync(labelsFile, "utf-8");
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

// ----- API: ラベル保存 -----
app.post("/api/labels", (req, res) => {
  fs.writeFileSync(labelsFile, JSON.stringify(req.body, null, 2));
  res.json({ message: "ラベルを保存しました！" });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ サーバー起動中: http://localhost:${PORT}`);
});
