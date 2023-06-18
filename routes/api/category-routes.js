const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// This GET route finds all categories and includes it's associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// This GET route finds one specific category by id and includes it's associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!categoryData) {
      res.status(404).json({message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// This POST route creates a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This PUT route updates a category by it's id value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData[0]) {
      res.status(404).json({message: 'No category found with that id!'});
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// This DELETE route deletes a category by it's id value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({message: 'No category found with that id!'});
      return;
    }

    res.status(200).json(categoryData);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Export router
module.exports = router;
