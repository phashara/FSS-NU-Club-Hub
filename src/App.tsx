import React, { useState } from 'react';
import { Header } from './components/Header';
import { ClubDirectory } from './components/ClubDirectory';
import { LiveFacebookFeed } from './components/LiveFacebookFeed';
import { ImageModal } from './components/ImageModal';
import { CLUBS_DATA, INITIAL_POSTS } from './data/initialData';
import { ClubInfo, PostItem } from './types';

export default function App() {
  const [clubs] = useState<ClubInfo[]>(CLUBS_DATA);
  const [posts, setPosts] = useState<PostItem[]>(() => {
    try {
      const saved = localStorage.getItem('fss_nu_real_announcements');
      if (saved) {
        const parsed: PostItem[] = JSON.parse(saved);
        // Filter out any legacy dummy posts
        return parsed.filter((p) => !p.id.startsWith('post-'));
      }
    } catch {
      // Ignore fallback
    }
    return INITIAL_POSTS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClubId, setSelectedClubId] = useState<string | null>('smo-socsci');
  const [activeTab, setActiveTab] = useState<'live' | 'directory'>('live');
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleDeletePost = (id: string) => {
    setPosts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem('fss_nu_real_announcements', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Main Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalClubs={clubs.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Page Content */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* View 0: Live Real-time Feed Tab (Reliable Cards + Optional FB Iframe Embed) */}
        {activeTab === 'live' && (
          <LiveFacebookFeed
            clubs={clubs}
            posts={posts}
            selectedClubId={selectedClubId}
            onSelectClub={(clubId) => setSelectedClubId(clubId)}
            searchQuery={searchQuery}
            onDeletePost={handleDeletePost}
            onSelectImage={(url) => setSelectedImageUrl(url)}
          />
        )}

        {/* View 1: Club Directory Tab */}
        {activeTab === 'directory' && (
          <ClubDirectory
            clubs={clubs}
            selectedClubId={selectedClubId}
            searchQuery={searchQuery}
            onSelectClub={(clubId) => {
              setSelectedClubId(clubId);
              setActiveTab('live');
            }}
          />
        )}
      </main>

      {/* Modal to inspect images full-screen */}
      <ImageModal
        imageUrl={selectedImageUrl}
        onClose={() => setSelectedImageUrl(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-medium text-slate-700">
              คณะสังคมศาสตร์ มหาวิทยาลัยนเรศวร
            </p>
            <p className="text-slate-400 text-[11px] mt-0.5">
              99 หมู่ 9 ต.ท่าโพธิ์ อ.เมือง จ.พิษณุโลก 65000 • ระบบรวบรวมข่าวสารสโมสรนิสิตและชมรมวิชาการ
            </p>
          </div>
          <div className="text-slate-400 text-[11px]">
            เชื่อมต่อ Facebook & Instagram ทางการของสโมสรนิสิตและชมรมวิชาการ
          </div>
        </div>
      </footer>
    </div>
  );
}
