# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* Fs

---

## URL

_Server_
```
http://localhost:3000
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints

### POST /create/:type/:species

> Create animal or plant

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "<name>",
  "description" : "<description>"
}
```

_Response (200)_
```
{
    "data": [<data_species>],
    "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"description\" is required"
}
```

---

### GET /all/:type

> Get all by type

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{

    "data": {
        "<data_type>": [
	        <data_species>
	       ]
        },

    "status": "Success"

}
```

---

### GET /all/:type/:species/:name

 > Get by name

_Request Params_

```
<type_name>/<species_name>/<animal_or_plant_name>

```

_Request Header_

```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "name": "<name>",
        "description": "<description>"
    },
    "message": "Success"
}
```

_Response (404)_
```
{
    "message": "Data Not Found"
}
```

---
### PUT /all/:type/:species/:name

> Update by name

_Request Params_
```
/<type_name>/<species_name>/<animal_or_plant_name>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": "<name>",
  "description": "<description>",
}
```

_Response (200)_
```
{
    "data": [
        <species_list>
    ],
    "message": "Success"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" length must be at least 3 characters long"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---

### DELETE /all/:type/:species/:name

> Delete by name

_Request Params_
```
/<type_name>/<species_name>/<name>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [<species_list>],
    "message": "Success"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---
