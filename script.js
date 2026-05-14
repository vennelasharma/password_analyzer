/* =============================================
   PASSWORD ANALYZER — script.js
   Vennela Sharma · Cybersecurity Portfolio
   ============================================= */

"use strict";

/* ─── COMMON PASSWORDS LIST (top 200) ─── */
const COMMON_PASSWORDS = new Set([
  "123456",
  "password",
  "123456789",
  "12345678",
  "12345",
  "1234567",
  "1234567890",
  "qwerty",
  "abc123",
  "million2",
  "000000",
  "1234",
  "iloveyou",
  "aaron431",
  "password1",
  "qqww1122",
  "123",
  "omgpop",
  "123321",
  "654321",
  "qwerty123",
  "admin",
  "dragon",
  "master",
  "monkey",
  "letmein",
  "login",
  "welcome",
  "solo",
  "princess",
  "qazwsx",
  "passw0rd",
  "starwars",
  "football",
  "charlie",
  "donald",
  "password2",
  "qwertyuiop",
  "696969",
  "superman",
  "michael",
  "hello",
  "shadow",
  "sunshine",
  "12345678910",
  "trustno1",
  "121212",
  "ashley",
  "bailey",
  "pass",
  "baseball",
  "basketball",
  "soccer",
  "batman",
  "access",
  "mustang",
  "jessica",
  "hunter",
  "ranger",
  "buster",
  "thomas",
  "robert",
  "joseph",
  "michelle",
  "whatever",
  "zxcvbnm",
  "zxcvbn",
  "thunder",
  "111111",
  "cheese",
  "1q2w3e4r",
  "pass123",
  "test",
  "test1",
  "mypass",
  "asdfgh",
  "asdfghjkl",
  "asdf",
  "qweasdzxc",
  "qweqwe",
  "blahblah",
  "love",
  "fuckyou",
  "123qwe",
  "qwerty1",
  "ginger",
  "abc1234",
  "password123",
  "computer",
  "pepper",
  "welcome1",
  "samsung",
  "liverpool",
  "arsenal",
  "chelsea",
  "lakers",
  "jordan",
  "matrix",
  "1q2w3e",
  "google",
  "passpass",
  "112233",
  "q1w2e3r4",
  "111222",
  "159753",
  "123123",
  "123654",
  "987654",
  "zzzzzz",
  "aaaaaa",
  "147258369",
  "qazwsxedc",
  "abcdefg",
  "abcdef",
  "pass1234",
  "123abc",
  "1234abc",
  "123456a",
  "asdf1234",
  "admin123",
  "q1w2e3",
  "zxcvbn1",
  "mypassword",
  "1password",
  "letmein1",
  "ncc1701",
  "pAssword",
  "Password1",
  "P@ssw0rd",
  "P@ssword",
  "p@ssword",
  "pa$$word",
  "pa$$w0rd",
  "secure",
  "secret",
  "root",
  "toor",
  "alpine",
  "changeme",
  "default",
  "guest",
  "user",
  "demo",
  "0987654321",
  "9876543210",
  "246810",
  "135790",
  "1111111",
  "11111111",
  "1111111111",
  "22222222",
  "33333333",
  "44444444",
  "55555555",
  "66666666",
  "77777777",
  "88888888",
  "99999999",
  "00000000",
  "aaaaaaaa",
  "bbbbbbbb",
  "qqqqqqqq",
  "wwwwwwww",
  "12341234",
  "abcdabcd",
  "passw",
  "passwd",
  "pass@123",
  "Pass@123",
  "Password@1",
  "password!",
  "hello123",
  "hello1234",
  "123hello",
  "love123",
  "football1",
  "soccer1",
  "hockey",
  "baseball1",
  "basketball1",
  "tennis",
  "dragon1",
  "phoenix",
  "tiger",
  "monkey1",
  "sunshine1",
  "rainbow",
  "flowers",
  "butterfly",
  "chocolate",
  "pokemon",
  "pikachu",
  "minecraft",
  "roblox",
  "fortnite",
  "gaming",
  "gamer",
  "1234qwer",
  "qwer1234",
]);

