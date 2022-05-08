const mongoose = require("mongoose");
//mongodb://localhost:27017/Livraison
mongoose.connect(`mongodb+srv://${process.env.DB_USER}@livraisondb.wbtle.mongodb.net/Livraison`,

    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
    }).then(() => console.log('Connected to mongo'))
    .catch((err) => console.log("Failed to connect to MongoDb", err));
