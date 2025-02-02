const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function handleNetlifyResponse(response) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  if (!response.ok) {
    const error = isJson ? await response.json() : await response.text();
    throw new Error(isJson ? error.message : error);
  }
  
  return isJson ? response.json() : response.text();
}

async function createSite(token) {
  const response = await fetch('https://api.netlify.com/api/v1/sites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'Crypto-Template-Generator'
    },
    body: JSON.stringify({
      name: `crypto-template-${Date.now()}`,
      custom_domain: false,
      force_ssl: true
    })
  });

  return handleNetlifyResponse(response);
}

async function deployToSite(token, siteId, files) {
  const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'Crypto-Template-Generator'
    },
    body: JSON.stringify({
      files,
      async: true,
      draft: false
    })
  });

  return handleNetlifyResponse(response);
}

module.exports = {
  createSite,
  deployToSite
};