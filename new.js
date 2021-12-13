var sg = new ROT.StringGenerator();
var showPara = document.getElementById("show");

var r = new XMLHttpRequest();
    
window.onload = function(){GenNames()}
document.getElementById("Gen").onclick = function(){GenNames()}



function GenNames(){
    r.open("get", "hgk.txt", true);
    r.send();

    

    let nameArray = [];
    r.onreadystatechange = function() {
    if (r.readyState != 4) { return; }

    var lines = r.responseText.split("\n");
    while (lines.length) { 
        var line = lines.pop().trim();
        if (!line) { continue; }
        nameArray.push(line);
        sg.observe(line); 
    }

    let finalString = "";
    let q = 0;

    while(q <5){
        let generatedStr = sg.generate();
        if(nameArray.includes(generatedStr)){
            //console.log("no" + generatedStr);
        }
        else{
            finalString+= generatedStr + "<br/>"
            q+=1;
        }
         
    }

    showPara.innerHTML = finalString;
   
}

}
