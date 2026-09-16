import React, { useState } from 'react';
import { ClubInfo, PostItem } from '../types';
import {
  ExternalLink,
  Radio,
  RefreshCw,
  ChevronDown,
  Info,
  Layers,
  Sparkles,
  Share2
} from 'lucide-react';

interface LiveFacebookFeedProps {
  clubs: ClubInfo[];
  posts?: PostItem[];
  selectedClubId?: string | null;
  onSelectClub?: (clubId: string | null) => void;
  searchQuery?: string;
  onDeletePost?: (id: string) => void;
  onSelectImage?: (url: string) => void;
}

export const LiveFacebookFeed: React.FC<LiveFacebookFeedProps> = ({
  clubs,
  selectedClubId: controlledClubId,
  onSelectClub,
  onSelectImage
}) => {
  // Individual club state
  const [internalClubId, setInternalClubId] = useState<string>('smo-socsci');
  const [iframeRefreshKey, setIframeRefreshKey] = useState(0);

  const currentClubId = controlledClubId || internalClubId;
  const selectedClub = clubs.find((c) => c.id === currentClubId) || clubs[0];

  const handleSelectClub = (id: string) => {
    setInternalClubId(id);
    if (onSelectClub) {
      onSelectClub(id);
    }
  };

  const isStandardPage = selectedClub?.facebookUrl && !selectedClub.facebookUrl.includes('profile.php');

  const getEmbedUrl = (fbUrl: string) => {
    return `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
      fbUrl
    )}&tabs=timeline&width=500&height=750&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;
  };

  return (
    <div className="space-y-5">
      {/* Club Selector Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-600 animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              เลือกสโมสรนิสิต / ชมรมวิชาการ:
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            (คลิกเพื่อดูฟีด Facebook และข้อมูลของแต่ละชมรม)
          </span>
        </div>

        {/* Mobile Dropdown */}
        <div className="block sm:hidden">
          <div className="relative">
            <select
              id="club-mobile-select"
              value={currentClubId}
              onChange={(e) => handleSelectClub(e.target.value)}
              aria-label="เลือกสโมสรนิสิตหรือชมรมวิชาการ"
              className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold py-2.5 pl-3.5 pr-8 rounded-lg shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.shortName} - {club.name} {!club.facebookUrl ? '(IG)' : ''}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Responsive Club Buttons */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
          {clubs.map((club) => {
            const isSelected = currentClubId === club.id;
            return (
              <button
                key={club.id}
                type="button"
                onClick={() => handleSelectClub(club.id)}
                className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 text-xs ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs ring-2 ring-blue-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span>{club.shortName}</span>
                {club.instagramUrl && !club.facebookUrl && (
                  <span className="text-[10px] bg-pink-100 text-pink-700 px-1 py-0.2 rounded-md font-medium">
                    IG
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Club Spotlight Card */}
      {selectedClub && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                {selectedClub.shortName.slice(0, 3).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${selectedClub.badgeBg}`}>
                    {selectedClub.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400">• คณะสังคมศาสตร์ ม.นเรศวร</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {selectedClub.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed max-w-2xl">
                  {selectedClub.description}
                </p>
              </div>
            </div>

            {/* Direct Social Links */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
              {selectedClub.facebookUrl && (
                <a
                  href={selectedClub.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>เปิด Facebook ของ {selectedClub.shortName}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5 text-blue-200" />
                </a>
              )}

              {selectedClub.instagramUrl && (
                <a
                  href={selectedClub.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:opacity-95 text-white font-semibold text-xs shadow-xs transition-opacity"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5 text-pink-200" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Facebook Timeline Embed */}
      {selectedClub?.facebookUrl && isStandardPage ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                  ฟีด Facebook ทางการ (Meta Page Plugin)
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base mt-1 text-slate-100">
                {selectedClub.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIframeRefreshKey((prev) => prev + 1)}
                className="text-xs bg-white/10 hover:bg-white/20 text-slate-200 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                <span>รีเฟรชฟีด</span>
              </button>
              <a
                href={selectedClub.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5 font-semibold"
              >
                <span>เปิดใน Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-6 flex flex-col items-center justify-center bg-slate-100 min-h-[500px]">
            <div className="w-full max-w-[500px] bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
              <iframe
                key={`${selectedClub.id}-${iframeRefreshKey}`}
                src={getEmbedUrl(selectedClub.facebookUrl)}
                width="100%"
                height="750"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="yes"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={`Facebook feed of ${selectedClub.name}`}
                className="w-full"
              />
            </div>
          </div>
        </div>
      ) : selectedClub?.facebookUrl ? (
        /* Profile Accounts (e.g. personal profile style club accounts) */
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <h3 className="font-bold text-slate-800 text-base">
            ช่องทาง Facebook ทางการของ {selectedClub.name}
          </h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            องค์กรนี้ใช้บัญชี Facebook ในการเผยแพร่ข่าวสาร สามารถคลิกเปิดดูโพสต์ ประกาศ และกิจกรรมล่าสุดได้โดยตรง
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={selectedClub.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>เปิด Facebook {selectedClub.shortName}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ) : (
        /* IG Only (e.g. MUN) */
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
          <h3 className="font-bold text-slate-800 text-base">
            ช่องทาง Instagram ทางการของ {selectedClub.name}
          </h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            ชมรมนี้เผยแพร่ข้อมูล กิจกรรม และรับสมัครสมาชิกผ่านทาง Instagram โดยเฉพาะ
          </p>
          {selectedClub.instagramUrl && (
            <div className="mt-5">
              <a
                href={selectedClub.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-semibold shadow-xs hover:opacity-95 transition-opacity"
              >
                <span>เปิด Instagram {selectedClub.shortName}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
