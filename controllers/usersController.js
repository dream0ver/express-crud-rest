const db = require("../users.json");
const fsPromises = require("fs/promises");

const writeToFile = (data) =>
  fsPromises.writeFile("./users.json", JSON.stringify(data), "utf8");

const getAllUsers = (req, res) => {
  res.status(200).json(db);
};

const getUserById = (req, res) => {
  const id = req.params.id;
  const foundUser = db.find((i) => i.id == id);
  if (!foundUser) {
    res.status(404).send("User does not exist.");
  }
  res.status(200).json(foundUser);
};

const createUser = async (req, res) => {
  const { name, age } = req.body;
  const newUser = {
    id: db.length + 1,
    name,
    age,
  };
  await writeToFile([...db, newUser]);
  res.status(201).send("User Successfully Created.");
};

const updateUser = async (req, res) => {
  const { id, name, age } = req.body;
  const foundUser = db.find((i) => i.id == id);
  if (!foundUser) {
    res.status(404).send("User does not exist.");
  }
  const updatedUsers = db.map((i) => {
    if (i.id != id) return i;
    return {
      ...i,
      name: name || i.name,
      age: age || i.age,
    };
  });
  await writeToFile(updatedUsers);
  res.status(200).send("User Successfully updated.");
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const foundUser = db.find((i) => i.id == id);
  if (!foundUser) {
    res.status(404).send("User does not exist.");
  }
  const filteredList = db.filter((i) => i.id != id);
  await writeToFile(filteredList);
  res.status(200).send("User Successfully deleted.");
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
