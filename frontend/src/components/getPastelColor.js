const getPastelColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let j = 0; j < 3; j++) {
        let value = (hash >> (j * 8)) & 0xff;
        value = value + 128;
        if (value > 240) { // if value is too close to white
        value = value - 60; // reduce value to avoid white range
        }
        value = Math.round(Math.min(Math.max(0, value), 255));
        color += value.toString(16).padStart(2, "0");
    }
    // calculate a border color that's slightly darker
    let borderColor = "#";
    for (let k = 0; k < 3; k++) {
        let value = parseInt(color.slice(1 + k * 2, 3 + k * 2), 16);
        value = Math.round(Math.max(0, value - 20));
        borderColor += value.toString(16).padStart(2, "0");
    }
    let textColor = "#";
    for (let k = 0; k < 3; k++) {
        let value = parseInt(color.slice(1 + k * 2, 3 + k * 2), 16);
        value = Math.round(Math.max(0, value - 120));
        textColor += value.toString(16).padStart(2, "0");
    }
    return { color: color, borderColor: borderColor, text: textColor };
}

export { getPastelColor };