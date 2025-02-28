const arithmeticRequestHandler = require("./c");

const renderHTML = (res, title, content) => {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .container { max-width: 500px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                h1 { color: #333; }
                a, button { display: inline-block; margin-top: 20px; padding: 10px 20px; text-decoration: none; background: #007BFF; color: white; border-radius: 5px; border: none; cursor: pointer; }
                button:hover, a:hover { background: #0056b3; }
                input, select { display: block; width: calc(100% - 22px); padding: 10px; margin: 10px auto; border: 1px solid #ccc; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                ${content}
            </div>
        </body>
        </html>
    `);
    return res.end();
};

const requestHandler = (req, res) => {
    console.log(req.url, req.method);

    if (req.url === "/") {
        return renderHTML(res, "Home", `
            <h1>Welcome to the Calculator</h1>
            <a href="/calculator">Go to Calculator</a>
        `);
    }
    
    if (req.url.toLowerCase() === "/calculator") {
        return renderHTML(res, "Calculator", `
            <h1>Simple Calculator</h1>
            <form action="/calculator-result" method="POST">
                <input type="text" name="first" placeholder="Enter first number" required>
                <input type="text" name="second" placeholder="Enter second number" required>
                <select name="operator" required>
                    <option value="add">Addition (+)</option>
                    <option value="subtract">Subtraction (-)</option>
                    <option value="multiply">Multiplication (×)</option>
                    <option value="divide">Division (÷)</option>
                </select>
                <button type="submit">Calculate</button>
            </form>
        `);
    }
    
    if (req.url.toLowerCase() === "/calculator-result" && req.method === "POST") {
        return arithmeticRequestHandler(req, res);
    }

    return renderHTML(res, "404 Not Found", `
        <h1>404 - Page Not Found</h1>
        <a href="/">Go to Home</a>
    `);
};

module.exports = requestHandler;
