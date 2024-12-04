curl --location --request POST 'https://api.coze.com/v3/chat' \
--header 'Authorization: Bearer pat_ewn7BZ9gjeCxjpufsqsxCKlEvYdLOTi9w3ZHOgNXmituSw8AshZhhhYWii1rAQtH' \
--header 'Content-Type: application/json' \
--data-raw '{
    "bot_id": "7444006377292529715",
    "user_id": "123123***",
    "stream": false,
    "auto_save_history":true,
    "additional_messages":[
        {
            "role":"user",
            "content":"早上好",
            "content_type":"text"
        }
    ]
}'
