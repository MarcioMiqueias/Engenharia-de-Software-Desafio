const express = require("express");
const { google } = require("googleapis");

const fs = require('fs');
const { sheets } = require("googleapis/build/src/apis/sheets");
const { docs } = require("googleapis/build/src/apis/docs");

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static("public"));

async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    });

    const spreadsheetId = "1GL9NniReXYSnspExVwBlCvAoc3fCVXY5U2mmbfUJJwE";

    return{
        auth,
        client,
        googleSheets,
        spreadsheetId
    }
}

// Main
app.get("/", async (req, res)=> {
    const {googleSheets, auth, spreadsheetId} = await getAuthSheets();

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "engenharia_de_software"
    });
        const dataArray = getRows.data.values.slice(3);    

        res.render("index.ejs", {person: getRows.data.values});
    });

app.post("/updateValue", async(req, res)=> {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const { values } = req.body;
    
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "engenharia_de_software"
    });
    const dataArray = getRows.data.values.slice(3);    
    const newDataArray = dataArray.map(function(r){
        const media = Math.ceil((parseInt(r[3]) + parseInt(r[4]) + parseInt(r[5]))/3);
            if(media < 50){
                r[6] = "Reprovado por Nota";
                r[7] = "0";
            }
            else if(r[2] > 15){
                r[6] = "Reprovado por Falta";
                r[7] = "0";
            }
            else if(media >= 50 && media < 70){
                r[6] = "Exame Final";
                const finalExam = (media + 70)/2;
                r[7] = finalExam;
            }
            else{
                r[6] = "Aprovado"
                r[7] = "0";
            }
            return r;
        });
    const updateValue = googleSheets.spreadsheets.values.update({
        spreadsheetId,
        range: "engenharia_de_software!A4",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: newDataArray,
        },
    });

    res.redirect('/')
    //res.send(updateValue.data, );
    
});

// Start server
app.listen(4000, function(){

});




/* 
app.post("/addRow", async(req, res)=> {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const { values } = req.body;

    const row = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "engenharia_de_software",
        valueInputOption: "USER_ENTERED",
        resource: {
        values: values,
    },
  });

  const dataArray = getRows.data.values.slice(3);    

  res.send(row.data);
});


*/
