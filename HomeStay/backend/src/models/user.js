class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static async findById(db, id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0] ? new User(rows[0].id, rows[0].name, rows[0].email) : null;
    }

    static async create(db, name, email) {
        const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        return new User(result.insertId, name, email);
    }

    static async update(db, id, name, email) {
        await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        return User.findById(db, id);
    }

    static async delete(db, id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    }
}

module.exports = User;