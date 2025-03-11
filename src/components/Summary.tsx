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
              <strong>Primary Goal:</strong> Democratise data and reduce human hours in the Data Analysis process 
            </li>
            <li>
              <strong>Key Opportunity Internally:</strong> Democratise data access, centralise and collect our knowledge to an AI interface, and free data team resources for advanced analytics
            </li>
            <li>
              <strong>Key Opportunity Externally:</strong> Reduce bottlennecks, Improve customer satisfaction, response times, and free data team resources for advanced analytics
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">2. 🗺️ Implementation Timeline</h2>
          <ul className="list-none pl-6">
            <li className="mb-2">
              <strong>Phase 1:</strong> Internal Pilot (1-2 months)
            </li>
            <li className="mb-2">
              <strong>Phase 2:</strong> Full Internal Deployment (2-3 months)
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
              <strong>Operational Costs:</strong> £20-30 monthly (GCP infrastructure) + API calls (£20-30 monthly)
            </li>
            <li className="mb-2">
              <strong>Infrastructure:</strong> Hosted on GCP using a VM and uses OpenAI API calls with Langsmith for traceability
            </li>
            <li>
              <strong>ROI Metrics:</strong> Hours saved on searching for the right query, centralising queries in a format that AI can sort thorugh. 
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
                <li>Data Team working at full capacity across multiple clients</li>
                <li>Manual information gathering, query building, analysing, etc</li>
                <li>Time-intensive GA4 event collection</li>
                <li>SQL development bottlenecks</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Target State:</h3>
              <ul className="list-disc pl-6">
                <li>Real-time query resolution</li>
                <li>Self-service data </li>
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

        
      </div>
    </div>
  );
}