---
title: "ChatGPT FrontEnd Only Template"
description: "FRONTBACKTo use the provided front-end code to connect and communicate with the ChatGPT API, you'll need to set up a back-end server to handle API req"
date: 2023-03-21T02:16:43.431Z
tags: []
---
## SourceCode
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatGPT Conversations</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: auto;
        }
        #conversation {
            border: 1px solid #ccc;
            padding: 16px;
            margin-bottom: 16px;
            overflow-y: auto;
            max-height: 400px;
        }
        .message {
            margin-bottom: 8px;
        }
        .user {
            color: #0077cc;
            font-weight: bold;
        }
        .gpt {
            color: #cc7700;
            font-weight: bold;
        }
        #input-form {
            display: flex;
            justify-content: space-between;
        }
        #user-input {
            flex-grow: 1;
            padding: 8px;
            border: 1px solid #ccc;
        }
        #send-button {
            background-color: #0077cc;
            color: white;
            border: none;
            padding: 8px 16px;
            margin-left: 8px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>ChatGPT Chat</h1>
    <div id="conversation"></div>
    <form id="input-form">
        <input type="text" id="user-input" placeholder="메시지를 입력하세요...">
        <button type="submit" id="send-button">발송</button>
    </form>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        const conversationDiv = document.getElementById("conversation");
        const inputForm = document.getElementById("input-form");
        const userInput = document.getElementById("user-input");

        inputForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const message = userInput.value.trim();
            if (message) {
                addMessageToConversation("user", message);
                userInput.value = "";
                sendMessageToGPT(message);
            }
        });

        function addMessageToConversation(sender, message) {
            const messageDiv = document.createElement("div");
            messageDiv.className = "message";
            messageDiv.innerHTML = `<span class="${sender}">${sender === "user" ? "You" : "ChatGPT"}:</span> ${message}`;
            conversationDiv.appendChild(messageDiv);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }

        async function sendMessageToGPT(message) {
                    const apiKey = "api-key";
                    const apiUrl = "https://api.openai.com/v1/completions";

                    try {
                        const response = await axios.post(apiUrl, {
                            "model": "text-davinci-003",
                            "prompt": message,
                            "temperature": 0.9,
                            "max_tokens": 150,
                            "top_p": 1,
                            "frequency_penalty": 0,
                            "presence_penalty": 0.6,
                            "stop": [" Human:", " AI:"],
                            }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${apiKey}`
                            }
                        });
                        debugger;
                        const data = response.data.choices[0].text.trim();
                        console.log(data);
                        addMessageToConversation("gpt", data);
                    } catch (error) {
                        console.error(error);
                        addMessageToConversation("gpt", "Error: Unable to fetch response from ChatGPT.");
                    }
            }

    </script>
</body>
</html>
<!--
Replace "your_openai_api_key_here" with your actual OpenAI API key.
Please be aware that this method is not recommended due to the security risks involved. Anyone with access to your front-end code can view and potentially misuse your API key. The back-end server method is the preferred and secure way to handle API requests.

This code sends a POST request to the https://api.openai.com/v1/chat endpoint with the following parameters:

model: The ID of the GPT-3.5 model to use. In this case, we’re using the text-davinci-002 model.
prompt: The message to send to the GPT-3.5 model.
temperature: The “creativity” of the response. A higher temperature will result in more creative responses.
max_tokens: The maximum number of tokens (words) in the response.
stop: The character to use to stop the response. In this case, we’re using a newline character (\n).
The Authorization header is used to authenticate the request with your OpenAI API key.

-->

```

## Result
![](/images/fca7bbe8-16ff-4642-9af3-fb74998687ea-image.png)


## Reference
https://platform.openai.com/account/api-keys
