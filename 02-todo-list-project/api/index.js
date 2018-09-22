// Modules.
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


// Data Interaction Function
const Data = {
  readFile: () => {
    const data = fs.readFileSync(path.resolve(__dirname, './data.json'));
    return data;
  },
  getItem: () => {
    const data = Data.readFile();
    return { items: JSON.parse(data.toString()).items };
  },
  addItem: (item) => {
    const data = Data.getItem();
    const newItem = {
      id: '' + (Math.random() + 10) * (Math.random() + 4.6) * Math.random() * 2000 * 2 + '',
      content: item,
      complete: false,
      fav: false
    }
    const items = JSON.stringify({ items: [...data.items, newItem]});
    try {
      fs.writeFileSync(path.resolve(__dirname, './data.json'), items);
      return Data.getItem();
    } catch (e) {
      return false;
    }
  },
  removeItem: (toRemove) => {
    const data = Data.getItem();
    const items = JSON.stringify({ items: data.items.filter(item => item.id !== toRemove.id) });
    try {
      fs.writeFileSync(path.resolve(__dirname, './data.json'), items);
      return Data.getItem();
    } catch (e) {
      return false;
    }
  },
  changeItemCompleteStatus: toChange => {
    const data = Data.getItem();
    const items = JSON.stringify({ items: data.items.map(item => ({ ...item, complete: (toChange.id === item.id) ? !toChange.complete : item.complete }))});
    try {
      fs.writeFileSync(path.resolve(__dirname, './data.json'), items);
      return Data.getItem();
    } catch (e) {
      return false;
    }
  },
  changeItemFavStatus: toChange => {
    const data = Data.getItem();
    const items = JSON.stringify({ items: data.items.map(item => ({ ...item, fav: (toChange.id === item.id) ? !toChange.fav : item.fav }))});
    try {
      fs.writeFileSync(path.resolve(__dirname, './data.json'), items);
      return Data.getItem();
    } catch (e) {
      return false;
    }
  }
};


// Server Routing
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/get/item', (req, res) => {
  res.status(200);
  res.setHeader('Content-type', 'application/json');
  res.send({ data: Data.getItem() });
});

app.post('/api/add/item', (req, res) => {
  res.status(200);
  res.setHeader('Content-type', 'application/json');
  res.send({ data: Data.addItem(req.body.data) });
});

app.delete('/api/remove/item', (req, res) => {
  res.status(200);
  res.setHeader('Content-type', 'application/json');
  res.send({ data: Data.removeItem(req.body.data) });
});

app.put('/api/update/item/complete', (req, res) => {
  res.status(200);
  res.setHeader('Content-type', 'application/json');
  res.send({ data: Data.changeItemCompleteStatus(req.body.data) });
});

app.put('/api/update/item/fav', (req, res) => {
  res.status(200);
  res.setHeader('Content-type', 'application/json');
  res.send({ data: Data.changeItemFavStatus(req.body.data) });
});


// Server Listening
app.listen(5000, () => {
  console.log('Server running');
});