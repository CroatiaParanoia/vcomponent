export function flatAddressList(addressList, parentLabel = '') {
  return addressList
    .map((item) => {
      const label = [parentLabel, item.label].filter(Boolean).join('/');
      let arr = [{ label: item.label, value: item.value, _label: label }];
      if (item.children) {
        arr = arr.concat(flatAddressList(item.children, item.label));
      }
      return arr;
    })
    .flat();
}

export function queryCities(keyword, addressList) {
  const list = flatAddressList(addressList);
  console.log('数据总长度', list.length);
  return list.filter((v) => v._label.includes(keyword));
}

function Omit(object, keys = []) {
  return Object.entries(object).reduce((result, [key, value]) => {
    if (!keys.includes(key)) {
      result[key] = value;
    }
    return result;
  }, {});
}

export function findStateListByCountryValue(addressList, { countryValue, needChildren = false }) {
  const currentCountry = addressList.find((v) => v.value === countryValue);

  if (needChildren) {
    return currentCountry.children;
  }
  return currentCountry.children.map((item) => Omit(item, ['children']));
}

export function findCityListByStateValue(addressList, { countryValue, stateValue }) {
  const currentStateList = findStateListByCountryValue(addressList, { countryValue, needChildren: true });

  const currentState = currentStateList.find((v) => v.value === stateValue);

  return currentState.children.map((item) => Omit(item, ['children']));
}

export function queryAddressByCode(addressList, countryValue, stateValue) {
  if (!countryValue) {
    // find country list
    return addressList.map((item) => Omit(item, ['children']));
  }

  if (!stateValue) {
    // find state list
    return findStateListByCountryValue(addressList, { countryValue });
  }

  return findCityListByStateValue(addressList, { countryValue, stateValue });
}
