const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const CityController  = require('../controllers/city.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

async function list(req, res) {
  CityController.list(req, res);
}

async function listByState(req, res) {
  CityController.listByState(req, res);
}

async function insert(req, res) {
  CityController.insert(req, res);
}

async function insertBatch(req, res) {
  CityController.insertBatch(req, res);
}

async function remove(req, res) {
  CityController.remove(req, res);
}

router.route('').get(asyncHandler(list));
router.route('').post(asyncHandler(insert));
router.route('/batch').post(asyncHandler(insertBatch));
router.route('/:id').delete(asyncHandler(remove));
router.route('/state/:state').get(asyncHandler(listByState));
