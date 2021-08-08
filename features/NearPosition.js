class NearPosition {
    get pattern() {
        return new RegExp("test");
    }
    run(message) {
        return "NearPosition runs";
    }
}

module.exports = NearPosition;
