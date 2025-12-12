import React, { useState } from 'react';
import { LayoutDashboard, FileText, Users, Settings, Plus, Menu, X, Rocket, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ScreeningModule from './components/ScreeningModule';
import CandidateDetail from './components/CandidateDetail';
import LoginPage from './components/LoginPage';
import { AppView, Candidate, JobDescription } from './types';

// Mock Initial Data
const INITIAL_JOBS: JobDescription[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    requirements: 'React 18, TypeScript, Tailwind CSS, 5+ years experience, Performance Optimization, Cloud (AWS/GCP).',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    requirements: 'Agile methodology, User Stories, Roadmap planning, 3+ years experience, Excellent communication skills, Data Analysis.',
    created_at: new Date().toISOString()
  }
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // App State "Database"
  const [jobs, setJobs] = useState<JobDescription[]>(INITIAL_JOBS);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // New Job Input State
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('');
  const [newJobReq, setNewJobReq] = useState('');

  const handleCreateJob = () => {
    if (!newJobTitle || !newJobReq) return;
    const newJob: JobDescription = {
      id: Math.random().toString(36).substring(7),
      title: newJobTitle,
      department: newJobDept,
      requirements: newJobReq,
      created_at: new Date().toISOString()
    };
    setJobs([...jobs, newJob]);
    setNewJobTitle('');
    setNewJobDept('');
    setNewJobReq('');
    setShowNewJobModal(false);
  };

  const handleUpdateCandidate = (id: string, updates: Partial<Candidate>) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setCurrentView(AppView.CANDIDATE_DETAIL);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView(AppView.DASHBOARD);
  };

  const NavItem = ({ view, icon: Icon, label }: { view: AppView, icon: any, label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        currentView === view 
          ? 'bg-blue-50 text-blue-600 font-medium' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  // Auth Guard
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <Rocket className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-slate-800">ResumeAI</span>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
            <NavItem view={AppView.SCREENING} icon={FileText} label="Screening" />
            <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Management
            </div>
            <NavItem view={AppView.JOBS} icon={Users} label="Jobs & Roles" />
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center p-3 rounded-lg bg-slate-50 gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">HR</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">HR Admin</p>
                <p className="text-xs text-slate-500 truncate">admin@company.com</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <h2 className="text-lg font-semibold text-slate-800">
            {currentView === AppView.DASHBOARD && 'Overview'}
            {currentView === AppView.SCREENING && 'Resume Screening'}
            {currentView === AppView.JOBS && 'Job Management'}
            {currentView === AppView.CANDIDATE_DETAIL && 'Candidate Profile'}
          </h2>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowNewJobModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Job</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          
          {currentView === AppView.DASHBOARD && (
            <Dashboard candidates={candidates} jobCount={jobs.length} />
          )}

          {currentView === AppView.SCREENING && (
            <ScreeningModule 
              jobs={jobs}
              candidates={candidates}
              onAddCandidate={(c) => setCandidates([...candidates, c])}
              onUpdateCandidate={handleUpdateCandidate}
              onViewCandidate={handleViewCandidate}
            />
          )}

          {currentView === AppView.CANDIDATE_DETAIL && selectedCandidate && (
             <CandidateDetail 
               candidate={selectedCandidate} 
               onBack={() => setCurrentView(AppView.SCREENING)} 
             />
          )}

          {currentView === AppView.JOBS && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map(job => (
                  <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
                        <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded mt-1">
                          {job.department}
                        </span>
                      </div>
                      <button className="text-blue-600 text-sm font-medium hover:underline">Edit</button>
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-3 mb-4">
                      {job.requirements}
                    </p>
                    <div className="pt-4 border-t border-slate-50 flex justify-between text-xs text-slate-400">
                      <span>ID: {job.id}</span>
                      <span>Created: {new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* New Job Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">Create New Job Position</h3>
              <button onClick={() => setShowNewJobModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                <input 
                  type="text" 
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Senior Product Designer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <input 
                  type="text" 
                  value={newJobDept}
                  onChange={(e) => setNewJobDept(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Design"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Requirements / Description</label>
                <textarea 
                  value={newJobReq}
                  onChange={(e) => setNewJobReq(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Paste the full job description here..."
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewJobModal(false)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateJob}
                disabled={!newJobTitle || !newJobReq}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Position
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;