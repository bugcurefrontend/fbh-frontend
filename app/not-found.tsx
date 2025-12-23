"use client";
import React from "react";
import { ArrowLeft, Home, Search, TreePine } from "lucide-react";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Visual */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-green-100 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full p-6 shadow-lg">
              <TreePine className="h-16 w-16 text-green-600" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! This Page Has Gone Wild
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Looks like this page has wandered off into the forest. Even trees need
          to explore sometimes, but let's get you back on the right path.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => window.history.back()}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>

          <a
            href="/"
            className="flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
          >
            <Home className="h-5 w-5 mr-2" />
            Home Page
          </a>

          <a
            href="/projects"
            className="flex items-center px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Search className="h-5 w-5 mr-2" />
            Explore Projects
          </a>
        </div>
      </div>
    </div>
  );
}
