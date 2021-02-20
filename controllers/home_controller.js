module.exports.home = function(req,res){
    return res.render('home' , {
        title : "Slikup"
    })
    // return res.end('Hey everyone');
}