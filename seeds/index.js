const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>{
    console.log('Database connected!');
})


const campgrounds = [
    { title: 'Camping do Amor', price: '15.00', description: 'Um camping simples e gostoso', location: 'Pipa - RN', author: '61deb923487169292ddc47db' },
    { title: 'Camping do Mané Gostoso', price: '30.00', description: 'Melhor camping da regiao', location: 'Batatais - SP', author: '61deb923487169292ddc47db' },
    { title: 'Camping Largados e Pelados', price: '40.00', description: 'Aqui é só alegria!!', location: 'Sete Lagoas - MG', author: '61deb923487169292ddc47db' },
    { title: 'Camping barraca e fogueira', price: '20.00', description: 'Lugar limpo e aconchegante', location: 'Andradas - MG', author: '61deb923487169292ddc47db' },
    { title: 'Camping fi do canso', price: '55.00', description: 'Bom do canso mariano', location: 'Itabaiana - SE', author: '61deb923487169292ddc47db' },
    { title: 'Camping chegapracá', price: '35.00', description: 'Com rios e cachoeiras belissimas', location: 'Bonito - MT', author: '61deb923487169292ddc47db' },
    { title: 'Camping dorme bem nenem', price: '30.00', description: 'Gostoso e relaxante', location: 'Maricá - RJ', author: '61deb923487169292ddc47db' },
    { title: 'Camping lagoa redonda', price: '20.00', description: 'Local limpo e organizado para voce e sua familia', location: 'Pirambu - SE', author: '61deb923487169292ddc47db' },
    { title: 'Camping serra de itabaiana', price: '30.00', description: 'aqui voce encontra tudo para sua estadia', location: 'Itabaiana - SE', author: '61deb923487169292ddc47db' },
    { title: 'Camping serra do machado', price: '15.00', description: 'um camping lindo e aconchegando ao lado da rampa de voo livre serra do machado', location: 'Ribeiropolis - SE', author: '61deb923487169292ddc47db' }
];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for (camp of campgrounds){
        camp.images = [
            {
                url: 'https://res.cloudinary.com/rafastdinary/image/upload/v1642085012/YelpCamp/jsfssxns7012f31uqlo7.jpg',
                filename: 'jsfssxns7012f31uqlo7'
            },
            {
                url: 'https://res.cloudinary.com/rafastdinary/image/upload/v1642085010/YelpCamp/m7neeibmrpntcbneqs5m.jpg',
                filename: 'm7neeibmrpntcbneqs5m'
            }
             
        ]
        const camping = new Campground(camp);
        await camping.save();
    }
}


seedDB().then( () =>{
    mongoose.connection.close();
})