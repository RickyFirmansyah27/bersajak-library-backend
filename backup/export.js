const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('prisma/bersajak.db');

// Fungsi untuk mengambil semua data dari sebuah tabel
const fetchTableData = (tableName) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({ [tableName]: rows });
      }
    });
  });
};

// Daftar tabel yang akan diekspor
const tables = ["books", "quiz", "word_completion", "audio_guide"];

// Jalankan proses ekspor
(async () => {
  try {
    const jsonData = {};

    for (const table of tables) {
      const data = await fetchTableData(table);
      Object.assign(jsonData, data);
    }

    fs.writeFileSync("exported_data.json", JSON.stringify(jsonData, null, 2));

    console.log("Data berhasil diekspor ke exported_data.json!");
  } catch (error) {
    console.error("Error saat mengekspor data:", error);
  } finally {
    db.close();
  }
})();
