const _function = require('./function')
module.exports = function(app){
    app.get('/',async function(req, res){
        var allNameArray = await _function.getPopularMoviesName()
        var allLinkArray = await _function.getPopularMoviesPicture()
        res.render('index.ejs', {allNameArray:allNameArray,allLinkArray:allLinkArray})
    })
    
    app.post('/searchBarChange',async function(req, res){
        var moviesListUntreated = await _function.getSameTitleMovies(req.body.keyword)
        var moviesListTreated = _function.transformGetSameTitleMovies(moviesListUntreated)
        res.json(moviesListTreated)
    })

    app.get('/film/:ID', async function(req, res){
        const results = await _function.isIDCorrect(req.params.ID)
        if(results.entries == 0){
            console.log('wrong ID')
        }else{
            console.log(results)
            const movieName = results.results[0].titleText.text
            res.render('film.ejs',{movieName:movieName})
        }
    })
}
