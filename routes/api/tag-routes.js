const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// This GET route finds all tags including their associated product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// This GET route finds one specific tag including it's associated product data by id value
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!tagData) {
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// This POST route creates a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This PUT route updates a tag's name by id value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagData[0]) {
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }

    res.status(200).json(tagData);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// This DELETE route deletes a tag by it's id value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Export router
module.exports = router;
