'use strict';
module.exports = (mongoose, models)=>{

let Schema = mongoose.Schema;
let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required']
  },
  authentication: {
    email: String,
    password: String
  }
});


UserSchema.methods.hashPassword = function(password){
  var hash = this.authentication.password = bcrypt.hashSync(password, 8);
  return hash;
};

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.authentication.password);
};
UserSchema.methods.generateToken = function(){
  return jwt.sign({id: this._id}, config.secret);
};

let User = mongoose.model('User', UserSchema);
models.User = User;
};
