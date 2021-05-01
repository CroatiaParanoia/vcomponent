import { queryCities, queryAddressByCode } from './queryCities';

function condition(type, object) {
  const value = object[type];

  if (typeof value === 'function') {
    return value();
  }

  return value;
}

let addressList = [];

self.addEventListener('message', (event) => {
  const {
    data: { type, payload },
  } = event;

  const value = condition(type, {
    init: () => {
      const { addressList: dataList } = payload;
      addressList = dataList;
    },
    queryCities: () => {
      const { keywords } = payload;
      const returnValue = queryCities(keywords, addressList);

      return { type: 'queryCities', payload: returnValue };
    },
    queryAddressByCode: () => {
      const { countryValue, stateValue } = payload;

      const returnValue = queryAddressByCode(addressList, countryValue, stateValue);

      return { type: 'queryAddressByCode', payload: returnValue };
    },
  });

  value && self.postMessage(value);
});