/* ─── DOM REFS ─── */
const input = document.getElementById("pwd-input");
const toggleBtn = document.getElementById("toggle-vis");
const eyeIcon = document.getElementById("eye-icon");
const charCount = document.getElementById("char-count");

const meterFill = document.getElementById("meter-fill");
const meterGlow = document.getElementById("meter-glow");
const strengthWord = document.getElementById("strength-word");

const timeOnline = document.getElementById("time-online");
const timeOffline = document.getElementById("time-offline");
const timeGpu = document.getElementById("time-gpu");

const entropyVal = document.getElementById("entropy-val");
const entropyBar = document.getElementById("entropy-bar");

const checkLower = document.getElementById("check-lower");
const checkUpper = document.getElementById("check-upper");
const checkDigits = document.getElementById("check-digits");
const checkSymbols = document.getElementById("check-symbols");

const issuesList = document.getElementById("issues-list");
const commonIcon = document.getElementById("common-icon");
const commonStatus = document.getElementById("common-status");
const commonSub = document.getElementById("common-sub");

const suggList = document.getElementById("suggestions-list");

/* ─── TOGGLE VISIBILITY ─── */
let visible = false;
toggleBtn.addEventListener("click", () => {
  visible = !visible;
  input.type = visible ? "text" : "password";
  eyeIcon.innerHTML = visible
    ? `<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
});

/* ─── ENTROPY CALCULATION ─── */
function calcEntropy(pwd) {
  let pool = 0;
  if (/[a-z]/.test(pwd)) pool += 26;
  if (/[A-Z]/.test(pwd)) pool += 26;
  if (/[0-9]/.test(pwd)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pwd)) pool += 32;
  if (pool === 0) return 0;
  return Math.round(pwd.length * Math.log2(pool));
}

/* ─── FORMAT TIME ─── */
function formatTime(seconds) {
  if (!isFinite(seconds) || seconds > 1e20) return "∞ centuries";
  const minute = 60;
  const hour = 3600;
  const day = 86400;
  const year = 31536000;
  const century = year * 100;

  if (seconds < 1) return "Instant";
  if (seconds < minute) return `${Math.round(seconds)}s`;
  if (seconds < hour) return `${Math.round(seconds / minute)}m`;
  if (seconds < day) return `${Math.round(seconds / hour)}h`;
  if (seconds < year) return `${Math.round(seconds / day)} days`;
  if (seconds < year * 10) return `${Math.round(seconds / year)} years`;
  if (seconds < century) return `${Math.round(seconds / year / 10) * 10} years`;
  if (seconds < century * 100)
    return `${Math.round(seconds / century)} centuries`;
  return "∞ centuries";
}

/* ─── CRACK TIME FROM ENTROPY ─── */
function crackTimes(entropy) {
  const combinations = Math.pow(2, entropy);
  return {
    online: formatTime(combinations / 100), // 100/sec
    offline: formatTime(combinations / 1e10), // 10B/sec
    gpu: formatTime(combinations / 1e14), // 100T/sec
  };
}

/* ─── STRENGTH LEVEL ─── */
function getStrength(entropy, isCommon) {
  if (isCommon)
    return { level: 0, word: "CRITICAL", cls: "s-critical", pct: 8 };
  if (entropy < 20)
    return { level: 0, word: "CRITICAL", cls: "s-critical", pct: 8 };
  if (entropy < 36) return { level: 1, word: "WEAK", cls: "s-weak", pct: 25 };
  if (entropy < 56) return { level: 2, word: "FAIR", cls: "s-fair", pct: 50 };
  if (entropy < 80)
    return { level: 3, word: "STRONG", cls: "s-strong", pct: 78 };
  return { level: 4, word: "FORTRESS", cls: "s-fortress", pct: 100 };
}

/* ─── ISSUES DETECTION ─── */
function detectIssues(pwd) {
  const issues = [];
  if (pwd.length < 8)
    issues.push({
      text: "Too short — use at least 12 characters",
      warn: false,
    });
  else if (pwd.length < 12)
    issues.push({ text: "Length is okay, but 16+ is recommended", warn: true });

  if (/^(.)\1+$/.test(pwd))
    issues.push({
      text: 'All characters are the same (e.g. "aaaaa")',
      warn: false,
    });
  if (/^[a-zA-Z]+$/.test(pwd))
    issues.push({
      text: "Letters only — add numbers and symbols",
      warn: false,
    });
  if (/^[0-9]+$/.test(pwd))
    issues.push({
      text: "Numbers only — add letters and symbols",
      warn: false,
    });
  if (/(.)\1{2,}/.test(pwd))
    issues.push({
      text: 'Repeated characters detected (e.g. "aaa")',
      warn: true,
    });
  if (/^(qwerty|asdf|zxcv|1234|abcd)/i.test(pwd))
    issues.push({ text: "Starts with a common keyboard pattern", warn: false });
  if (!/[A-Z]/.test(pwd))
    issues.push({ text: "No uppercase letters", warn: true });
  if (!/[a-z]/.test(pwd))
    issues.push({ text: "No lowercase letters", warn: true });
  if (!/[0-9]/.test(pwd)) issues.push({ text: "No numbers", warn: true });
  if (!/[^a-zA-Z0-9]/.test(pwd))
    issues.push({ text: "No special characters (!@#$%...)", warn: true });
  if (/^[A-Z][a-z]+\d{1,4}$/.test(pwd))
    issues.push({
      text: 'Follows a predictable "Word + number" pattern',
      warn: true,
    });

  return issues;
}

/* ─── SUGGESTIONS ─── */
function buildSuggestions(pwd, entropy, issues, isCommon) {
  const sugg = [];
  if (isCommon)
    sugg.push(
      "This is one of the most common passwords — change it immediately.",
    );
  if (pwd.length < 16)
    sugg.push(
      `Make it longer — you have ${pwd.length} chars, aim for 16+. Each extra character exponentially increases security.`,
    );
  if (!/[A-Z]/.test(pwd))
    sugg.push(
      "Add at least one uppercase letter to expand your character pool.",
    );
  if (!/[0-9]/.test(pwd))
    sugg.push("Mix in numbers to significantly increase entropy.");
  if (!/[^a-zA-Z0-9]/.test(pwd))
    sugg.push(
      "Add symbols like ! @ # $ % — they add 32 extra characters to the pool.",
    );
  if (entropy < 56)
    sugg.push(
      'Consider using a passphrase — e.g. "correct-horse-battery-staple" — long, random words are both memorable and secure.',
    );
  if (entropy >= 80)
    sugg.push(
      "Excellent entropy. Make sure you're using a unique password for each account and storing it in a password manager.",
    );
  if (sugg.length === 0)
    sugg.push(
      "Strong password! Store it in a password manager and never reuse it across sites.",
    );
  return sugg;
}

/* ─── SET BODY STRENGTH CLASS ─── */
const strengthClasses = [
  "s-critical",
  "s-weak",
  "s-fair",
  "s-strong",
  "s-fortress",
];
function setStrengthClass(cls) {
  document.body.classList.remove(...strengthClasses);
  if (cls) document.body.classList.add(cls);
}

/* ─── RENDER CHECK ROW ─── */
function setCheck(el, active) {
  el.classList.toggle("active", active);
  el.querySelector(".check-icon").textContent = active ? "●" : "○";
}

/* ─── MAIN ANALYZE FUNCTION ─── */
function analyze() {
  const pwd = input.value;
  charCount.textContent = pwd.length;

  if (pwd.length === 0) {
    reset();
    return;
  }

  const entropy = calcEntropy(pwd);
  const isCommon = COMMON_PASSWORDS.has(pwd.toLowerCase());
  const strength = getStrength(entropy, isCommon);
  const times = crackTimes(entropy);
  const issues = detectIssues(pwd);
  const suggs = buildSuggestions(pwd, entropy, issues, isCommon);

  /* Strength meter */
  meterFill.style.width = strength.pct + "%";
  meterGlow.style.width = strength.pct + "%";
  meterGlow.style.backgroundColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue(
    "--" +
      (strength.cls.replace("s-", "") === "fortress"
        ? "fortress"
        : strength.cls.replace("s-", "")),
  );
  strengthWord.textContent = strength.word;
  setStrengthClass(strength.cls);

  /* Crack times */
  timeOnline.textContent = times.online;
  timeOffline.textContent = times.offline;
  timeGpu.textContent = times.gpu;

  /* Entropy */
  entropyVal.textContent = entropy;
  entropyBar.style.width = Math.min((entropy / 128) * 100, 100) + "%";

  /* Charset checks */
  setCheck(checkLower, /[a-z]/.test(pwd));
  setCheck(checkUpper, /[A-Z]/.test(pwd));
  setCheck(checkDigits, /[0-9]/.test(pwd));
  setCheck(checkSymbols, /[^a-zA-Z0-9]/.test(pwd));

  /* Issues */
  if (issues.length === 0) {
    issuesList.innerHTML =
      '<div class="no-issues" style="color:var(--strong);opacity:1;">✓ No major issues detected</div>';
  } else {
    issuesList.innerHTML = issues
      .map(
        (i) =>
          `<div class="issue-item ${i.warn ? "warn" : ""}">
         <span class="issue-bullet">▸</span>
         <span>${i.text}</span>
       </div>`,
      )
      .join("");
  }

  /* Common password */
  if (isCommon) {
    commonIcon.textContent = "⚠️";
    commonIcon.style.borderColor = "rgba(255,45,85,0.4)";
    commonIcon.style.background = "rgba(255,45,85,0.08)";
    commonStatus.textContent = "Found in common passwords list!";
    commonStatus.style.color = "var(--critical)";
    commonSub.textContent =
      "This password appears in breach databases and will be tried first by attackers.";
  } else {
    commonIcon.textContent = "✓";
    commonIcon.style.borderColor = "rgba(0,230,118,0.3)";
    commonIcon.style.background = "rgba(0,230,118,0.06)";
    commonStatus.textContent = "Not in common passwords list";
    commonStatus.style.color = "var(--strong)";
    commonSub.textContent = "Checked against 200 most commonly used passwords.";
  }

  /* Suggestions */
  suggList.innerHTML = suggs
    .map(
      (s) =>
        `<li class="suggestion-item"><span class="suggestion-arrow">→</span>${s}</li>`,
    )
    .join("");
}

/* ─── RESET ─── */
function reset() {
  meterFill.style.width = "0%";
  meterGlow.style.width = "0%";
  strengthWord.textContent = "—";
  setStrengthClass(null);

  timeOnline.textContent = "—";
  timeOffline.textContent = "—";
  timeGpu.textContent = "—";

  entropyVal.textContent = "0";
  entropyBar.style.width = "0%";

  [checkLower, checkUpper, checkDigits, checkSymbols].forEach((el) =>
    setCheck(el, false),
  );

  issuesList.innerHTML =
    '<div class="no-issues">Start typing to analyze...</div>';
  commonIcon.textContent = "?";
  commonIcon.style.borderColor = "";
  commonIcon.style.background = "";
  commonStatus.textContent = "Awaiting input";
  commonStatus.style.color = "";
  commonSub.textContent = "Checking against 200 most common passwords";

  suggList.innerHTML =
    '<li class="suggestion-placeholder">Analysis will appear here as you type...</li>';
}

/* ─── EVENT: live input ─── */
input.addEventListener("input", analyze);

/* ─── FOCUS INPUT ON LOAD ─── */
window.addEventListener("load", () => {
  setTimeout(() => input.focus(), 300);
});
