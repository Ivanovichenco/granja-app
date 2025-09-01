import * as SQLite from 'expo-sqlite';

// Variable para almacenar la instancia de la base de datos
let dbInstance = null;

// Función para obtener la instancia de la base de datos
const getDBInstance = async () => {
  if (!dbInstance) {
    try {
      // Usar la nueva API de expo-sqlite
      dbInstance = await SQLite.openDatabaseAsync('granja.db');
      console.log('Base de datos abierta correctamente');
    } catch (error) {
      console.error('Error al abrir la base de datos:', error);
      throw error;
    }
  }
  return dbInstance;
};

// Función para ejecutar una consulta SQL simple
export const executeSql = async (sql, params = []) => {
  try {
    const db = await getDBInstance();
    
    // Usar getAllAsync para consultas SELECT
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      const result = await db.getAllAsync(sql, params);
      return { rows: result };
    } 
    // Usar runAsync para consultas INSERT, UPDATE, DELETE
    else {
      const result = await db.runAsync(sql, params);
      return result;
    }
  } catch (error) {
    console.error('SQL Error:', error);
    console.error('SQL Statement:', sql);
    console.error('SQL Params:', params);
    throw error;
  }
};

// Función para inicializar la base de datos con todas las tablas
export const initDatabase = async () => {
  try {
    // Crear tabla lotes
    await executeSql(`
      CREATE TABLE IF NOT EXISTS lotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        cantidad_inicial INTEGER NOT NULL,
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE,
        estado TEXT DEFAULT 'activo'
      );
    `);
    console.log('Tabla lotes creada correctamente');
    
    // Crear tabla alimentos
    await executeSql(`
      CREATE TABLE IF NOT EXISTS alimentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha DATE NOT NULL,
        lote_id INTEGER,
        weight INTEGER,
        tipo_alimento TEXT,
        consumed_food INTEGER DEFAULT 0,
        observaciones TEXT,
        FOREIGN KEY (lote_id) REFERENCES lotes (id) ON DELETE CASCADE
      );
    `);
    console.log('Tabla alimentos creada correctamente');
    
    // Crear tabla ventas
    await executeSql(`
      CREATE TABLE IF NOT EXISTS ventas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha DATE NOT NULL,
        lote_id INTEGER,
        cantidad_vendida INTEGER,
        Peso REAL,
        precio_unitario REAL,
        total_venta REAL,
        observaciones TEXT,
        FOREIGN KEY (lote_id) REFERENCES lotes (id) ON DELETE CASCADE
      );
    `);
    console.log('Tabla ventas creada correctamente');
    
    // Crear tabla compras
    await executeSql(`
      CREATE TABLE IF NOT EXISTS compras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha_compra DATE NOT NULL,
        proveedor TEXT NOT NULL,
        concepto TEXT,
        tipo_compra TEXT,
        cantidad REAL,
        unidad_medida TEXT DEFAULT 'kg',
        precio_unitario REAL,
        total_compra REAL,
        lote_id INTEGER,
        factura TEXT,
        observaciones TEXT,
        FOREIGN KEY (lote_id) REFERENCES lotes (id) ON DELETE SET NULL
      );
    `);
    console.log('Tabla compras creada correctamente');
    
    console.log('Base de datos inicializada correctamente');
    return true;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
};

// Función para obtener todos los lotes
export const getLotes = async () => {
  try {
    const result = await executeSql('SELECT * FROM lotes WHERE estado = ? ORDER BY fecha_inicio DESC', ['activo']);
    return result.rows || [];
  } catch (error) {
    console.error('Error al obtener lotes:', error);
    return [];
  }
};

// Función para obtener todas las compras
export const getCompras = async () => {
  try {
    const result = await executeSql('SELECT * FROM compras ORDER BY fecha_compra DESC');
    return result.rows || [];
  } catch (error) {
    console.error('Error al obtener compras:', error);
    return [];
  }
};

// Función para obtener todas las ventas
export const getVentas = async () => {
  try {
    const result = await executeSql('SELECT * FROM ventas ORDER BY fecha DESC');
    return result.rows || [];
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    return [];
  }
};

// Función para agregar un lote
export const addLote = async (nombre, cantidad_inicial, fecha_inicio, fecha_fin, estado) => {
  try {
    const result = await executeSql(
      'INSERT INTO lotes (nombre, cantidad_inicial, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)',
      [nombre, cantidad_inicial, fecha_inicio, fecha_fin, estado]
    );
    return result;
  } catch (error) {
    console.error('Error al agregar lote:', error);
    throw error;
  }
};

// Función para agregar una compra
export const addCompra = async (fecha_compra, proveedor, concepto, tipo_compra, cantidad, precio_unitario, total_compra, factura, observaciones) => {
  try {
    const result = await executeSql(
      'INSERT INTO compras (fecha_compra, proveedor, concepto, tipo_compra, cantidad, precio_unitario, total_compra, factura, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [fecha_compra, proveedor, concepto, tipo_compra, cantidad, precio_unitario, total_compra, factura, observaciones]
    );
    return result;
  } catch (error) {
    console.error('Error al agregar compra:', error);
    throw error;
  }
};

// Función para agregar una venta
export const addVenta = async (fecha, lote_id, cantidad_vendida, Peso, precio_unitario, total_venta, observaciones) => {
  try {
    const result = await executeSql(
      'INSERT INTO ventas (fecha, lote_id, cantidad_vendida, Peso, precio_unitario, total_venta, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fecha, lote_id, cantidad_vendida, Peso, precio_unitario, total_venta, observaciones]
    );
    return result;
  } catch (error) {
    console.error('Error al agregar venta:', error);
    throw error;
  }
};

// Exportar la instancia de la base de datos y las funciones
export default {
  initDatabase,
  getLotes,
  getCompras,
  getVentas,
  addLote,
  addCompra,
  addVenta,
  executeSql
};