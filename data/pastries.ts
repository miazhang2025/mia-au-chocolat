import { Pastry } from '@/types/pastry';

export const pastries: Pastry[] = [
  {
    id: 'croissant',
    name: 'Macha Mochi Donut',
    description: 'Soft, chewy mochi donut infused with matcha flavor and coated in a sweet glaze.',
    recipe: `Ingredients:
• 60g mochi flour
• 30g milk
• 30g oil
• 50g chocolate
• 2g macha powder
• 25g butter
`,
    image: '/images/mocha_mochi_donut.png',
    position: [-1.4, -1.35, 0],
    rotation: [0.5, 0, 0],
    scale: 0.7,
    modelType: 'gltf',
    modelPath: '/models/donut.glb',
  },
  {
    id: 'macaron',
    name: 'Brain Mochi',
    description: 'Unique mochi treat shaped like a brain, with a soft and chewy texture and a creamy filling.',
    recipe: `Ingredients:
• 100g almond flour
• 100g powdered sugar
• 75g egg whites (aged)
• 75g granulated sugar
• Food coloring
• Ganache filling of choice
`,
    image: '/images/brain mochi.png',
    position: [-0.35, -1.35, 0],
    rotation: [0, 0, 0],
    scale: 1,
    modelType: 'gltf',
    modelPath: '/models/mochi.glb',
  },
  {
    id: 'chocolate-cake',
    name: 'apricot cake',
    description: 'Moist and flavorful yogurt cake layered with homemade apricot jam.',
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
    image: '/images/apricot cake.png',
    position: [0.8, -1.15, 0],
    rotation: [0, 0, 0],
    scale: 1,
    modelType: 'gltf',
    modelPath: '/models/apricot_cake.glb',
  },
  {
    id: 'eclair',
    name: 'Mont Blanc',
    description: 'Classic French pastry made with a crisp choux pastry shell filled with sweet chestnut cream and topped with a dusting of powdered sugar.',
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
    image: '/images/Mont Blanc.png',
    position: [2, -1.3, 0],
    rotation: [0, 0, 0],
    scale: 1,
    modelType: 'gltf',
    modelPath: '/models/mont_blanc.glb',
  },
  {
    id: 'tart',
    name: 'Matcha Guava Cake',
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
    image: '/images/matcha guava cake.png',
    position: [3, -1.15, 0],
    rotation: [0, 0, 0],
    scale: 1,
    modelType: 'gltf',
    modelPath: '/models/matcha guava cake.glb',
  },
];
