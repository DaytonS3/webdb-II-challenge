const router = require("express").Router();

const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};

const db = knex(knexConfig);

router.get("/", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .then(zoos => {
      if (zoos) {
        res.status(200).json(zoos);
      } else {
        res.status(404).json({ message: "ID not Found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  db("zoos")
    .insert(req.body, "id")
    .then(ids => {
      db("zoos")
        .where({ id: ids[0] })
        .first()
        .then(zoos => {
          res.status(200).json(zoos);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;
