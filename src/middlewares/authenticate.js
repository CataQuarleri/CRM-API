import firebaseAdmin from "../auth/firebaseConfig.js";
import User from '../models/userModel.js'

export default async function (req, res, next) {
  try {
    const firebaseToken = req.headers.authorization?.split(" ")[1];

    let firebaseUser;
    if (firebaseToken) {
      firebaseUser = await firebaseAdmin.auth.verifyIdToken(firebaseToken);
    }

    if (!firebaseUser) {
      // Unauthorized
      return res.sendStatus(401);
    }

    const usersCollection = User;

    const user = await usersCollection.findOne({
      firebaseId: firebaseUser.user_id
    });

    if (!user) {
      // Unauthorized
      return res.sendStatus(401);
    }

    req.user = user;

    next();
  } catch (err) {
    //Unauthorized
    res.sendStatus(401);
  }
}