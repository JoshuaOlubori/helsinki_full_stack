import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
console.log("DIRNAME IS ", __dirname);

const app = express();


app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname,'/client/dist')));

morgan.token('body', (req) => JSON.stringify(req.body));


app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req) => req.method !== 'POST', 
  })
);


let phonebooks = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const getCurrentDateTime = () => {
    const now = new Date();


    const formattedDateTime = now.toString();


    return formattedDateTime;
}

const currentDateTime = getCurrentDateTime();
console.log(currentDateTime);

const phonebookLength = phonebooks.length;
console.log("len", phonebookLength);

const messageText = `Phonebook has info for ${phonebookLength} people`
app.get('/api/persons', (request, response) => {
    response.json(phonebooks);
})

app.get('/info', (request, response) => {
    response.send(`<div><p>${messageText}</p><p>${currentDateTime}</p></div>`);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const specificContact = phonebooks.find(phonebook => phonebook.id === id)

    if (specificContact) {
        response.send(`<div><p>${specificContact.name}</p><p>${specificContact.number}</p></div>`);
    } else {
        response.status(404).end()
    }

})


const randomInt = (max = 10000000) => Math.floor(Math.random() * (max + 1)) + 1;
app.post('/api/persons', (request, response) => {
    const body = request.body;
    console.log("BODY", body);
  
    let error, statusCode;
  
    switch (true) {
      case !body.name:
        error = 'Name is missing';
        statusCode = 400;
        break;
      case !body.number:
        error = 'Phone number is missing';
        statusCode = 400;
        break;
      case phonebooks.some(person => person.name === body.name):
        error = 'Name must already be in use';
        statusCode = 409;
        break;
    }
  
    if (error) {
      return response.status(statusCode).json({
        error: error
      });
    }
  
    const newPerson = {
      name: body.name,
      number: body.number,
      id: randomInt().toString()
    };
  
    phonebooks = [...phonebooks, newPerson]; // Using spread operator for immutability
    console.log("NEW phonebooks", phonebooks);
    response.status(201).json(newPerson); // Return created person
  });

  app.put('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const updatedPerson = request.body;
  
    const existingPersonIndex = phonebooks.findIndex((person) => person.id === id);
  console.log("existingPersonIndex", existingPersonIndex);
    if (existingPersonIndex === -1) {
      return response.status(404).json({ error: 'Person not found' });
    }
  
    // Validate updated data
    let error, statusCode;
  
    switch (true) {
      case !updatedPerson.name:
        error = 'Name is missing';
        statusCode = 400;
        break;
      case !updatedPerson.number:
        error = 'Phone number is missing';
        statusCode = 400;
        break;
      case phonebooks.some((person) => person.name === updatedPerson.name && person.id !== id):
        error = 'Name must already be in use';
        statusCode = 409;
        break;
    }
  
    if (error) {
      return response.status(statusCode).json({ error: error });
    }
  
    // Update person
    phonebooks[existingPersonIndex] = {
      id: id,
      name: updatedPerson.name,
      number: updatedPerson.number,
    };
  
    response.json(phonebooks[existingPersonIndex]);
  });

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    console.log('Deleting ID:', id);
    const deletedItem = phonebooks.find((phonebook) => phonebook.id === id);
    
    if (!deletedItem) {
      return response.status(404).json({ error: 'Item not found' });
    }
  
    phonebooks = phonebooks.filter((phonebook) => phonebook.id !== id);
  
    response.status(200).json(deletedItem);
  });
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})