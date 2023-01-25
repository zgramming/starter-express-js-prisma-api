import jwt from "jsonwebtoken";

export const generateToken = (user: any) => {
  const secretKey = process.env.JWT_SECRECT_KEY ?? "-";
  const token = jwt.sign(
    {
      payload: {
        user,
      },
    },
    secretKey,
    { expiresIn: "1 days" }
  );

  return token;
};
