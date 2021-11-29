const driver = require('./models/driverProfile')

driver34 = new driver({
    transanction_hash : "vdbfsdbfgsfdfdf",
    contact: {
        mobile_number : 8382932
    },
  });
  
driverdet2 = {
    tee_size : 'Yellow'
}

const query = { 'transanction_hash' : 'vdbfsdbfgsfdfdf' };
driver.findOneAndUpdate(query , driverdet2 , {upsert : true} , function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
});

  