const Mongoose = require('mongoose')

Mongoose.connect('mongodb://localhost:27017/heroes', 
    { 
        user: 'johndoe',
        pass: 'password',
        authSource: 'admin'
    }).catch(error => console.error('Connection error \n', error))

const connection = Mongoose.connection
connection.once('open', () => console.log('Databse Connected'))
// setTimeout(() => {
//     const state = connection.readyState
//     console.log(state)
// }, 1000)

const heroeSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const Hero = Mongoose.model('Heroes', heroeSchema)

async function main() {
    const hero = await Hero.create({
        name: 'Sung Jin',
        power: 'Solo'
    })
    // console.log("hero's result\n", hero)
    const listHeroes = await Hero.find()
    console.log(listHeroes)
}

main()
