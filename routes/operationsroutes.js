const express= require('express')
const router= express.Router()
const covidctrl= require('../controllers/operations')
const helper= require('../helpers/token')


router.get('/continent/:continent', helper.VerifyToken, covidctrl.getCovidDataByContinent)
router.get('/country/:country',helper.VerifyToken, covidctrl.getCovidDataByCountry)
router.get('/data/:id',helper.VerifyToken, covidctrl.getCovidDataById)
router.delete('/data/delete/:id',helper.VerifyToken, covidctrl.deleteCovidRecordById)
router.get('/coviddata/all',helper.VerifyToken, covidctrl.getAllCovidData)
router.get('/allcountry',helper.VerifyToken, covidctrl.getCountriesTotalCases)
router.get('/allcontinent',helper.VerifyToken, covidctrl.getContinentsTotalCases)
router.post('/newdata',helper.VerifyToken, covidctrl.addCovidRecord)


module.exports= router