// 公式來源: Wang et al., Cell Systems (2020)
// Human age = 16 * ln(dog_age_years) + 31

const birthInput = document.getElementById('birthdate');
const calcBtn = document.getElementById('calcBtn');
const clearBtn = document.getElementById('clearBtn');
const dogAgeText = document.getElementById('dogAgeText');
const humanAgeText = document.getElementById('humanAgeText');
const noteText = document.getElementById('noteText');
const formulaWarning = document.getElementById('formulaWarning');

// Helper: compute difference in years
function yearsBetween(dateFrom, dateTo) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = (dateTo - dateFrom) / msPerDay;
  return days / 365.2425; // approximate real-year length
}

function formatNumber(n, decimals = 2) {
  return Number.isFinite(n) ? n.toFixed(decimals) : '—';
}

function computeHumanAge(dogYears) {
  if (!(dogYears > 0)) return NaN;
  return 16 * Math.log(dogYears) + 31;
}

// ====== Main Calculate ======
calcBtn.addEventListener('click', () => {
  const val = birthInput.value;
  if (!val) {
    noteText.textContent = '請先選擇出生日期。';
    dogAgeText.textContent = '狗狗年齡: —';
    humanAgeText.textContent = '換算後人類年齡: —';
    return;
  }

  const birth = new Date(val + 'T00:00:00');
  const now = new Date();

  if (birth > now) {
    noteText.textContent = '出生日期不可晚於今天。';
    dogAgeText.textContent = '狗狗年齡: —';
    humanAgeText.textContent = '換算後人類年齡: —';
    return;
  }

  const dogYears = yearsBetween(birth, now);
  const humanYears = computeHumanAge(dogYears);

  dogAgeText.textContent = `狗狗年齡: ${formatNumber(dogYears, 2)} 年`;
  humanAgeText.textContent = Number.isFinite(humanYears)
    ? `換算後人類年齡: ${formatNumber(humanYears, 2)} 歲`
    : '換算後人類年齡: 無法計算';

  noteText.textContent =
    '說明：使用 Wang et al. (2020) 的對應函數（Human age = 16 × ln(dog age) + 31）。';

  // Special note for < 1 year
  if (dogYears < 1) {
    formulaWarning.innerHTML =
      '註：狗齡 < 1 年時 ln(狗齡) 為負值，此公式反映幼年期快速生理變化，屬正常現象。';
  } else {
    formulaWarning.innerHTML =
      '說明：此公式以狗狗年齡（年）計算；若小於 1 年，ln(狗齡) 會是負數，反映幼年期的快速生理變化。';
  }
});

// ====== Clear ======
clearBtn.addEventListener('click', () => {
  birthInput.value = '';
  dogAgeText.textContent = '狗狗年齡: —';
  humanAgeText.textContent = '換算後人類年齡: —';
  noteText.textContent = '請輸入出生年月日，然後按「開始計算」。';

  formulaWarning.innerHTML =
    '說明：此公式以狗狗年齡（年）計算；若小於 1 年，ln(狗齡) 會是負數，反映幼年期的快速生理變化。';
});
