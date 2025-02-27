import parseCSV from "../utils/csvParser.js";

const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { rowCount, columnCount, data } = await parseCSV(req.file.buffer);

    res.json({
      message: "File uploaded successfully",
      rowCount,
      columnCount,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing file", error: error.message });
  }
};

export default uploadFile;
