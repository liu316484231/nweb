function Util(){

}

function genChar(){
    var rand = Math.floor(Math.random() * 62);
    var char;
    if(rand >= 0 && rand <= 9){
        char = rand + "";
    }else if(rand >= 10 && rand <= 35){
        char = String.fromCharCode(96 + rand - 9);
    }else if(rand >=36 && rand <=61){
        char = String.fromCharCode(64 + rand - 35);
    }
    return char;
};

Util.genPwd = function genPwd(){
    var pwd = "";
    for(var i = 0; i < 8; i++){
        pwd += genChar();
    }
    return pwd;
};

module.exports = Util;