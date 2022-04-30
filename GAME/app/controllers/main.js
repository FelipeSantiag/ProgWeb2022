function index(req,res){
    res.render("main/index",{
        titulo: "SkiFree"    
    });
}


function sobre(req,res){
    res.render("main/about",{
        titulo: "SkiFree"    
    });
}

function game(req,res){
    res.render("main/game",{   
    });
}

function ui(req,res){
    res.render("main/ui",{

    });
}

module.exports = {index,sobre,game,ui};