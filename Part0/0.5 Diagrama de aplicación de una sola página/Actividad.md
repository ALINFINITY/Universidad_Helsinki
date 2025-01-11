sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML Document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: The js file
    deactivate server

    Note right of browser: En el archivo spa.js se realiza una solicitud GET al Backend, para obtener el JSON actualizado con todas notas.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: The data in JSON format.
    deactivate server

    Note right of browser: Si se ingresa una nueva nota ocurre lo siguiente.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: Como la página es SPA no se recarga toda la página, solo se actualiza el apartado de notas.