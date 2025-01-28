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
				`${process.env.CLIENT_URL}/auth?error=${encodeURIComponent(
					err.message
				)}`
			);
		}
		if (!user) {
			return res.redirect(
				`${process.env.CLIENT_URL}/auth?error=Authentication failed`
			);
		}

		req.logIn(user, async (loginErr) => {
			if (loginErr) {
				return res.redirect(
					`${process.env.CLIENT_URL}/auth?error=${encodeURIComponent(
						loginErr.message
					)}`
				);
			}

			try {
				console.log('user',user);
				const existingUser = await User.findOne({
					googleId: user.id || user.googleId,
				}).populate("apps.jobPortal");
				console.log('ex',existingUser)
				if (existingUser) {
					try {
						const { accessToken, refreshToken } =
							await generateAccessAndRefreshToken(
								existingUser._id
							);

						const options = {
							httpOnly: true,
							secure: process.env.NODE_ENV === "production",
							sameSite: "strict",
							domain: process.env.COOKIE_DOMAIN,
						};

						res.cookie("accessToken", accessToken, options);
						res.cookie("refreshToken", refreshToken, options);

						return res.redirect(
							`${process.env.CLIENT_URL}/auth?user=${encodeURIComponent(
								JSON.stringify(existingUser)
							)}`
						);
					} catch (tokenError) {
						console.error("Token generation error:", tokenError);
						return res.redirect(
							`${process.env.CLIENT_URL}/auth?error=${encodeURIComponent(
								"Failed to generate authentication tokens"
							)}`
						);
					}
				} else {
					const newUser = new User({
						googleId: user.googleId,
						username: user.username,
						email: user.email,
						phone: user.phone || null,
					});

					await newUser.save();

					try {
						const { accessToken, refreshToken } =
							await generateAccessAndRefreshToken(newUser._id);

						const options = {
							httpOnly: true,
							secure: process.env.NODE_ENV === "production",
							sameSite: "strict",
							domain: process.env.COOKIE_DOMAIN,
						};

						res.cookie("accessToken", accessToken, options);
						res.cookie("refreshToken", refreshToken, options);

						return res.redirect(
							`${process.env.CLIENT_URL}/auth?modal=userinfo`
						);
					} catch (tokenError) {
						console.error("Token generation error:", tokenError);
						return res.redirect(
							`${process.env.CLIENT_URL}/auth?error=${encodeURIComponent(
								"Failed to generate authentication tokens"
							)}`
						);
					}
				}
			} catch (error) {
				console.error("Authentication error:", error);
				return res.redirect(
					`${process.env.CLIENT_URL}/auth?error=${encodeURIComponent(
						error.message
					)}`
				);
			}
		});
	})(req, res, next);
};
module.exports = { googleAuth, googleAuthCallback };
