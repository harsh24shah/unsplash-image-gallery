export class Util {
    public static readonly RGBtoHSV = (r, g, b) => {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        const d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, v];
    }

    public static readonly HSVtoRGB = (h, s, v) => {
        let r, g, b;
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return [r * 255, g * 255, b * 255];
    }

    // ColorFilter - add a slight color overlay. rgbColor is an array of [r, g, b, adj]
    public static readonly colorFilter = (data, rgbColor) => {
        const adj = rgbColor[3];
        for (let i = 0; i < data.length; i += 4) {
            data[i] -= (data[i] - rgbColor[0]) * adj;
            data[i + 1] -= (data[i + 1] - rgbColor[1]) * adj;
            data[i + 2] -= (data[i + 2] - rgbColor[2]) * adj;
        }
        return data;
    }

    // RGB Adjust
    public static readonly rgbAdjust = (data, rgbAdj) => {
        for (let i = 0; i < data.length; i += 4) {
            data[i] *= rgbAdj[0];		// R
            data[i + 1] *= rgbAdj[1];	// G
            data[i + 2] *= rgbAdj[2];	// B
        }
        return data;
    }

    // Contrast - the this.filterContrast value should be -1 to 1
    public static readonly contrast = (data, rgbAdj) => {
        rgbAdj *= 255;
        const adjContrast = rgbAdj;
        const factor = (259 * (adjContrast + 255)) / (255 * (259 - adjContrast));
        for (let i = 0; i < data.length; i += 4) {
            data[i] = factor * (data[i] - 128) + 128;
            data[i + 1] = factor * (data[i + 1] - 128) + 128;
            data[i + 2] = factor * (data[i + 2] - 128) + 128;
        }
        return data;
    }

    //  Better result (slow) -  this.filterSaturate should be < 1 (desaturated) to 1 (unchanged) and < 1
    public static readonly saturate = (data, rgbAdj) => {
        rgbAdj = 1;
        let adjSaturate = rgbAdj;
        adjSaturate = (adjSaturate < -1) ? -1 : adjSaturate;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b; // weights from CCIR 601 spec
            data[i] = -gray * adjSaturate + data[i] * (1 + adjSaturate);
            data[i + 1] = -gray * adjSaturate + data[i + 1] * (1 + adjSaturate);
            data[i + 2] = -gray * adjSaturate + data[i + 2] * (1 + adjSaturate);
        }
        return data;
    }

    //  Better result (slow) -  this.filterHuerotate should be < 1 (desaturated) to 1 (unchanged) and < 1
    public static readonly hueSaturate = (data, rgbAdj) => {
        for (let i = 0; i < data.length; i += 4) {
            const hsv = Util.RGBtoHSV(data[i], data[i + 1], data[i + 2]);
            hsv[1] *= rgbAdj;
            const rgb = Util.HSVtoRGB(hsv[0], hsv[1], hsv[2]);
            data[i] = rgb[0];
            data[i + 1] = rgb[1];
            data[i + 2] = rgb[2];
        }
        return data;
    }

    // this.filterBrightness should be -1 (darker) to 1 (lighter). 0 is unchanged.
    public static readonly brightness = (data, rgbAdj) => {
        let adjbrightness = rgbAdj;
        adjbrightness = (adjbrightness > 1) ? 1 : adjbrightness;
        adjbrightness = (adjbrightness < -1) ? -1 : adjbrightness;
        adjbrightness = ~~(255 * adjbrightness);
        for (let i = 0; i < data.length; i += 4) {
            data[i] += adjbrightness;
            data[i + 1] += adjbrightness;
            data[i + 2] += adjbrightness;
        }
        return data;
    }

    public static readonly invert = (data) => {
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
        return data;
    }

    // this.filterSepia is 0 (unchanged) to 1 (sepia)
    public static readonly sepia = (data, rgbAdj) => {
        const adj = rgbAdj;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            data[i] = (r * (1 - (0.607 * adj))) + (g * .769 * adj) + (b * .189 * adj);
            data[i + 1] = (r * .349 * adj) + (g * (1 - (0.314 * adj))) + (b * .168 * adj);
            data[i + 2] = (r * .272 * adj) + (g * .534 * adj) + (b * (1 - (0.869 * adj)));
        }
        return data;
    }

    public static readonly greyscale = (data) => {
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const avg = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            data[i] = data[i + 1] = data[i + 2] = avg;
        }
        return data;
    }
}
