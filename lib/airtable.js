const AirtablePlus = require('airtable-plus')

const API_KEY = process.env.AIRTABLE

export const registrationsAirtable = new AirtablePlus({
  baseID: 'app80TfOHZWFmYoL6',
  apiKey: API_KEY,
  tableName: 'Registrations'
})
