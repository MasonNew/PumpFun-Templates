require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  try {
    const formData = JSON.parse(event.body);

    const response = await fetch('https://api.netlify.com/api/v1/sites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`, // Ensure this token is correct and has deployment permissions
      },
      body: JSON.stringify({
        // Site information to create
        name: formData.title,
        custom_domain: false,
        // Other configurations as needed
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to deploy site. Status: ${response.status}, Response: ${errorText}`);
    }

    const { ssl_url, admin_url } = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({
        siteUrl: ssl_url,
        claimURL: admin_url,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};