
const Joi = require('joi');
const mongoose = require('mongoose');

const covidSchema =  mongoose.Schema({
  country: { type: String, required: true },
  continent: { type: String, required: true },
  population: { type: Number, required: true },
  cases: { type: Number, required: true },
  deaths: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now }
});

  // function validateCovid(covid) {
  //   const schema = Joi.object({
  //     country: Joi.string().required(),
  //     continent: Joi.string().required(),
  //     population: Joi.number().required(),
  //     cases: Joi.number().required(),
  //     deaths: Joi.number().required(),
  //     date: Joi.date().required()
  //   });
  
  //   return schema.validate(covid);
  // }

module.exports = mongoose.model('Covid', covidSchema);
// module.exports= {validateCovid}



