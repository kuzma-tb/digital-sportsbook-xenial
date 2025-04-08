const sharp = require('sharp');
const fs = require("fs");
const path = require("path");

const imagesDir = path.resolve(__dirname, "../public/img");

// Define breakpoints and suffixes
const sizes = [
    { width: 480, suffix: 'small' },
    { width: 768, suffix: 'medium' },
    { width: 1200, suffix: 'large' },
];

const deletableExtensions = [".jpg", ".jpeg", ".png", ".webp"];

const processImages = async () => {
    const files = fs.readdirSync(imagesDir);
    const tasks = [];

    for (const file of files) {
        const extension = path.extname(file).toLowerCase();
        const inputPath = path.join(imagesDir, file);
        const baseName = path.basename(file, extension);

        const isDeletable = deletableExtensions.includes(extension);
        const isResponsiveVariant = baseName.match(/-(small|medium|large)$/);

        // Skip non-target files or already optimized ones
        if (!isDeletable || isResponsiveVariant) continue;

        const variantTasks = sizes.map(({ width, suffix }) => {
            const outputPath = path.join(imagesDir, `${baseName}-${suffix}.webp`);
            return sharp(inputPath)
                .resize(width)
                .webp({ quality: 75 })
                .toFile(outputPath)
                .then(() => {
                    console.log(`Images converted to webp: ${outputPath}`);
                });
        });

        // Wait for all variants to finish, then delete original
        const fullTask = Promise.all(variantTasks)
            .then(() => {
                if (fs.existsSync(inputPath)) {
                    fs.unlinkSync(inputPath);
                    console.log(`Deleted original image: ${file}`);
                }
            })
            .catch((err) => {
                console.error(`Error processing ${file}:`, err.message);
            });

        tasks.push(fullTask);
    }

    // Ensure all processes are done before continue generating manifest optimized.json
    await Promise.all(tasks);

    // Generate a manifest public/img/optimized.json file with an array of optimized filenames
    const optimizedImages = fs.readdirSync(imagesDir)
        .filter(file => file.match(/-(small|medium|large)\.webp$/))
        .sort();

    fs.writeFileSync(
    path.join(imagesDir, 'optimized.json'),
    JSON.stringify({ images: optimizedImages }, null, 2)
    );

    console.log('Created manifest: optimized.json');
    console.log('All images processed.');
}

processImages().catch((err) => {
    console.error("Optimization failed:", err);
});
