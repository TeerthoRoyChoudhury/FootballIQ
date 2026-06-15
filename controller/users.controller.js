import {
  userSignupPostValidation,
  userLoginPostValidation,
} from "../validation/users.validation.js";
import { ifExists, insertDb, getData } from "../services/user.service.js";
import { hashingPassword, isValidPassword } from "../utils/passwordHashing.js";
import { createToken } from "../utils/jswonwebtoken.js";
export const userSignup = async (req, res) => {
  try {
    const validationResult = await userSignupPostValidation.safeParseAsync(
      req.body,
    );
    if (!validationResult.success)
      return res.status(400).json({ error: `Invalid Input` });
    const { firstName, lastName, email, password } = validationResult.data;
    const result = await ifExists(email);
    if (result)
      return res.status(409).json({
        error: `User with emaik ${email} already exists, please login`,
      });
    const HashedPassword = await hashingPassword(password);
    const addDb = await insertDb(firstName, lastName, email, HashedPassword);
    return res.json({ status: `Success`, userId: addDb.userId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const validationResult = await userLoginPostValidation.safeParseAsync(
      req.body,
    );
    if (!validationResult.success)
      return res.status(400).json({ error: `Invalid input` });
    const { email, password } = validationResult.data;
    const userData = await getData(email);
    if (!userData)
      return res.status(401).json({ error: `you are not logged in` });
    const checkPassword = await isValidPassword(userData.password, password);
    if (!checkPassword)
      return res.status(401).json({ error: `Invalid password` });
    const payload = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };
    const token = createToken(payload);
    return res.json({ status: `Success, welcome!`, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
