const generateHTML = (formData) => {
  return `<!DOCTYPE html>
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
            min-height: 100vh;
            margin: 0;
            padding: 0;
        }
        .accent { color: var(--accent-color); }
        .accent-border { border-color: var(--accent-color); }
        .accent-bg { background-color: var(--accent-color); }
    </style>
</head>
<body>
    <div class="relative z-10">
        <nav class="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <span class="text-xl accent">${formData.title}</span>
                    </div>
                </div>
            </div>
        </nav>

        <main class="pt-32 pb-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto">
                    <h1 class="text-4xl md:text-6xl mb-6 leading-tight whitespace-pre-line">
                        ${formData.heroTitle}
                    </h1>
                    <p class="text-lg opacity-80 mb-8">
                        ${formData.heroSubtitle}
                    </p>
                    <a href="${formData.buyButtonLink}" class="accent-bg px-6 py-2 rounded-lg inline-block">
                        Buy Now
                    </a>
                </div>
            </div>
        </main>

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
            <a href="${formData.twitterLink}" target="_blank" rel="noopener noreferrer" class="accent-bg px-4 py-2 rounded-full">Twitter</a>
            <a href="${formData.telegramLink}" target="_blank" rel="noopener noreferrer" class="accent-bg px-4 py-2 rounded-full">Telegram</a>
        </div>
        ` : ''}
    </div>
</body>
</html>`;
};

module.exports = { generateHTML };