const display = new ROT.Display();       
const canvas = display.getContainer();
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
var tileSet = document.createElement("img");


display.setOptions({
    width: 40,
    height: 25,
    fontSize: 25,
    forceSquareRatio:true,
    fontFamily:"Serif"
    //fontStyle: "bold"
    //spacing:1.5
});

const colors = [
    "white",
    "green",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  
];




var w = 40, h = 25;
var map = new ROT.Map.Rogue(w,h);
var callback = function(x, y, wall) {
   // console.log("wall %s generated at [%s,%s]", wall, x, y)
    display.draw(x, y, wall ? "#" : ".");
    
}
map.create(callback);


///////////////FOV/////////////////////
ROT.RNG.setSeed(15);
var data = {};
new ROT.Map.Uniform(40, 25).create(function(x, y, type) {
    data[x+","+y] = type;
    display.DEBUG(x, y, type);
});

function lightPasses(x, y) {
    var key = x+","+y;
    if (key in data) { return (data[key] == 0); }
    return false;
}

var fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

/* output callback */
function Cfov(){
fov.compute(Player.x, Player.y, 10, function(x, y, r, visibility) {
    var ch = (r ? "" : "@");
    var color = (data[x+","+y] ? "#aa0": "#660");
    display.draw(x, y, ch, "#fff", color);
});
}
/////////////////////////////////////////////






var currMap = map["map"];

var Player = {
    x:0,
    y:0
}


function renewDisplay(){
    display.clear()
    /*
    for(idx=0; idx<w; idx++){
        for(idy=0; idy<h; idy++){

                display.draw(idx,idy,currMap[idx][idy] ? "#":".")
                //,colors[currMap[idx][idy]]
                //currMap[idx][idy].toString()
        }
    }
    */
    display.draw(Player.x,Player.y,"옷")
   
}


document.body.addEventListener("keydown", function(e) {
    var code = e.keyCode;

    var vk = "?"; /* find the corresponding constant */
    for (var name in ROT.KEYS) {
        if (ROT.KEYS[name] == code && name.indexOf("VK_") == 0) { vk = name; }
    }

    console.log(vk);

    switch (vk){
        case "VK_A":
            --Player.x;
            renewDisplay();
            console.log(Player.x)
            break;

        case "VK_D":
            ++Player.x;
            renewDisplay();
            console.log(Player.x)
            break;

        case "VK_S":
            ++Player.y;
            renewDisplay();
            console.log(Player.y)
            break;

         case "VK_W":
            --Player.y;
            renewDisplay();
            console.log(Player.y)
            break;
        
            
    }
    Cfov();
});



//display.drawText(0,0,"%c{lightgreen}Georgia is another elegant serif font, but was designed to be more readable at different font sizes than other serif fonts. It accomplishes this with a heavier weight, making it an ideal candidate for mobile-responsive design.")
//display.drawText(0, 0, "%c{lightgreen}이탈리아 공화국(Repubblica Italiana 레푸블리카 이탈리아나[*]), 약칭 이탈리아(이탈리아어: Italia, 약자: IT, 문화어: 이딸리아, 음역어: 이태리)는 남유럽의 이탈리아반도와 지중해의 두 개의 섬으로 이루어진 시칠리아 및 사르데냐로 이루어진 단일 의회 공화국이다. 북쪽 알프스산맥을 경계로 프랑스, 스위스, 오스트리아, 슬로베니아와 국경을 맞대고 있다. 또한 주변 바다로는 동쪽의 아드리아해, 남쪽의 이오니아해, 서쪽의 티레니아해와 리구리아해로 둘러싸여 있다. 이탈리아의 영토 안쪽에는 위요지 국가인 산마리노와 바티칸 시국이 접하여 있으며, 스위스 영토 안쪽에 이탈리아의 월경지 영토인 캄피오네디탈리아가 있다. 국토 면적은 301,340 km²이며, 온대 기후대에 속한다. 인구는60,200,000여 명으로, 유럽에서 여섯 번째로 인구가 많고, 전 세계 기준으로는 23위이다. 주요 도시로는 수도인 로마를 비롯하여 밀라노, 나폴리, 제노바, 피렌체, 토리노, 베네치아 등이 있다.");
