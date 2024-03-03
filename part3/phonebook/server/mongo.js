const mongoose = require('mongoose')

const mongoPassword = process.argv[2]
const url = `mongodb+srv://ghostmongodb:${mongoPassword}@cluster0.otps0wq.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

const main = async () => {
    await mongoose.connect(url)

    if (name && number) {
        const person = new Person({
            name,
            number,
        })
        person.save().then(() => {
            console.log(`Added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
    } else {
        Person.find({}).then((result) => {
            console.log('phonebook:')
            result.forEach((person) => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    }
}

main()
