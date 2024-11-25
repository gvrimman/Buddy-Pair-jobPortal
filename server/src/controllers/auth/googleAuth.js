const User = require("../../models/user");
const passport = require("passport");

const googleAuth = async (req, res, next) => {
	await passport.authenticate("google", { scope: ["profile", "email"] })(
		req,
		res,
		next
	);
};

const googleAuthCallback = (req, res, next) => {
	passport.authenticate("google", (err, user, info) => {
		if (err) {
			return res.redirect(
				`http://localhost:5173/signup?error=${encodeURIComponent(
					err.message
				)}`
			);
		}
		if (!user) {
			return res.redirect(
				"http://localhost:5173/signup?error=Authentication failed"
			);
		}
		req.logIn(user, async (loginErr) => {
			if (loginErr) {
				return res.redirect(
					`http://localhost:5173/signup?error=${encodeURIComponent(
						loginErr.message
					)}`
				);
			}

			try {
				if (await User.findOne({ googleId: user?.googleId })) {
					return res.redirect("http://localhost:5173/");
				}

				const sanitizedUser = {
					googleId: user?.googleId,
					username: user?.username,
					email: user?.email,
					phone: user?.phone,
				};
				return res.redirect(
					`http://localhost:5173/ `
				);
			} catch (error) {
				return res.redirect(
					`http://localhost:5173/signup?error=${encodeURIComponent(
						error.message
					)}`
				);
			}
		});
	})(req, res, next);
};

module.exports = { googleAuth, googleAuthCallback };
