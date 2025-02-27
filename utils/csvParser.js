import csv from "csv-parser";

import { Readable } from "stream";

const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from(buffer.toString());

    stream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        const rowCount = results.length;
        const columnCount = rowCount > 0 ? Object.keys(results[0]).length : 0;
        resolve({ rowCount, columnCount, data: results });
      })
      .on("error", (error) => reject(error));
  });
};

export default parseCSV;
