const bcrypt = require("bcrypt");

module.exports = class Password {
    static async toHash(password) {
        const salt = 10;
        const hash = await bcrypt.hashSync(password, salt);
        return hash;
    }

    static async compare(storedPassword, suppliedPassword) {
        const isMatch = await bcrypt.compareSync(
            suppliedPassword,
            storedPassword
        );

        return isMatch;
    }
};
