const fs = require('fs');
const file = 'src/app/industry/feedback/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const endBlock = `      </div>

      {/* CONCERN SUBMISSION MODAL */}`;

const newEndBlock = `        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
            {role === 'super_admin' ? 'No tickets found' : 'Confidential CQI Pipeline'}
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
            {role === 'super_admin' 
              ? 'Try adjusting your filters or search query.' 
              : 'Submit a curriculum concern or feedback to notify the university administration. For privacy, submitted tickets are only visible to the Super Admin team.'}
          </p>
        </div>
      )}

      {/* CONCERN SUBMISSION MODAL */}`;

content = content.replace(endBlock, newEndBlock);
fs.writeFileSync(file, content);
