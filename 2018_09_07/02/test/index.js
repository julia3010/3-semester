const { get } = require('axios');
const should = require('should');

const cases = [...Array(10).keys()];

const headers = { 'Content-Type': 'application/json'};

cases.forEach((init) => {
  const URL = `https://kodaktor.ru/api2/there/${init}`;

  describe('There&Back', () => {
    it(`Number sent there should equal number that comes back `, (async () => {
      const {data: there } = await get(URL, {headers});
      const {data: back } = await get(`https://kodaktor.ru/api2/andba/${there}`, {headers});
      back.should.equal(init);
    }));
  });
});
