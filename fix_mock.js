const fs = require('fs');
const file = 'src/lib/mock-data.ts';
let content = fs.readFileSync(file, 'utf8');

// The corrupted string looks like: department: 'Department of Computer Engineering', major: 'Computer Engineering program: 'Computer Engineering & AI' AI',
// or similar variants. We want to replace all of that mess with just: department: 'Department of Computer Engineering', major: 'Computer Engineering & AI',

content = content.replace(/department: 'Department of Computer Engineering', major: 'Computer Engineering.*?'/g, "department: 'Department of Computer Engineering',\n    major: 'Computer Engineering & AI'");

// and for Ph.D.
content = content.replace(/department: 'Department of Computer Engineering', major: 'Ph.D. Computer Engineering.*?'/g, "department: 'Department of Computer Engineering',\n    major: 'Ph.D. in Computer Engineering'");

// and for M.Sc
content = content.replace(/department: 'Department of Computer Engineering', major: 'M.Sc. Robotics.*?'/g, "department: 'Department of Computer Engineering',\n    major: 'M.Sc. in Robotics & Intelligent Systems'");

fs.writeFileSync(file, content);
