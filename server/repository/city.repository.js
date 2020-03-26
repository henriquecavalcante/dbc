const City = require('../models/city.model');

async function findById(id) {
  const result = await City.findOne({ _id: id });
  return result;
}

async function findByState(state) {
  const queryFilter = {
    state
  };

  const result = await City.find(queryFilter);
  return result;
}

async function findByNameAndState(name, state) {
  const queryFilter = {
    name: name.toLowerCase(),
    state
  };

  const result = await City.findOne(queryFilter);
  return result;
}

async function list() {
  const result = await City.find();
  return result;
}

async function insert(data) {
  const result = await City.create(data);
  return result;
}

async function insertBatch(data) {
  const result = await City.insertMany(data, { ordered: false });
  return result;
}

async function remove(id) {
  const filter = {
    _id: id
  };

  const result = await City.findOneAndDelete(filter);
  return result;
}

module.exports = {
  findById,
  findByState,
  findByNameAndState,
  list,
  insert,
  insertBatch,
  remove
};
