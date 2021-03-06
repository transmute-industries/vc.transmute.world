export const docs = `<!DOCTYPE html>
<html>
<head>
    <title>vc-http-api</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

    <style>
        body {
            margin: 0;
            padding: 0;
        }
    </style>
</head>

<body>
    <redoc spec-url='/api/docs/json'> </redoc>
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js">
    </script>
</body>

</html>
`;
export const rapidoc = `<!doctype html> <!-- Important: must specify -->
<html>
<head>
  <meta charset="utf-8"> <!-- Important: rapi-doc uses utf8 charecters -->
  <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
</head>
<body>
  <rapi-doc 
    spec-url = "/api/docs/json"
    api-key-name = "api_key"
    api-key-location = "header"
    api-key-value = "-"
    render-style = "read" 
  > </rapi-doc>
</body> 
</html>
`;
