// bypasser.js

async function bypassLink() {
  const url = document.getElementById('urlInput').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = 'Processing...';

  try {
    const service = detectService(url);
    let bypassedUrl = '';

    switch (service) {
      case 'linkvertise':
        bypassedUrl = await bypassLinkvertise(url);
        break;
      case 'boostink':
        bypassedUrl = await bypassBoostInk(url);
        break;
      case 'shrinkearn':
        bypassedUrl = await bypassShrinkEarn(url);
        break;
      case 'adfly':
        bypassedUrl = await bypassAdFly(url);
        break;
      default:
        throw new Error('Unsupported service or invalid URL.');
    }

    resultDiv.innerHTML = `Bypassed URL: <a href="${bypassedUrl}" target="_blank">${bypassedUrl}</a>`;
  } catch (error) {
    resultDiv.textContent = `Error: ${error.message}`;
  }
}

function detectService(url) {
  if (url.includes('linkvertise.com')) return 'linkvertise';
  if (url.includes('boost.ink')) return 'boostink';
  if (url.includes('shrinkearn.com')) return 'shrinkearn';
  if (url.includes('adf.ly') || url.includes('j.gs')) return 'adfly';
  return '';
}

async function bypassLinkvertise(url) {
  const response = await fetch('https://ancient-dew-2472.fly.dev/api/bypass', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  });
  const data = await response.json();
  if (data.success) return data.bypassedlink;
  else throw new Error(data.errormsg || 'Failed to bypass Linkvertise.');
}

async function bypassBoostInk(url) {
  const response = await fetch('https://bypass.vip/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  });
  const data = await response.json();
  if (data.status === 'success') return data.result;
  else throw new Error('Failed to bypass Boost.ink.');
}

async function bypassShrinkEarn(url) {
  const response = await fetch('https://bypass.vip/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  });
  const data = await response.json();
  if (data.status === 'success') return data.result;
  else throw new Error('Failed to bypass ShrinkEarn.');
}

async function bypassAdFly(url) {
  const response = await fetch('https://bypass.vip/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  });
  const data = await response.json();
  if (data.status === 'success') return data.result;
  else throw new Error('Failed to bypass AdFly.');
}
