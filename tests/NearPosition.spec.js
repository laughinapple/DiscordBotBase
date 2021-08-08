const NearPosition = require("../features/NearPosition");

test("NearPosition", ()=>{
    var ins = new NearPosition();
    expect(ins.run({content: "![@messageID] test 81.1 61.0"}))
    .toBe(`NearPosition runs.
Your specified position is Y: 81.1, X: 61.
The near position is swamp SW(81.1 59.3).`);
})
