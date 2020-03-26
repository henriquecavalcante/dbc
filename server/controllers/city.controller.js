const axios = require('axios');
const HttpCodes = require('../utils/http-status-codes');
const { ResponseUtils } = require('../utils/response-utils');
const CityRepository = require('../repository/city.repository');
const {
  MAX_POPULATION,
  TAX_FULL,
  TAX_DISCOUNT,
  API_USD_BRL
} = require('../utils/constants');

async function list(req, res) {
  try {
    const result = await CityRepository.list();
    res
      .status(HttpCodes.OK)
      .json(ResponseUtils.buildSuccessJson('Lista de cidades', result));
  } catch (error) {
    res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseUtils.buildErrorJson(error.message));
  }
}

async function listByState(req, res) {
  const { state } = req.params;

  if (!state) {
    res
      .status(HttpCodes.BAD_REQUEST)
      .json(ResponseUtils.buildErrorJson('Parâmetros insuficientes.'));

    return;
  }

  try {
    const result = await CityRepository.findByState(state);

    const getGeneralInfo = () => {
      let totalPopulation = 0;
      let totalCost = 0;

      result.forEach(city => {
        totalPopulation += city.population;
      });

      if (totalPopulation > MAX_POPULATION) {
        const extraPeople = totalPopulation - MAX_POPULATION;
        const extraPeopleTax = TAX_FULL * ((100 - TAX_DISCOUNT) / 100);

        totalCost = MAX_POPULATION * TAX_FULL + extraPeople * extraPeopleTax;
      } else {
        totalCost = totalPopulation * TAX_FULL;
      }

      return {
        totalPopulation,
        totalCostUsd: totalCost
      };
    };

    const getDollarValue = async () => {
      const response = await axios.get(API_USD_BRL);
      return response.data.USD.bid;
    };

    const dolarValue = await getDollarValue();

    const info = getGeneralInfo();
    info.totalCostBrl = info.totalCostUsd * dolarValue;

    const stateInfo = {
      cities: result,
      info
    };

    res
      .status(HttpCodes.OK)
      .json(ResponseUtils.buildSuccessJson('Informações do Estado', stateInfo));
  } catch (error) {
    res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseUtils.buildErrorJson(error.message));
  }
}

async function insert(req, res) {
  const { data } = req.body;

  try {
    const result = await CityRepository.insert(data);

    res
      .status(HttpCodes.OK)
      .json(
        ResponseUtils.buildSuccessJson('Cidade cadastrada com sucesso.', result)
      );
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(HttpCodes.BAD_REQUEST)
        .json(
          ResponseUtils.buildErrorJson(
            `Cidade ${data.name} já existente no estado ${data.state.toUpperCase()}.`
          )
        );

      return;
    }

    res
      .status(HttpCodes.BAD_REQUEST)
      .json(ResponseUtils.buildErrorJson('Erro no cadastro da cidade.'));
  }
}

async function insertBatch(req, res) {
  const { data } = req.body;

  try {
    const result = await CityRepository.insertBatch(data);
    res
      .status(HttpCodes.OK)
      .json(
        ResponseUtils.buildSuccessJson(
          'Cidades cadastradas com sucesso.',
          result
        )
      );
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(HttpCodes.BAD_REQUEST)
        .json(
          ResponseUtils.buildErrorJson(
            'Somente as cidades não duplicadas para o mesmo estado foram cadastradas.'
          )
        );

      return;
    }

    res
      .status(HttpCodes.BAD_REQUEST)
      .json(ResponseUtils.buildErrorJson('Erro no cadastro das cidades.'));
  }
}

async function remove(req, res) {
  const { id } = req.params;

  if (!id) {
    res
      .status(HttpCodes.BAD_REQUEST)
      .json(ResponseUtils.buildErrorJson('Parâmetros insuficientes.'));

    return;
  }

  try {
    const city = await CityRepository.findById(id);

    if (city && city.state === 'rs') {
      res
        .status(HttpCodes.BAD_REQUEST)
        .json(
          ResponseUtils.buildErrorJson('Não é possível remover cidades do RS.')
        );

      return;
    }

    const result = await CityRepository.remove(id);
    res
      .status(HttpCodes.OK)
      .json(
        ResponseUtils.buildSuccessJson('Cidade removida com sucesso.', result)
      );
  } catch (error) {
    res
      .status(HttpCodes.INTERNAL_SERVER_ERROR)
      .json(ResponseUtils.buildErrorJson('Erro na remoção da cidade.'));
  }
}

module.exports = {
  list,
  insert,
  insertBatch,
  remove,
  listByState
};
