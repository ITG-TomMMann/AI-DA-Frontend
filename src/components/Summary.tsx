import React from 'react';

export function Summary() {
  return (
    <div className="max-w-4xl mx-auto w-full py-8 px-6">
      <div className="prose prose-pink max-w-none">
        <h1 className="text-3xl font-bold mb-8">📊 Business Case Overview</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">1. 🎯 Strategic Overview</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2">
              <strong>Primary Goal:</strong> Reduce processing time for simple tickets (50-70% of total volume)
            </li>
            <li>
              <strong>Key Opportunity:</strong> Improve customer satisfaction, response times, and free data team resources for advanced analytics
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">2. 🗺️ Implementation Timeline</h2>
          <ul className="list-none pl-6">
            <li className="mb-2">
              <strong>Phase 1:</strong> Internal Pilot (3-6 months)
            </li>
            <li className="mb-2">
              <strong>Phase 2:</strong> Full Internal Deployment (6-12 months)
            </li>
            <li>
              <strong>Phase 3:</strong> External Production Launch (12+ months)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">3. 💰 Financial Analysis</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2">
              <strong>Operational Costs:</strong> $100-200 monthly (GCP infrastructure)
            </li>
            <li className="mb-2">
              <strong>Infrastructure:</strong> GCP-hosted SQL and user query storage
            </li>
            <li>
              <strong>ROI Metrics:</strong> Processing efficiency, throughput, satisfaction scores
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">4. 🔄 Transformation Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Current State:</h3>
              <ul className="list-disc pl-6">
                <li>1 ticket processed per day</li>
                <li>Single-analyst bottleneck</li>
                <li>Manual workflow</li>
                <li>Time-intensive GA4 event collection</li>
                <li>SQL development bottlenecks</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Target State:</h3>
              <ul className="list-disc pl-6">
                <li>Real-time query resolution</li>
                <li>Multi-query processing</li>
                <li>Self-service automation</li>
                <li>End-to-end user data accessibility</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">5. ⚠️ Risk Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Critical Concerns:</h3>
              <ul className="list-disc pl-6">
                <li>API cost control</li>
                <li>Data integrity</li>
                <li>Security (Data & Application)</li>
                <li>User adoption</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Mitigation Strategy:</h3>
              <ul className="list-disc pl-6">
                <li>Continuous feedback integration</li>
                <li>Phased testing approach</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">6. ✅ Action Items</h2>
          <ol className="list-decimal pl-6">
            <li>Launch pilot (safe bills ribbon)</li>
            <li>Promote data democratization</li>
            <li>Collect stakeholder input</li>
            <li>Optimize architecture</li>
            <li>Plan external deployment</li>
          </ol>
        </section>
      </div>
    </div>
  );
}