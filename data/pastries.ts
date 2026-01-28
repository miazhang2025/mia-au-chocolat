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

Instructions:
1. Mix flour, salt, sugar, and yeast. Add milk and knead until smooth.
2. Rest dough for 1 hour, then chill overnight.
3. Roll out dough and laminate with cold butter through multiple folds.
4. Shape into croissants and proof for 2 hours.
5. Bake at 200°C (400°F) for 15-20 minutes until golden.`,
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

Instructions:
1. Sift almond flour and powdered sugar together.
2. Beat egg whites to soft peaks, gradually add sugar.
3. Fold dry ingredients into meringue until lava-like consistency.
4. Pipe circles onto baking sheets and rest 30 minutes.
5. Bake at 150°C (300°F) for 12-15 minutes.
6. Cool and fill with ganache.`,
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

Instructions:
1. Mix all dry ingredients in a large bowl.
2. Add eggs, milk, oil, and vanilla. Beat until smooth.
3. Pour into greased cake pans.
4. Bake at 180°C (350°F) for 30-35 minutes.
5. Cool completely and frost with chocolate ganache.`,
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

Instructions:
1. Boil water, milk, and butter. Add flour and stir vigorously.
2. Cool slightly, then beat in eggs one at a time.
3. Pipe into éclair shapes and bake at 200°C (400°F) for 25 minutes.
4. Fill with pastry cream and top with chocolate glaze.`,
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

Instructions:
1. Mix flour, butter, and sugar until crumbly. Add egg yolk and water.
2. Roll out and line tart pan. Blind bake at 180°C (350°F) for 15 minutes.
3. Fill with pastry cream and arrange fresh fruits on top.
4. Glaze with apricot jam if desired.`,
    image: '/images/mocha_mochi_donut.png',
    position: [1, -0.5, 0.5],
    rotation: [0, -0.2, 0],
    scale: 0.5,
    modelType: 'cylinder',
  },
];
