const bcrypt = require("bcryptjs");

// Simulación simple sin MongoDB por ahora
const users = [];

class User {
  constructor(name, email, password) {
    this.id = Date.now().toString();
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }

  static async create(userData) {
    const { name, email, password } = userData;

    // Verificar si el usuario ya existe
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const user = new User(name, email, hashedPassword);
    users.push(user);

    return user;
  }

  static async findByEmail(email) {
    return users.find((u) => u.email === email);
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  }
}

module.exports = User;
