const multer = require("multer");
const path = require("path");
const fs = require("fs");
const _storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/uploads/`);
  },
  filename: (req, file, cb) => {
    let result = "";
    const characters = "0123456789";
    const extension = path.extname(file.originalname);
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    const filename = result + extension;

    cb(null, filename);
    req.result = result; // 생성된 파일명을 요청 객체에 저장
  },
});
const upload = multer({ storage: _storage });

const ctrl = {
  send: (req, res) => {
    upload.single("file")(req, res, (err) => {
      if (err) {

        return res.status(500).json({ success: false });
      }
      setTimeout(() => {
        fs.unlink(req.file.path, (err) => {
          if (err) {

          }
        });
      }, 15 * 60 * 1000);

      const result = req.result; // 생성된 파일명을 사용

      return res.json({
        success: true,
        result: result,
      });
    });
  },

  download: (req, res) => {
    const key = req.body.key;
    const files = fs.readdirSync(`${__dirname}/uploads`);

    for (const file of files) {
      const filename = path.parse(file).name;

      if (key == filename) {
        const ext = path.parse(file).ext;

        const filepath = path.join(`${__dirname}`, "uploads", `${filename}${ext}`);
        return res.status(200).download(filepath, (err) => {
          if (err) {

          }
        });
      }
    }

    return res.status(404).json({ success: false, error: "File not found" });
  },
};

module.exports = ctrl;
