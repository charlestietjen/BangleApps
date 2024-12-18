const bgDay = require("heatshrink").decompress(atob("2Gw4n/3/OoFGslDJP4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/ACMiAH4AWiIA/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4A/AH4Au"));

// const imgPetStage_1 = require("heatshrink").decompress(atob("iEQ4kA///m3bg8pI3kikQGEgURiMgAwchA4MSA4QGBkMSCAYOCDAgHEDAQHBiQCCFwgwFHwJAGACgA=="));
const imgPetStage_1 = require("./petGraphics");

// indev data will be saved/loaded to/from json in prod
let petStats = {
    hunger: 50,
    mood: 50,
    relation: 0,
    debugPetFrames: [2.0, 1.9],
    debugCurrentFrame: 0,
};

// I think espruino might already have this helper but w/e
function padZero(value) { return value < 10 ? '0' + value : value; }

// rename to main or something since this is the main loop
function drawPet(clear = false) {
    const interval = setTimeout(() => {
        g.clear();
        g.drawImage(bgDay);
        drawTime();
        g.drawImage(imgPetStage_1, g.getWidth() * 0.5, g.getHeight() * 0.6, { scale: petStats.debugPetFrames[petStats.debugCurrentFrame] });
        if (petStats.debugCurrentFrame >= petStats.debugPetFrames.length - 1) {
            petStats.debugCurrentFrame = 0;
        } else {
            petStats.debugCurrentFrame += 1;
        }
        if (clear) {
            return;
        }
        drawPet();
    }, 1000);
}


// very lazy framed digital clock
function drawTime() {
    const time = Date();
    const currentTime = `${time.getHours()}:${padZero(time.getMinutes())}`;
    g.setColor(0, 0, 0);
    g.fillRect(g.getWidth() * 0.1, g.getHeight() * 0.1, g.getWidth() * 0.91, g.getHeight() * 0.51);
    g.setColor('#8f563b');
    g.fillRect(g.getWidth() * 0.11, g.getHeight() * 0.11, g.getWidth() * 0.9, g.getHeight() * 0.5);
    g.setColor(0, 0, 0);
    g.setFont("Vector", 40);
    g.drawString(currentTime, g.getWidth() * 0.2, g.getHeight() * 0.2);
}

function logHealth() {
	console.log(Bangle.getHealthStatus('last'));
}

drawPet();

Bangle.on('lcdPower', function (on) {
    if (on) {
        drawPet(false);
    } else {
        if (idTimeout) {
            clearTimeout(idTimeout);
        }
    }
});

// Show launcher when button pressed
Bangle.setUI("clock");
Bangle.loadWidgets();
Bangle.drawWidgets();