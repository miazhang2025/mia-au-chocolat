import { Pastry } from '@/types/pastry';

export const pastries: Pastry[] = [
  {
    id: 'croissant',
    name: 'Classic Croissant',
    description: 'Buttery, flaky, and perfectly golden croissant with delicate layers.',
    recipe: `Ingredients:
• 500g all-purpose flour
• 10g salt
• 80g sugar
• 10g instant yeast
• 300ml whole milk
• 250g cold butter
`,
    image: '/images/mocha_mochi_donut.png',
    position: [-2, -0.5, 0],
    rotation: [0, 0.3, 0],
    scale: 0.5,
    modelType: 'cylinder',
  },
  {
    id: 'macaron',
    name: 'French Macaron',
    description: 'Delicate almond meringue cookies with smooth ganache filling.',
    recipe: `Ingredients:
• 100g almond flour
• 100g powdered sugar
• 75g egg whites (aged)
• 75g granulated sugar
• Food coloring
• Ganache filling of choice
`,
    image: '/images/mocha_mochi_donut.png',
    position: [0, -0.3, 0],
    rotation: [0, 0, 0],
    scale: 0.3,
    modelType: 'cylinder',
  },
  {
    id: 'chocolate-cake',
    name: 'Chocolate Cake',
    description: 'Rich, moist chocolate cake with smooth chocolate ganache.',
    recipe: `Ingredients:
• 200g all-purpose flour
• 200g sugar
• 75g cocoa powder
• 2 tsp baking powder
• 1 tsp baking soda
• 2 eggs
• 250ml milk
• 125ml vegetable oil
• 2 tsp vanilla extract
`,
    image: '/images/mocha_mochi_donut.png',
    position: [2, -0.4, 0],
    rotation: [0, -0.3, 0],
    scale: 0.6,
    modelType: 'cube',
  },
  {
    id: 'eclair',
    name: 'Chocolate Éclair',
    description: 'Classic French pastry with choux pastry, cream filling, and chocolate glaze.',
    recipe: `Ingredients:
Choux Pastry:
• 125ml water
• 125ml milk
• 100g butter
• 150g flour
• 4 eggs

Filling & Glaze:
• Pastry cream
• Dark chocolate
`,
    image: '/images/mocha_mochi_donut.png',
    position: [-1, -0.6, 0.5],
    rotation: [0, 0.2, 0],
    scale: 0.4,
    modelType: 'cylinder',
  },
  {
    id: 'tart',
    name: 'Fruit Tart',
    description: 'Buttery tart shell filled with vanilla cream and fresh seasonal fruits.',
    recipe: `Ingredients:
Tart Shell:
• 200g flour
• 100g cold butter
• 50g sugar
• 1 egg yolk
• 2 tbsp cold water

Filling:
• Pastry cream
• Fresh fruits
`,
    image: '/images/mocha_mochi_donut.png',
    position: [1, -0.5, 0.5],
    rotation: [0, -0.2, 0],
    scale: 0.5,
    modelType: 'cylinder',
  },
];
