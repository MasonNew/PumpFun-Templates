const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (!event.body) {
      throw new Error('No request body provided');
    }

    const { formData } = JSON.parse(event.body);
    if (!formData) {
      throw new Error('Invalid form data');
    }

    // Create new site
    const createSiteResponse = await fetch('https://api.netlify.com/api/v1/sites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        name: `crypto-template-${Date.now()}`,
        custom_domain: false,
      }),
    });

    if (!createSiteResponse.ok) {
      const error = await createSiteResponse.text();
      throw new Error(`Failed to create site: ${error}`);
    }

    const site = await createSiteResponse.json();
    console.log('Site created:', site);

    // Generate HTML content
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.title}</title>
    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <style>
        :root {
            --background-color: ${formData.backgroundColor};
            --accent-color: ${formData.accentColor};
            --font-color: ${formData.fontColor};
        }
        body {
            background-color: var(--background-color);
            color: var(--font-color);
            font-family: '${formData.fontType}', sans-serif;
        }
        .accent { color: var(--accent-color); }
        .accent-border { border-color: var(--accent-color); }
        .accent-bg { background-color: var(--accent-color); }
    </style>
</head>
<body>
    <div class="min-h-screen">
        <nav class="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <span class="text-xl accent">${formData.title}</span>
                </div>
            </div>
        </nav>

        <div class="relative pt-32 pb-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto">
                    <h1 class="text-4xl md:text-6xl mb-6 leading-tight whitespace-pre-line">
                        ${formData.heroTitle}
                    </h1>
                    <p class="text-lg opacity-80 mb-8">
                        ${formData.heroSubtitle}
                    </p>
                    <button class="accent-bg px-6 py-2 rounded-lg">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>

        <div class="bg-white/5 backdrop-blur-lg py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center gap-4">
                    <span>Contract:</span>
                    <code class="accent">${formData.contractAddress}</code>
                </div>
            </div>
        </div>

        ${formData.showSocialLinks ? `
        <div class="fixed bottom-8 right-8 flex flex-col gap-4">
            <a href="${formData.twitterLink}" target="_blank" class="accent-bg px-4 py-2 rounded-full">Twitter</a>
            <a href="${formData.telegramLink}" target="_blank" class="accent-bg px-4 py-2 rounded-full">Telegram</a>
        </div>
        ` : ''}
    </div>
</body>
</html>`;

    // Deploy to site
    const deployResponse = await fetch(`https://api.netlify.com/api/v1/sites/${site.id}/deploys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        files: {
          '/index.html': {
            content: html
          }
        }
      })
    });

    if (!deployResponse.ok) {
      const error = await deployResponse.text();
      throw new Error(`Failed to deploy: ${error}`);
    }

    const deploy = await deployResponse.json();
    console.log('Deploy successful:', deploy);

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        siteUrl: deploy.ssl_url || deploy.url,
        claimUrl: `https://app.netlify.com/sites/${site.name}/settings/general`,
        message: 'Site deployed successfully!'
      })
    };

  } catch (error) {
    console.error('Deployment error:', error);
    
    return {
      statusCode: error.statusCode || 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message || 'Deployment failed'
      })
    };
  }
};