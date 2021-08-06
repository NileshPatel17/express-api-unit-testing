const { User: UserModel, Item } = require('../models');

const createUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      include: [
        {
          model: Item,
        },
      ],
    });
    return res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({
      where: { id },
      include: [
        {
          model: Item,
        },
      ],
    });
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).send('User with the specified ID does not exists');
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log({ id, body: req.body });
    const [updated] = await UserModel.update(req.body, {
      where: {
        id,
      },
    });
    if (updated) {
      const updatedUser = await UserModel.findOne({ where: { id } });
      return res.status(200).json({ user: updatedUser });
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = UserModel.destroy({
      where: {
        id,
      },
    });
    if (deleted) {
      return res.status(204).send('User deleted');
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
