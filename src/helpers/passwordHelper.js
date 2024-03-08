const Bcrypt = require('bcrypt')

const SALT = 3

class PasswordHelper {
    static async hashPassword(password) {
        return await Bcrypt.hash(password, SALT)
    }

    static async comparePassword(password, hash) {
        return await Bcrypt.compare(password, hash)
    }
}

module.exports = PasswordHelper