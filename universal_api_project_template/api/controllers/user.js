// // Route Dependencies
// import express from 'express';
// let router = express.Router();
// import app from '../../server';
// import bcrypt from 'bcrypt';
//
// // Services
// import AuthServices from '../services/AuthService';
//
// // Routes ----------------------------
//
// // Base Path: /user->
//
// //Authentication -----------------------------------------------------------------
// // Create User
// router.post('/signup', function(req, res) {
// 	// Do the passwords match?
// 	if (req.body.password === req.body.passwordConfirmation) {
// 		if (req.body.password.length >= 8) {
// 			delete req.body.passwordConfirmation
// 			// Create User in Database
// 			app.models.user.create(req.body, function(error, model) {
// 	    	if (error) {
// 					return res.status(500).json({
// 						success: false,
// 						error: error.invalidAttributes
// 					});
// 				}
// 	      res.json(
// 					{ success: true,
// 						message: {
// 							created: [{
// 								rule: 'created',
// 								message: 'Account created successfully.'
// 							}]
// 						}
// 					}
// 				);
// 				// Probly configure email confirmation here eventually
// 	  	});
// 		} else {
// 			// Incoming password is too short error.
// 			return res.status(500).json(
// 				{ success: false, error: { password: [{ rule: 'passwordLength', message: 'Passwords need to be at least 8 characters in length.' }] } }
// 			);
// 		}
// 	} else {
// 		// Passwords do not match error.
// 		return res.status(500).json(
// 			{ success: false, error: { password: [{ rule: 'password', message: 'Passwords do not match.' }] } }
// 	  );
// 	}
// });
//
// router.post('/signin', function(req, res){
// 	app.models.user.findOneByEmail(req.body.email).exec(function(error, user){
// 		if (error) {
// 			// Send error if find results in error
// 			res.status(500).json({
// 				success: false,
// 				error: {
// 					signIn: [{
// 						rule: 'errorFindingUser',
// 						message: 'Error when trying to find user.'
// 					}]
// 				}
// 			});
// 		}
// 		if (user) {
// 			// Found user by email, now compare the passwords
// 			bcrypt.compare(req.body.password, user.password, function(error, match){
// 				if (match) {
// 					var token = AuthServices.generateUserToken(user);
// 					if (token != null) {
// 						// JWT is good, send token and some credentials
// 						delete user.password;
// 						res.status(200).json({
// 							success: true, message: {
// 								signedIn: [{
// 									rule: 'signedIn',
// 									message: `Account signed in successfully. Welcome back ${user.username}!`,
// 								}]
// 							},
// 							user: {
//                 id: user.id,
// 								email: user.email,
// 								username: user.username,
//                 avatar: user.avatar
// 							},
// 							token: token
// 						});
// 					} else {
// 						// Something is wrong with the JWT
// 						res.status(401).json({ success: false, error: { signIn: [{ rule: 'jwt', message: "Error creating a session." }] } });
// 					}
// 				} else {
//           // If it's an invalid password, send an error response
// 					res.status(401).json({ success: false, error: { signIn: [{ rule: 'invalidCredentials', message: "Email or password incorrect." }] } });
// 				}
// 			})
// 		} else {
// 			// If it's an invalid email, send an error response
// 			res.status(401).json({ success: false, error: { signIn: [{ rule: 'invalidCredentials', message: "Email or password incorrect." }] } });
// 		}
// 	});
// });
//
// // For retrieving user data after login, can add picture and other info later.
// router.get('/authenticate', function(req, res) {
// 	AuthServices.getUser(req.headers.access_token).exec((err, user) => {
// 		if (user != null) {
// 			res.status(200).json({
//         id: user.id,
// 				username: user.username,
// 				email: user.email,
//         avatar: user.avatar
// 			});
// 		} else {
// 			res.status(401).json({ success: false, error: { signIn: [{ rule: 'jwt', message: "Error authenticating session." }] } })
// 		}
// 	});
// });
// // End Authentication ----------------------------------------------------------------------
//
// // ------------------------------------
//
// module.exports = router;
