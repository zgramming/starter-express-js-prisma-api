import express from "express";
import formidable from "formidable";

const form = formidable({ multiples: true });
const router = express.Router();

// Auth

router.post("/login", async (req, res) => {
  form.parse(req, (err, fields, files) => {
    console.log({ fields, files });
  });

  return res.status(200).json({ message: "Login Success" });
});
router.post("/register", async (req, res) => {});
router.post("/logout", async (req, res) => {});

export default router;
