/**
 * list of all classes and to populate the datalist
 */

let allJobs = ["Hero", "Paladin", "Dark Knight", "Ice Lightning", "Fire Poison", "Bishop", "Bowmaster", "Marksman", 
            "Pathfinder", "Night Lord", "Shadower", "Dual Blade", "Buccaneer", "Corsair", "Cannoneer",
            "Jett", "Dawn Warrior", "Blaze Wizard", "Wind Archer", "Night Walker", "Thunder Breaker",
            "Mihile", "Aran", "Evan", "Mercedes", "Phantom", "Shade", "Luminous", "Demon Slayer",
            "Demon Avenger", "Blaster", "Battle Mage", "Wild Hunter", "Mechanic", "Xenon", "Hayato",
            "Kanna", "Kaiser", "Kain", "Cadena", "Angelic Buster", "Adele", "Illium", "Ark", "Lara",
            "Hoyoung", "Zero", "Kinesis", "Beast Tamer"];


let joblist = document.getElementById("jobs");

allJobs.sort().forEach(job => {
    let option = document.createElement('option');
    option.setAttribute('value', job);
    option.appendChild(document.createTextNode(job));
    joblist.appendChild(option);
});

/**
 * function to get the data of the selected option
 * 
 * selectedJob to store selected option
 */

let selectedJob = ""

function selected(){
    let jobOptions = document.getElementById("jobs")
    selectedJob = jobOptions.options[jobOptions.selectedIndex].value
    determineStat(selectedJob)
    unhide(selectedJob);
    getStat()
    window.localStorage.setItem("job", selectedJob)
}

/**
 * function to determine the main stat of selected job
 * by passing selectedJob as a parameter
 */
let mStat = document.getElementById("main");
let sStat = document.getElementById("sec");


function determineStat(j){
    switch(j){
        case "Adele":
        case "Aran":
        case "Ark":
        case "Blaster":
        case "Buccaneer":
        case "Cannoneer":
        case "Dark Knight":
        case "Dawn Warrior":
        case "Demon Slayer":
        case "Hayato":
        case "Hero":
        case "Kaiser":
        case "Mihile":
        case "Paladin":
        case "Shade":
        case "Thunder Breaker":
        case "Zero":
            mStat.innerHTML = "STR"
            sStat.innerHTML = "DEX"
            break;
        
        case "Angelic Buster":
        case "Bowmaster":
        case "Corsair":
        case "Jett":
        case "Kain":
        case "Marksman":
        case "Mechanic":
        case "Mercedes":
        case "Pathfinder":
        case "Wild Hunter":
        case "Wind Archer":
            mStat.innerHTML = "DEX"
            sStat.innerHTML = "STR"
            break;
        
        case "Battle Mage":
        case "Beast Tamer":
        case "Bishop":
        case "Blaze Wizard":
        case "Evan":
        case "Fire Poison":
        case "Ice Lightning":
        case "Illium":
        case "Kanna":
        case "Kinesis":
        case "Lara":
        case "Luminous":
            mStat.innerHTML = "INT"
            sStat.innerHTML = "LUK"
            break;
        case "Night Lord":
        case "Night Walker":
        case "Hoyoung":
            mStat.innerHTML = "LUK"
            sStat.innerHTML = "DEX"
            break;
        case "Cadena":
        case "Dual Blade":
        case "Shadower":
        case "Phantom":
        case "Xenon":
            mStat.innerHTML = "LUK"
            sStat.innerHTML = "DEX"
            third.innerHTML = "STR"
            break;
        default:
            mStat.innerHTML = ""
            sStat.innerHTML = ""
            break;
            
    }
}

/**
 * A function that hides the third stat input based on
 * selected job
 * @param {*} j the selected job 
 */
function unhide(j){
    let third = document.getElementById("third_stat");
    if(j === "Cadena" || j === "Dual Blade" || j === "Shadower" || j === "Xenon"){
        if(third.style.display === "none"){
            third.style.display = "block";
        }
    }else{
        third.style.display = "none";
    }
}

function getStat(){
    let stat = document.getElementById("main").textContent;
    checkAtt(stat);
}

/**
 * A function that determines the attack type base on
 * the type of main stat extracted.
 * @param {*} stat type of main stat
 */
