// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, 'Vui lòng nhập một địa chỉ email hợp lệ.'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    age: {
        type: Number,
        min: 0,
        max: 120,
    },
}, {
    timestamps: true,
});

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

// Cần bcrypt để hash mật khẩu trước khi lưu và so sánh
// const bcrypt = require('bcryptjs');
// userSchema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;