const fs = require('fs');
const path = require('path');

const routes = {
  '': 'Login',
  'dashboard': 'SmartFamilyPantryApp',
  'setup/stores': 'SetupPreferredStores',
  'setup/members': 'SetupHouseholdMembers',
  'setup/budget': 'SetupMonthlyBudget',
  'inventory': 'PantryInventory',
  'fridge': 'TheFridgeBoardList',
  'scan': 'ScanReceipt',
  'budget': 'BudgetTracker',
  'profiles': 'ManageProfiles',
  'trip': 'TripOptimizationDetails',
  'settings': 'Settings'
};

const appDir = path.join(__dirname, 'src', 'app');

for (const [route, component] of Object.entries(routes)) {
  const routeDir = path.join(appDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  const componentPath = route === '' ? '@/app/components/screens/Login' : `@/app/components/screens/${component}`;
  
  const pageContent = `
import ${component} from '${componentPath}';

export default function Page() {
  return <${component} />;
}
`;
  
  fs.writeFileSync(path.join(routeDir, 'page.tsx'), pageContent.trim());
}

console.log('Pages generated.');
