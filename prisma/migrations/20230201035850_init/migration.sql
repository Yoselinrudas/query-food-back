-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "telefono" INTEGER NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "es_propietario" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "restaurantes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "referencia" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "usuarioId" INTEGER,
    "tipo" TEXT NOT NULL,
    "apertura" DATETIME NOT NULL,
    "cierre" DATETIME NOT NULL,
    "fech_creacion" DATETIME NOT NULL,
    "calificacion" REAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    CONSTRAINT "restaurantes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "platos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_plato" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "imagen" TEXT NOT NULL,
    "disponibilidad" BOOLEAN NOT NULL DEFAULT true,
    "descripcion" TEXT NOT NULL,
    "restaurante_id" INTEGER NOT NULL,
    CONSTRAINT "platos_restaurante_id_fkey" FOREIGN KEY ("restaurante_id") REFERENCES "restaurantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "comentarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comentario" TEXT NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "restaurante_id" INTEGER NOT NULL,
    CONSTRAINT "comentarios_restaurante_id_fkey" FOREIGN KEY ("restaurante_id") REFERENCES "restaurantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");
