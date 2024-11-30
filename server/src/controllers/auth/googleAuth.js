const User = require("../../models/user");
const passport = require("passport");
const generateAccessAndRefreshToken = require("../../utils/generateAccessAndRefreshToken");

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
				`http://localhost:5173/auth?error=${encodeURIComponent(
					err.message
				)}`
			);
		}
		if (!user) {
			return res.redirect(
				"http://localhost:5173/auth?error=Authentication failed"
			);
		}
		req.logIn(user, async (loginErr) => {
			if (loginErr) {
				return res.redirect(
					`http://localhost:5173/auth?error=${encodeURIComponent(
						loginErr.message
					)}`
				);
			}

			try {
				const existingUser = await User.findOne({
					googleId: user.id,
				});

				// console.log(user);
				// console.log(existingUser);

				if (existingUser) {
					if (existingUser?.apps?.jobPortal?.role === "employee") {
						return res.redirect("http://localhost:5173/employee");
					} else if (
						existingUser?.apps?.jobPortal?.role === "employer"
					) {
						return res.redirect("http://localhost:5173/employer");
					}
				} else {
					const uewUser = new User({
						googleId: user.id,
						username: user.username,
						email: user.email,
						phone: user.phone || null,
					});
					await uewUser.save();

					const { accessToken, refreshToken } =
						await generateAccessAndRefreshToken(uewUser._id);
					const options = {
						httpOnly: true,
						secure: true,
						maxAge: 7 * 24 * 60 * 60 * 1000,
					};
					res.cookie("accessToken", accessToken, options);
					res.cookie("refreshToken", refreshToken, options);

					return res.redirect(
						"http://localhost:5173/auth?modal=userinfo"
					);
				}
			} catch (error) {
				return res.redirect(
					`http://localhost:5173/auth?error=${encodeURIComponent(
						error.message
					)}`
				);
			}
		});
	})(req, res, next);
};

module.exports = { googleAuth, googleAuthCallback };
