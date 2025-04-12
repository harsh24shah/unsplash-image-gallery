export class Util {
    public static readonly RGBtoHSV = (r:number, g:number, b:number) => {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h:number = 0, s, v = max;
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

    public static readonly HSVtoRGB = (h:number, s:number, v:number) => {
        let r = 0, g = 0, b = 0;

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
        const rgbValue = [r * 255, g * 255, b * 255];
        return [r * 255, g * 255, b * 255];
    }

    // ColorFilter - add a slight color overlay. rgbColor is an array of [r, g, b, adj]
    public static readonly colorFilter = (data:any, rgbColor: any) => {
        const adj = rgbColor[3];
        for (let i = 0; i < data.length; i += 4) {
            data[i] -= (data[i] - rgbColor[0]) * adj;
            data[i + 1] -= (data[i + 1] - rgbColor[1]) * adj;
            data[i + 2] -= (data[i + 2] - rgbColor[2]) * adj;
        }
        return data;
    }

    // RGB Adjust
    public static readonly rgbAdjust = (data:any, rgbAdj:any) => {
        for (let i = 0; i < data.length; i += 4) {
            data[i] *= rgbAdj[0];		// R
            data[i + 1] *= rgbAdj[1];	// G
            data[i + 2] *= rgbAdj[2];	// B
        }
        return data;
    }

    // Contrast - the this.filterContrast value should be -1 to 1
    public static readonly contrast = (data:any, rgbAdj:any) => {
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
    public static readonly saturate = (data:any, rgbAdj:any) => {
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
    public static readonly hueSaturate = (data:any, rgbAdj:any) => {
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
    public static readonly brightness = (data:any, rgbAdj:any) => {
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

    public static readonly invert = (data:any) => {
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
        return data;
    }

    // this.filterSepia is 0 (unchanged) to 1 (sepia)
    public static readonly sepia = (data:any, rgbAdj:any) => {
        const adj = rgbAdj;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            data[i] = (r * (1 - (0.607 * adj))) + (g * .769 * adj) + (b * .189 * adj);
            data[i + 1] = (r * .349 * adj) + (g * (1 - (0.314 * adj))) + (b * .168 * adj);
            data[i + 2] = (r * .272 * adj) + (g * .534 * adj) + (b * (1 - (0.869 * adj)));
        }
        return data;
    }

    public static readonly greyscale = (data:any) => {
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const avg = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            data[i] = data[i + 1] = data[i + 2] = avg;
        }
        return data;
    }

    public static applyFilters(context: CanvasRenderingContext2D, canvas: any, filtertype: string){

      const contextData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = contextData.data;

      switch (filtertype) {
        case 'greyscale': Util.greyscale(data); break;
        case 'sepia': Util.sepia(data, 1); break;
        case 'invert': Util.invert(data); break;
        case 'brightness': Util.brightness(data, .3); break;
        case 'hueSaturation': Util.hueSaturate(data, -2); break;
        case 'saturation': Util.saturate(data, 1); break;
        case 'contrast': Util.contrast(data, 0.5); break;
        case 'clarendon':
          Util.brightness(data, .1);
          Util.contrast(data, .1);
          Util.saturate(data, .15);
          break;
        case 'gingham':
          Util.sepia(data, -.15);
          Util.contrast(data, .04);
          break;
        case 'moon':
          Util.greyscale(data);
          Util.contrast(data, -.04);
          Util.brightness(data, .1);
          break;
        case 'lark':
          Util.brightness(data, .08);
          Util.rgbAdjust(data, [1, 1.03, 1.05]);
          Util.saturate(data, .12);
          break;
        case 'reyes':
          Util.sepia(data, .4);
          Util.brightness(data, .13);
          Util.contrast(data, -.05);
          break;
        case 'juno':
          Util.rgbAdjust(data, [1.01, 1.04, 1]);
          Util.saturate(data, .3);
          break;
        case 'slumber':
          Util.brightness(data, .1);
          Util.saturate(data, -.5);
          break;
        case 'crema':
          Util.rgbAdjust(data, [1.04, 1, 1.02]);
          Util.saturate(data, -.05);
          break;
        case 'ludwig':
          Util.brightness(data, .3);
          Util.saturate(data, -.03);
          break;
        case 'aden':
          Util.colorFilter(data, [228, 130, 225, .13]);
          Util.saturate(data, -.2);
          break;
        case 'perpetua':
          Util.rgbAdjust(data, [1.05, 1.1, 1]);
          break;
        case 'amaro':
          Util.saturate(data, .3);
          Util.brightness(data, .15);
          break;
        case 'mayfair':
          Util.colorFilter(data, [230, 115, 108, .05]);
          Util.saturate(data, .15);
          break;
        case 'rise':
          Util.colorFilter(data, [255, 170, 0, .1]);
          Util.brightness(data, .09);
          Util.saturate(data, .1);
          break;
        case 'hudson':
          Util.rgbAdjust(data, [1, 1, 1.25]);
          Util.contrast(data, .1);
          Util.brightness(data, .15);
          break;
        case 'valencia':
          Util.colorFilter(data, [255, 225, 80, .08]);
          Util.saturate(data, .1);
          Util.contrast(data, .05);
          break;
        case 'xpro2':
          Util.colorFilter(data, [255, 255, 0, .07]);
          Util.saturate(data, .2);
          Util.contrast(data, .15);
          break;
        case 'sierra':
          Util.contrast(data, -.15);
          Util.saturate(data, .1);
          break;
        case 'willow':
          Util.greyscale(data);
          Util.colorFilter(data, [100, 28, 210, .03]);
          Util.brightness(data, .1);
          break;
        case 'lofi':
          Util.contrast(data, .15);
          Util.saturate(data, .2);
          break;
        case 'inkwell':
          Util.greyscale(data);
          break;
        case 'hefe':
          Util.contrast(data, .1);
          Util.saturate(data, .15);
          break;
        case 'nashville':
          Util.colorFilter(data, [220, 115, 188, .12]);
          Util.contrast(data, -.05);
          break;
        case 'stinson':
          Util.brightness(data, .1);
          Util.sepia(data, .3);
          break;
        case 'vesper':
          Util.colorFilter(data, [255, 225, 0, .05]);
          Util.brightness(data, .06);
          Util.contrast(data, .06);
          break;
        case 'earlybird':
          Util.colorFilter(data, [255, 165, 40, .2]);
          break;
        case 'brannan':
          Util.contrast(data, .2);
          Util.colorFilter(data, [140, 10, 185, .1]);
          break;
        case 'sutro':
          Util.brightness(data, -.1);
          Util.saturate(data, -.1);
          break;
        case 'toaster':
          Util.sepia(data, .1);
          Util.colorFilter(data, [255, 145, 0, .2]);
          break;
        case 'walden':
          Util.brightness(data, .1);
          Util.colorFilter(data, [255, 255, 0, .2]);
          break;
        case 'vintage':
          Util.colorFilter(data, [255, 25, 0, .15]);
          Util.brightness(data, .1);
          break;
        case 'kelvin':
          Util.colorFilter(data, [255, 140, 0, .1]);
          Util.rgbAdjust(data, [1.15, 1.05, 1]);
          Util.saturate(data, .35);
          break;
        case 'maven':
          Util.colorFilter(data, [225, 240, 0, .1]);
          Util.saturate(data, .25);
          Util.contrast(data, .05);
          break;
        case 'ginza':
          Util.sepia(data, .06);
          Util.brightness(data, .1);
          break;
        case 'skyline':
          Util.saturate(data, .35);
          Util.brightness(data, .1);
          break;
        case 'dogpatch':
          Util.contrast(data, .15);
          Util.brightness(data, .1);
          break;
        case 'brooklyn':
          Util.colorFilter(data, [25, 240, 252, .05]);
          Util.sepia(data, .3);
          break;
        case 'helena':
          Util.colorFilter(data, [208, 208, 86, .2]);
          Util.contrast(data, .15);
          break;
        case 'ashby':
          Util.colorFilter(data, [255, 160, 25, .1]);
          Util.brightness(data, .1);
          break;
        case 'charmes':
          Util.colorFilter(data, [255, 50, 80, .12]);
          Util.contrast(data, .05);
          break;
      }

      return contextData;
    }
}
