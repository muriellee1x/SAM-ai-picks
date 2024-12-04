#!/bin/bash

API_TOKEN="pat_ewn7BZ9gjeCxjpufsqsxCKlEvYdLOTi9w3ZHOgNXmituSw8AshZhhhYWii1rAQtH"
BOT_ID="7442161757059235878"

curl --location --request POST 'https://api.coze.cn/v1/bot/publish' \
  --header "Authorization: Bearer ${API_TOKEN}" \
  --header 'Content-Type: application/json' \
  --data-raw "{
    \"bot_id\": \"${BOT_ID}\",
    \"connector_ids\": [
        \"1024\"
    ]
}" 