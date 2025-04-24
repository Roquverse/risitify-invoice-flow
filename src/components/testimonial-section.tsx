
export function TestimonialSection() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Join <span className="text-risitify-500">4.5 Million</span> Risitify Users Around the World
            </h2>
            <p className="text-muted-foreground mb-8">
              From freelancers to large enterprises, businesses of all sizes trust Risitify for their invoicing needs. See why our customers love us.
            </p>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
              <span className="ml-2 font-medium">4.8/5 (2,500+ reviews)</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border">
            <div className="flex justify-between mb-6">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <div className="text-gray-400">"</div>
            </div>

            <blockquote className="text-lg mb-6">
              <p>
                Risitify has completely transformed the financial side of my business. Now I get everything done in minutes and spend more time doing what I love.
              </p>
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&h=512&q=80" 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Freelance Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
