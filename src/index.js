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
const keys1 = Object.keys(obj1);
//console.log(keys1);
const keys2 = Object.keys(obj2);
//console.log(keys2)
  const uniq = _.uniq([...keys1, ...keys2]);
 // console.log(uniq);
  const sortUniq = _.sortBy(uniq);
  //console.log(sortUniq);
  const result  = sortUniq.map((key) => {
  const value1 = obj1[key];
  const value2 = obj2[key];
  if ((value1 && value2) && (value1 === value2)) {
    return `${key}: ${value1}`;
  }
  if ((value1 && value2) && (value1 !== value2)) {
    return `- ${key}: ${value1} \n + ${key}: ${value2}`;
  }
  if (value1 && !value2) {
    return `- ${key}: ${value1}`
  }
  if (!value1 && value2) {
    return `+ ${key}: ${value2}`
  }
  });

 // console.log(result)


 const getDiff = (obj1, obj2) => {

 }
 const compareData = (obj1, obj2) => {
    const uniqKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
    const sortKeys = _.sortBy(uniqKeys);
    const result = sortKeys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
  
      if (_.isObject(value1) && _.isObject(value2)) {
        return {
          type: 'object',
          key,
          children: compareData(value1, value2),
        };
      }
      if (!_.has(obj2, key)) {
        return {
          type: 'delete',
          key,
          value: value1,
        };
      }
      if (!_.has(obj1, key)) {
        return {
          type: 'add',
          key,
          value: value2,
        };
      }
      if (!_.isEqual(value1, value2)) {
        return {
          type: 'defferent',
          key,
          value1,
          value2,
        };
      }
      return {
        type: 'same',
        key,
        value: value1,
      };
    });
    return result;
  };
  console.log(compareData(obj1, obj2));