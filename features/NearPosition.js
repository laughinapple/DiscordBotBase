class NearPosition {
    get pattern() {
        // そのうちショートカットも実装したい（座標らしき文字列が入ってきたらこの機能を発火させるなど）
        return new RegExp("test");
    }

    run(message) {
        var splitted = message.content.split(" ");
        var y1 = Number.parseFloat(splitted[2]);
        var x1 = Number.parseFloat(splitted[3]);
        var teleportPositionDistances = teleportPositions.map(v => {
            var x2 = v.x;
            var y2 = v.y;
            var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            return {
                ...v,
                distance
            }
        });
        var nearTeleportPosition = teleportPositionDistances.reduce((prev, curr) => {
            return prev.distance < curr.distance ? prev : curr;
        });
        var nearMissionPosition = missionPositions.map(v=>{
            var x2 = v.x;
            var y2 = v.y;
            var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            return {
                ...v,
                distance
            }
        }).reduce((prev, curr) => {
            return prev.distance < curr.distance ? prev : curr;
        });

        return `NearPosition runs.
Your specified position is Y: ${y1}, X: ${x1}.
The near position of teleport is ${nearTeleportPosition.area} ${nearTeleportPosition.direction}(${nearTeleportPosition.y} ${nearTeleportPosition.x}).
The near position of mission is ${nearMissionPosition.area} ${nearMissionPosition.name}(${nearMissionPosition.y} ${nearMissionPosition.x}).
${nearMissionPosition.distance < nearTeleportPosition.distance ? "ミッション" : "テレポート"}の方が近いっすね`
    }
}

const teleportPositions = [
    {
        area: "swamp",
        direction: "N",
        y: 53.1,
        x: 84.2
    },
    {
        area: "swamp",
        direction: "NE",
        y: 53.1,
        x: 84.2
    },
    {
        area: "swamp",
        direction: "E",
        y: 84.1,
        x: 86.6
    },
    {
        area: "swamp",
        direction: "SE",
        y: 84.1,
        x: 86.6
    },
    {
        area: "swamp",
        direction: "S",
        y: 84.5,
        x: 84.7
    },
    {
        area: "swamp",
        direction: "SW",
        y: 81.1,
        x: 59.3
    },
    {
        area: "swamp",
        direction: "W",
        y: 69.3,
        x: 59.4
    },
]

const missionPositions = [
    // 沼地
    {
        name: `キング・オブ・スイング"グランプリ`,
        area: "swamp",
        y: 84.1,
        x: 69.9
    },
    {
        name: "ポレン・マイ・ラブ",
        area: "swamp",
        y: 74.9,
        x: 68.0
    },
    {
        name: "ある日の沼地で",
        area: "swamp",
        y: 68.3,
        x: 86.3
    },
    {
        name: "沼地の制裁",
        area: "swamp",
        y: 84.9,
        x: 61.1
    },
    {
        name: "沼地フィッシング",
        area: "swamp",
        y: 85.3,
        x: 71.6
    },
    {
        name: "スワンプラリー",
        area: "swamp",
        y: 60.1,
        x: 84.1
    },
    {
        name: "ラプトルと愉快な仲間たち",
        area: "swamp",
        y: 62.7,
        x: 87.4
    },
    {
        name: "ドードーボール・ピックアップ",
        area: "swamp",
        y: 54.2,
        x: 84.7
    },
    {
        name: "ドードーボール・ショットクロック",
        area: "swamp",
        y: 54.2,
        x: 84.7
    },
    {
        name: "ホップ、スキップ、ジャンプでさようなら",
        area: "swamp",
        y: 86.8,
        x: 73.5
    },
    {
        name: "スパイvsスピノ",
        area: "swamp",
        y: 84.8,
        x: 57.4
    },
    {
        name: "仄暗い沼の底から",
        area: "swamp",
        y: 84.8,
        x: 57.4
    },
    {
        name: "ウェブ・サーチン",
        area: "swamp",
        y: 62.7,
        x: 87.4
    },
]

module.exports = NearPosition;
