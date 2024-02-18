const readLine = require('readline');
const fs = require("fs");

const line = readLine.createInterface({
input: fs.createReadStream("nub.xml"),
});

let total = 0;
let totalNegativo= 0;
let valorString = [];
let pulaLinha ='\n' ;
let valor;

line.on("line", (data) => {

    if(data.includes("TRNAMT")){
        dividirTexto = data.split('<');
        valorString = dividirTexto[1].split('>');
        valor = parseInt(valorString[1]);
        //"mostrar o valor de cada transação: "
        console.log("valor transação: ", valor);
        if(valor<0){
            //mostrar o valor de cada transação apenas negativa 
            console.log("valor negativo: ",valor);
            totalNegativo = totalNegativo+valor;
        }
        total = total +valor;
    }
        
    if (data=="</OFX>"){
        console.log( "total = ", total);
        console.log( "total gastos = ", totalNegativo);

        fs.appendFile('resultado.txt',("total: " + (total.toString())+(pulaLinha)), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });   
    }
})




