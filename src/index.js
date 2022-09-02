 import _ from 'lodash';
const obj1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };
const obj2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  };
const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniq = _.uniq([...keys1, ...keys2]);
  const sortUniq = _.sortBy(uniq);
  const result  = sortUniq.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isEqual(value1,value2)) {
      return `  ${key}: ${value1}`;
    }
    if ((value1 && value2) && (value1 !== value2)) {
      return `- ${key}: ${value1} \n+ ${key}: ${value2}`;
    }
    if (!_.has(obj2,value2)) {
      return `- ${key}: ${value1}`
    }
    if (!_.has(obj1,value1)) {
      return `+ ${key}: ${value2}`
    }
  });
return result;
  };
