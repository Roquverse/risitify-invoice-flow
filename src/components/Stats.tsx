const Stats = () => {
  return (
    <section className="w-full bg-white py-20 m-0">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Stat 1 */}
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">2M+</h3>
            <p className="text-gray-600">Active Users</p>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">10B+</h3>
            <p className="text-gray-600">Transactions</p>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">99.9%</h3>
            <p className="text-gray-600">Uptime</p>
          </div>

          {/* Stat 4 */}
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
