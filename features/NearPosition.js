class NearPosition {
    get pattern() {
        // そのうちショートカットも実装したい（座標らしき文字列が入ってきたらこの機能を発火させるなど）
        return new RegExp("test");
    }

    run(message) {
        var splitted = message.content.split(" ");
        var y1 = Number.parseFloat(splitted[2]);
        var x1 = Number.parseFloat(splitted[3]);
        var distances = teleportPositions.map(v => {
            var x2 = v.x;
            var y2 = v.y;
            var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            return {
                ...v,
                distance
            }
        });
        var nearTeleportPosition = distances.reduce((prev, curr) => {
            return prev.distance < curr.distance ? prev : curr;
        });

        return `NearPosition runs.
Your specified position is Y: ${y1}, X: ${x1}.
The near position is ${nearTeleportPosition.area} ${nearTeleportPosition.direction}(${nearTeleportPosition.y} ${nearTeleportPosition.x}).`
    }
}

var teleportPositions = [
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

module.exports = NearPosition;
