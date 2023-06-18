const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// This GET route finds all the products including it's associated categories and tag data
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{model: Category}, {model: Tag}]
    });
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// This GET route finds one specific product including it's associated categories and tag data by id value
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag}]
    });
    if (!productData) {
      res.status(404).json({message: 'No product found with that id!'});
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// This POST route creates a new product including it's associated categories and tag data
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
  
    // if there's product tags, create pairings to bulk create in the ProductTag model
    if (req.body.hasOwnProperty("tagIds") && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json(productTagIds)
    } else {
      // if no product tags, just respond
      res.status(200).json(product);
    }
    
  } catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This PUT route updates the products including it's associated categories and tag data by id value
router.put('/:id',  async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
        // find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      
    // get list of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    // create filtered list of new tag_ids
    const newProductTags = req.body.tagIds
    .filter((tag_id) => !productTagIds.includes(tag_id))
    .map((tag_id) => {
      return {
        product_id: req.params.id,
        tag_id,
      };
    });
    // figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // run both actions
    const updatedProductTags = [
      await ProductTag.destroy({ where: { id: productTagsToRemove } }),
      await ProductTag.bulkCreate(newProductTags),
    ];
    res.json(updatedProductTags);
  } catch(err) {
      console.log(err);
      res.status(400).json(err);
    };
});

// This DELETE route deletes products including it's associated categories and tag data by id value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({message: 'No product found with that id!'});
      return;
    }
    res.status(200).json(productData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Export router
module.exports = router;
