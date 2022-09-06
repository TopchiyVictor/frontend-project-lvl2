 import _ from 'lodash';
 import path from 'path';
 import fs from 'fs';

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
    if (!_.has(obj2,key)) {
      return `- ${key}: ${value1}`
    }
    if (!_.has(obj1,key)) {
      return `+ ${key}: ${value2}`
    }
    });
  return result;
};
const getAbsolutPath = (filePath) => path.resolve(process.cwd(),'files', filePath);

//console.log(getAbsolutPath('file1.json'));

const readFile = (filePath) => fs.readFileSync(getAbsolutPath(filePath), 'utf-8');

//console.log('string',readFile('file1.json'));

const getObject = (filePath) => JSON.parse(readFile(filePath));

//console.log('Object',getObject('file1.json'));

const genDiff = (filePath1, filePath2) => {
  const object1 = getObject(filePath1);
  const object2 = getObject(filePath2);
  return getDiff(object1, object2);
};
//console.log(genDiff('file1.json', 'file2.json'));
export default genDiff();