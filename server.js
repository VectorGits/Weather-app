import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
const PORT = process.env.PORT || 5000;

// Get curr path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async(req, res) => {
    try {
        // Check if get request
        if (req.method === 'GET') {
            let filePath;
            if (req.url === '/'){
                filePath = path.join(__dirname, 'public', 'index.html');
            } else if (req.url === '/about') {
                filePath = path.join(__dirname, 'public', 'about.html');
            } else {
                // Serve static files
                filePath = path.join(__dirname, 'public', req.url);
        	}

            const data = await fs.readFile(filePath);
            res.end(data);
        }
    } catch (error) {
        res.statusCode = 500;
        res.end(`Error: ${error.message}`);
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});