const User = require("./userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const jwt = require("jsonwebtoken");

module.exports = {
  register_user: register_user,
  login_user: login_user,
};
async function register_user(req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .send({ message: "Sign up Successful", user: req.body });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function login_user(req, res) {
  const validUser = await User.findOne({ email: req.body.email });
  if (!validUser)
    return res.status(401).send({ status: 401, msg: "User Not Found" });
  try {
    //console.log(validUser.name, validUser.email);
    if (await bcrypt.compare(req.body.password, validUser.password)) {
      const accessToken = jwt.sign(
        {
          name: validUser.name,
          email: validUser.email,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(200).send({ status: 200, token: accessToken });
    }
    return res.status(401).send({ status: 401, msg: "Invalid Password" });
  } catch (error) {
    res.status(500).send({ status: 500, msg: "Error" });
    console.log(error);
  }
}
