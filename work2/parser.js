const axios = require("axios");
const cheerio = require("cheerio");
var fs = require('fs');
const url = "https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes"

async function main(){

    const response = await axios.get(url);

    let countries = [];

    const $ = cheerio.load(response.data);
    const a = $('.wikitable tbody tr').each((i, e) => {
        if (i > 1){
            countries.push({
                "code": $($(e).find('td')[3]).find('a').text(),
                "name": $(e).children('td').children('a').html(),
                "flag": $(e).children('td').children().children().children().attr('src')
            })
        }
    })

    fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
    });

}
main()




