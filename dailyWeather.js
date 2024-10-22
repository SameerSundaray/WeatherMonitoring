const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'data', 'dailyweather.json');


const readWeatherData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};


const writeWeatherData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};


module.exports = {
  readWeatherData,
  writeWeatherData,
};
