import React from 'react';
import { DocProvider } from './context/DocContext';
import Header from './components/Header/Header';
import ResizableEditor from './components/Editor/ResizableEditor';
import Preview from './components/Preview/Preview';
import Comments from './components/Comments/Comments';
import './styles/App.css';

function App() {
  return (
    <DocProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 font-sans">
        {/* Header */}
        <div className="shadow bg-white p-4">
          <Header />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden bg-white shadow-inner rounded-xl m-4 p-4">
          <div className="h-full">
            <ResizableEditor />
          </div>
          <div className="flex-1 h-full overflow-auto">
            <Preview />
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white shadow p-4 m-4 rounded-xl">
          <Comments />
        </div>
      </div>
    </DocProvider>
  );
}


export default App;