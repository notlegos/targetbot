radio.onReceivedValue(function (name, value) {
    Connected.showUserText(1, name)
    Connected.showUserNumber(2, value)
    if (name == "joyCente") {
        neZha.stopAllMotor()
    } else if (name == "joyLeft") {
        if (value >= 2) {
            turnAllWheels(90)
            basic.showArrow(ArrowNames.East)
        } else {
            neZha.stopAllMotor()
        }
    } else if (name == "joyRight") {
        if (value >= 2) {
            turnAllWheels(270)
            basic.showArrow(ArrowNames.West)
        } else {
            neZha.stopAllMotor()
        }
    } else if (name == "joyUp") {
        if (value >= 2) {
            turnAllWheels(0)
            basic.showArrow(ArrowNames.South)
        } else {
            neZha.stopAllMotor()
        }
    } else if (name == "joyDown") {
        if (value >= 2) {
            turnAllWheels(180)
            basic.showArrow(ArrowNames.North)
        } else {
            neZha.stopAllMotor()
        }
    } else if (name == "joyButto") {
        if (value == 5) {
        	
        } else if (value == 6) {
        	
        } else if (value == 2) {
            spinAllWheels(50, 200)
            spinAllWheels(70, 300)
            spinAllWheels(50, 200)
            spinAllWheels(20, 200)
            spinAllWheels(10, 200)
        } else if (value == 3) {
            spinAllWheels(-50, 200)
            spinAllWheels(-20, 200)
            spinAllWheels(-10, 200)
        } else if (value == 1) {
            spinAllWheels(50, 200)
            spinAllWheels(20, 200)
            spinAllWheels(10, 200)
        } else if (value == 4) {
            spinAllWheels(50, 200)
            spinAllWheels(20, 200)
            spinAllWheels(10, 200)
        } else {
        	
        }
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
	
})
function turnAllWheels (theAngle: number) {
    neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S1, theAngle)
    neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S2, theAngle)
    neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S3, theAngle)
    neZha.setServoAngle(neZha.ServoTypeList._360, neZha.ServoList.S4, theAngle)
}
function spinAllWheels (speedPercent: number, durationMs: number) {
    neZha.setMotorSpeed(neZha.MotorList.M1, speedPercent)
    neZha.setMotorSpeed(neZha.MotorList.M2, speedPercent)
    neZha.setMotorSpeed(neZha.MotorList.M3, speedPercent * -1)
    neZha.setMotorSpeed(neZha.MotorList.M4, speedPercent * -1)
    basic.pause(durationMs)
    neZha.stopAllMotor()
}
let hits = 0
let lastHitWasRed = false
let isRed = false
radio.setGroup(80)
Connected.oledClear()
turnAllWheels(0)
basic.showArrow(ArrowNames.South)
let strip = Connected.create(Connected.DigitalRJPin.J3, 8, Connected.NeoPixelMode.RGB)
strip.setBrightness(255)
strip.showColor(Connected.colors(Connected.NeoPixelColors.Red))
let hitsRequired = 2
Connected.MP3SetPort(Connected.DigitalRJPin.J4)
Connected.setVolume(15)
Connected.folderPlay("01", "007")
basic.pause(2000)
strip.setBrightness(20)
strip.showColor(Connected.colors(Connected.NeoPixelColors.Yellow))
Connected.execute(Connected.playType.Stop)
basic.forever(function () {
    isRed = Connected.checkColor(Connected.ColorList.red)
    Connected.showUserText(8, convertToText(isRed))
    if (isRed) {
        if (hits == hitsRequired) {
            Connected.setVolume(20)
            Connected.folderPlay("01", "004")
            basic.showIcon(IconNames.Sad)
            strip.showColor(Connected.colors(Connected.NeoPixelColors.Orange))
        }
        if (!(lastHitWasRed)) {
            Connected.setVolume(25)
            Connected.folderPlay("01", "001")
            basic.showIcon(IconNames.Angry)
        }
        hits = hits + 1
        Connected.showUserNumber(2, hits)
    } else if (lastHitWasRed) {
        basic.showIcon(IconNames.Happy)
        hits = 0
        strip.showColor(Connected.colors(Connected.NeoPixelColors.Black))
    }
    lastHitWasRed = isRed
})
