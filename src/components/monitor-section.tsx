
export function MonitorSection() {
  return (
    <div className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Monitor Outstanding <span className="text-risitify-500">Invoices Easier</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground mx-auto max-w-2xl">
            Keep track of all your outstanding invoices in one place. Get paid faster with automated reminders and real-time tracking.
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="rounded-lg shadow-xl border bg-white p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-500 text-sm mb-2">Outstanding Invoices</h3>
                  <div className="text-2xl font-bold">$343,567.79</div>
                  <div className="mt-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-risitify-500 h-full rounded-full" style={{width: "65%"}}></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-500 text-sm">Status Breakdown</h3>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="text-sm">30-60 days overdue</div>
                    </div>
                    <div className="font-medium">$186,546.25</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="text-sm">60+ days overdue</div>
                    </div>
                    <div className="font-medium">$89,834.12</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-risitify-400"></div>
                      <div className="text-sm">Current (not due)</div>
                    </div>
                    <div className="font-medium">$67,187.42</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-500 text-sm mb-4">Revenue Over Time</h3>
                <div className="h-64 bg-gray-50 rounded-lg border p-4 flex items-end gap-2">
                  {[35, 45, 30, 65, 45, 52, 42, 47, 50, 55, 60, 70].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center">
                      <div 
                        className="w-full bg-risitify-500 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-2">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
