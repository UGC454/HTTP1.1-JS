const fs = require('fs');

try {
    const jsonFile = fs.readFileSync('lec-06-prg-03-json-example.json', 'utf8');
    const superHeroes = JSON.parse(jsonFile);
    
    console.log(superHeroes['homeTown']);
    console.log(superHeroes['active']);
    console.log(superHeroes['members'][1]['powers'][2]);
} catch (err) {
    console.error("Error reading file:", err);
}