const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  if (!text) throw "Input text required";
  const [query, caption] = text.split(/[^\w\s]/g);
  if (!query || !caption) throw "Input query and caption required\n*Example:* " + usedPrefix + command + " 5160xxxxxxxxxxxx";
  try {
    const result = await GenerateCC(query, parseInt(caption));
    m.reply(result);
  } catch (e) {
    m.reply("Error occurred");
  }
};
handler.help = ["ccgen"].map(v => v + " (query)"), handler.tags = ["generator"],
  handler.command = /^(ccgen)$/i, handler.limit = !0;
export default handler;

function GenerateCC(CCPN, CCTOT = 10) {
  const datax = {
    querySelector: {
      "#output2": {
        value: ""
      },
      "#date": {
        textContent: new Date().getFullYear()
      }
    },
    getElementById: {
      ccpN: {
        value: CCPN
      },
      ccghm: {
        value: CCTOT
      },
      ccoudatfmt: {
        value: "json"
      },
      ccnsp: {
        value: 1
      },
      ccexpdat: {
        value: !0
      },
      emeses: {
        value: "rnd"
      },
      eyear: {
        value: "rnd"
      },
      eccv: {
        value: "rnd"
      },
      ccvi: {
        value: !0
      },
      ccbank: {
        value: !0
      }
    }
  };
  const rnd = (frN, toN) => Math.floor(Math.random() * (toN - frN + 1)) + frN,
    unilenS = (aS, ul, fc = "0", p = 0) => {
      let rS = "" + aS;
      ul = Number.parseFloat(ul), fc && p || (fc = "0", p = 0);
      const rL = rS.length;
      return rL < ul && (rS = 0 === p ? fc.repeat(ul - rL) + rS : rS + fc.repeat(ul - rL)),
        rS;
    };

  function chkCard(cdi) {
    const brands = [{
      pattern: /^4/,
      name: "Visa"
    }, {
      pattern: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01])/i,
      name: "Mastercard"
    }, {
      pattern: /^(6011|65|64[4-9]|622)/,
      name: "Discover"
    }, {
      pattern: /^(34|37)/,
      name: "American Express"
    }, {
      pattern: /^(30[0-5]|309|36|38|39)/,
      name: "Diners Club"
    }, {
      pattern: /^35(2[89]|[3-8][0-9])/,
      name: "JCB"
    }];
    cdi = sbtString(cdi, " -/abcdefghijklmnopqrstuvwyzABCDEFGHIJLMNOPQRSTUVWYZ");
    for (let i = 0; i < brands.length; i++)
      if (cdi.match(brands[i].pattern)) return brands[i].name;
    return "Unknown";
  }

  function chkCCCksum(cf, cn) {
    const w = [2, 1];
    let ml = 0,
      j = 0;
    for (let i = cf.length - 2; i >= 0; i--) {
      const m = parseInt(cf[i], 10) * w[j % w.length];
      ml += Math.floor(m / 10) + m % 10, j++;
    }
    const ml1 = (10 - (ml + (10 - ml % 10)) % 10) % 10;
    return parseInt(cf[cf.length - 1], 10) === ml1;
  }

  function chkLCD(cf) {
    let ctd = 0;
    for (let i = (cf = sbtString(cf, "0123456789")).length - 1; i >= 0; i--) {
      let cdg = parseInt(cf[i], 10);
      (cf.length - i) % 2 == 0 && (cdg *= 2, cdg > 9 && (cdg -= 9)), ctd += cdg;
    }
    return ctd % 10 == 0;
  }

  function sbtString(s1, s2) {
    let ous = "";
    for (let i = 0; i < s1.length; i++) {
      const c1 = s1.charAt(i); - 1 === s2.indexOf(c1) && (ous += c1);
    }
    return ous;
  }

  function sbtStringSpRnd(s1, s2, bS = "0123456789") {
    let ous = "";
    for (let i = 0; i < s1.length; i++) {
      const c1 = s1.charAt(i);
      ous += -1 === s2.indexOf(c1) ? c1 : bS.charAt(Math.floor(Math.random() * bS.length));
    }
    return ous;
  }
  const output = function(p1, tr) {
    tr = tr || 1;
    const ccghm = Math.min(Math.max(parseInt(datax.getElementById.ccghm.value), 1), 100);
    let out = "";
    if (p1) {
      const selectedOption = datax.getElementById.ccoudatfmt.value,
        formatPrefix = "xml" === selectedOption.value ? "<xml>\n" : "json" === selectedOption.value ? "{\n" : "";
      let clcd, ccck, cdi;
      for (let k = 1; k <= ccghm; k++) {
        const p = p1,
          cn = chkCard(p1);
        clcd = !1, ccck = !1, cdi = "";
        for (let i = tr; i >= 1; i--) {
          cdi = sbtStringSpRnd(p, "x", "0123456789");
          const cf = sbtString(cdi, " -/abcdefghijklmnopqrstuvwyzABCDEFGHIJLMNOPQRSTUVWYZ");
          if (clcd = chkLCD(cf), ccck = chkCCCksum(cf, cn), clcd && ccck) break;
        }
        if (!clcd || !ccck) {
          out = "Error";
          break;
        } {
          const j = datax.getElementById.ccnsp,
            ccnspc = 1 === j ? " " : 2 === j ? "-" : "";
          let cdif = "";
          for (let i = 0; i < cdi.length; i++) {
            cdif += " " === cdi[i] ? ccnspc : cdi[i];
          }
          let expDate = "";
          if (datax.getElementById.ccexpdat.value) {
            const dnowi = new Date();
            expDate = `|${"rnd" === datax.getElementById.emeses.value ? unilenS(rnd(1, 12), 2, "0", 0) : datax.getElementById.emeses.value}|${"rnd" === datax.getElementById.eyear.value ? dnowi.getFullYear() + rnd(2, 6) : datax.getElementById.eyear.value}`;
          }
          const eccv = "rnd" === datax.getElementById.eccv.value && datax.getElementById.ccvi.value ? cdif.startsWith("34") || cdif.startsWith("37") ? Math.floor(9e3 * Math.random()) + 1e3 : Math.floor(887 * Math.random()) + 112 : datax.getElementById.eccv.value;
          out += `${formatPrefix}${cdif}${expDate}${datax.getElementById.ccvi.value ? "|" + eccv : ""}${datax.getElementById.ccbank.value ? "|" + cn : ""}\n`;
        }
      }
      return out;
    }
  }(datax.getElementById.ccpN.value, 100);
  return output;
}