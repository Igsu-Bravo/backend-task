# backend-task API

Simple API written in JavaScript that creates events and allows participants to vote for an event's available dates. The API returns a suitable date for all event's participants.

# Dependencies

- **MongoDB** - Tested with version 2.6.10 (kind of old but it turned out to be more reliable in WSL).
- **NPM** - Version 6.11.3

# Installation

Clone this repo and inside root directory run:

```bash
npm install
```
# Usage

To start the server, run the following command in the root directory:

```bash
npm start
```

The default URL is `localhost:3000`. To test the endpoints you can use a tool like [Postman](https://www.getpostman.com/downloads/)

### Create an event

Send a `POST` request to the endpoint `/api/v1/event` with a body like the following:
```json
{
  "name": "Stepping into hyperspace",
  "dates": [
    "2019-02-24",
    "2019-02-25",
    "2019-02-26"
  ]
}
```
If the request succeeds, you will get an object with the ID of the newly created event. There is basic validation for the dates, so they should be submitted in this format: `yyyy-mm-dd`

### Add a vote to an event

Send a `POST`request to the endpoint `/api/v1/event/{id}/vote`  with a body like the following:
```json
{
  "name": "Solveig",
  "votes": [
    "2019-02-24",
    "2019-02-25"
  ]
}
```
If the request succeeds, you will get an object like the following:
```json
{
    "event": {
        "_id": "375c2f70-d9e4-11e9-bff0-b7ed76a4104e",
        "dates": [
            "2019-02-24",
            "2019-02-25",
            "2019-02-26"
        ],
        "name": "Stepping into hyperspace",
        "votes": [
            {
                "people": [
                    "Solveig"
                ],
                "_id": "5d81d9d95c91ca0fa1d26c0a",
                "date": "2019-02-24"
            },
            {
                "people": [
                    "Solveig"
                ],
                "_id": "5d81d9d95c91ca0fa1d26c09",
                "date": "2019-02-25"
            }
        ],
        "__v": 0
    }
}
```
### Get event by ID

Send a `GET` request to the endpoint `/api/v1/event/{id}`. If the ID is found, you will get the following:
```json
{
    "_id": "375c2f70-d9e4-11e9-bff0-b7ed76a4104e",
    "dates": [
        "2019-02-24",
        "2019-02-25",
        "2019-02-26"
    ],
    "name": "Stepping into hyperspace",
    "votes": [
        {
            "people": [
                "Solveig"
            ],
            "_id": "5d81d9d95c91ca0fa1d26c0a",
            "date": "2019-02-24"
        },
        {
            "people": [
                "Solveig"
            ],
            "_id": "5d81d9d95c91ca0fa1d26c09",
            "date": "2019-02-25"
        }
    ],
    "__v": 0
}
```

### List all events

Send a `GET` request to the endpoint `/api/v1/event/list`. The response contains events' IDs and names:
```json
{
    "events": [
        {
            "name": "Running through the stars",
            "id": "1cdc6690-d86a-11e9-a3a6-e7e9969fd43e"
        },
        {
            "name": "Stepping into hyperspace",
            "id": "375c2f70-d9e4-11e9-bff0-b7ed76a4104e"
        }
    ]
}
```

### Get an event's results

Send a `GET` request to the endpoint `/api/v1/event/{id}/results`. If the ID is found, the response contains a list of dates suitable for all event's participants:
```json
{
    "results": {
        "id": "375c2f70-d9e4-11e9-bff0-b7ed76a4104e",
        "name": "Stepping into hyperspace",
        "suitableDates": [
            {
                "date": "2019-02-24",
                "people": [
                    "Solveig",
                    "Loki"
                ]
            }
        ]
    }
}
```

