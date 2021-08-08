const NearPosition = require("./NearPosition");

// features には pattern と run(message) を実装してください
var features = [
    new NearPosition()
]

features.forEach(feature => {
    if (feature.pattern == undefined || feature.run == undefined) {
        throw new Error("機能が発火用の正規表現とメソッドを持っていません。");
    }
})

module.exports = features;