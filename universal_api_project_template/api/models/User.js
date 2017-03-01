// import Waterline from 'waterline';
// import bcrypt from 'bcrypt';
//
// const User = Waterline.Collection.extend({
//   identity: 'user',
//   connection: 'myPostgres',
//   attributes: {
//     username: {
//       type: 'string',
//       alphanumeric: true,
//       minLength: 4,
//       maxLength: 30,
//       required: true,
//       unique: true,
//       lowercase: true
//     },
//     email: {
//       type: 'string',
//       email: true,
//       required: true,
//       unique: true,
//       lowercase: true
//     },
//     password: {
//       type: 'string',
//       required: true
//     },
//     toJSON: function() {
//       var obj = this.toObject();
//       delete obj.password;
//       return obj;
//     }
//   },
//   beforeCreate: function(values, next){
//     bcrypt.genSalt(10, function(err, salt) {
//       if (err) return next(err);
//       bcrypt.hash(values.password, salt, function(err, hash) {
//         if (err) return next(err);
//         values.password = hash;
//         next();
//       });
//     });
//   }
// });
//
// module.exports = User;
