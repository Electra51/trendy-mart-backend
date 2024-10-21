export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // construct image URL
    const imageUrl = `${
      process.env.BASE_URL || "http://localhost:8080"
    }/${req.file.path.replace("public", "")}`;

    res.status(200).json({ url: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
