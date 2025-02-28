const arithmeticRequestHandler = (req, res) => {
    console.log("In Arithmetic Request Handler", req.url);
    
    const body = [];   
    req.on("data", (chunk) => {
        body.push(chunk);
    });

    req.on("end", () => {
        const bodyStr = Buffer.concat(body).toString();
        const params = new URLSearchParams(bodyStr);
        const bodyObj = Object.fromEntries(params);
        
        const num1 = Number(bodyObj.first);
        const num2 = Number(bodyObj.second);
        const operation = bodyObj.operator;  // Fixed key name
        let result;
        
        if (isNaN(num1) || isNaN(num2)) {
            result = "Error: Invalid input";
        } else {
            switch (operation) {
                case "add":
                    result = num1 + num2;
                    break;
                case "subtract":
                    result = num1 - num2;
                    break;
                case "multiply":
                    result = num1 * num2;
                    break;
                case "divide":
                    result = num2 !== 0 ? num1 / num2 : "Error: Division by zero";
                    break;
                default:
                    result = "Error: Invalid operation";
            }
        }

        console.log("Result:", result);

        // Send response back to user
        res.setHeader("Content-Type", "text/html");
        res.write(`
            <html>
            <head>
                <title>Calculation Result</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    .container { max-width: 500px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                    h1 { color: #333; }
                    .result { font-size: 24px; font-weight: bold; margin-top: 20px; color: #007BFF; }
                    a { display: inline-block; margin-top: 20px; padding: 10px 20px; text-decoration: none; background: #007BFF; color: white; border-radius: 5px; }
                    a:hover { background: #0056b3; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Calculation Result</h1>
                    <p>The result of <b>${operation}</b> between <b>${num1}</b> and <b>${num2}</b> is:</p>
                    <div class="result">${result}</div>
                    <a href="/calculator">Go back</a>
                </div>
            </body>
            </html>
        `);
        return res.end();
    });
};

module.exports = arithmeticRequestHandler;
