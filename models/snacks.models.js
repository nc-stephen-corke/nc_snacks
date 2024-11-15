const fs = require('fs/promises');

const fetchSnacks = () => {
  return fs
    .readFile('db/data/snack-data.json', 'utf-8')
    .then((fileContents) => {
      const snacks = JSON.parse(fileContents);
      return snacks;
    });
};

const fetchSnackBySnackId = (id) => {
  return fs.readFile(`db/data/snack-data.json`).then((fileContents) => {
    const parsedSnacks = JSON.parse(fileContents);
    return parsedSnacks.filter((snack) => {
      return snack.snack_id === +id;
    })[0];
  });
};

const addSnack = (newSnack) => {
  return fs
    .readFile('db/data/snack-data.json', 'utf-8')
    .then((fileContents) => {
      const snacks = JSON.parse(fileContents);
      const allSnacks = [...snacks, newSnack];
      return fs.writeFile(
        'db/data/snack-data.json',
        JSON.stringify(allSnacks, null, 4)
      );
    });
};

module.exports = { fetchSnacks, fetchSnackBySnackId, addSnack };
