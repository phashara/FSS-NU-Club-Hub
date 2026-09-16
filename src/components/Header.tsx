import React from 'react';
import { Megaphone, Search, ExternalLink, BookmarkCheck, Calendar, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalClubs: number;
  activeTab: 'live' | 'directory';
  setActiveTab: (tab: 'live' | 'directory') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  totalClubs,
  activeTab,
  setActiveTab
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner with University & Faculty Identity */}
      <div className="bg-slate-900 text-white py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">คณะสังคมศาสตร์</span>
            <span className="hidden sm:inline text-slate-400">• มหาวิทยาลัยนเรศวร</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300 text-xs">
            <span className="bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
              สโมสรนิสิตและชมรมวิชาการ
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav & Header Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                NU
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  FSS NU Club Hub
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  ศูนย์รวมข่าวสารและช่องทางโซเชียลมีเดีย สโมสรนิสิตและชมรมวิชาการ คณะสังคมศาสตร์ มหาวิทยาลัยนเรศวร
                </p>
              </div>
            </div>
          </div>

          {/* Actions: Navigation Tabs, Search, Add Post */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Tab switch */}
            <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                type="button"
                id="tab-live-btn"
                onClick={() => setActiveTab('live')}
                className={`px-3.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === 'live'
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${activeTab === 'live' ? 'bg-white' : 'bg-blue-500'} animate-pulse`}></span>
                <span>ฟีดข่าวสด (Live Feed)</span>
              </button>
              <button
                type="button"
                id="tab-directory-btn"
                onClick={() => setActiveTab('directory')}
                className={`px-3.5 py-1.5 rounded-md transition-all ${
                  activeTab === 'directory'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ทำเนียบสโมสร & ชมรม
              </button>
            </div>
          </div>

        </div>

        {/* Search Input on Mobile/Desktop */}
        <div className="mt-3.5 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            id="search-posts-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาตามชื่อชมรม หรือ สโมสรนิสิต (เช่น รัฐศาสตร์, MUN, กีฬา, สโมสร, จิตวิทยา, พัฒนาสังคม)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
            >
              ล้างคำค้น
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
