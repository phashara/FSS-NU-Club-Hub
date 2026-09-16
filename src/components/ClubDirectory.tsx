import React from 'react';
import { ClubInfo } from '../types';
import { ExternalLink, Users, Sparkles, Filter } from 'lucide-react';

interface ClubDirectoryProps {
  clubs: ClubInfo[];
  selectedClubId: string | null;
  onSelectClub: (clubId: string | null) => void;
  searchQuery?: string;
}

export const ClubDirectory: React.FC<ClubDirectoryProps> = ({
  clubs,
  selectedClubId,
  onSelectClub,
  searchQuery = ''
}) => {
  const filteredClubs = clubs.filter((club) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      club.name.toLowerCase().includes(q) ||
      club.shortName.toLowerCase().includes(q) ||
      club.description.toLowerCase().includes(q) ||
      club.categoryLabel.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              ทำเนียบสโมสรนิสิตและชมรมวิชาการ คณะสังคมศาสตร์
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              รวมลิงก์ช่องทางติดต่อ Facebook และ Instagram บัญชีทางการของทุกองค์กรนิสิต
            </p>
          </div>
          {selectedClubId && (
            <button
              type="button"
              onClick={() => onSelectClub(null)}
              className="text-xs text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-1 self-start sm:self-auto"
            >
              แสดงทุกชมรม
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClubs.map((club) => {
            const isSelected = selectedClubId === club.id;
            return (
              <div
                key={club.id}
                id={`club-card-${club.id}`}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${club.badgeBg}`}>
                      {club.categoryLabel}
                    </span>
                    {club.facebookUrl && (
                      <button
                        type="button"
                        onClick={() => onSelectClub(club.id)}
                        className="text-xs px-2.5 py-1 rounded-md font-semibold transition-colors bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200"
                        title="ดู Live Feed ขององค์กรนี้"
                      >
                        ดู Live Feed
                      </button>
                    )}
                  </div>

                  <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                    {club.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {club.description}
                  </p>
                </div>

                {/* Social Media Link Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  {club.facebookUrl && (
                    <a
                      href={club.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                      title={`เปิด Facebook ${club.shortName}`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                      <ExternalLink className="w-3 h-3 text-blue-500" />
                    </a>
                  )}

                  {club.instagramUrl && (
                    <a
                      href={club.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 text-pink-700 hover:opacity-90 border border-pink-200 transition-opacity"
                      title={`เปิด Instagram ${club.shortName}`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Instagram</span>
                      <ExternalLink className="w-3 h-3 text-pink-500" />
                    </a>
                  )}

                  {!club.facebookUrl && !club.instagramUrl && (
                    <span className="text-[11px] text-slate-400 italic">
                      ประกาศทางการคณะ
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
