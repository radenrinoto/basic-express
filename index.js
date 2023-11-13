import express from 'express';
import joi from 'joi';
import fs from 'fs';
const app = express();

const PORT = 3000;
const database = './database/db.json';
const data = JSON.parse(fs.readFileSync(database));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const handleServerError = (res) => {
  return res.status(500).json({ message: 'Internal Server Error' })
}

const handleClientError = (res, status, message) => {
  return res.status(status).json({ message });
}

app.get('/all/:type', (req, res) => {
  try {
    const { type } = req.params;
    const listType = ['animal', 'plant'];
    if (!listType.includes(type)) {
      return handleClientError(res, 404, 'URL Not Found');
    }
    return res.status(200).json({ data: data[type], status: 'Success'});
  } catch (error) {
    return handleServerError(res);
  }
})

app.get('/all/:type/:species/:name', (req, res) => {
  try {
    const { type, species, name } = req.params;
    const listType = ['animal', 'plant'];
    if (!listType.includes(type) || !data[type][species].find((el) => el.name.toLowerCase() === name.toLowerCase())) {
      return handleClientError(res, 404, 'Data Not Found');
    }
    const selectedName = data[type][species].filter((el) => el.name.toLowerCase() === name.toLowerCase());
    res.status(200).json({ data: selectedName[0], message: 'Success' })
  } catch (error) {
    return handleServerError(res);
  }
})

app.post('/create/:type/:species', (req, res) => {
  try {
    const { type, species } = req.params;
    const newData = req.body;

    const scheme = joi.object({
      name: joi.string().min(3).required(),
      description: joi.string().required()
    })

    const { error } = scheme.validate(newData);
    if (error) {
      res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    if (data[type][species].find((el) => el.name.toLowerCase() === newData.name.toLowerCase())) {
      return handleClientError(res, 400, 'Data Already Existed');
    }

    data[type][species].push(newData);

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(201).json({ data: data[type][species], status: 'Success' })

  } catch (error) {
    return handleServerError(res);
  }
})

app.put('/all/:type/:species/:name', (req, res) => {
  try {
    const { type, species, name } = req.params;
    const newData = req.body;

    const scheme = joi.object({
      name: joi.string().min(3).required(),
      description: joi.string().required()
    })

    const { error } = scheme.validate(newData);
    if (error) {
      res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    if (!data[type][species].find((el) => el.name.toLowerCase() === name.toLowerCase())) {
      return handleClientError(res, 404, 'Data Not Found');
    }

    const filtered = data[type][species].filter((el) => el.name.toLowerCase() !== name.toLowerCase());
    filtered.push(newData);

    data[type][species] = filtered;

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(200).json({ data: data[type][species], message: 'Success' })

  } catch (error) {
    return handleServerError(res);
  }
})

app.delete('/all/:type/:species/:name', (req, res) => {
  try {
    const { type, species, name } = req.params;

    if (!data[type][species].find((el) => el.name.toLowerCase() === name.toLowerCase())) {
      return handleClientError(res, 404, 'Data Not Found');
    }

    const filtered = data[type][species].filter((el) => el.name.toLowerCase() !== name.toLowerCase());
    data[type][species] = filtered;
    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(200).json({ data: data[type][species], message: 'Success' })
  } catch (error) {
    return handleServerError(res)
  }
}) 



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})