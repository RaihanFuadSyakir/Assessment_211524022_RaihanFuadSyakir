-- CreateTable
CREATE TABLE "Barang" (
    "KodeBarang" TEXT NOT NULL PRIMARY KEY,
    "NamaBarang" TEXT NOT NULL,
    "Satuan" TEXT NOT NULL,
    "HargaSatuan" REAL NOT NULL,
    "Stok" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Kasir" (
    "KodeKasir" TEXT NOT NULL PRIMARY KEY,
    "Nama" TEXT NOT NULL,
    "HP" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tenan" (
    "KodeTenan" TEXT NOT NULL PRIMARY KEY,
    "NamaTenan" TEXT NOT NULL,
    "HP" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Nota" (
    "KodeNota" TEXT NOT NULL PRIMARY KEY,
    "KodeTenan" TEXT NOT NULL,
    "KodeKasir" TEXT NOT NULL,
    "TglNota" DATETIME NOT NULL,
    "JamNota" DATETIME NOT NULL,
    "JumlahBelanja" REAL NOT NULL,
    "Diskon" REAL NOT NULL,
    "Total" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "BarangNota" (
    "KodeNota" TEXT NOT NULL,
    "KodeBarang" TEXT NOT NULL,
    "JumlahBarang" INTEGER NOT NULL,
    "HargaSatuan" REAL NOT NULL,
    "Jumlah" REAL NOT NULL,

    PRIMARY KEY ("KodeNota", "KodeBarang"),
    CONSTRAINT "BarangNota_KodeNota_fkey" FOREIGN KEY ("KodeNota") REFERENCES "Nota" ("KodeNota") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BarangNota_KodeBarang_fkey" FOREIGN KEY ("KodeBarang") REFERENCES "Barang" ("KodeBarang") ON DELETE RESTRICT ON UPDATE CASCADE
);