function checkAtt(stat){
    let attack = document.getElementById("att_type");
    switch(stat){
        case "STR":
        case "DEX":
        case "LUK":
            attack.innerHTML = "Weapon Attack";
            break;
        case "INT":
            attack.innerHTML = "Magic Attack";
            break;
        default:
            attack.innerHTML = "attack"
    }
}

/**
 * multipliers
 * main stat = 1
 * sec stat = 1/8
 * attack = 4
 * all stat = 8.5
 * hpmp = 1/70
 */

 function round(value, precision){
     let multiplier = Math.pow(10, precision || 0);
     return Math.round(value * multiplier) / multiplier;
 }

let mainStat = document.querySelector(".main_stat")
let secStat = document.querySelector(".sec_stat")
let thirdStat = document.querySelector(".third_stat")
let att = document.querySelector(".attack")
let allStat = document.querySelector(".all_stats")
let total = document.querySelector(".total")


let mainScore = 0
let secScore = 0
let thirdScore = 0
let attScore = 0
let allStatScore = 0
let totalScore = 0

 retrieveStorageItems()

/**
 * listens on the main stat input when a user
 * releases a key and calculates the total
 * by calling calculate()
 */
mainStat.addEventListener("keyup", function(e){
    const multiplier = 1
    let val = mainStat.value * multiplier
    mainScore = val
    calculate()
    console.log(mainScore + " main score")
    window.localStorage.setItem("mainScore", mainStat.value);
})

/**
 * listens on the sec stat input when a user
 * releases a key and calculates the total
 * by calling calculate()
 */
secStat.addEventListener("keyup", function(){
    const multiplier = 1/8
    let val = secStat.value * multiplier
    secScore = round(val, 1)
    calculate()
    console.log(secScore + " sec score")

    window.localStorage.setItem("secScore", secStat.value)
})

/**
 * listens on the third stat input when a user
 * releases a key and calculates the total
 * by calling calculate().
 */
thirdStat.addEventListener("keyup", function(){
    const multiplier = 1/8
    let val = thirdStat.value * multiplier
    thirdScore = round(val, 1)
    calculate()
    console.log(thirdScore + " third score")

    window.localStorage.setItem("thirdScore", thirdStat.value)
})

/**
 * listens on the attack input when a user
 * releases a key and calculates the total
 * by calling calculate()
 */
att.addEventListener("keyup", function(){
    const multiplier = 4
    let val = att.value * multiplier
    attScore = val
    calculate()
    console.log(attScore + " att score")

    window.localStorage.setItem("attScore", att.value)
})

/**
 * listens on the all stat input when a user
 * releases a key and calculates the total
 * by calling calculate()
 */
allStat.addEventListener("keyup", function(){
    const multiplier = 8.5
    let val = allStat.value * multiplier
    allStatScore = val
    calculate()
    console.log(allStatScore +  " all stat score")

    window.localStorage.setItem("allStat", allStat.value)
})

/**
 * a function that calculates the total flmae score
 */
function calculate(){
    totalScore = mainScore + secScore + thirdScore + attScore + allStatScore
    totalScore = round(totalScore, 1)
    total.innerHTML = totalScore
}

/**
 * A function that retrieves all stored values
 * from local storage.
 */
function retrieveStorageItems(){
    let jobselected = document.getElementById("jobs")
    mainStat.value = window.localStorage.getItem("mainScore")
    secStat.value = window.localStorage.getItem("secScore")
    thirdStat.value = window.localStorage.getItem("thirdScore")
    att.value = window.localStorage.getItem("attScore")
    jobselected.value = window.localStorage.getItem("job")
    allStat.value = window.localStorage.getItem("allStat")

    selected()
    
    mainScore = parseInt(mainStat.value) * 1
    secScore = parseInt(secStat.value) * (1/8)
    if(jobselected.value == "Cadena" || jobselected.value == "Shadower" || jobselected.value == "Dual Blade"){
        thirdScore = parseInt(thirdStat.value) * (1/8)
    }
    attScore = parseInt(att.value) * 4
    allStatScore = parseInt(allStat.value) * 8.5

    calculate()

    
}



