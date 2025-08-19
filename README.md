# Simple Store!
A very quick way of creating a store front, all you need to do is fill out a json file with your stores info.

## Getting Started

### Writing
First step is to write yourself your storefronts json.
```json
{
  "name": "Wave Machines",
  "company": "John Smith Co",
  "payment": {
    "paypal": "JohhhnSmiith",
    "venmo": "JohhhnSmiith",
    "zelle": "john.smith@gmail.com"
  },
  "items": {
    "item1": {
      "name": "Basic wave machine",
      "description": "100 feet wide, 5 ft waves",
      "price": 10000.00
    },
    "item2": {
      "name": "Large wave machine",
      "description": "250 feet wide, 10 ft waves",
      "price": 500000.00
    }
  },
  "style": {
    "backgroundColor": "#f0f0f0",
    "textColor": "#333333",
    "headingColor": "#1a73e8",
    "fontFamily": "Arial, sans-serif",
    "linkColor": "#1a73e8",
    "buttonBackground": "#1a73e8",
    "buttonTextColor": "#ffffff",
    "borderColor": "#ccc",
    "spacing": "10px"
  }
}
```

### Hosting
Next you need to host this json file somewhere.
Find a site that can host your Json.

### Done
Now just build your link.
https://raw.githubusercontent.com/Larmbs/minimalist_store_front/refs/heads/main/index.html?store=YourJsonFileLink