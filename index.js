#!/usr/bin/env node

// Import d'axios et de la liste des pays pour ensuite récupérer le code
const axios = require('axios');
const { getCode, getName } = require('country-list');
// const link = "https://date.nager.at/api/v2/publicholidays";

// Récupération de l'entrée de l'utilisateur. args[0] étant node et le [1] est le nom du fichier
const args = process.argv.slice(2);
let year = new Date().getFullYear();
const country = getCode(args[0]);

// Si il y a deux arguments entrés par l'utilisateur, il récupérera le deuxième pour la date sinon il y passera l'année actuelle grâce au getFullYear()
if(args.length > 1){

    year = args[1];

}

// Fonction qui forme l'URL avec l'année et le code du pays entré par l'utilisateur 
function url(countryCode, year){
    const url = `https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}`;
    return url;
}

// Récupère les congés en fonction du pays et de l'année 
const getHolidays = async () => {
    try{
        const res = await axios.get(url(country, year));
        console.log(res.data);
    } catch (err){
        console.error(err);
    }
}

getHolidays();