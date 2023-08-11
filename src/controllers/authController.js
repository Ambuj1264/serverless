const { getRepository } = require('typeorm');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../entities/User');

const register = async (req, res) => {
  const userRepository = getRepository(User);
  const { username, password } = req.body;

  const existingUser = await userRepository.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    username,
    password: hashedPassword,
  });

  await userRepository.save(newUser);

  res.json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
  const userRepository = getRepository(User);
  const { username, password } = req.body;

  const user = await userRepository.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

  res.json({ token });
};

module.exports = {
  register,
  login,
};
