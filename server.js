const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE;
let db='mongodb+srv://hamza:lion12345@cluster0.9tpjb.mongodb.net/ArttNFT?retryWrites=true&w=majority'
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(con => {
    console.log("connaction is successfuly");
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('Unhandal rejection');
    server.close(() => {
        process.exit(1); 
    });
});