const password = require('../password')
async function getPopularMoviesName (){
    const axios = require('axios');
    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles',
        params: {
          list: 'top_boxoffice_200',
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': password.XRapidAPIKey,
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        var allNameArray = []
        for(var i= 0; i < response.data.results.length;i++){
            allNameArray.push(response.data.results[i].titleText.text)
        }  
        return allNameArray
      } catch (error) {
          console.error(error);
      }
}
async function getPopularMoviesPicture(){
    const axios = require('axios');
    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles',
        params: {
          list: 'top_boxoffice_200',
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': password.XRapidAPIKey,
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        var allLinkArray = []
        for(var i= 0; i < response.data.results.length;i++){
            if(response.data.results[i].primaryImage != null && response.data.results[i].primaryImage.url != null){
                allLinkArray.push(response.data.results[i].primaryImage.url)
            }else{
                allLinkArray.push('https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6')
            }
        }  
        return allLinkArray
      } catch (error) {
          console.error(error);
      }
}
async function getSameTitleMovies(name){
  const axios = require('axios');

        const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles/search/title/' + name,
        params: {
          limit:'5'
      },
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': password.XRapidAPIKey,
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
        };
        try {
            const response = await axios.request(options);
            var globalArray = []
            globalArray[0] = []
            globalArray[1] = []
            for(var i= 0; i < response.data.results.length;i++){
              globalArray[1].push(response.data.results[i].id)
              globalArray[0].push(response.data.results[i].titleText.text)
            }
            return globalArray
        } catch (error) {
            console.error(error);
        }
}
function transformGetSameTitleMovies(untreatedData){
  var TreatedData = []
  for(var i = 0; i < untreatedData[0].length; i++){
    if(i != untreatedData[0].length-1){
      TreatedData.push(`<p id="${untreatedData[1][i]}">${untreatedData[0][i]}</p><br>`)
    }else{
      TreatedData.push(`<p id="${untreatedData[1][i]}">${untreatedData[0][i]}</p>`)
    }
  }
  return TreatedData
}
async function isIDCorrect(ID){
    const axios = require('axios');

  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids',
    params: {idsList: ID},
    headers: {
      'X-RapidAPI-Key': password.XRapidAPIKey,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
module.exports = { getPopularMoviesName,getPopularMoviesPicture,getSameTitleMovies,transformGetSameTitleMovies,isIDCorrect }