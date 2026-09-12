const fs = require('fs');
const file = 'src/app/industry/feedback/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const badStart = `      {/* TICKETS LIST */}
                >
                  {ticket.priority} Priority`;

const goodStart = `      {/* TICKETS LIST */}
      {filteredTickets.length > 0 ? (
        <div id="tracker" className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4"
            >
              {/* Ticket Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {ticket.ticketNumber}
                  </span>
                  <span
                    className={\`rounded-full px-2.5 py-0.5 text-[10px] font-bold \${getStatusBadge(
                      ticket.status
                    )}\`}
                  >
                    {ticket.status}
                  </span>
                  <span
                    className={\`rounded-md px-2 py-0.5 text-[10px] font-bold \${
                      ticket.priority === 'High'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : ticket.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                    }\`}
                  >
                    {ticket.priority} Priority`;

content = content.replace(badStart, goodStart);
fs.writeFileSync(file, content);
