sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: "perform new GET request @ Location's field value i.e URL Redirect"
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: the html document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.ccs
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "wertz", date: "2024-09-20T11:30:25.772Z"}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
