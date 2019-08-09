const express= require('express');
const pg=require('pg');

const config = {
    user: 'postgres',
    database: 'test',
    password: 'root',
    port: 5432
};

// pool takes the object above -config- as parameter
const dbConnection = new pg.Pool(config);
dbConnection.connect(function (err) {
    if (err) {
        console.log("Can not connect to the DB" + err);
        return ;
    }
    console.log("Conected");
});
module.exports= dbConnection;
