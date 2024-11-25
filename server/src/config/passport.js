require("dotenv").config();
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/user");

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const userExist = await User.findOne({ googleId: profile.id });

				if (!userExist) {
					const userData = {
						googleId: profile.id,
						username: profile.displayName,
						email: profile.emails[0].value,
						phone: "Not Verified",
					};
					return done(null, userData);
				}
				return done(null, profile);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);

module.exports = passport;
