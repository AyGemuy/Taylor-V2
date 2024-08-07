import _ from "lodash";
const handler = async (m, {
  usedPrefix,
  command,
  args
}) => {
  try {
    const query = `${usedPrefix}${command} cf|40`;
    const text = args.length ? args.join(" ") : _.get(m, "quoted.text", query);
    const [type, val] = text.split("|").map(item => item.trim());
    const result = calculate(type.toLowerCase(), parseFloat(val));
    if (_.isEmpty(result)) {
      const converters = _.keys(conversions).join(", ");
      const example = `${usedPrefix}${command} cf|40`;
      m.reply(`*Available Converters:*\n${converters.split(", ").map(item => `- ${item}`).join("\n")}\n\n*Example Usage:*\n${example}`);
    } else {
      m.reply(`*Conversion Result:*\n\n` + `*From:* ${result.First}\n` + `*To:* ${result.Second}\n` + `*Value:* ${val}\n` + `*Result:* ${result.Result}\n` + `*Formula:* ${result.Form}`);
    }
  } catch (error) {
    m.reply(`*Error:*\n${error.message}`);
  }
};
handler.tags = ["tools"];
handler.command = handler.help = ["convert"];
export default handler;
const conversions = {
  cf: {
    First: "C° - Celsius",
    Second: "F° - Fahrenheit",
    Result: val => (val * 9 / 5 + 32).toFixed(3),
    Form: "(C * 9 / 5) + 32"
  },
  fc: {
    First: "F° - Fahrenheit",
    Second: "C° - Celsius",
    Result: val => ((val - 32) * 5 / 9).toFixed(3),
    Form: "(F - 32) * 5 / 9"
  },
  ck: {
    First: "C° - Celsius",
    Second: "K° - Kelvin",
    Result: val => (val + 273.15).toFixed(2),
    Form: "C + 273.15"
  },
  kc: {
    First: "K° - Kelvin",
    Second: "C° - Celsius",
    Result: val => (val - 273.15).toFixed(2),
    Form: "K - 273.15"
  },
  rc: {
    First: "R° - Rankine",
    Second: "C° - Celsius",
    Result: val => ((val - 491.67) * 5 / 9).toFixed(3),
    Form: "(R - 491.67) * 5 / 9"
  },
  cr: {
    First: "C° - Celsius",
    Second: "R° - Rankine",
    Result: val => (val * 9 / 5 + 491.67).toFixed(2),
    Form: "C * 9 / 5 + 491.67"
  },
  rf: {
    First: "R° - Rankine",
    Second: "F° - Fahrenheit",
    Result: val => (val - 459.67).toFixed(2),
    Form: "R - 459.67"
  },
  fr: {
    First: "F° - Fahrenheit",
    Second: "R° - Rankine",
    Result: val => (val + 459.67).toFixed(2),
    Form: "F + 459.67"
  },
  fk: {
    First: "F° - Fahrenheit",
    Second: "K° - Kelvin",
    Result: val => ((val - 32) * 5 / 9 + 273.15).toFixed(3),
    Form: "(F - 32) * 5/9 + 273.15"
  },
  kf: {
    First: "K° - Kelvin",
    Second: "F° - Fahrenheit",
    Result: val => ((val - 273.15) * 9 / 5 + 32).toFixed(3),
    Form: "(K - 273.15) * 9 / 5 + 32"
  },
  km: {
    First: "KM - Kilometer",
    Second: "MI - Miles",
    Result: val => (val * .621371).toFixed(3),
    Form: "KM * 0.621371"
  },
  mk: {
    First: "MI - Miles",
    Second: "KM - Kilometer",
    Result: val => (val / .621371).toFixed(3),
    Form: "MI / 0.621371"
  },
  tg: {
    First: "T - Ton",
    Second: "G - Gram",
    Result: val => val * 1e6,
    Form: "T * 1000000"
  },
  gk: {
    First: "G - Gram",
    Second: "KG - Kilogram",
    Result: val => val / 1e3,
    Form: "G / 1000"
  },
  kg: {
    First: "KG - Kilogram",
    Second: "G - Gram",
    Result: val => val * 1e3,
    Form: "KG * 1000"
  },
  gt: {
    First: "G - Gram",
    Second: "T - Tons",
    Result: val => val / 1e6,
    Form: "G / 1000000"
  },
  kgt: {
    First: "KG - Kilogram",
    Second: "T - Tons",
    Result: val => val / 1e3,
    Form: "KG / 1000"
  },
  ms: {
    First: "MS - Millisecond",
    Second: "S - Second",
    Result: val => val / 1e3,
    Form: "MS / 1000"
  },
  sm: {
    First: "S - Second",
    Second: "MS - Millisecond",
    Result: val => val * 1e3,
    Form: "S * 1000"
  },
  mm: {
    First: "M - Minute",
    Second: "S - Second",
    Result: val => val * 60,
    Form: "M * 60"
  },
  ms: {
    First: "M - Minute",
    Second: "S - Second",
    Result: val => val / 60,
    Form: "M / 60"
  },
  msm: {
    First: "MS - Milisecond",
    Second: "M - Second",
    Result: val => val * 1e3,
    Form: "MS * 1000"
  },
  mms: {
    First: "M - Second",
    Second: "MS - Milisecond",
    Result: val => val / 1e3,
    Form: "M / 1000"
  },
  kms: {
    First: "KM - Kilometer",
    Second: "S - Second",
    Result: val => val / 1e6,
    Form: "KM / 3600000"
  },
  hgk: {
    First: "H - Hour",
    Second: "G - Gram",
    Result: val => val / 36e5,
    Form: "H / 3600000"
  },
  kmh: {
    First: "KM - Kilometer",
    Second: "H - Hour",
    Result: val => val / 3600,
    Form: "KM / 3600"
  },
  hpw: {
    First: "HP - Horse Power",
    Second: "W - Watts",
    Result: val => (val * 746).toFixed(3),
    Form: "HP * 746"
  },
  wph: {
    First: "W - Watts",
    Second: "HP - Horse Power",
    Result: val => (val / 746).toFixed(3),
    Form: "W / 746"
  },
  mks: {
    First: "M - Kilometer",
    Second: "S - Second",
    Result: val => val / 1e3,
    Form: "M / 1000"
  },
  pas: {
    First: "PAS - Pascal",
    Second: "ATM - Atmosphere",
    Result: val => val / 101325,
    Form: "PAS / 101325"
  },
  atm: {
    First: "ATM - Atmosphere",
    Second: "PAS - Pascal",
    Result: val => val * 101325,
    Form: "ATM * 101325"
  },
  gkm: {
    First: "G - Liter",
    Second: "KM - Mililiter",
    Result: val => val * 1e3,
    Form: "G * 1000"
  },
  mkg: {
    First: "M - Meter",
    Second: "KG - Mililiter",
    Result: val => val * 1e3,
    Form: "M * 1000"
  },
  ktg: {
    First: "K - Kilometer",
    Second: "T - Liter",
    Result: val => val * 1e3,
    Form: "K * 1000"
  },
  kgl: {
    First: "KG - Kilogram",
    Second: "L - Liter",
    Result: val => val / 1e3,
    Form: "KG / 1000"
  },
  mlkg: {
    First: "ML - Mililiter",
    Second: "KG - Kilogram",
    Result: val => val / 1e3,
    Form: "ML / 1000"
  },
  lkg: {
    First: "L - Liter",
    Second: "KG - Kilogram",
    Result: val => val * 1e3,
    Form: "L * 1000"
  },
  kkl: {
    First: "K - Kiloliter",
    Second: "L - Liter",
    Result: val => val * 1e3,
    Form: "K * 1000"
  },
  kkm: {
    First: "K - Meter",
    Second: "KM - Milimeter",
    Result: val => val * 1e3,
    Form: "K * 1000"
  },
  kmk: {
    First: "KM - Milimeter",
    Second: "K - Meter",
    Result: val => val / 1e3,
    Form: "KM / 1000"
  },
  ml: {
    First: "M - Milligram",
    Second: "L - Liter",
    Result: val => val * 1e3,
    Form: "M * 1000"
  },
  lm: {
    First: "L - Liter",
    Second: "M - Milligram",
    Result: val => val / 1e3,
    Form: "L / 1000"
  },
  gh: {
    First: "G - Hectogram",
    Second: "H - Hogectogram",
    Result: val => val / 1e3,
    Form: "G / 1000"
  },
  mk: {
    First: "M - Meter",
    Second: "K - Kilometer",
    Result: val => val / 1e3,
    Form: "M / 1000"
  }
};

function calculate(type, val) {
  const conversion = _.get(conversions, type, {});
  return _.isEmpty(conversion) ? {} : {
    First: conversion.First,
    Second: conversion.Second,
    Result: conversion.Result(val),
    Form: conversion.Form
  };
}