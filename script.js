var moneys = 0

function scam() {
    let moneydiv = document.getElementsByClassName('money')[0]
    let logdiv = document.getElementsByClassName('logbox')[0]
    moneys = moneys + Math.floor(Math.random()*100)
    console.log('earned ' + moneys.toString())
    logdiv.innerHTML = logdiv.innerHTML + "<br>> You scammed some hoe ass mf. you have $" + moneys.toString();
    moneydiv.innerHTML = "$" + moneys.toString();
}

function gamble() {
    let moneydiv = document.getElementsByClassName('money')[0]
    let logdiv = document.getElementsByClassName('logbox')[0]
    if (moneys < 500) {
        logdiv.innerHTML = logdiv.innerHTML + "<br>> Can't gamble while broke. get at least 500 fn";
        return;
    }
    let chance = Math.floor(Math.random() * 101);
    if (chance <= 10 && chance > 2) {
        let win = Math.floor(Math.random() * 1001);
        logdiv.innerHTML = logdiv.innerHTML + "<br>> You hit a 10%. Winning.. +$" + win.toString();
        moneys = moneys + win;
    } else if (chance <= 2) {
        let win = Math.floor(Math.random() * 1000001);
        logdiv.innerHTML = logdiv.innerHTML + "<br>> You hit a 1%. Damn nigga.. +$" + win.toString();
        moneys = moneys + win;
    } else {
        let win = 0;
        logdiv.innerHTML = logdiv.innerHTML + "<br>> You didn't get shit. And you lost your money. +$" + win.toString();
        moneys = 0;
    }
    moneydiv.innerHTML = "$" + moneys.toString();
}

function clearlogs() {
    let logdiv = document.getElementsByClassName('logbox')[0]
    logdiv.innerHTML = "> Logs cleared";
}