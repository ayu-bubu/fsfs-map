import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "types.json");

  if (req.method === "GET") {
    const data = fs.readFileSync(filePath, "utf8");
    res.status(200).json(JSON.parse(data));
  } else if (req.method === "POST") {
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.status(200).json({ message: "種類を保存しました！" });
  } else {
    res.status(405).end();
  }
}
