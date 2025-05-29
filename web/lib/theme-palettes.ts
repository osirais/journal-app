// Colors from https://github.com/monkeytypegame/monkeytype

export type PaletteColors = {
  bg: string;
  main: string;
  caret: string;
  sub: string;
  subAlt: string;
  text: string;
  error: string;
  errorExtra: string;
  colorfulError: string;
  colorfulErrorExtra: string;
};

export type Palette = {
  name: string;
  colors: PaletteColors;
};

export const palettes: Palette[] = [
  {
    name: "8008",
    colors: {
      bg: "oklch(34.6% 0.021 259.4)",
      main: "oklch(66.4% 0.206 6.4)",
      caret: "oklch(66.4% 0.206 6.4)",
      sub: "oklch(69.6% 0.027 257.7)",
      subAlt: "oklch(32.3% 0.018 258.4)",
      text: "oklch(94.2% 0.006 255.5)",
      error: "oklch(58.4% 0.203 26.2)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(84.5% 0.18 116.9)",
      colorfulErrorExtra: "oklch(62.8% 0.131 116.7)"
    }
  },
  {
    name: "80s_after_dark",
    colors: {
      bg: "oklch(24.2% 0.048 278.7)",
      main: "oklch(82.2% 0.114 348.5)",
      caret: "oklch(84.1% 0.068 220.3)",
      sub: "oklch(84.1% 0.068 220.3)",
      subAlt: "oklch(21.9% 0.039 280.5)",
      text: "oklch(92.5% 0.009 242.8)",
      error: "oklch(96.7% 0.14 107)",
      errorExtra: "oklch(96.7% 0.14 107)",
      colorfulError: "oklch(96.7% 0.14 107)",
      colorfulErrorExtra: "oklch(96.7% 0.14 107)"
    }
  },
  {
    name: "9009",
    colors: {
      bg: "oklch(94% 0.012 91.5)",
      main: "oklch(13.8% 0.002 196.9)",
      caret: "oklch(68.1% 0.066 145.5)",
      sub: "oklch(66.5% 0.031 96.1)",
      subAlt: "oklch(85.4% 0.02 93.7)",
      text: "oklch(13.8% 0.002 196.9)",
      error: "oklch(66.8% 0.094 28.2)",
      errorExtra: "oklch(58.3% 0.079 28)",
      colorfulError: "oklch(66.8% 0.094 28.2)",
      colorfulErrorExtra: "oklch(58.3% 0.079 28)"
    }
  },
  {
    name: "aether",
    colors: {
      bg: "oklch(20.5% 0.02 248.8)",
      main: "oklch(90.9% 0.03 332.5)",
      caret: "oklch(90.9% 0.03 332.5)",
      sub: "oklch(68.5% 0.189 322.6)",
      subAlt: "oklch(26.7% 0.04 301.3)",
      text: "oklch(90.9% 0.03 332.5)",
      error: "oklch(67.9% 0.209 24.4)",
      errorExtra: "oklch(57.7% 0.234 23.9)",
      colorfulError: "oklch(67.9% 0.209 24.4)",
      colorfulErrorExtra: "oklch(57.7% 0.234 23.9)"
    }
  },
  {
    name: "alduin",
    colors: {
      bg: "oklch(22.6% 0 0)",
      main: "oklch(87.5% 0.054 98)",
      caret: "oklch(91.6% 0 0)",
      sub: "oklch(38.7% 0 0)",
      subAlt: "oklch(26% 0 0)",
      text: "oklch(96.4% 0.008 91.5)",
      error: "oklch(57.8% 0.104 20.8)",
      errorExtra: "oklch(30.8% 0.071 38.2)",
      colorfulError: "oklch(57.8% 0.104 20.8)",
      colorfulErrorExtra: "oklch(30.8% 0.071 38.2)"
    }
  },
  {
    name: "alpine",
    colors: {
      bg: "oklch(52.9% 0.036 293.1)",
      main: "oklch(100% 0 0)",
      caret: "oklch(45.9% 0.031 292.4)",
      sub: "oklch(68.3% 0.053 291.3)",
      subAlt: "oklch(56.8% 0.038 292.5)",
      text: "oklch(100% 0 0)",
      error: "oklch(59.3% 0.218 27.1)",
      errorExtra: "oklch(47.8% 0.165 26.1)",
      colorfulError: "oklch(59.3% 0.218 27.1)",
      colorfulErrorExtra: "oklch(47.8% 0.165 26.1)"
    }
  },
  {
    name: "anti_hero",
    colors: {
      bg: "oklch(13.6% 0.094 264.1)",
      main: "oklch(82.7% 0.097 19.3)",
      caret: "oklch(100% 0 0)",
      sub: "oklch(67.3% 0.233 1.9)",
      subAlt: "oklch(19.6% 0.116 269.3)",
      text: "oklch(92.1% 0.031 329.1)",
      error: "oklch(89.2% 0.092 212.2)",
      errorExtra: "oklch(61.4% 0.075 234.5)",
      colorfulError: "oklch(89.2% 0.092 212.2)",
      colorfulErrorExtra: "oklch(61.4% 0.075 234.5)"
    }
  },
  {
    name: "arch",
    colors: {
      bg: "oklch(16% 0.009 274.3)",
      main: "oklch(74.7% 0.062 189.3)",
      caret: "oklch(74.7% 0.062 189.3)",
      sub: "oklch(41.1% 0.047 279.4)",
      subAlt: "oklch(22% 0.022 272.6)",
      text: "oklch(97.1% 0.001 17.2)",
      error: "oklch(66.8% 0.219 21.8)",
      errorExtra: "oklch(50.2% 0.17 22.6)",
      colorfulError: "oklch(66.8% 0.219 21.8)",
      colorfulErrorExtra: "oklch(50.2% 0.17 22.6)"
    }
  },
  {
    name: "aurora",
    colors: {
      bg: "oklch(20.2% 0.041 234.5)",
      main: "oklch(81.9% 0.209 153.4)",
      caret: "oklch(81.9% 0.209 153.4)",
      sub: "oklch(44.3% 0.062 215.6)",
      subAlt: "oklch(14.4% 0.028 227.8)",
      text: "oklch(100% 0 0)",
      error: "oklch(58.9% 0.17 337.1)",
      errorExtra: "oklch(50.3% 0.146 345.5)",
      colorfulError: "oklch(58.9% 0.17 337.1)",
      colorfulErrorExtra: "oklch(50.3% 0.146 345.5)"
    }
  },
  {
    name: "beach",
    colors: {
      bg: "oklch(94.8% 0.084 95.2)",
      main: "oklch(80.5% 0.069 164.4)",
      caret: "oklch(87% 0.14 84.4)",
      sub: "oklch(87% 0.14 84.4)",
      subAlt: "oklch(90% 0.101 90.9)",
      text: "oklch(54.5% 0.041 162.2)",
      error: "oklch(71.6% 0.177 24.9)",
      errorExtra: "oklch(71.6% 0.177 24.9)",
      colorfulError: "oklch(71.6% 0.177 24.9)",
      colorfulErrorExtra: "oklch(71.6% 0.177 24.9)"
    }
  },
  {
    name: "bento",
    colors: {
      bg: "oklch(34.3% 0.039 260.5)",
      main: "oklch(74% 0.163 11.6)",
      caret: "oklch(74% 0.163 11.6)",
      sub: "oklch(54.3% 0.06 232.2)",
      subAlt: "oklch(30.8% 0.034 260.9)",
      text: "oklch(98.8% 0.006 43.3)",
      error: "oklch(61.4% 0.227 23.8)",
      errorExtra: "oklch(63.4% 0.213 25.7)",
      colorfulError: "oklch(63.3% 0.244 25.2)",
      colorfulErrorExtra: "oklch(63.4% 0.213 25.7)"
    }
  },
  {
    name: "bingsu",
    colors: {
      bg: "oklch(74.4% 0.02 5.5)",
      main: "oklch(53.2% 0.048 354.1)",
      caret: "oklch(93% 0.008 332.1)",
      sub: "oklch(35.8% 0.026 355.4)",
      subAlt: "oklch(69.8% 0.024 356.6)",
      text: "oklch(93% 0.008 332.1)",
      error: "oklch(43.2% 0.161 7)",
      errorExtra: "oklch(33.1% 0.122 6)",
      colorfulError: "oklch(43.2% 0.161 7)",
      colorfulErrorExtra: "oklch(33.1% 0.122 6)"
    }
  },
  {
    name: "bliss",
    colors: {
      bg: "oklch(27.2% 0.001 197.1)",
      main: "oklch(88.8% 0.035 40)",
      caret: "oklch(88.8% 0.035 40)",
      sub: "oklch(47.6% 0.017 28.2)",
      subAlt: "oklch(31.9% 0.003 48.6)",
      text: "oklch(100% 0 0)",
      error: "oklch(55% 0.16 24)",
      errorExtra: "oklch(44.4% 0.116 23)",
      colorfulError: "oklch(55% 0.16 24)",
      colorfulErrorExtra: "oklch(44.4% 0.116 23)"
    }
  },
  {
    name: "blue_dolphin",
    colors: {
      bg: "oklch(32.4% 0.067 232.6)",
      main: "oklch(90.7% 0.08 328.9)",
      caret: "oklch(72.9% 0.126 210.8)",
      sub: "oklch(84.2% 0.146 209.9)",
      subAlt: "oklch(37.9% 0.074 228.6)",
      text: "oklch(88.2% 0.101 212.2)",
      error: "oklch(87.1% 0.092 341.4)",
      errorExtra: "oklch(74.8% 0.153 18)",
      colorfulError: "oklch(79.3% 0.13 306.6)",
      colorfulErrorExtra: "oklch(74.8% 0.153 18)"
    }
  },
  {
    name: "blueberry_dark",
    colors: {
      bg: "oklch(29.1% 0.045 265.7)",
      main: "oklch(86.3% 0.071 247.4)",
      caret: "oklch(48.6% 0.163 338.4)",
      sub: "oklch(58.1% 0.073 253.7)",
      subAlt: "oklch(25.7% 0.034 264.7)",
      text: "oklch(75.6% 0.061 247.1)",
      error: "oklch(62.2% 0.193 5.5)",
      errorExtra: "oklch(74.5% 0.085 358)",
      colorfulError: "oklch(62.2% 0.193 5.5)",
      colorfulErrorExtra: "oklch(74.5% 0.085 358)"
    }
  },
  {
    name: "blueberry_light",
    colors: {
      bg: "oklch(90.8% 0.029 273.1)",
      main: "oklch(49.4% 0.039 247.3)",
      caret: "oklch(62.2% 0.193 5.5)",
      sub: "oklch(71.4% 0.043 257.5)",
      subAlt: "oklch(83.3% 0.034 274.5)",
      text: "oklch(59.1% 0.046 245.4)",
      error: "oklch(62.2% 0.193 5.5)",
      errorExtra: "oklch(74.5% 0.085 358)",
      colorfulError: "oklch(62.2% 0.193 5.5)",
      colorfulErrorExtra: "oklch(74.5% 0.085 358)"
    }
  },
  {
    name: "botanical",
    colors: {
      bg: "oklch(66.7% 0.037 187.2)",
      main: "oklch(95.3% 0.008 216.6)",
      caret: "oklch(80.6% 0.029 191.1)",
      sub: "oklch(44.4% 0.018 186.1)",
      subAlt: "oklch(63% 0.034 188.8)",
      text: "oklch(95.3% 0.008 216.6)",
      error: "oklch(87% 0.059 46.4)",
      errorExtra: "oklch(77% 0.123 44.7)",
      colorfulError: "oklch(87% 0.059 46.4)",
      colorfulErrorExtra: "oklch(77% 0.123 44.7)"
    }
  },
  {
    name: "bouquet",
    colors: {
      bg: "oklch(33.6% 0.049 174.3)",
      main: "oklch(77.7% 0.089 22.7)",
      caret: "oklch(77.7% 0.089 22.7)",
      sub: "oklch(59.2% 0.083 175)",
      subAlt: "oklch(38.8% 0.055 175.6)",
      text: "oklch(91% 0.021 79.1)",
      error: "oklch(59.2% 0.182 33.6)",
      errorExtra: "oklch(44.5% 0.134 34.2)",
      colorfulError: "oklch(59.2% 0.182 33.6)",
      colorfulErrorExtra: "oklch(44.5% 0.134 34.2)"
    }
  },
  {
    name: "breeze",
    colors: {
      bg: "oklch(88.4% 0.031 64.3)",
      main: "oklch(56.2% 0.102 298.4)",
      caret: "oklch(56.2% 0.102 298.4)",
      sub: "oklch(63.8% 0.1 225)",
      subAlt: "oklch(93.4% 0.024 59.4)",
      text: "oklch(39.2% 0.06 225.8)",
      error: "oklch(56.2% 0.102 298.4)",
      errorExtra: "oklch(51% 0.138 353)",
      colorfulError: "oklch(95.4% 0.156 108.6)",
      colorfulErrorExtra: "oklch(81.8% 0.141 158.4)"
    }
  },
  {
    name: "bushido",
    colors: {
      bg: "oklch(28% 0.02 264.2)",
      main: "oklch(64.3% 0.196 21.2)",
      caret: "oklch(64.3% 0.196 21.2)",
      sub: "oklch(49.2% 0.029 265.4)",
      subAlt: "oklch(25.1% 0.023 262.4)",
      text: "oklch(95.8% 0.011 71.9)",
      error: "oklch(64.3% 0.196 21.2)",
      errorExtra: "oklch(47.5% 0.138 20.3)",
      colorfulError: "oklch(88.2% 0.159 102.9)",
      colorfulErrorExtra: "oklch(74.7% 0.134 102.8)"
    }
  },
  {
    name: "cafe",
    colors: {
      bg: "oklch(77.7% 0.059 72.8)",
      main: "oklch(18.3% 0.007 78.1)",
      caret: "oklch(18.3% 0.007 78.1)",
      sub: "oklch(86.5% 0.003 48.7)",
      subAlt: "oklch(72.4% 0.055 73.4)",
      text: "oklch(18.3% 0.007 78.1)",
      error: "oklch(54.4% 0.194 24.4)",
      errorExtra: "oklch(47.9% 0.18 24.6)",
      colorfulError: "oklch(54.4% 0.194 24.4)",
      colorfulErrorExtra: "oklch(47.9% 0.18 24.6)"
    }
  },
  {
    name: "camping",
    colors: {
      bg: "oklch(96.2% 0.02 77.3)",
      main: "oklch(59.4% 0.092 139.4)",
      caret: "oklch(59.4% 0.092 139.4)",
      sub: "oklch(78.7% 0.023 76.5)",
      subAlt: "oklch(89.9% 0.026 78.9)",
      text: "oklch(36.6% 0.01 139.4)",
      error: "oklch(54.6% 0.124 22.6)",
      errorExtra: "oklch(43.8% 0.095 22.6)",
      colorfulError: "oklch(54.6% 0.124 22.6)",
      colorfulErrorExtra: "oklch(43.8% 0.095 22.6)"
    }
  },
  {
    name: "carbon",
    colors: {
      bg: "oklch(31.3% 0 0)",
      main: "oklch(69.3% 0.189 46.9)",
      caret: "oklch(69.3% 0.189 46.9)",
      sub: "oklch(49.3% 0 0)",
      subAlt: "oklch(28.9% 0 0)",
      text: "oklch(92.9% 0.043 84.6)",
      error: "oklch(60.2% 0.22 27)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(60.2% 0.22 27)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "catppuccin",
    colors: {
      bg: "oklch(24.3% 0.03 283.9)",
      main: "oklch(78.7% 0.119 304.8)",
      caret: "oklch(88% 0.042 18)",
      sub: "oklch(61.8% 0.037 276)",
      subAlt: "oklch(21.6% 0.025 284.1)",
      text: "oklch(87.9% 0.043 272.3)",
      error: "oklch(75.6% 0.13 2.8)",
      errorExtra: "oklch(78.2% 0.09 8.8)",
      colorfulError: "oklch(75.6% 0.13 2.8)",
      colorfulErrorExtra: "oklch(78.2% 0.09 8.8)"
    }
  },
  {
    name: "chaos_theory",
    colors: {
      bg: "oklch(19.3% 0.03 289.4)",
      main: "oklch(75.6% 0.195 339.6)",
      caret: "oklch(91.8% 0.014 248)",
      sub: "oklch(54.3% 0.045 273.9)",
      subAlt: "oklch(24.1% 0.034 286.1)",
      text: "oklch(91.8% 0.014 248)",
      error: "oklch(68.9% 0.202 18.4)",
      errorExtra: "oklch(52.4% 0.151 18.6)",
      colorfulError: "oklch(68.9% 0.202 18.4)",
      colorfulErrorExtra: "oklch(52.4% 0.151 18.6)"
    }
  },
  {
    name: "cheesecake",
    colors: {
      bg: "oklch(95.8% 0.038 85.3)",
      main: "oklch(44.5% 0.137 5.5)",
      caret: "oklch(43.6% 0.132 4.8)",
      sub: "oklch(58.6% 0.227 355.7)",
      subAlt: "oklch(91.8% 0.05 85.1)",
      text: "oklch(32.9% 0.011 358.5)",
      error: "oklch(84.8% 0.209 146.4)",
      errorExtra: "oklch(84.8% 0.209 146.4)",
      colorfulError: "oklch(84.8% 0.209 146.4)",
      colorfulErrorExtra: "oklch(84.8% 0.209 146.4)"
    }
  },
  {
    name: "cherry_blossom",
    colors: {
      bg: "oklch(32.4% 0.006 258.4)",
      main: "oklch(66.7% 0.201 330.8)",
      caret: "oklch(100% 0 0)",
      sub: "oklch(58.7% 0.01 248)",
      subAlt: "oklch(30.4% 0.005 248)",
      text: "oklch(85.5% 0.015 102.5)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(56.3% 0.205 22.5)",
      colorfulError: "oklch(60% 0.235 25)",
      colorfulErrorExtra: "oklch(34.7% 0.13 23.2)"
    }
  },
  {
    name: "comfy",
    colors: {
      bg: "oklch(46.4% 0.037 251.5)",
      main: "oklch(88.3% 0.05 28.9)",
      caret: "oklch(78.9% 0.041 218.9)",
      sub: "oklch(78.9% 0.041 218.9)",
      subAlt: "oklch(43.6% 0.038 251.5)",
      text: "oklch(95.7% 0.007 28.8)",
      error: "oklch(58.1% 0.166 13.1)",
      errorExtra: "oklch(58.1% 0.166 13.1)",
      colorfulError: "oklch(58.1% 0.166 13.1)",
      colorfulErrorExtra: "oklch(58.1% 0.166 13.1)"
    }
  },
  {
    name: "copper",
    colors: {
      bg: "oklch(32.8% 0.033 36.6)",
      main: "oklch(60.2% 0.1 36.7)",
      caret: "oklch(59.5% 0.137 35.4)",
      sub: "oklch(74.7% 0.062 189.3)",
      subAlt: "oklch(36.1% 0.04 37.8)",
      text: "oklch(91.2% 0.008 36.6)",
      error: "oklch(47.1% 0.163 26.2)",
      errorExtra: "oklch(59.4% 0.241 29)",
      colorfulError: "oklch(47.1% 0.163 26.2)",
      colorfulErrorExtra: "oklch(59.4% 0.241 29)"
    }
  },
  {
    name: "creamsicle",
    colors: {
      bg: "oklch(77.8% 0.139 44.7)",
      main: "oklch(99% 0.005 106.5)",
      caret: "oklch(99% 0.005 106.5)",
      sub: "oklch(69.7% 0.201 41.2)",
      subAlt: "oklch(74.9% 0.158 44)",
      text: "oklch(99% 0.005 106.5)",
      error: "oklch(42.8% 0.217 303.2)",
      errorExtra: "oklch(42.8% 0.217 303.2)",
      colorfulError: "oklch(42.8% 0.217 303.2)",
      colorfulErrorExtra: "oklch(42.8% 0.217 303.2)"
    }
  },
  {
    name: "cy_red",
    colors: {
      bg: "oklch(37.7% 0.103 23.4)",
      main: "oklch(63.5% 0.185 24.1)",
      caret: "oklch(31.5% 0.082 23)",
      sub: "oklch(69.6% 0.194 23.6)",
      subAlt: "oklch(26.4% 0.064 22.5)",
      text: "oklch(82.1% 0.101 19.5)",
      error: "oklch(71.3% 0.086 273.6)",
      errorExtra: "oklch(49.6% 0.106 271.6)",
      colorfulError: "oklch(71.3% 0.086 273.6)",
      colorfulErrorExtra: "oklch(49.6% 0.106 271.6)"
    }
  },
  {
    name: "cyberspace",
    colors: {
      bg: "oklch(22.1% 0.01 145.2)",
      main: "oklch(74.9% 0.18 156.3)",
      caret: "oklch(74.9% 0.18 156.3)",
      sub: "oklch(63.8% 0.135 297.1)",
      subAlt: "oklch(19.6% 0.008 145.3)",
      text: "oklch(94.2% 0.068 165.3)",
      error: "oklch(69.5% 0.195 23.7)",
      errorExtra: "oklch(56.2% 0.203 26.8)",
      colorfulError: "oklch(69.5% 0.195 23.7)",
      colorfulErrorExtra: "oklch(56.2% 0.203 26.8)"
    }
  },
  // {
  //   name: "dark",
  //   colors: {
  //     bg: "oklch(17.8% 0 0)",
  //     main: "oklch(94.9% 0 0)",
  //     caret: "oklch(94.9% 0 0)",
  //     sub: "oklch(38.7% 0 0)",
  //     subAlt: "oklch(21.3% 0 0)",
  //     text: "oklch(94.9% 0 0)",
  //     error: "oklch(58.4% 0.203 26.2)",
  //     errorExtra: "oklch(37.8% 0.133 26.3)",
  //     colorfulError: "oklch(58.4% 0.203 26.2)",
  //     colorfulErrorExtra: "oklch(37.8% 0.133 26.3)"
  //   }
  // },
  {
    name: "dark_magic_girl",
    colors: {
      bg: "oklch(22.9% 0.038 237.5)",
      main: "oklch(83.1% 0.086 353.6)",
      caret: "oklch(68.2% 0.119 297.9)",
      sub: "oklch(87.1% 0.088 176.7)",
      subAlt: "oklch(20% 0.032 239)",
      text: "oklch(68.2% 0.119 297.9)",
      error: "oklch(66.4% 0.178 356.5)",
      errorExtra: "oklch(66.4% 0.178 356.5)",
      colorfulError: "oklch(68.5% 0.127 176.7)",
      colorfulErrorExtra: "oklch(66.4% 0.178 356.5)"
    }
  },
  {
    name: "dark_note",
    colors: {
      bg: "oklch(23.9% 0 0)",
      main: "oklch(84% 0.104 75.4)",
      caret: "oklch(90.1% 0.009 341.8)",
      sub: "oklch(63.3% 0.03 213.9)",
      subAlt: "oklch(19.1% 0 0)",
      text: "oklch(90% 0.032 260)",
      error: "oklch(62.8% 0.258 29.2)",
      errorExtra: "oklch(58.9% 0.057 228.2)",
      colorfulError: "",
      colorfulErrorExtra: ""
    }
  },
  {
    name: "darling",
    colors: {
      bg: "oklch(88.2% 0.062 12.2)",
      main: "oklch(100% 0 0)",
      caret: "oklch(100% 0 0)",
      sub: "oklch(44.9% 0.184 29.2)",
      subAlt: "oklch(84% 0.065 15)",
      text: "oklch(100% 0 0)",
      error: "oklch(59.3% 0.166 255.7)",
      errorExtra: "oklch(59.3% 0.166 255.7)",
      colorfulError: "oklch(59.3% 0.166 255.7)",
      colorfulErrorExtra: "oklch(59.3% 0.166 255.7)"
    }
  },
  {
    name: "deku",
    colors: {
      bg: "oklch(57.7% 0.098 195.7)",
      main: "oklch(52.3% 0.167 26.9)",
      caret: "oklch(52.3% 0.167 26.9)",
      sub: "oklch(41.5% 0.051 202.8)",
      subAlt: "oklch(53.6% 0.089 195.8)",
      text: "oklch(96.3% 0.012 79.8)",
      error: "oklch(52.3% 0.167 26.9)",
      errorExtra: "oklch(29.2% 0.1 26.1)",
      colorfulError: "oklch(82.9% 0.168 102.3)",
      colorfulErrorExtra: "oklch(60.9% 0.125 104.6)"
    }
  },
  {
    name: "desert_oasis",
    colors: {
      bg: "oklch(96.4% 0.04 86.7)",
      main: "oklch(72.5% 0.149 84.7)",
      caret: "oklch(63.9% 0.193 259.1)",
      sub: "oklch(55.3% 0.245 261.4)",
      subAlt: "oklch(90.4% 0.048 87)",
      text: "oklch(28.1% 0.058 92.9)",
      error: "oklch(72.1% 0.171 134)",
      errorExtra: "oklch(52.9% 0.123 133)",
      colorfulError: "oklch(72.1% 0.171 134)",
      colorfulErrorExtra: "oklch(52.9% 0.123 133)"
    }
  },
  {
    name: "dev",
    colors: {
      bg: "oklch(24.2% 0.017 259.8)",
      main: "oklch(68.7% 0.124 226.4)",
      caret: "oklch(46.4% 0.049 263.9)",
      sub: "oklch(46.4% 0.049 263.9)",
      subAlt: "oklch(21.6% 0.016 256.8)",
      text: "oklch(83.9% 0.031 107.1)",
      error: "oklch(50.5% 0.189 22.9)",
      errorExtra: "oklch(39.8% 0.146 22.4)",
      colorfulError: "oklch(50.5% 0.189 22.9)",
      colorfulErrorExtra: "oklch(39.8% 0.146 22.4)"
    }
  },
  {
    name: "diner",
    colors: {
      bg: "oklch(56% 0.063 243)",
      main: "oklch(75.4% 0.107 96.2)",
      caret: "oklch(54.8% 0.123 29.2)",
      sub: "oklch(47.1% 0.064 257.7)",
      subAlt: "oklch(52.7% 0.059 244.1)",
      text: "oklch(88.9% 0.026 97.1)",
      error: "oklch(54.8% 0.123 29.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(54.8% 0.123 29.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "dino",
    colors: {
      bg: "oklch(100% 0 0)",
      main: "oklch(77.5% 0.188 150.2)",
      caret: "oklch(77.5% 0.188 150.2)",
      sub: "oklch(87.3% 0 0)",
      subAlt: "oklch(94.3% 0.067 154.1)",
      text: "oklch(24.6% 0.009 159.3)",
      error: "oklch(69.5% 0.195 23.7)",
      errorExtra: "oklch(56.2% 0.203 26.8)",
      colorfulError: "oklch(69.5% 0.195 23.7)",
      colorfulErrorExtra: "oklch(56.2% 0.203 26.8)"
    }
  },
  {
    name: "discord",
    colors: {
      bg: "oklch(32.1% 0.009 268.4)",
      main: "oklch(57.3% 0.198 274.7)",
      caret: "oklch(57.3% 0.198 274.7)",
      sub: "oklch(46.2% 0.015 275.8)",
      subAlt: "oklch(29.7% 0.008 264.4)",
      text: "oklch(90.1% 0.007 268.5)",
      error: "oklch(62.3% 0.181 25.4)",
      errorExtra: "oklch(62.3% 0.181 25.4)",
      colorfulError: "oklch(62.3% 0.181 25.4)",
      colorfulErrorExtra: "oklch(62.3% 0.181 25.4)"
    }
  },
  {
    name: "dmg",
    colors: {
      bg: "oklch(89.1% 0.002 247.8)",
      main: "oklch(49.6% 0.187 359.8)",
      caret: "oklch(42.6% 0.127 272.2)",
      sub: "oklch(45% 0.169 272)",
      subAlt: "oklch(81.4% 0.024 277.9)",
      text: "oklch(37.5% 0 0)",
      error: "oklch(49.6% 0.187 359.8)",
      errorExtra: "oklch(47.1% 0.135 357.2)",
      colorfulError: "oklch(66.4% 0.11 127.7)",
      colorfulErrorExtra: "oklch(44.8% 0.096 143.8)"
    }
  },
  {
    name: "dollar",
    colors: {
      bg: "oklch(91.5% 0.021 106.8)",
      main: "oklch(59.6% 0.055 144.9)",
      caret: "oklch(38.9% 0.007 153.6)",
      sub: "oklch(66.3% 0.073 123.6)",
      subAlt: "oklch(84.9% 0.024 120.3)",
      text: "oklch(46.2% 0.009 151.7)",
      error: "oklch(55% 0.226 29.2)",
      errorExtra: "oklch(73.9% 0.139 21)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "dots",
    colors: {
      bg: "oklch(19.8% 0.023 272.4)",
      main: "oklch(100% 0 0)",
      caret: "oklch(100% 0 0)",
      sub: "oklch(54.3% 0.045 273.9)",
      subAlt: "oklch(23.9% 0.027 274.8)",
      text: "oklch(100% 0 0)",
      error: "oklch(58.4% 0.203 26.2)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(58.4% 0.203 26.2)",
      colorfulErrorExtra: "oklch(37.8% 0.133 26.3)"
    }
  },
  {
    name: "dracula",
    colors: {
      bg: "oklch(28.8% 0.022 277.5)",
      main: "oklch(74.2% 0.149 301.9)",
      caret: "oklch(74.2% 0.149 301.9)",
      sub: "oklch(56% 0.08 270.1)",
      subAlt: "oklch(25.4% 0.019 276.1)",
      text: "oklch(97.7% 0.008 106.5)",
      error: "oklch(68.2% 0.206 24.4)",
      errorExtra: "oklch(95.5% 0.134 112.8)",
      colorfulError: "oklch(68.2% 0.206 24.4)",
      colorfulErrorExtra: "oklch(95.5% 0.134 112.8)"
    }
  },
  {
    name: "drowning",
    colors: {
      bg: "oklch(21.7% 0.027 287.2)",
      main: "oklch(54.7% 0.118 262.1)",
      caret: "oklch(62.8% 0.16 261.4)",
      sub: "oklch(51.3% 0.064 258.3)",
      subAlt: "oklch(24.6% 0.03 281.1)",
      text: "oklch(67% 0.029 285.6)",
      error: "oklch(58.4% 0.135 16.4)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.4% 0.135 16.4)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "dualshot",
    colors: {
      bg: "oklch(55.6% 0 0)",
      main: "oklch(25.1% 0.001 197.1)",
      caret: "oklch(25.1% 0.001 197.1)",
      sub: "oklch(73.8% 0 0)",
      subAlt: "oklch(50.3% 0 0)",
      text: "oklch(25.1% 0.001 197.1)",
      error: "oklch(54.4% 0.194 24.4)",
      errorExtra: "oklch(47.9% 0.18 24.6)",
      colorfulError: "oklch(54.4% 0.194 24.4)",
      colorfulErrorExtra: "oklch(47.9% 0.18 24.6)"
    }
  },
  {
    name: "earthsong",
    colors: {
      bg: "oklch(26.7% 0.009 67.4)",
      main: "oklch(60.5% 0.12 144.5)",
      caret: "oklch(63.1% 0.113 221.8)",
      sub: "oklch(79.9% 0.155 76.6)",
      subAlt: "oklch(22.3% 0.006 78.2)",
      text: "oklch(84.8% 0.054 67)",
      error: "oklch(41.3% 0.116 17.6)",
      errorExtra: "oklch(70% 0.191 26.8)",
      colorfulError: "oklch(41.3% 0.116 17.6)",
      colorfulErrorExtra: "oklch(70% 0.191 26.8)"
    }
  },
  {
    name: "everblush",
    colors: {
      bg: "oklch(21.6% 0.012 225.8)",
      main: "oklch(79% 0.13 140.2)",
      caret: "oklch(75.2% 0.081 195.6)",
      sub: "oklch(62.2% 0.006 182.9)",
      subAlt: "oklch(27.9% 0.011 225.5)",
      text: "oklch(88.8% 0 0)",
      error: "oklch(68.9% 0.141 21.4)",
      errorExtra: "oklch(72% 0.139 21.1)",
      colorfulError: "oklch(68.9% 0.141 21.4)",
      colorfulErrorExtra: "oklch(72% 0.139 21.1)"
    }
  },
  {
    name: "evil_eye",
    colors: {
      bg: "oklch(58.5% 0.134 239.8)",
      main: "oklch(96.3% 0.012 79.8)",
      caret: "oklch(96.3% 0.012 79.8)",
      sub: "oklch(45.7% 0.135 251.7)",
      subAlt: "oklch(55.7% 0.137 245.3)",
      text: "oklch(20.5% 0.002 286.2)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "ez_mode",
    colors: {
      bg: "oklch(52.2% 0.167 254.2)",
      main: "oklch(72.6% 0.222 338.4)",
      caret: "oklch(78.6% 0.223 142.5)",
      sub: "oklch(63.5% 0.187 252.6)",
      subAlt: "oklch(47.3% 0.149 253.6)",
      text: "oklch(100% 0 0)",
      error: "oklch(78.6% 0.223 142.5)",
      errorExtra: "oklch(69.6% 0.197 142.3)",
      colorfulError: "oklch(78.6% 0.223 142.5)",
      colorfulErrorExtra: "oklch(69.6% 0.197 142.3)"
    }
  },
  {
    name: "fire",
    colors: {
      bg: "oklch(10.6% 0.043 29.2)",
      main: "oklch(48.9% 0.19 28.1)",
      caret: "oklch(48.9% 0.19 28.1)",
      sub: "oklch(39.3% 0.075 21)",
      subAlt: "oklch(18.1% 0.038 21.6)",
      text: "oklch(100% 0 0)",
      error: "oklch(43.1% 0.19 271)",
      errorExtra: "oklch(43.9% 0.112 276.4)",
      colorfulError: "oklch(43.1% 0.19 271)",
      colorfulErrorExtra: "oklch(43.9% 0.112 276.4)"
    }
  },
  {
    name: "fledgling",
    colors: {
      bg: "oklch(34.2% 0.017 310.2)",
      main: "oklch(71.6% 0.174 13.5)",
      caret: "oklch(39.8% 0 0)",
      sub: "oklch(52% 0.079 358.8)",
      subAlt: "oklch(31.1% 0.019 307.8)",
      text: "oklch(88.6% 0.019 25.6)",
      error: "oklch(62.4% 0.235 21.3)",
      errorExtra: "oklch(50.3% 0.204 25.3)",
      colorfulError: "oklch(63.2% 0.253 24.7)",
      colorfulErrorExtra: "oklch(0% 0 0)"
    }
  },
  {
    name: "fleuriste",
    colors: {
      bg: "oklch(77.3% 0.047 77.9)",
      main: "oklch(44.4% 0.034 173.7)",
      caret: "oklch(58.2% 0.047 79.4)",
      sub: "oklch(40% 0.071 350.1)",
      subAlt: "oklch(72.3% 0.041 78.4)",
      text: "oklch(19.7% 0.024 171.5)",
      error: "oklch(42.9% 0.176 29.2)",
      errorExtra: "oklch(40.9% 0.152 27.3)",
      colorfulError: "oklch(50.3% 0.143 23.8)",
      colorfulErrorExtra: "oklch(56.6% 0.146 23)"
    }
  },
  {
    name: "floret",
    colors: {
      bg: "oklch(24.9% 0.043 207.6)",
      main: "oklch(90.5% 0.136 92.6)",
      caret: "oklch(78.1% 0.143 106.6)",
      sub: "oklch(63.6% 0.03 216.6)",
      subAlt: "oklch(29% 0.031 205.6)",
      text: "oklch(92.2% 0 0)",
      error: "oklch(46% 0.119 51.4)",
      errorExtra: "oklch(50.6% 0.095 223.9)",
      colorfulError: "oklch(46% 0.119 51.4)",
      colorfulErrorExtra: "oklch(61.1% 0.048 216.3)"
    }
  },
  {
    name: "froyo",
    colors: {
      bg: "oklch(89% 0.022 85.9)",
      main: "oklch(58.8% 0.002 197.1)",
      caret: "oklch(58.8% 0.002 197.1)",
      sub: "oklch(69.8% 0.085 90.5)",
      subAlt: "oklch(85% 0.018 84.6)",
      text: "oklch(58.8% 0.002 197.1)",
      error: "oklch(73.3% 0.136 27.9)",
      errorExtra: "oklch(63.9% 0.144 28.5)",
      colorfulError: "oklch(73.3% 0.136 27.9)",
      colorfulErrorExtra: "oklch(63.9% 0.144 28.5)"
    }
  },
  {
    name: "frozen_llama",
    colors: {
      bg: "oklch(90.4% 0.085 188.4)",
      main: "oklch(48.3% 0.152 300)",
      caret: "oklch(100% 0 0)",
      sub: "oklch(73.2% 0.157 298.5)",
      subAlt: "oklch(86.2% 0.099 187.4)",
      text: "oklch(100% 0 0)",
      error: "oklch(59.2% 0.222 26.9)",
      errorExtra: "oklch(59.2% 0.222 26.9)",
      colorfulError: "oklch(59.2% 0.222 26.9)",
      colorfulErrorExtra: "oklch(59.2% 0.222 26.9)"
    }
  },
  {
    name: "fruit_chew",
    colors: {
      bg: "oklch(87% 0.005 325.6)",
      main: "oklch(35.9% 0.125 325.9)",
      caret: "oklch(51% 0.186 27.2)",
      sub: "oklch(72.2% 0.045 324.8)",
      subAlt: "oklch(81.7% 0.019 325.8)",
      text: "oklch(26.9% 0.007 325.8)",
      error: "oklch(52% 0.187 28)",
      errorExtra: "oklch(47.8% 0.165 26.1)",
      colorfulError: "oklch(52% 0.187 28)",
      colorfulErrorExtra: "oklch(47.8% 0.165 26.1)"
    }
  },
  {
    name: "fundamentals",
    colors: {
      bg: "oklch(55.7% 0.002 197.1)",
      main: "oklch(68.2% 0.064 147)",
      caret: "oklch(46.6% 0.077 221.5)",
      sub: "oklch(82.3% 0.011 67.7)",
      subAlt: "oklch(51.6% 0.002 197.1)",
      text: "oklch(18.7% 0 0)",
      error: "oklch(44.6% 0.088 303)",
      errorExtra: "oklch(34.9% 0.067 302.5)",
      colorfulError: "oklch(44.6% 0.088 303)",
      colorfulErrorExtra: "oklch(34.9% 0.067 302.5)"
    }
  },
  {
    name: "future_funk",
    colors: {
      bg: "oklch(27% 0.082 301.7)",
      main: "oklch(96.3% 0.012 79.8)",
      caret: "oklch(96.3% 0.012 79.8)",
      sub: "oklch(74.2% 0.163 303.2)",
      subAlt: "oklch(24.7% 0.069 301.5)",
      text: "oklch(96.3% 0.012 79.8)",
      error: "oklch(66.7% 0.208 356.2)",
      errorExtra: "oklch(52.8% 0.198 0.2)",
      colorfulError: "oklch(66.7% 0.208 356.2)",
      colorfulErrorExtra: "oklch(52.8% 0.198 0.2)"
    }
  },
  {
    name: "github",
    colors: {
      bg: "oklch(27.4% 0.018 251.9)",
      main: "oklch(75.2% 0.196 146.5)",
      caret: "oklch(75.2% 0.196 146.5)",
      sub: "oklch(60.2% 0.014 215.9)",
      subAlt: "oklch(21.9% 0.019 252.1)",
      text: "oklch(88.1% 0.022 243.8)",
      error: "oklch(55.4% 0.169 26)",
      errorExtra: "oklch(55.4% 0.169 26)",
      colorfulError: "oklch(55.4% 0.169 26)",
      colorfulErrorExtra: "oklch(55.4% 0.169 26)"
    }
  },
  {
    name: "godspeed",
    colors: {
      bg: "oklch(91.8% 0.029 93.8)",
      main: "oklch(77.4% 0.044 231.9)",
      caret: "oklch(87.8% 0.119 91)",
      sub: "oklch(73.3% 0.024 96.1)",
      subAlt: "oklch(88.5% 0.022 92.5)",
      text: "oklch(51% 0.005 258.3)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "graen",
    colors: {
      bg: "oklch(34.3% 0.019 163.6)",
      main: "oklch(68.1% 0.034 75.1)",
      caret: "oklch(32.7% 0.108 16.9)",
      sub: "oklch(22.4% 0.009 159.2)",
      subAlt: "oklch(37.4% 0.025 158.6)",
      text: "oklch(68.1% 0.034 75.1)",
      error: "oklch(32.7% 0.108 16.9)",
      errorExtra: "oklch(31.2% 0.118 20.6)",
      colorfulError: "oklch(32.7% 0.108 16.9)",
      colorfulErrorExtra: "oklch(31.2% 0.118 20.6)"
    }
  },
  {
    name: "grand_prix",
    colors: {
      bg: "oklch(39.2% 0.042 254)",
      main: "oklch(81.9% 0.169 115.5)",
      caret: "oklch(81.9% 0.169 115.5)",
      sub: "oklch(52.6% 0.037 254.2)",
      subAlt: "oklch(43.8% 0.045 257)",
      text: "oklch(83% 0.023 269.4)",
      error: "oklch(67.5% 0.209 36)",
      errorExtra: "oklch(67.5% 0.209 36)",
      colorfulError: "oklch(67.5% 0.209 36)",
      colorfulErrorExtra: "oklch(67.5% 0.209 36)"
    }
  },
  {
    name: "grape",
    colors: {
      bg: "oklch(22.2% 0.11 313)",
      main: "oklch(75.5% 0.178 59.7)",
      caret: "oklch(75.5% 0.178 59.7)",
      sub: "oklch(39.2% 0.13 337.2)",
      subAlt: "oklch(18.1% 0.09 313)",
      text: "oklch(100% 0 0)",
      error: "oklch(67.2% 0.228 5.7)",
      errorExtra: "oklch(52.8% 0.193 8.8)",
      colorfulError: "oklch(67.2% 0.228 5.7)",
      colorfulErrorExtra: "oklch(52.8% 0.193 8.8)"
    }
  },
  {
    name: "gruvbox_dark",
    colors: {
      bg: "oklch(27.7% 0 0)",
      main: "oklch(72.5% 0.143 77.7)",
      caret: "oklch(83.2% 0.159 83)",
      sub: "oklch(48.2% 0.018 61)",
      subAlt: "oklch(24.8% 0 0)",
      text: "oklch(89.4% 0.057 89.2)",
      error: "oklch(66% 0.218 30.4)",
      errorExtra: "oklch(54.6% 0.203 28.7)",
      colorfulError: "oklch(54.6% 0.203 28.7)",
      colorfulErrorExtra: "oklch(43.7% 0.179 28.3)"
    }
  },
  {
    name: "gruvbox_light",
    colors: {
      bg: "oklch(95.6% 0.055 96.2)",
      main: "oklch(64.5% 0.094 145.3)",
      caret: "oklch(64.5% 0.094 145.3)",
      sub: "oklch(69% 0.035 76.3)",
      subAlt: "oklch(85.3% 0.045 89.9)",
      text: "oklch(34.4% 0.007 48.5)",
      error: "oklch(54.6% 0.203 28.7)",
      errorExtra: "oklch(43.7% 0.179 28.3)",
      colorfulError: "oklch(54.6% 0.203 28.7)",
      colorfulErrorExtra: "oklch(43.7% 0.179 28.3)"
    }
  },
  {
    name: "hammerhead",
    colors: {
      bg: "oklch(12.7% 0.032 267)",
      main: "oklch(77.3% 0.115 180.8)",
      caret: "oklch(77.3% 0.115 180.8)",
      sub: "oklch(34.6% 0.052 245.8)",
      subAlt: "oklch(20.9% 0.036 250)",
      text: "oklch(94.8% 0.017 215.5)",
      error: "oklch(59.3% 0.218 27.1)",
      errorExtra: "oklch(47.8% 0.165 26.1)",
      colorfulError: "oklch(59.3% 0.218 27.1)",
      colorfulErrorExtra: "oklch(47.8% 0.165 26.1)"
    }
  },
  {
    name: "hanok",
    colors: {
      bg: "oklch(86.4% 0.021 88.7)",
      main: "oklch(37% 0.042 55.9)",
      caret: "oklch(37% 0.042 55.9)",
      sub: "oklch(56.4% 0.045 55.8)",
      subAlt: "oklch(81.4% 0.028 74.7)",
      text: "oklch(35% 0.003 197)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "hedge",
    colors: {
      bg: "oklch(44.7% 0.077 135.3)",
      main: "oklch(63.1% 0.117 134.9)",
      caret: "oklch(94.2% 0.067 104.9)",
      sub: "oklch(91.6% 0.064 99.8)",
      subAlt: "oklch(40.1% 0.067 134.8)",
      text: "oklch(95.6% 0.036 96.7)",
      error: "oklch(56.7% 0.178 24.1)",
      errorExtra: "oklch(40% 0.112 16.4)",
      colorfulError: "oklch(67.8% 0.156 35.2)",
      colorfulErrorExtra: "oklch(78.1% 0.127 57.9)"
    }
  },
  {
    name: "honey",
    colors: {
      bg: "oklch(78.7% 0.164 78.1)",
      main: "oklch(94.9% 0.183 106.1)",
      caret: "oklch(46.9% 0.098 77.1)",
      sub: "oklch(57.7% 0.124 71.6)",
      subAlt: "oklch(74.5% 0.155 78.3)",
      text: "oklch(94.4% 0.046 100.5)",
      error: "oklch(59.3% 0.208 26.3)",
      errorExtra: "oklch(36.4% 0.111 24.5)",
      colorfulError: "oklch(59.3% 0.208 26.3)",
      colorfulErrorExtra: "oklch(36.4% 0.111 24.5)"
    }
  },
  {
    name: "horizon",
    colors: {
      bg: "oklch(23.7% 0.016 274.1)",
      main: "oklch(74.9% 0.053 68.8)",
      caret: "oklch(79.2% 0 0)",
      sub: "oklch(70.8% 0.109 37.5)",
      subAlt: "oklch(21.1% 0.014 278.7)",
      text: "oklch(79.2% 0 0)",
      error: "oklch(61.8% 0.167 9.1)",
      errorExtra: "oklch(65.7% 0.229 26.3)",
      colorfulError: "oklch(61.8% 0.167 9.1)",
      colorfulErrorExtra: "oklch(61.8% 0.167 9.1)"
    }
  },
  {
    name: "husqy",
    colors: {
      bg: "oklch(0% 0 0)",
      main: "oklch(73.8% 0.172 305.9)",
      caret: "oklch(73.8% 0.172 305.9)",
      sub: "oklch(57.6% 0.276 299.8)",
      subAlt: "oklch(16.5% 0.076 328.4)",
      text: "oklch(90.8% 0.058 307.8)",
      error: "oklch(58.4% 0.203 26.2)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(58.4% 0.203 26.2)",
      colorfulErrorExtra: "oklch(37.8% 0.133 26.3)"
    }
  },
  {
    name: "iceberg_dark",
    colors: {
      bg: "oklch(21.1% 0.018 275)",
      main: "oklch(69.8% 0.064 256.1)",
      caret: "oklch(87.1% 0.014 277)",
      sub: "oklch(48.7% 0.039 275.7)",
      subAlt: "oklch(26.8% 0.023 277.4)",
      text: "oklch(83.4% 0.013 276.1)",
      error: "oklch(69.2% 0.132 21)",
      errorExtra: "oklch(76.8% 0.094 56.2)",
      colorfulError: "oklch(69.2% 0.132 21)",
      colorfulErrorExtra: "oklch(76.8% 0.094 56.2)"
    }
  },
  {
    name: "iceberg_light",
    colors: {
      bg: "oklch(93.4% 0.004 271.4)",
      main: "oklch(45.6% 0.13 262.3)",
      caret: "oklch(29.1% 0.039 275.4)",
      sub: "oklch(76.3% 0.027 276.3)",
      subAlt: "oklch(85.3% 0.017 278.5)",
      text: "oklch(34.2% 0.037 275.9)",
      error: "oklch(60.7% 0.16 2.4)",
      errorExtra: "oklch(57.4% 0.187 5.7)",
      colorfulError: "oklch(60.7% 0.16 2.4)",
      colorfulErrorExtra: "oklch(57.4% 0.187 5.7)"
    }
  },
  {
    name: "incognito",
    colors: {
      bg: "oklch(16.4% 0 0)",
      main: "oklch(77.2% 0.174 64.6)",
      caret: "oklch(77.2% 0.174 64.6)",
      sub: "oklch(45% 0 0)",
      subAlt: "oklch(19.6% 0 0)",
      text: "oklch(82.7% 0 0)",
      error: "oklch(62% 0.196 24.9)",
      errorExtra: "oklch(62% 0.196 24.9)",
      colorfulError: "oklch(51.5% 0.161 24.8)",
      colorfulErrorExtra: "oklch(51.5% 0.161 24.8)"
    }
  },
  {
    name: "ishtar",
    colors: {
      bg: "oklch(24.4% 0 0)",
      main: "oklch(42.4% 0.158 30)",
      caret: "oklch(67.6% 0.115 68.8)",
      sub: "oklch(57.9% 0.027 73.4)",
      subAlt: "oklch(27.3% 0 0)",
      text: "oklch(92.3% 0.048 72.2)",
      error: "oklch(51% 0.192 30)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(84.5% 0.18 116.9)",
      colorfulErrorExtra: "oklch(62.8% 0.131 116.7)"
    }
  },
  {
    name: "iv_clover",
    colors: {
      bg: "oklch(70.6% 0 0)",
      main: "oklch(39.2% 0.035 13.5)",
      caret: "oklch(64.3% 0 0)",
      sub: "oklch(32.9% 0 0)",
      subAlt: "oklch(80.2% 0 0)",
      text: "oklch(31.9% 0.031 326.3)",
      error: "oklch(58.3% 0.043 14.5)",
      errorExtra: "oklch(59.9% 0.043 14.5)",
      colorfulError: "oklch(66.2% 0.072 75.4)",
      colorfulErrorExtra: "oklch(69.5% 0.072 75.6)"
    }
  },
  {
    name: "iv_spade",
    colors: {
      bg: "oklch(15.4% 0 0)",
      main: "oklch(69.5% 0.072 75.6)",
      caret: "oklch(80.2% 0 0)",
      sub: "oklch(37.1% 0 0)",
      subAlt: "oklch(18.2% 0 0)",
      text: "oklch(82.8% 0.019 13.5)",
      error: "oklch(61.6% 0.042 14.4)",
      errorExtra: "oklch(64.9% 0.042 14.3)",
      colorfulError: "oklch(69.5% 0.072 75.6)",
      colorfulErrorExtra: "oklch(72.7% 0.071 75.7)"
    }
  },
  {
    name: "joker",
    colors: {
      bg: "oklch(19.3% 0.047 306.6)",
      main: "oklch(82.4% 0.212 129.1)",
      caret: "oklch(82.4% 0.212 129.1)",
      sub: "oklch(51.6% 0.125 301.5)",
      subAlt: "oklch(16.7% 0.048 306)",
      text: "oklch(92.4% 0.027 302.6)",
      error: "oklch(59.3% 0.218 27.1)",
      errorExtra: "oklch(47.8% 0.165 26.1)",
      colorfulError: "oklch(59.3% 0.218 27.1)",
      colorfulErrorExtra: "oklch(47.8% 0.165 26.1)"
    }
  },
  {
    name: "laser",
    colors: {
      bg: "oklch(25.5% 0.074 287.8)",
      main: "oklch(64% 0.11 208.2)",
      caret: "oklch(64% 0.11 208.2)",
      sub: "oklch(51.8% 0.185 7)",
      subAlt: "oklch(23.5% 0.067 289.2)",
      text: "oklch(91.9% 0.013 202.9)",
      error: "oklch(80.9% 0.199 123.4)",
      errorExtra: "oklch(55.9% 0.137 122.7)",
      colorfulError: "oklch(80.9% 0.199 123.4)",
      colorfulErrorExtra: "oklch(55.9% 0.137 122.7)"
    }
  },
  {
    name: "lavender",
    colors: {
      bg: "oklch(74% 0.041 296.8)",
      main: "oklch(91.8% 0.008 293.9)",
      caret: "oklch(91.8% 0.008 293.9)",
      sub: "oklch(91.8% 0.008 293.9)",
      subAlt: "oklch(70.5% 0.044 294.4)",
      text: "oklch(30.1% 0.041 293.7)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "leather",
    colors: {
      bg: "oklch(58.2% 0.094 47.9)",
      main: "oklch(93.1% 0.06 77.6)",
      caret: "oklch(68.6% 0.169 36.4)",
      sub: "oklch(46.4% 0.089 46.7)",
      subAlt: "oklch(54.4% 0.09 48.6)",
      text: "oklch(93.1% 0.06 77.6)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "lil_dragon",
    colors: {
      bg: "oklch(92.2% 0.022 316.5)",
      main: "oklch(58.1% 0.182 298.1)",
      caret: "oklch(29.2% 0.046 266.3)",
      sub: "oklch(67.7% 0.066 306.9)",
      subAlt: "oklch(85.4% 0.042 316)",
      text: "oklch(29.2% 0.046 266.3)",
      error: "oklch(78.5% 0.135 346.8)",
      errorExtra: "oklch(73.6% 0.17 344.9)",
      colorfulError: "oklch(78.5% 0.135 346.8)",
      colorfulErrorExtra: "oklch(73.6% 0.17 344.9)"
    }
  },
  {
    name: "lilac_mist",
    colors: {
      bg: "oklch(99.2% 0.006 334)",
      main: "oklch(56.4% 0.172 347)",
      caret: "oklch(77.2% 0.116 331.7 / 0.851)",
      sub: "oklch(75.6% 0.108 343)",
      subAlt: "oklch(91.3% 0.03 322.4 / 0.851)",
      text: "oklch(36.8% 0.096 333.6)",
      error: "oklch(71.6% 0.177 24.9)",
      errorExtra: "oklch(71.6% 0.177 24.9)",
      colorfulError: "oklch(68.1% 0.115 324.6)",
      colorfulErrorExtra: "oklch(58.7% 0.202 331.6)"
    }
  },
  {
    name: "lime",
    colors: {
      bg: "oklch(61.7% 0.017 235.6)",
      main: "oklch(75.6% 0.16 127.6)",
      caret: "oklch(75.6% 0.16 127.6)",
      sub: "oklch(43.4% 0.012 238.8)",
      subAlt: "oklch(58.3% 0.014 229.1)",
      text: "oklch(84.6% 0.025 242.4)",
      error: "oklch(62.3% 0.209 32.9)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(62.3% 0.209 32.9)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "luna",
    colors: {
      bg: "oklch(24.7% 0.047 293.7)",
      main: "oklch(72.3% 0.161 4.4)",
      caret: "oklch(72.3% 0.161 4.4)",
      sub: "oklch(41.8% 0.113 303.6)",
      subAlt: "oklch(28.8% 0.064 298.1)",
      text: "oklch(94.1% 0.032 358.5)",
      error: "oklch(82.9% 0.138 85.9)",
      errorExtra: "oklch(70.2% 0.13 83.9)",
      colorfulError: "oklch(82.9% 0.138 85.9)",
      colorfulErrorExtra: "oklch(70.2% 0.13 83.9)"
    }
  },
  {
    name: "macroblank",
    colors: {
      bg: "oklch(83.7% 0.037 174.5)",
      main: "oklch(53.6% 0.185 32.4)",
      caret: "oklch(54.9% 0.009 358)",
      sub: "oklch(56.9% 0.01 179.4)",
      subAlt: "oklch(87.8% 0.028 167.7)",
      text: "oklch(26.5% 0.094 26.5)",
      error: "oklch(53.6% 0.185 32.4)",
      errorExtra: "oklch(97.8% 0.011 17.3)",
      colorfulError: "oklch(97.8% 0.011 17.3)",
      colorfulErrorExtra: "oklch(94.2% 0.056 81.9)"
    }
  },
  {
    name: "magic_girl",
    colors: {
      bg: "oklch(100% 0 0)",
      main: "oklch(83.1% 0.086 353.6)",
      caret: "oklch(66.4% 0.178 356.5)",
      sub: "oklch(87.1% 0.088 176.7)",
      subAlt: "oklch(96.1% 0 0)",
      text: "oklch(66.4% 0.127 173.1)",
      error: "oklch(92.4% 0.102 91.3)",
      errorExtra: "oklch(66.4% 0.178 356.5)",
      colorfulError: "oklch(92.1% 0.119 94)",
      colorfulErrorExtra: "oklch(66.4% 0.178 356.5)"
    }
  },
  {
    name: "mashu",
    colors: {
      bg: "oklch(28.9% 0.002 286.3)",
      main: "oklch(55% 0.078 296.6)",
      caret: "oklch(55% 0.078 296.6)",
      sub: "oklch(76% 0.067 11.6)",
      subAlt: "oklch(26.7% 0.015 302.4)",
      text: "oklch(92.5% 0.017 8.2)",
      error: "oklch(59.2% 0.182 33.6)",
      errorExtra: "oklch(44.5% 0.134 34.2)",
      colorfulError: "oklch(59.2% 0.182 33.6)",
      colorfulErrorExtra: "oklch(44.5% 0.134 34.2)"
    }
  },
  {
    name: "matcha_moccha",
    colors: {
      bg: "oklch(35.9% 0.049 49.5)",
      main: "oklch(74.4% 0.147 136.8)",
      caret: "oklch(74.4% 0.147 136.8)",
      sub: "oklch(56.6% 0.083 49.1)",
      subAlt: "oklch(31.3% 0.041 50.2)",
      text: "oklch(90.5% 0.028 70.9)",
      error: "oklch(66% 0.218 30.4)",
      errorExtra: "oklch(54.6% 0.203 28.7)",
      colorfulError: "oklch(66% 0.218 30.4)",
      colorfulErrorExtra: "oklch(54.6% 0.203 28.7)"
    }
  },
  {
    name: "material",
    colors: {
      bg: "oklch(30.9% 0.019 229.8)",
      main: "oklch(79.1% 0.075 188.2)",
      caret: "oklch(79.1% 0.075 188.2)",
      sub: "oklch(49.7% 0.036 224.9)",
      subAlt: "oklch(34.7% 0.022 229.8)",
      text: "oklch(94.3% 0.011 243.7)",
      error: "oklch(66% 0.218 30.4)",
      errorExtra: "oklch(54.6% 0.203 28.7)",
      colorfulError: "oklch(66% 0.218 30.4)",
      colorfulErrorExtra: "oklch(54.6% 0.203 28.7)"
    }
  },
  {
    name: "matrix",
    colors: {
      bg: "oklch(0% 0 0)",
      main: "oklch(86.7% 0.294 142.3)",
      caret: "oklch(86.7% 0.294 142.3)",
      sub: "oklch(43.9% 0.149 142.5)",
      subAlt: "oklch(21.3% 0.069 140.6)",
      text: "oklch(95.5% 0.081 142.8)",
      error: "oklch(58.4% 0.203 26.2)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(58.4% 0.203 26.2)",
      colorfulErrorExtra: "oklch(37.8% 0.133 26.3)"
    }
  },
  {
    name: "menthol",
    colors: {
      bg: "oklch(71.8% 0.151 164.9)",
      main: "oklch(100% 0 0)",
      caret: "oklch(92.2% 0.108 168.3)",
      sub: "oklch(45.2% 0.091 160.2)",
      subAlt: "oklch(66.7% 0.138 163.9)",
      text: "oklch(100% 0 0)",
      error: "oklch(60.3% 0.201 25.6)",
      errorExtra: "oklch(49.8% 0.176 26.5)",
      colorfulError: "oklch(60.3% 0.201 25.6)",
      colorfulErrorExtra: "oklch(49.8% 0.176 26.5)"
    }
  },
  {
    name: "metaverse",
    colors: {
      bg: "oklch(25.6% 0 0)",
      main: "oklch(57.3% 0.208 24.3)",
      caret: "oklch(57.3% 0.208 24.3)",
      sub: "oklch(48.2% 0 0)",
      subAlt: "oklch(23.1% 0 0)",
      text: "oklch(93.1% 0 0)",
      error: "oklch(58.4% 0.203 26.2)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(85.9% 0.175 110.6)",
      colorfulErrorExtra: "oklch(55.3% 0.115 113.2)"
    }
  },
  {
    name: "metropolis",
    colors: {
      bg: "oklch(23.2% 0.033 244.5)",
      main: "oklch(75% 0.101 185.5)",
      caret: "oklch(75% 0.101 185.5)",
      sub: "oklch(49.5% 0.072 232.1)",
      subAlt: "oklch(20.2% 0.027 242.9)",
      text: "oklch(94% 0.011 226)",
      error: "oklch(59.2% 0.182 33.6)",
      errorExtra: "oklch(44.5% 0.134 34.2)",
      colorfulError: "oklch(59.2% 0.182 33.6)",
      colorfulErrorExtra: "oklch(44.5% 0.134 34.2)"
    }
  },
  {
    name: "mexican",
    colors: {
      bg: "oklch(80.1% 0.154 74.1)",
      main: "oklch(52.4% 0.203 342.4)",
      caret: "oklch(94.9% 0 0)",
      sub: "oklch(32.1% 0 0)",
      subAlt: "oklch(82.6% 0.14 76.6)",
      text: "oklch(94.9% 0 0)",
      error: "oklch(58.4% 0.203 26.2)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(58.4% 0.203 26.2)",
      colorfulErrorExtra: "oklch(37.8% 0.133 26.3)"
    }
  },
  {
    name: "miami",
    colors: {
      bg: "oklch(67.4% 0.197 4.2)",
      main: "oklch(81.6% 0.14 190.2)",
      caret: "oklch(90.8% 0.113 154.4)",
      sub: "oklch(45.7% 0.144 5.2)",
      subAlt: "oklch(62% 0.185 4.2)",
      text: "oklch(94% 0.009 349.3)",
      error: "oklch(95.7% 0.122 103.4)",
      errorExtra: "oklch(75.3% 0.095 103.6)",
      colorfulError: "oklch(95.7% 0.122 103.4)",
      colorfulErrorExtra: "oklch(75.3% 0.095 103.6)"
    }
  },
  {
    name: "miami_nights",
    colors: {
      bg: "oklch(21% 0.004 286.1)",
      main: "oklch(67.1% 0.174 354.9)",
      caret: "oklch(67.1% 0.174 354.9)",
      sub: "oklch(72.7% 0.102 200)",
      subAlt: "oklch(16.9% 0.002 286.2)",
      text: "oklch(100% 0 0)",
      error: "oklch(95.7% 0.122 103.4)",
      errorExtra: "oklch(74.4% 0.093 103.5)",
      colorfulError: "oklch(95.7% 0.122 103.4)",
      colorfulErrorExtra: "oklch(74.4% 0.093 103.5)"
    }
  },
  {
    name: "midnight",
    colors: {
      bg: "oklch(16.3% 0.012 260.6)",
      main: "oklch(56.3% 0.07 263.8)",
      caret: "oklch(56.3% 0.07 263.8)",
      sub: "oklch(39.7% 0.046 261.8)",
      subAlt: "oklch(21.7% 0.022 260.5)",
      text: "oklch(74.5% 0.039 262.1)",
      error: "oklch(63.6% 0.104 20.4)",
      errorExtra: "oklch(68.4% 0.078 47.1)",
      colorfulError: "oklch(63.6% 0.104 20.4)",
      colorfulErrorExtra: "oklch(68.4% 0.078 47.1)"
    }
  },
  {
    name: "milkshake",
    colors: {
      bg: "oklch(100% 0 0)",
      main: "oklch(29.2% 0.046 266.3)",
      caret: "oklch(29.2% 0.046 266.3)",
      sub: "oklch(79.9% 0.104 213.5)",
      subAlt: "oklch(94% 0.02 212.5)",
      text: "oklch(29.2% 0.046 266.3)",
      error: "oklch(78.4% 0.102 8)",
      errorExtra: "oklch(73.7% 0.11 7.7)",
      colorfulError: "oklch(78.4% 0.102 8)",
      colorfulErrorExtra: "oklch(73.7% 0.11 7.7)"
    }
  },
  {
    name: "mint",
    colors: {
      bg: "oklch(32.9% 0.079 245.4)",
      main: "oklch(80.2% 0.152 156.3)",
      caret: "oklch(80.2% 0.152 156.3)",
      sub: "oklch(48.9% 0.088 233.5)",
      subAlt: "oklch(30.5% 0.067 243.1)",
      text: "oklch(95.9% 0.028 124.8)",
      error: "oklch(67.4% 0.197 4.2)",
      errorExtra: "oklch(50.3% 0.144 4.3)",
      colorfulError: "oklch(67.4% 0.197 4.2)",
      colorfulErrorExtra: "oklch(50.3% 0.144 4.3)"
    }
  },
  {
    name: "mizu",
    colors: {
      bg: "oklch(82.7% 0.039 236.2)",
      main: "oklch(98.7% 0.007 97.3)",
      caret: "oklch(98.7% 0.007 97.3)",
      sub: "oklch(70.6% 0.048 238.4)",
      subAlt: "oklch(79.2% 0.045 232.6)",
      text: "oklch(26.4% 0.03 251)",
      error: "oklch(60.6% 0.121 15.3)",
      errorExtra: "oklch(44% 0.082 14.6)",
      colorfulError: "oklch(60.6% 0.121 15.3)",
      colorfulErrorExtra: "oklch(44% 0.082 14.6)"
    }
  },
  {
    name: "modern_dolch",
    colors: {
      bg: "oklch(30.1% 0.004 264.5)",
      main: "oklch(83.6% 0.092 186.9)",
      caret: "oklch(83.6% 0.092 186.9)",
      sub: "oklch(45.8% 0.008 248)",
      subAlt: "oklch(26.4% 0.004 264.5)",
      text: "oklch(92.4% 0.008 260.7)",
      error: "oklch(65.2% 0.133 11.3)",
      errorExtra: "oklch(49.7% 0.119 9)",
      colorfulError: "oklch(65.2% 0.133 11.3)",
      colorfulErrorExtra: "oklch(49.7% 0.119 9)"
    }
  },
  {
    name: "modern_dolch_light",
    colors: {
      bg: "oklch(89.1% 0 0)",
      main: "oklch(81.2% 0.07 179.7)",
      caret: "oklch(81.2% 0.07 179.7)",
      sub: "oklch(71.3% 0.001 17.2)",
      subAlt: "oklch(93.1% 0 0)",
      text: "oklch(39% 0 0)",
      error: "oklch(73.9% 0.118 9.6)",
      errorExtra: "oklch(63.8% 0.173 13.1)",
      colorfulError: "oklch(73.9% 0.118 9.6)",
      colorfulErrorExtra: "oklch(63.8% 0.173 13.1)"
    }
  },
  {
    name: "modern_ink",
    colors: {
      bg: "oklch(100% 0 0)",
      main: "oklch(64.9% 0.239 32.3)",
      caret: "oklch(62.8% 0.258 29.2)",
      sub: "oklch(77.9% 0 0)",
      subAlt: "oklch(94.3% 0 0)",
      text: "oklch(0% 0 0)",
      error: "oklch(55.2% 0.227 29.2)",
      errorExtra: "oklch(47.5% 0.195 29.2)",
      colorfulError: "oklch(0% 0 0)",
      colorfulErrorExtra: "oklch(0% 0 0)"
    }
  },
  {
    name: "monokai",
    colors: {
      bg: "oklch(27.4% 0.011 114.8)",
      main: "oklch(84.1% 0.204 127.3)",
      caret: "oklch(82.7% 0.108 212)",
      sub: "oklch(87.9% 0.125 103.2)",
      subAlt: "oklch(24.1% 0.009 116.3)",
      text: "oklch(91.1% 0.008 106.6)",
      error: "oklch(64.2% 0.24 7.5)",
      errorExtra: "oklch(76.7% 0.168 62.4)",
      colorfulError: "oklch(64.2% 0.24 7.5)",
      colorfulErrorExtra: "oklch(76.7% 0.168 62.4)"
    }
  },
  {
    name: "moonlight",
    colors: {
      bg: "oklch(23.7% 0.02 258.4)",
      main: "oklch(72.6% 0.086 75.3)",
      caret: "oklch(57.5% 0.066 77.3)",
      sub: "oklch(46.4% 0.049 263.9)",
      subAlt: "oklch(21.5% 0.018 255.7)",
      text: "oklch(83.9% 0.031 107.1)",
      error: "oklch(50.5% 0.189 22.9)",
      errorExtra: "oklch(39.8% 0.146 22.4)",
      colorfulError: "oklch(50.5% 0.189 22.9)",
      colorfulErrorExtra: "oklch(39.8% 0.146 22.4)"
    }
  },
  {
    name: "mountain",
    colors: {
      bg: "oklch(16.8% 0 0)",
      main: "oklch(92.8% 0 0)",
      caret: "oklch(97% 0 0)",
      sub: "oklch(41.7% 0 0)",
      subAlt: "oklch(21.8% 0 0)",
      text: "oklch(92.8% 0 0)",
      error: "oklch(67% 0.039 18.2)",
      errorExtra: "oklch(73.4% 0.045 14.7)",
      colorfulError: "oklch(72.9% 0.043 102.8)",
      colorfulErrorExtra: "oklch(80.4% 0.047 103.4)"
    }
  },
  {
    name: "mr_sleeves",
    colors: {
      bg: "oklch(87.5% 0.008 228.9)",
      main: "oklch(77.6% 0.061 36.5)",
      caret: "oklch(73.5% 0.052 246.7)",
      sub: "oklch(69.9% 0.006 223.5)",
      subAlt: "oklch(83.5% 0.016 229)",
      text: "oklch(23.1% 0 0)",
      error: "oklch(60.9% 0.117 21.1)",
      errorExtra: "oklch(44% 0.082 14.6)",
      colorfulError: "oklch(73.5% 0.052 246.7)",
      colorfulErrorExtra: "oklch(57.7% 0.041 247.3)"
    }
  },
  {
    name: "ms_cupcakes",
    colors: {
      bg: "oklch(100% 0 0)",
      main: "oklch(81.7% 0.114 217.1)",
      caret: "oklch(30.9% 0 0)",
      sub: "oklch(61.1% 0.2 351.9)",
      subAlt: "oklch(97.1% 0.012 209.8)",
      text: "oklch(25.8% 0.037 216)",
      error: "oklch(82.9% 0.198 127)",
      errorExtra: "oklch(74.1% 0.168 126.3)",
      colorfulError: "oklch(82.9% 0.198 127)",
      colorfulErrorExtra: "oklch(71% 0.162 126.6)"
    }
  },
  {
    name: "muted",
    colors: {
      bg: "oklch(43.9% 0 0)",
      main: "oklch(80% 0.068 301.4)",
      caret: "oklch(88.3% 0.052 194.7)",
      sub: "oklch(69.6% 0.027 257.7)",
      subAlt: "oklch(40.5% 0 0)",
      text: "oklch(88.3% 0.052 194.7)",
      error: "oklch(85.3% 0.052 0.1)",
      errorExtra: "oklch(85.3% 0.052 0.1)",
      colorfulError: "oklch(85.3% 0.052 0.1)",
      colorfulErrorExtra: "oklch(85.3% 0.052 0.1)"
    }
  },
  {
    name: "nautilus",
    colors: {
      bg: "oklch(25% 0.045 257)",
      main: "oklch(80.5% 0.157 86.8)",
      caret: "oklch(80.5% 0.157 86.8)",
      sub: "oklch(39.5% 0.081 236.9)",
      subAlt: "oklch(21.5% 0.034 254.6)",
      text: "oklch(71.2% 0.121 185.1)",
      error: "oklch(58.4% 0.203 26.2)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(58.4% 0.203 26.2)",
      colorfulErrorExtra: "oklch(37.8% 0.133 26.3)"
    }
  },
  {
    name: "nebula",
    colors: {
      bg: "oklch(25.8% 0.037 283.5)",
      main: "oklch(56.6% 0.182 348.5)",
      caret: "oklch(75% 0.198 133.3)",
      sub: "oklch(69.8% 0.115 198.5)",
      subAlt: "oklch(22.1% 0.029 283.8)",
      text: "oklch(61.8% 0.004 197.1)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "night_runner",
    colors: {
      bg: "oklch(24.8% 0 0)",
      main: "oklch(96.7% 0.211 110.1)",
      caret: "oklch(96.7% 0.211 110.1)",
      sub: "oklch(46.9% 0.128 290.7)",
      subAlt: "oklch(21.8% 0 0)",
      text: "oklch(93.1% 0 0)",
      error: "oklch(58.4% 0.203 26.2)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(58.4% 0.203 26.2)",
      colorfulErrorExtra: "oklch(37.8% 0.133 26.3)"
    }
  },
  {
    name: "nord",
    colors: {
      bg: "oklch(28% 0.02 264.2)",
      main: "oklch(77.5% 0.062 217.5)",
      caret: "oklch(95.1% 0.007 260.7)",
      sub: "oklch(68.5% 0.025 264.4)",
      subAlt: "oklch(32.4% 0.023 264.2)",
      text: "oklch(89.9% 0.016 262.7)",
      error: "oklch(60.6% 0.121 15.3)",
      errorExtra: "oklch(44% 0.082 14.6)",
      colorfulError: "oklch(60.6% 0.121 15.3)",
      colorfulErrorExtra: "oklch(44% 0.082 14.6)"
    }
  },
  {
    name: "nord_light",
    colors: {
      bg: "oklch(95.1% 0.007 260.7)",
      main: "oklch(76.3% 0.048 194.5)",
      caret: "oklch(76.3% 0.048 194.5)",
      sub: "oklch(56.8% 0.043 264.1)",
      subAlt: "oklch(89.9% 0.016 262.7)",
      text: "oklch(76.3% 0.048 194.5)",
      error: "oklch(60.6% 0.121 15.3)",
      errorExtra: "oklch(44% 0.082 14.6)",
      colorfulError: "oklch(60.6% 0.121 15.3)",
      colorfulErrorExtra: "oklch(44% 0.082 14.6)"
    }
  },
  {
    name: "norse",
    colors: {
      bg: "oklch(26.1% 0.002 286.3)",
      main: "oklch(45.6% 0.06 217.9)",
      caret: "oklch(45.6% 0.06 217.9)",
      sub: "oklch(46.3% 0.015 215.9)",
      subAlt: "oklch(31.8% 0.004 196.9)",
      text: "oklch(81.8% 0.026 81.1)",
      error: "oklch(41.1% 0.117 23.8)",
      errorExtra: "oklch(38.1% 0.124 25.3)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "oblivion",
    colors: {
      bg: "oklch(31.6% 0.002 145.5)",
      main: "oklch(70.7% 0.015 84.6)",
      caret: "oklch(70.7% 0.015 84.6)",
      sub: "oklch(49.2% 0.006 211)",
      subAlt: "oklch(35.1% 0.001 197.1)",
      text: "oklch(97.1% 0.006 84.6)",
      error: "oklch(60.5% 0.192 31.5)",
      errorExtra: "oklch(47.8% 0.144 31.7)",
      colorfulError: "oklch(60.5% 0.192 31.5)",
      colorfulErrorExtra: "oklch(47.8% 0.144 31.7)"
    }
  },
  {
    name: "olive",
    colors: {
      bg: "oklch(91.8% 0.033 99.6)",
      main: "oklch(65.5% 0.052 110.3)",
      caret: "oklch(65.5% 0.052 110.3)",
      sub: "oklch(76.4% 0.029 98.2)",
      subAlt: "oklch(85.3% 0.026 94.8)",
      text: "oklch(33.5% 0.01 106.9)",
      error: "oklch(56.1% 0.196 26.3)",
      errorExtra: "oklch(47.4% 0.158 25.6)",
      colorfulError: "oklch(56.1% 0.196 26.3)",
      colorfulErrorExtra: "oklch(47.4% 0.158 25.6)"
    }
  },
  {
    name: "olivia",
    colors: {
      bg: "oklch(22.4% 0.004 308.3)",
      main: "oklch(79.2% 0.061 42)",
      caret: "oklch(79.2% 0.061 42)",
      sub: "oklch(38.1% 0.022 18.2)",
      subAlt: "oklch(25.7% 0.006 0.5)",
      text: "oklch(95.4% 0.004 56.4)",
      error: "oklch(60.6% 0.121 15.3)",
      errorExtra: "oklch(44% 0.082 14.6)",
      colorfulError: "oklch(60.7% 0.199 19.9)",
      colorfulErrorExtra: "oklch(49.7% 0.159 19.9)"
    }
  },
  {
    name: "onedark",
    colors: {
      bg: "oklch(32.5% 0.021 265.9)",
      main: "oklch(73% 0.121 245.3)",
      caret: "oklch(73% 0.121 245.3)",
      sub: "oklch(95.1% 0.007 260.7)",
      subAlt: "oklch(28.8% 0.018 262.2)",
      text: "oklch(76.8% 0.11 133)",
      error: "oklch(67.1% 0.145 17)",
      errorExtra: "oklch(56.7% 0.21 22.9)",
      colorfulError: "oklch(56.7% 0.21 22.9)",
      colorfulErrorExtra: "oklch(62.9% 0.257 27.5)"
    }
  },
  {
    name: "our_theme",
    colors: {
      bg: "oklch(54.2% 0.212 24.9)",
      main: "oklch(87.2% 0.176 93.5)",
      caret: "oklch(87.2% 0.176 93.5)",
      sub: "oklch(34.8% 0.126 22.1)",
      subAlt: "oklch(44.9% 0.173 23.8)",
      text: "oklch(100% 0 0)",
      error: "oklch(87.2% 0.176 93.5)",
      errorExtra: "oklch(87.2% 0.176 93.5)",
      colorfulError: "oklch(58.6% 0.221 259.8)",
      colorfulErrorExtra: "oklch(58.6% 0.221 259.8)"
    }
  },
  {
    name: "paper",
    colors: {
      bg: "oklch(94.9% 0 0)",
      main: "oklch(38.7% 0 0)",
      caret: "oklch(38.7% 0 0)",
      sub: "oklch(76.4% 0 0)",
      subAlt: "oklch(89.8% 0 0)",
      text: "oklch(38.7% 0 0)",
      error: "oklch(55.2% 0.227 29.2)",
      errorExtra: "oklch(55.2% 0.227 29.2)",
      colorfulError: "oklch(55.2% 0.227 29.2)",
      colorfulErrorExtra: "oklch(55.2% 0.227 29.2)"
    }
  },
  {
    name: "passion_fruit",
    colors: {
      bg: "oklch(40.3% 0.127 2.8)",
      main: "oklch(79.9% 0.098 5.8)",
      caret: "oklch(100% 0 0)",
      sub: "oklch(68.3% 0.053 291.3)",
      subAlt: "oklch(46% 0.106 352.1)",
      text: "oklch(100% 0 0)",
      error: "oklch(79.3% 0.161 93.7)",
      errorExtra: "oklch(79.3% 0.161 93.7)",
      colorfulError: "oklch(79.3% 0.161 93.7)",
      colorfulErrorExtra: "oklch(79.3% 0.161 93.7)"
    }
  },
  {
    name: "pastel",
    colors: {
      bg: "oklch(80.8% 0.055 2.4)",
      main: "oklch(95.8% 0.079 102.4)",
      caret: "oklch(95.8% 0.079 102.4)",
      sub: "oklch(90.5% 0.062 225.3)",
      subAlt: "oklch(75.3% 0.062 3.1)",
      text: "oklch(49.8% 0.036 322.7)",
      error: "oklch(70.7% 0.185 25.9)",
      errorExtra: "oklch(54.8% 0.176 32.7)",
      colorfulError: "oklch(70.7% 0.185 25.9)",
      colorfulErrorExtra: "oklch(54.8% 0.176 32.7)"
    }
  },
  {
    name: "peach_blossom",
    colors: {
      bg: "oklch(28.1% 0 0)",
      main: "oklch(75.1% 0.056 144.2)",
      caret: "oklch(49.3% 0 0)",
      sub: "oklch(49.3% 0 0)",
      subAlt: "oklch(32.4% 0.018 225.1)",
      text: "oklch(88.4% 0.074 60)",
      error: "oklch(70.7% 0.185 25.9)",
      errorExtra: "oklch(63.6% 0.193 17.1)",
      colorfulError: "oklch(70.7% 0.185 25.9)",
      colorfulErrorExtra: "oklch(63.6% 0.193 17.1)"
    }
  },
  {
    name: "peaches",
    colors: {
      bg: "oklch(88% 0.031 88.4)",
      main: "oklch(68.4% 0.13 36.2)",
      caret: "oklch(68.4% 0.13 36.2)",
      sub: "oklch(80.3% 0.079 55.5)",
      subAlt: "oklch(85.2% 0.045 70.4)",
      text: "oklch(43.3% 0.031 51.7)",
      error: "oklch(70.7% 0.185 25.9)",
      errorExtra: "oklch(54.8% 0.176 32.7)",
      colorfulError: "oklch(70.7% 0.185 25.9)",
      colorfulErrorExtra: "oklch(54.8% 0.176 32.7)"
    }
  },
  {
    name: "phantom",
    colors: {
      bg: "oklch(8% 0.056 264.1)",
      main: "oklch(71.9% 0.132 264.2)",
      caret: "oklch(75.1% 0.134 299.5)",
      sub: "oklch(40.9% 0.055 274.3)",
      subAlt: "oklch(28.2% 0.036 274.7)",
      text: "oklch(84.6% 0.061 274.8)",
      error: "oklch(72.3% 0.159 10.3)",
      errorExtra: "oklch(61.2% 0.18 24.1)",
      colorfulError: "oklch(74% 0.163 10.2)",
      colorfulErrorExtra: "oklch(78.7% 0.137 50.6)"
    }
  },
  {
    name: "pink_lemonade",
    colors: {
      bg: "oklch(89.4% 0.095 88.2)",
      main: "oklch(79% 0.104 30.5)",
      caret: "oklch(99% 0.005 106.5)",
      sub: "oklch(81.6% 0.092 44.1)",
      subAlt: "oklch(86.9% 0.087 74.7)",
      text: "oklch(99% 0.005 106.5)",
      error: "oklch(71.6% 0.177 24.9)",
      errorExtra: "oklch(71.6% 0.177 24.9)",
      colorfulError: "oklch(71.6% 0.177 24.9)",
      colorfulErrorExtra: "oklch(71.6% 0.177 24.9)"
    }
  },
  {
    name: "pulse",
    colors: {
      bg: "oklch(20.9% 0 0)",
      main: "oklch(71.2% 0.118 198.4)",
      caret: "oklch(71.2% 0.118 198.4)",
      sub: "oklch(45.2% 0.008 255.5)",
      subAlt: "oklch(18.2% 0 0)",
      text: "oklch(95.6% 0.016 196.9)",
      error: "oklch(58.4% 0.203 26.2)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(58.4% 0.203 26.2)",
      colorfulErrorExtra: "oklch(37.8% 0.133 26.3)"
    }
  },
  {
    name: "purpleish",
    colors: {
      bg: "oklch(24.5% 0.038 283.3)",
      main: "oklch(54.4% 0.181 294.8)",
      caret: "oklch(54.4% 0.181 294.8)",
      sub: "oklch(50.2% 0.096 282.4)",
      subAlt: "oklch(21.8% 0.033 283.3)",
      text: "oklch(73% 0.059 284.8)",
      error: "oklch(70.4% 0.187 23.2)",
      errorExtra: "oklch(70.4% 0.187 23.2)",
      colorfulError: "oklch(70.4% 0.187 23.2)",
      colorfulErrorExtra: "oklch(70.4% 0.187 23.2)"
    }
  },
  {
    name: "rainbow_trail",
    colors: {
      bg: "oklch(97% 0 0)",
      main: "oklch(33.3% 0 0)",
      caret: "oklch(15.9% 0 0)",
      sub: "oklch(42.8% 0 0)",
      subAlt: "oklch(90.7% 0 0)",
      text: "oklch(23.9% 0 0)",
      error: "oklch(62.8% 0.257 28.8)",
      errorExtra: "",
      colorfulError: "oklch(62.8% 0.257 28.8)",
      colorfulErrorExtra: ""
    }
  },
  {
    name: "red_dragon",
    colors: {
      bg: "oklch(17.3% 0.026 15.9)",
      main: "oklch(65.4% 0.233 28.1)",
      caret: "oklch(65.4% 0.233 28.1)",
      sub: "oklch(76.1% 0.147 79.7)",
      subAlt: "oklch(13.1% 0.019 10.8)",
      text: "oklch(41.8% 0.004 219.6)",
      error: "oklch(37.9% 0.126 23.5)",
      errorExtra: "oklch(31.1% 0.101 22.4)",
      colorfulError: "oklch(37.9% 0.126 23.5)",
      colorfulErrorExtra: "oklch(31.1% 0.101 22.4)"
    }
  },
  {
    name: "red_samurai",
    colors: {
      bg: "oklch(41.1% 0.134 19)",
      main: "oklch(72.6% 0.08 70.4)",
      caret: "oklch(72.6% 0.08 70.4)",
      sub: "oklch(30.3% 0.096 18.4)",
      subAlt: "oklch(37.8% 0.121 19.7)",
      text: "oklch(89.2% 0.016 73.7)",
      error: "oklch(73.5% 0.119 217.1)",
      errorExtra: "oklch(48.7% 0.078 211.7)",
      colorfulError: "oklch(73.5% 0.119 217.1)",
      colorfulErrorExtra: "oklch(47.6% 0.078 217)"
    }
  },
  {
    name: "repose_dark",
    colors: {
      bg: "oklch(31.9% 0.011 254)",
      main: "oklch(86.1% 0.03 98.5)",
      caret: "oklch(86.1% 0.03 98.5)",
      sub: "oklch(64.5% 0.015 102.2)",
      subAlt: "oklch(35.5% 0.003 228.9)",
      text: "oklch(86.1% 0.03 98.5)",
      error: "oklch(67.2% 0.216 20.8)",
      errorExtra: "oklch(56% 0.172 15)",
      colorfulError: "oklch(67.2% 0.216 20.8)",
      colorfulErrorExtra: "oklch(56% 0.172 15)"
    }
  },
  {
    name: "repose_light",
    colors: {
      bg: "oklch(93.4% 0.035 98.1)",
      main: "oklch(48.7% 0.003 128.5)",
      caret: "oklch(48.7% 0.003 128.5)",
      sub: "oklch(64.5% 0.015 102.2)",
      subAlt: "oklch(87.5% 0.025 94.1)",
      text: "oklch(32.8% 0.006 258.4)",
      error: "oklch(56% 0.172 15)",
      errorExtra: "oklch(47.8% 0.162 21.2)",
      colorfulError: "oklch(56% 0.172 15)",
      colorfulErrorExtra: "oklch(47.8% 0.162 21.2)"
    }
  },
  {
    name: "retro",
    colors: {
      bg: "oklch(86.8% 0.025 89.2)",
      main: "oklch(22.3% 0.008 84.6)",
      caret: "oklch(22.3% 0.008 84.6)",
      sub: "oklch(63.8% 0.022 87.6)",
      subAlt: "oklch(81.7% 0.023 92.5)",
      text: "oklch(22.3% 0.008 84.6)",
      error: "oklch(60.6% 0.121 15.3)",
      errorExtra: "oklch(44% 0.082 14.6)",
      colorfulError: "oklch(60.6% 0.121 15.3)",
      colorfulErrorExtra: "oklch(44% 0.082 14.6)"
    }
  },
  {
    name: "retrocast",
    colors: {
      bg: "oklch(50.7% 0.085 202.4)",
      main: "oklch(84% 0.081 199.7)",
      caret: "oklch(84% 0.081 199.7)",
      sub: "oklch(89.6% 0.172 102.5)",
      subAlt: "oklch(56.6% 0.085 201.3)",
      text: "oklch(100% 0 0)",
      error: "oklch(68.7% 0.203 22.6)",
      errorExtra: "oklch(56.3% 0.159 15.8)",
      colorfulError: "oklch(68.7% 0.203 22.6)",
      colorfulErrorExtra: "oklch(56.3% 0.159 15.8)"
    }
  },
  {
    name: "rgb",
    colors: {
      bg: "oklch(17.8% 0 0)",
      main: "oklch(94.9% 0 0)",
      caret: "oklch(94.9% 0 0)",
      sub: "oklch(38.7% 0 0)",
      subAlt: "oklch(21.8% 0 0)",
      text: "oklch(94.9% 0 0)",
      error: "oklch(94.9% 0 0)",
      errorExtra: "oklch(76.7% 0 0)",
      colorfulError: "oklch(94.9% 0 0)",
      colorfulErrorExtra: "oklch(76.7% 0 0)"
    }
  },
  {
    name: "rose_pine",
    colors: {
      bg: "oklch(23.7% 0.019 294.1)",
      main: "oklch(82.2% 0.054 209.6)",
      caret: "oklch(84.3% 0.11 74.6)",
      sub: "oklch(77.6% 0.095 305)",
      subAlt: "oklch(27.4% 0.026 294.5)",
      text: "oklch(90.9% 0.03 290)",
      error: "oklch(69.8% 0.156 4.2)",
      errorExtra: "oklch(83.6% 0.054 21.1)",
      colorfulError: "oklch(69.8% 0.156 4.2)",
      colorfulErrorExtra: "oklch(83.6% 0.054 21.1)"
    }
  },
  {
    name: "rose_pine_dawn",
    colors: {
      bg: "oklch(98.7% 0.011 76.6)",
      main: "oklch(62.9% 0.066 210.1)",
      caret: "oklch(75.5% 0.146 69.7)",
      sub: "oklch(77.6% 0.095 305)",
      subAlt: "oklch(93.7% 0.015 77.1)",
      text: "oklch(49.1% 0.077 228)",
      error: "oklch(59.9% 0.107 2.7)",
      errorExtra: "oklch(69.6% 0.106 23)",
      colorfulError: "oklch(59.9% 0.107 2.7)",
      colorfulErrorExtra: "oklch(69.6% 0.106 23)"
    }
  },
  {
    name: "rose_pine_moon",
    colors: {
      bg: "oklch(28.8% 0.043 289.1)",
      main: "oklch(82.2% 0.054 209.6)",
      caret: "oklch(84.3% 0.11 74.6)",
      sub: "oklch(77.6% 0.095 305)",
      subAlt: "oklch(25.1% 0.036 288.4)",
      text: "oklch(90.9% 0.03 290)",
      error: "oklch(69.8% 0.156 4.2)",
      errorExtra: "oklch(83.6% 0.054 21.1)",
      colorfulError: "oklch(69.8% 0.156 4.2)",
      colorfulErrorExtra: "oklch(83.6% 0.054 21.1)"
    }
  },
  {
    name: "rudy",
    colors: {
      bg: "oklch(28.4% 0.042 252)",
      main: "oklch(66.8% 0.078 78.5)",
      caret: "oklch(66.8% 0.078 78.5)",
      sub: "oklch(42.5% 0.054 254.8)",
      subAlt: "oklch(24.8% 0.034 252.7)",
      text: "oklch(83.1% 0.012 101.5)",
      error: "oklch(60.6% 0.121 15.3)",
      errorExtra: "oklch(44% 0.082 14.6)",
      colorfulError: "oklch(60.6% 0.121 15.3)",
      colorfulErrorExtra: "oklch(44% 0.082 14.6)"
    }
  },
  {
    name: "ryujinscales",
    colors: {
      bg: "oklch(19.1% 0.041 258.1)",
      main: "oklch(70.5% 0.159 36.9)",
      caret: "oklch(68.6% 0.169 36.4)",
      sub: "oklch(84.7% 0.097 54.3)",
      subAlt: "oklch(16.3% 0.036 255.7)",
      text: "oklch(93.1% 0.06 77.6)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "serika",
    colors: {
      bg: "oklch(91% 0.003 286.3)",
      main: "oklch(79.5% 0.159 91.3)",
      caret: "oklch(79.5% 0.159 91.3)",
      sub: "oklch(74.9% 0.008 253.9)",
      subAlt: "oklch(86.7% 0.007 268.5)",
      text: "oklch(32.4% 0.006 258.4)",
      error: "oklch(58.4% 0.203 26.2)",
      errorExtra: "oklch(37.8% 0.133 26.3)",
      colorfulError: "oklch(58.4% 0.203 26.2)",
      colorfulErrorExtra: "oklch(37.8% 0.133 26.3)"
    }
  },
  {
    name: "serika_dark",
    colors: {
      bg: "oklch(32.4% 0.006 258.4)",
      main: "oklch(79.5% 0.159 91.3)",
      caret: "oklch(79.5% 0.159 91.3)",
      sub: "oklch(51% 0.005 258.3)",
      subAlt: "oklch(30% 0.006 258.4)",
      text: "oklch(85.5% 0.015 102.5)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "sewing_tin",
    colors: {
      bg: "oklch(28.2% 0.123 281.8)",
      main: "oklch(86.6% 0.102 84.7)",
      caret: "oklch(90.1% 0.104 88.2)",
      sub: "oklch(55.5% 0.17 266.2)",
      subAlt: "oklch(33.4% 0.136 277.7)",
      text: "oklch(100% 0 0)",
      error: "oklch(69.7% 0.093 64.2)",
      errorExtra: "oklch(69.7% 0.093 64.2)",
      colorfulError: "oklch(69.7% 0.093 64.2)",
      colorfulErrorExtra: "oklch(69.7% 0.093 64.2)"
    }
  },
  {
    name: "sewing_tin_light",
    colors: {
      bg: "oklch(100% 0 0)",
      main: "oklch(32.1% 0.139 282.1)",
      caret: "oklch(90.1% 0.104 88.2)",
      sub: "oklch(51.7% 0.173 265.9)",
      subAlt: "oklch(85.2% 0.024 270.3)",
      text: "oklch(32.1% 0.139 282.1)",
      error: "oklch(86.6% 0.102 84.7)",
      errorExtra: "oklch(86.6% 0.102 84.7)",
      colorfulError: "oklch(86.6% 0.102 84.7)",
      colorfulErrorExtra: "oklch(86.6% 0.102 84.7)"
    }
  },
  {
    name: "shadow",
    colors: {
      bg: "oklch(0% 0 0)",
      main: "oklch(94.9% 0 0)",
      caret: "oklch(94.9% 0 0)",
      sub: "oklch(38.7% 0 0)",
      subAlt: "oklch(20.5% 0 0)",
      text: "oklch(94.9% 0 0)",
      error: "oklch(100% 0 0)",
      errorExtra: "oklch(88.2% 0 0)",
      colorfulError: "oklch(100% 0 0)",
      colorfulErrorExtra: "oklch(88.2% 0 0)"
    }
  },
  {
    name: "shoko",
    colors: {
      bg: "oklch(87.5% 0.016 248)",
      main: "oklch(78.4% 0.076 223.5)",
      caret: "oklch(78.4% 0.076 223.5)",
      sub: "oklch(66.5% 0.053 237.8)",
      subAlt: "oklch(83% 0.031 243.5)",
      text: "oklch(40.7% 0.029 239.2)",
      error: "oklch(60.6% 0.121 15.3)",
      errorExtra: "oklch(44% 0.082 14.6)",
      colorfulError: "oklch(60.6% 0.121 15.3)",
      colorfulErrorExtra: "oklch(44% 0.082 14.6)"
    }
  },
  {
    name: "slambook",
    colors: {
      bg: "oklch(98.8% 0.04 104.1)",
      main: "oklch(11% 0.067 278.1)",
      caret: "oklch(52.7% 0.151 138.6)",
      sub: "oklch(57.2% 0.109 232.4 / 0.7686)",
      subAlt: "oklch(88.1% 0.026 221.6)",
      text: "oklch(22.4% 0.14 275.9)",
      error: "oklch(65.9% 0.283 342.6)",
      errorExtra: "oklch(54% 0.214 28.5)",
      colorfulError: "oklch(54% 0.214 28.5)",
      colorfulErrorExtra: "oklch(72.7% 0.232 140.2)"
    }
  },
  {
    name: "snes",
    colors: {
      bg: "oklch(80.4% 0.006 297.7)",
      main: "oklch(43.3% 0.137 292.5)",
      caret: "oklch(41.9% 0.144 292.6)",
      sub: "oklch(68.1% 0.109 296.4)",
      subAlt: "oklch(76.7% 0.026 298.5)",
      text: "oklch(30.1% 0 0)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "soaring_skies",
    colors: {
      bg: "oklch(98.5% 0.011 71.9)",
      main: "oklch(77.8% 0.118 225.9)",
      caret: "oklch(29.2% 0.163 275.3)",
      sub: "oklch(29.2% 0.163 275.3)",
      subAlt: "oklch(90.1% 0.015 70.9)",
      text: "oklch(23.4% 0.002 197.1)",
      error: "oklch(67.6% 0.203 29.6)",
      errorExtra: "oklch(52% 0.153 29.2)",
      colorfulError: "oklch(67.6% 0.203 29.6)",
      colorfulErrorExtra: "oklch(52% 0.153 29.2)"
    }
  },
  {
    name: "solarized_dark",
    colors: {
      bg: "oklch(26.7% 0.049 219.8)",
      main: "oklch(64.4% 0.151 118.6)",
      caret: "oklch(58.6% 0.206 27.1)",
      sub: "oklch(64.4% 0.102 187.4)",
      subAlt: "oklch(23.3% 0.042 219.2)",
      text: "oklch(61.5% 0.139 244.9)",
      error: "oklch(59.2% 0.202 355.9)",
      errorExtra: "oklch(46.8% 0.163 356.7)",
      colorfulError: "oklch(59.2% 0.202 355.9)",
      colorfulErrorExtra: "oklch(46.8% 0.163 356.7)"
    }
  },
  {
    name: "solarized_light",
    colors: {
      bg: "oklch(97.4% 0.026 90.1)",
      main: "oklch(64.4% 0.151 118.6)",
      caret: "oklch(58.6% 0.206 27.1)",
      sub: "oklch(64.4% 0.102 187.4)",
      subAlt: "oklch(88.3% 0.036 89.5)",
      text: "oklch(20.9% 0.002 286.2)",
      error: "oklch(59.2% 0.202 355.9)",
      errorExtra: "oklch(46.8% 0.163 356.7)",
      colorfulError: "oklch(59.2% 0.202 355.9)",
      colorfulErrorExtra: "oklch(46.8% 0.163 356.7)"
    }
  },
  {
    name: "solarized_osaka",
    colors: {
      bg: "oklch(17.7% 0.032 217.9)",
      main: "oklch(64.4% 0.151 118.6)",
      caret: "oklch(65.4% 0.134 85.7)",
      sub: "oklch(64.4% 0.102 187.4)",
      subAlt: "oklch(23.3% 0.042 219.2)",
      text: "oklch(93.1% 0.026 92.4)",
      error: "oklch(58.6% 0.206 27.1)",
      errorExtra: "oklch(46.8% 0.163 356.7)",
      colorfulError: "oklch(59.2% 0.202 355.9)",
      colorfulErrorExtra: "oklch(46.8% 0.163 356.7)"
    }
  },
  {
    name: "sonokai",
    colors: {
      bg: "oklch(30.2% 0.011 271)",
      main: "oklch(80.1% 0.134 131.7)",
      caret: "oklch(74.4% 0.132 35.6)",
      sub: "oklch(83.6% 0.123 91)",
      subAlt: "oklch(26.1% 0.009 276.7)",
      text: "oklch(91.3% 0.001 286.4)",
      error: "oklch(69.4% 0.194 12)",
      errorExtra: "oklch(79.1% 0.112 65.8)",
      colorfulError: "oklch(69.4% 0.194 12)",
      colorfulErrorExtra: "oklch(79.1% 0.112 65.8)"
    }
  },
  {
    name: "stealth",
    colors: {
      bg: "oklch(8.2% 0.008 240.8)",
      main: "oklch(36% 0.011 236.9)",
      caret: "oklch(62.7% 0.191 41.1)",
      sub: "oklch(50.9% 0.016 241.2)",
      subAlt: "oklch(18.2% 0 0)",
      text: "oklch(36% 0.011 236.9)",
      error: "oklch(62.7% 0.191 41.1)",
      errorExtra: "oklch(38.5% 0.112 38.8)",
      colorfulError: "oklch(62.7% 0.191 41.1)",
      colorfulErrorExtra: "oklch(38.5% 0.112 38.8)"
    }
  },
  {
    name: "strawberry",
    colors: {
      bg: "oklch(72.8% 0.142 19.1)",
      main: "oklch(99% 0.005 106.5)",
      caret: "oklch(99% 0.005 106.5)",
      sub: "oklch(61.6% 0.204 16.6)",
      subAlt: "oklch(69.5% 0.159 17.9)",
      text: "oklch(99% 0.005 106.5)",
      error: "oklch(87.6% 0.161 92.2)",
      errorExtra: "oklch(76.6% 0.15 90.8)",
      colorfulError: "oklch(87.6% 0.161 92.2)",
      colorfulErrorExtra: "oklch(76.6% 0.15 90.8)"
    }
  },
  {
    name: "striker",
    colors: {
      bg: "oklch(40.1% 0.113 254.2)",
      main: "oklch(89% 0.006 170.4)",
      caret: "oklch(89% 0.006 170.4)",
      sub: "oklch(29.4% 0.07 253.1)",
      subAlt: "oklch(37.4% 0.104 253.9)",
      text: "oklch(88.7% 0.006 170.4)",
      error: "oklch(66% 0.218 30.4)",
      errorExtra: "oklch(54.6% 0.203 28.7)",
      colorfulError: "oklch(66% 0.218 30.4)",
      colorfulErrorExtra: "oklch(54.6% 0.203 28.7)"
    }
  },
  {
    name: "suisei",
    colors: {
      bg: "oklch(40.6% 0.045 259.7)",
      main: "oklch(92.5% 0.055 218)",
      caret: "oklch(92.5% 0.055 218)",
      sub: "oklch(77.2% 0.157 57.4)",
      subAlt: "oklch(36.3% 0.044 261.6)",
      text: "oklch(90.2% 0.018 275.6)",
      error: "oklch(61.2% 0.227 23.9)",
      errorExtra: "oklch(54.2% 0.212 23.4)",
      colorfulError: "oklch(61.2% 0.227 23.9)",
      colorfulErrorExtra: "oklch(54.2% 0.212 23.4)"
    }
  },
  {
    name: "sunset",
    colors: {
      bg: "oklch(24.1% 0.012 307.9)",
      main: "oklch(76.9% 0.124 39.2)",
      caret: "oklch(87.4% 0.088 64)",
      sub: "oklch(48.5% 0.087 286)",
      subAlt: "oklch(19.3% 0.013 307.7)",
      text: "oklch(91.7% 0.038 71.2)",
      error: "oklch(71.1% 0.151 259.3)",
      errorExtra: "oklch(52.1% 0.106 251.6)",
      colorfulError: "oklch(71.1% 0.151 259.3)",
      colorfulErrorExtra: "oklch(52.1% 0.106 251.6)"
    }
  },
  {
    name: "superuser",
    colors: {
      bg: "oklch(28.5% 0.018 266.3)",
      main: "oklch(89% 0.185 159.8)",
      caret: "oklch(89% 0.185 159.8)",
      sub: "oklch(50.3% 0.036 241.3)",
      subAlt: "oklch(25.6% 0.018 266.3)",
      text: "oklch(96.1% 0.022 167.5)",
      error: "oklch(69.5% 0.195 23.7)",
      errorExtra: "oklch(56.2% 0.203 26.8)",
      colorfulError: "oklch(69.5% 0.195 23.7)",
      colorfulErrorExtra: "oklch(56.2% 0.203 26.8)"
    }
  },
  {
    name: "sweden",
    colors: {
      bg: "oklch(46% 0.14 252.7)",
      main: "oklch(86.5% 0.177 90.4)",
      caret: "oklch(77.3% 0 0)",
      sub: "oklch(70.8% 0.108 236.1)",
      subAlt: "oklch(42.4% 0.123 251.3)",
      text: "oklch(100% 0 0)",
      error: "oklch(61.9% 0.204 25.4)",
      errorExtra: "oklch(48.1% 0.151 24.9)",
      colorfulError: "oklch(69.2% 0.176 17)",
      colorfulErrorExtra: "oklch(60.4% 0.209 21.4)"
    }
  },
  {
    name: "tangerine",
    colors: {
      bg: "oklch(95.7% 0.026 58.3)",
      main: "oklch(67.4% 0.216 38.7)",
      caret: "oklch(56.6% 0.147 127.7)",
      sub: "oklch(77.2% 0.144 45.6)",
      subAlt: "oklch(89.8% 0.055 46.9)",
      text: "oklch(25.9% 0.066 44.1)",
      error: "oklch(70.8% 0.185 128)",
      errorExtra: "oklch(57.2% 0.149 127.5)",
      colorfulError: "oklch(70.8% 0.185 128)",
      colorfulErrorExtra: "oklch(57.2% 0.149 127.5)"
    }
  },
  {
    name: "taro",
    colors: {
      bg: "oklch(80.8% 0.098 279.5)",
      main: "oklch(17.9% 0.023 300.8)",
      caret: "oklch(84.4% 0.145 192.6)",
      sub: "oklch(54.8% 0.057 288.1)",
      subAlt: "oklch(74.5% 0.081 281.1)",
      text: "oklch(17.9% 0.023 300.8)",
      error: "oklch(91.1% 0.172 98.6)",
      errorExtra: "oklch(95.8% 0.061 93.1)",
      colorfulError: "oklch(91.1% 0.172 98.6)",
      colorfulErrorExtra: "oklch(95.8% 0.061 93.1)"
    }
  },
  {
    name: "terminal",
    colors: {
      bg: "oklch(21.7% 0.002 247.9)",
      main: "oklch(66.8% 0.166 127)",
      caret: "oklch(66.8% 0.166 127)",
      sub: "oklch(40.5% 0.004 264.5)",
      subAlt: "oklch(19.5% 0.003 248)",
      text: "oklch(93.2% 0.014 120.3)",
      error: "oklch(46.6% 0.176 27.6)",
      errorExtra: "oklch(35.9% 0.133 27.1)",
      colorfulError: "oklch(46.6% 0.176 27.6)",
      colorfulErrorExtra: "oklch(35.9% 0.133 27.1)"
    }
  },
  {
    name: "terra",
    colors: {
      bg: "oklch(16.8% 0.008 163.9)",
      main: "oklch(75.9% 0.153 133.1)",
      caret: "oklch(75.9% 0.153 133.1)",
      sub: "oklch(45.2% 0.088 132.1)",
      subAlt: "oklch(21.6% 0.022 169.7)",
      text: "oklch(94.1% 0.037 102.1)",
      error: "oklch(82.8% 0.104 102.9)",
      errorExtra: "oklch(60.5% 0.076 103.9)",
      colorfulError: "oklch(82.8% 0.104 102.9)",
      colorfulErrorExtra: "oklch(60.5% 0.076 103.9)"
    }
  },
  {
    name: "terrazzo",
    colors: {
      bg: "oklch(92.8% 0.02 65.1)",
      main: "oklch(68.4% 0.141 42.7)",
      caret: "oklch(68.4% 0.141 42.7)",
      sub: "oklch(61.9% 0.042 198.2)",
      subAlt: "oklch(87.6% 0.025 61.6)",
      text: "oklch(32.9% 0.056 189.4)",
      error: "oklch(45.5% 0.173 15.9)",
      errorExtra: "oklch(45.5% 0.173 15.9)",
      colorfulError: "oklch(45.5% 0.173 15.9)",
      colorfulErrorExtra: "oklch(45.5% 0.173 15.9)"
    }
  },
  {
    name: "terror_below",
    colors: {
      bg: "oklch(21.7% 0.026 178.4)",
      main: "oklch(69.1% 0.081 168.2)",
      caret: "oklch(69.1% 0.081 168.2)",
      sub: "oklch(42.7% 0.075 183.4)",
      subAlt: "oklch(18.7% 0.026 186.4)",
      text: "oklch(92.5% 0.016 172.6)",
      error: "oklch(60.6% 0.121 15.3)",
      errorExtra: "oklch(44% 0.082 14.6)",
      colorfulError: "oklch(60.6% 0.121 15.3)",
      colorfulErrorExtra: "oklch(44% 0.082 14.6)"
    }
  },
  {
    name: "tiramisu",
    colors: {
      bg: "oklch(83% 0.02 77.3)",
      main: "oklch(70.5% 0.073 65.5)",
      caret: "oklch(48.7% 0.058 37)",
      sub: "oklch(70.5% 0.073 65.5)",
      subAlt: "oklch(80.6% 0.037 68.6)",
      text: "oklch(48.7% 0.058 37)",
      error: "oklch(66% 0.179 40.5)",
      errorExtra: "oklch(66% 0.179 40.5)",
      colorfulError: "oklch(66% 0.179 40.5)",
      colorfulErrorExtra: "oklch(66% 0.179 40.5)"
    }
  },
  {
    name: "trackday",
    colors: {
      bg: "oklch(42.4% 0.043 272.3)",
      main: "oklch(62.5% 0.182 30.4)",
      caret: "oklch(46.3% 0.073 267.9)",
      sub: "oklch(59.3% 0.099 261)",
      subAlt: "oklch(38.7% 0.038 272.7)",
      text: "oklch(85.5% 0 0)",
      error: "oklch(63.1% 0.186 24.2)",
      errorExtra: "oklch(65.5% 0.226 26.1)",
      colorfulError: "oklch(64.5% 0.24 27.3)",
      colorfulErrorExtra: "oklch(51.6% 0.186 26.7)"
    }
  },
  {
    name: "trance",
    colors: {
      bg: "oklch(11.2% 0.062 263.7)",
      main: "oklch(60% 0.236 1.7)",
      caret: "oklch(60% 0.236 1.7)",
      sub: "oklch(42.4% 0.078 268.1)",
      subAlt: "oklch(26.7% 0.08 271.1)",
      text: "oklch(100% 0 0)",
      error: "oklch(77.4% 0.146 174.9)",
      errorExtra: "oklch(57.6% 0.076 181.3)",
      colorfulError: "oklch(77.4% 0.146 174.9)",
      colorfulErrorExtra: "oklch(57.6% 0.076 181.3)"
    }
  },
  {
    name: "tron_orange",
    colors: {
      bg: "oklch(21.3% 0.021 195.7)",
      main: "oklch(90.8% 0.195 107.2)",
      caret: "oklch(90.8% 0.195 107.2)",
      sub: "oklch(69.6% 0.204 43.5)",
      subAlt: "oklch(66.6% 0.013 17.5)",
      text: "oklch(100% 0 0)",
      error: "oklch(62.8% 0.258 29.2)",
      errorExtra: "oklch(62.8% 0.258 29.2)",
      colorfulError: "oklch(62.8% 0.258 29.2)",
      colorfulErrorExtra: "oklch(62.8% 0.258 29.2)"
    }
  },
  {
    name: "vaporwave",
    colors: {
      bg: "oklch(75.1% 0.096 281.8)",
      main: "oklch(70.5% 0.203 330.3)",
      caret: "oklch(78.3% 0.143 226.2)",
      sub: "oklch(61.2% 0.073 281.3)",
      subAlt: "oklch(71% 0.09 281.7)",
      text: "oklch(94.6% 0.01 325.7)",
      error: "oklch(45% 0.166 289.4)",
      errorExtra: "oklch(35.6% 0.124 289.5)",
      colorfulError: "oklch(78.3% 0.143 226.2)",
      colorfulErrorExtra: "oklch(68.4% 0.119 222.4)"
    }
  },
  {
    name: "vesper",
    colors: {
      bg: "oklch(17.3% 0 0)",
      main: "oklch(86.9% 0.088 60.7)",
      caret: "oklch(93% 0.103 175.1)",
      sub: "oklch(70.6% 0 0)",
      subAlt: "oklch(22.6% 0 0)",
      text: "oklch(100% 0 0)",
      error: "oklch(74.4% 0.155 21.5)",
      errorExtra: "oklch(57.1% 0.116 21.4)",
      colorfulError: "oklch(93% 0.103 175.1)",
      colorfulErrorExtra: "oklch(93% 0.103 175.1)"
    }
  },
  {
    name: "viridescent",
    colors: {
      bg: "oklch(31.4% 0.01 196.7)",
      main: "oklch(82% 0.082 160)",
      caret: "oklch(88.8% 0.035 40)",
      sub: "oklch(69.9% 0.058 151.2)",
      subAlt: "oklch(27.2% 0.007 196.7)",
      text: "oklch(95.4% 0.037 127.4)",
      error: "oklch(66.6% 0.221 25.6)",
      errorExtra: "oklch(49.7% 0.161 25.2)",
      colorfulError: "oklch(55% 0.16 24)",
      colorfulErrorExtra: "oklch(44.4% 0.116 23)"
    }
  },
  {
    name: "voc",
    colors: {
      bg: "oklch(16.5% 0.047 329.4)",
      main: "oklch(85% 0.047 75.6)",
      caret: "oklch(85% 0.047 75.6)",
      sub: "oklch(32% 0.092 330.9)",
      subAlt: "oklch(22.1% 0.068 332.8)",
      text: "oklch(93.8% 0.009 78.3)",
      error: "oklch(51.3% 0.156 25.4)",
      errorExtra: "oklch(41.1% 0.117 24.4)",
      colorfulError: "oklch(51.3% 0.156 25.4)",
      colorfulErrorExtra: "oklch(41.1% 0.117 24.4)"
    }
  },
  {
    name: "vscode",
    colors: {
      bg: "oklch(23.5% 0 0)",
      main: "oklch(56.7% 0.155 248.5)",
      caret: "oklch(67.1% 0.112 245.5)",
      sub: "oklch(42% 0 0)",
      subAlt: "oklch(21.3% 0 0)",
      text: "oklch(87% 0 0)",
      error: "oklch(64.8% 0.21 25.2)",
      errorExtra: "oklch(64.8% 0.21 25.2)",
      colorfulError: "oklch(64.8% 0.21 25.2)",
      colorfulErrorExtra: "oklch(64.8% 0.21 25.2)"
    }
  },
  {
    name: "watermelon",
    colors: {
      bg: "oklch(35.5% 0.049 168.4)",
      main: "oklch(65% 0.138 17.8)",
      caret: "oklch(65% 0.138 17.8)",
      sub: "oklch(53.3% 0.072 168.6)",
      subAlt: "oklch(38.6% 0.053 169)",
      text: "oklch(82.9% 0.016 77.1)",
      error: "oklch(54.4% 0.194 24.4)",
      errorExtra: "oklch(47.9% 0.18 24.6)",
      colorfulError: "oklch(54.4% 0.194 24.4)",
      colorfulErrorExtra: "oklch(47.9% 0.18 24.6)"
    }
  },
  {
    name: "wavez",
    colors: {
      bg: "oklch(27.2% 0.021 228.1)",
      main: "oklch(80.3% 0.222 138.3)",
      caret: "oklch(80.3% 0.222 138.3)",
      sub: "oklch(44.8% 0.066 214)",
      subAlt: "oklch(30.1% 0.031 216.3)",
      text: "oklch(94.5% 0.014 134.9)",
      error: "oklch(58.2% 0.166 18.2)",
      errorExtra: "oklch(41.3% 0.116 17.6)",
      colorfulError: "oklch(58.2% 0.166 18.2)",
      colorfulErrorExtra: "oklch(41.3% 0.116 17.6)"
    }
  },
  {
    name: "witch_girl",
    colors: {
      bg: "oklch(91.1% 0.027 20.5)",
      main: "oklch(54.2% 0.045 167.3)",
      caret: "oklch(80.4% 0.026 171.8)",
      sub: "oklch(80.3% 0.051 38.3)",
      subAlt: "oklch(85.6% 0.038 38.7)",
      text: "oklch(54.2% 0.045 167.3)",
      error: "oklch(70.5% 0.031 41.7)",
      errorExtra: "oklch(70.5% 0.031 41.7)",
      colorfulError: "oklch(70.5% 0.031 41.7)",
      colorfulErrorExtra: "oklch(70.5% 0.031 41.7)"
    }
  }
];

export function getPalette(name: string): Palette | undefined {
  return palettes.find((p) => p.name === name);
}
