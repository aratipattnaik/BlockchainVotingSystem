import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies?.token;


    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2️⃣ Verify with hardcoded secret
    const decoded = jwt.verify(
      token,
      "gv_ByL5jjddmCa_bffT1jgvkRSzFZMztoa2IClqbsBg"
    );

    console.log("Decoded JWT:", decoded);

    // 3️⃣ Attach user payload to req
    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
