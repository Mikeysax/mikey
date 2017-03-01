// import jwt from 'jwt-simple';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import app from '../../server';

module.exports = {
	generateUserToken: function(user){
		let issueDate = moment().utc().format();

		let token = jwt.sign({
			id: user.id,
			issued: issueDate
		  },
			app.secret, {
			expiresIn: "7d" // expires in 1 week
		});

		return token;
	},

	getUser: function(token, cb){
		// Is token valid?
		let tokenObj = jwt.verify(token, app.secret);
		let userid = tokenObj.id;
		// Find the user from the valid token.
	  return app.models.user.findOne({ id: userid });
	}
}
