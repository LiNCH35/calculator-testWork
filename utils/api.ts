const token = 'G934UM29wXG2IKYS9iX9oKQCeojkApHSEWAxOC5v';

interface IResponse {
  response: {
    data: [],
    meta: object,
  },
}

interface ICargo {
  dimension: { // габариты
    quantity: number, // количество мест
    volume: number, // общий объем
    weight: number, // общий вес
  }
}

interface IPoint {
  "location": string, // город назначения
  "terminal": string, // терминал по умолчанию
}

interface getPriceParams {
  cargo : ICargo,
  "gateway": {
    "dispatch": { // откуда
      "point": IPoint
    },
    "destination": { // куда
      "point": IPoint
    }
  }
}

function makeRequest(data: object): IResponse {
  var xhttp = new XMLHttpRequest();
  try {
    // запрос на тестовый сервер
    xhttp.open("POST", `https://vozovoz.xyz/api/?token=${token}`, false);
    // xhttp.open("POST", "https://vozovoz.ru/api/?token=yourToken", false); // для рабочего сервера
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
  } catch (e) {
    console.log('Ошибка запроса', e)
  }
  return JSON.parse(xhttp.response);
}

function getVersion() {
  var {response} = makeRequest({
// Тело запроса, например:
    "object": "version",
    "action": "get"
  })
  return response;
}

function getCities() {
  var {response} = makeRequest({
    "object": "location",
    "action": "get",
    // "params": {
    //   "offset": 12,
    //   "limit": 2
    // }
  })
  return response;
}

function getPrice(params: getPriceParams) {
  var {response} = makeRequest({
    "object": "price",
    "action": "get",
    "params": params,
  })
  return response;
}

export {
  getCities,
  getPrice,
}
