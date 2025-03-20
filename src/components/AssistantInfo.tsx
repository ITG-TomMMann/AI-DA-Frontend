import React from 'react';
import { Database, Activity, BarChart2, FileText, HelpCircle } from 'lucide-react';

export function AssistantInfo() {
  return (
    <div className="max-w-4xl mx-auto w-full py-8 px-6">
      <div className="prose prose-pink max-w-none">
        <h1 className="text-3xl font-bold mb-8">👋 Welcome to AI Data Analyst</h1>
        
        <p className="text-lg mb-6">
          I'm Enzo, your AI Data Assistant. I'm here to help you with your data analysis needs. 
          This application has several features to assist you with different aspects of data analysis.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">What can I help you with?</h2>
          <p className="mb-4">
            You can ask me anything about your data or how to use this application.
            Just type your question in the box below and I'll do my best to assist you!
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Application Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-pink-600" />
              <h3 className="font-semibold text-lg">Enzo the Assistant</h3>
            </div>
            <p className="text-gray-600">
              General assistant to help with all your data questions and application navigation. 
              Ask about anything related to your data or how to use the other features.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-pink-600" />
              <h3 className="font-semibold text-lg">SQL Query Assistant</h3>
            </div>
            <p className="text-gray-600">
              Ask questions in natural language and get SQL queries generated for you. 
              Perfect for data analysts who need to query databases without writing complex SQL.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-pink-600" />
              <h3 className="font-semibold text-lg">GA4 Event Assistant</h3>
            </div>
            <p className="text-gray-600">
              Get help with Google Analytics 4 events and tracking. Ask questions about your 
              GA4 implementation, event tracking, and data collection.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <BarChart2 className="w-5 h-5 text-pink-600" />
              <h3 className="font-semibold text-lg">Existing Analysis</h3>
            </div>
            <p className="text-gray-600">
              Access and query your existing data analysis projects. Retrieve insights
              from previously analyzed data without starting from scratch.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-pink-600" />
              <h3 className="font-semibold text-lg">Documentation</h3>
            </div>
            <p className="text-gray-600">
              Access comprehensive documentation about the project, including business case,
              implementation timeline, and other important information.
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-pink-50 p-6 rounded-lg border border-pink-200">
          <h3 className="font-semibold text-lg mb-2">Getting Started</h3>
          <p>
            To begin, simply type your question in the box below or navigate to one of the specific
            assistants using the tabs above.
          </p>
        </div>
      </div>
    </div>
  );
}