/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('M5A');

// Insert a few documents into the sales collection.
/*db.getCollection('notas').insertMany([
  { '_id':5,'asignatura': 'Tendencias', 'interciclo1': 30, 'examen': 15, 'interciclo2': 30, 'examenfinal': 25, 'fecha': new Date('2023-07-06T08:00:00Z') },
 { '_id':6,'asignatura': 'Calidad', 'interciclo1': 25, 'examen': 14, 'interciclo2': 29, 'examenfinal': 20, 'fecha': new Date('2023-07-06T08:00:00Z') },
  { 'asignatura': 'Etica', 'interciclo1': 29, 'examen': 14, 'interciclo2': 28, 'examenfinal': 23, 'fecha': new Date('2023-07-06T08:00:00Z') },
   { 'asignatura': 'Titulacion', 'interciclo1': 28, 'examen': 14, 'interciclo2': 26, 'examenfinal': 24, 'fecha': new Date('2023-07-06T08:00:00Z') },
      { 'asignatura': 'Redes', 'interciclo1': 29, 'examen': 14, 'interciclo2': 27, 'examenfinal': 20, 'fecha': new Date('2023-07-06T08:00:00Z') },
  { 'asignatura': 'Emprendimiento', 'interciclo1': 29, 'examen': 15, 'interciclo2': 26, 'examenfinal': 24, 'fecha': new Date('2023-07-06T08:00:00Z') }
 ]);*/

db.notas.find({});
db.notas.updateMany({'asignatura':'Calidad'},{$set:{'interciclo1':25}})
db.notas.find({'interciclo1':{$gte: 29}})