import express, { Response, Request } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@baritrade/common";
import jwt from "jsonwebtoken";
import { Password } from "../services/password";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // Find the e-mail
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store jwt in the session object => req.session.jwt
    req.session = { jwt: userJwt };
    //  console.log(req.session);
    res.status(201).send(existingUser);
  }
);
export { router as signinRouter };
