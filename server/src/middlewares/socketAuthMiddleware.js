const jwt = require("jsonwebtoken");

const socketAuthMiddleware = (socket, next) => {
    try {
      // Access cookies from the handshake headers
      const cookies = socket.handshake.headers.cookie;

      if (!cookies) {
        return next(new Error("Authentication error: No cookies found"));
      }

      const token = cookies
        ?.split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (!token) {
        return next(
          new Error("Authentication error: Token not found in cookies")
        );
      }

      // Verify the JWT
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
          return next(new Error("Authentication error: Invalid token"));
        }

        // Attach the decoded user to the socket
        socket.user = decoded;
        next();
      });
    } catch (error) {
        console.log("[socketAuthMiddleware] Error: ", error);
        return next(new Error("Internal server error"));
    }
};

module.exports = { socketAuthMiddleware };
