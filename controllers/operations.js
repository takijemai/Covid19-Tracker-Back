
const HttpStatus = require('http-status-codes');
const Covid = require('../models/covidmodel')



  module.exports= {

    async  getCovidDataByContinent(req, res) {
        try {
          const continent = req.params.continent;
          console.log(continent)
          const covidData = await Covid.find({ continent: continent });
          if (!covidData) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND)
              .json({ message: "Covid data continet not found" });
          }
          return res.status(HttpStatus.StatusCodes.OK).json({ covidData });
        } catch (error) {
          return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error contined covid data" });
        }
      },


      async  getCovidDataByCountry(req, res) {
        try {
          const country = req.params.country;
          const covidData = await Covid.find({ country: country });
          if (!covidData) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND)
              .json({ message: "Covid data not found" });
          }
          return res.status(HttpStatus.StatusCodes.OK).json({ covidData });
        } catch (error) {
          return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error country covid data" });
        }
      },


      async  getCovidDataById(req, res) {
        try {
          const id = req.params.id;
          const covidData = await Covid.findById(id);
          if (!covidData) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND)
              .json({ message: "Covid data not found" });
          }
          return res.status(HttpStatus.StatusCodes.OK).json({ covidData });
        } catch (error) {
          return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error fetching covid data" });
        }
      },


      async  deleteCovidRecordById(req, res) {
        try {
          const {id } = req.params;
          console.log(req.params)
          const deletedRecord = await Covid.findByIdAndDelete(id);
          if (!deletedRecord) {
            throw new Error(`No Covid record found with id ${id}`);
          }
          res.status(HttpStatus.StatusCodes.OK).json({ message: `Covid record with id ${id} deleted successfully` });
        } catch (error) {
          console.error(error);
          res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete Covid record' });
        }
      }
      
      ,


async getAllCovidData(req,res){

//console.log(req.body)
    try {
        const covidData = await Covid.find();
        //console.log(covidData)
        if(covidData){
            return res.status(HttpStatus.StatusCodes.OK).json({ covidData }); 
        }
    } catch (err) {
        return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error  all covid data" });
    }
},


async  getContinentsTotalCases(req, res) {
  try {
    const continents = [
      'Asia',
      'Africa',
      'Europe',
      'America',
      'Oceania',
    ];

    const continentTotalObject = {};

    for (const continent of continents) {
      const continentData = await Covid.aggregate([
        { $match: { continent: continent } },
        { $sort: { date: -1 } },
        { $limit: 1 },
        { $project: { cases: 1, _id: 0 } },
      ]);
     //console.log(continentData)
      if (continentData.length > 0) {
        continentTotalObject[`${continent} (totalcase)`] = continentData[0].cases;
      } else {
        continentTotalObject[`${continent} (totalcase)`] = 0;
      }
    }
    res.status(HttpStatus.StatusCodes.OK).json(continentTotalObject);
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
      .send('total cases continent Error');
  }
},

  


  async  getCountriesTotalCases(req, res) {
    
    try {
      const countrieslist = [
        {
          "code": "ES",
          "country": "Spain"
        },
        {
          "code": "TN",
          "country": "Tunisia"
        },
        {
          "code": "FR",
          "country": "France"
        },
        {
          "code": "CN",
          "country": "China"
        },
        {
          "code": "CA",
          "country": "Canada"
        },
        {
          "code": "US",
          "country": "United State Of America"
        },
        {
          "code": "QA",
          "country": "Qatar"
        },
        {
          "code": "EG",
          "country": "Egypte"
        },

      ];
  
      
      let countryData = [];
      
        for (const element of countrieslist) {
      
        const countryDatar = await  Covid.find({ country: element.country })
          .sort({ date: -1 })
          .exec();
        //console.log(countryDatar)
        const latestData = countryDatar[0];
        const totalCases = latestData.cases;
        //console.log(latestData)
        //console.log(totalCases)
        const countryObj = {
          id: element.code,
          name: element.country,
          totalCases: totalCases,
          fill: "am4core.color('#4d79ff')",
        };
        //console.log(countryObj)
        //countryData = [...countryData, countryObj];
        countryData.push(countryObj);
        //console.log(countryData)
        if (countryData.length === countrieslist.length) {
            res.status(HttpStatus.StatusCodes.OK).json(countryData);
        }
      }
     
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send('country total case Error');
    }
  },
  
 




  async addCovidRecord(req, res) {
    //console.log(req.body)
    try {
      const existingRecord = await Covid.findOne({ country:req.body.country });
     console.log(existingRecord)
      if (existingRecord) {
        const newRecord = new Covid({
          country: req.body.country,
          continent: req.body.continent,
          population: req.body.population,
          cases: req.body.cases,
          deaths: req.body.deaths,
          date: req.body.date
        });
        await newRecord.save();
        res.status(HttpStatus.StatusCodes.OK).json(newRecord);
      } else {
        // if no record exists for this country, create a new one
        const reqbody= {
          country: req.body.country,
          continent:req.body.continent,
          population: req.body.population,
          deaths: req.body.deaths,
          cases :req.body.cases,
          date : new Date()
        }
        const newRecord = new Covid(reqbody);
        await newRecord.save();
        console.log(newRecord)
        res.status(HttpStatus.StatusCodes.OK).json(newRecord);
        //return newRecord;
      }
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send(' Error add data covid');
    }
  }


  
 
  

  
      
      




  }