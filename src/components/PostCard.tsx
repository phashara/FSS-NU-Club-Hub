import React from 'react';
import { PostItem, ClubInfo } from '../types';
import { Calendar, MapPin, ExternalLink, Pin, Trash2, Share2, Check } from 'lucide-react';

interface PostCardProps {
  post: PostItem;
  club?: ClubInfo;
  onDelete?: (id: string) => void;
  onSelectImage?: (url: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  club,
  onDelete,
  onSelectImage
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (post.sourceUrl) {
      navigator.clipboard.writeText(post.sourceUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getSourceBadge = () => {
    if (post.source === 'facebook') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </span>
      );
    }
    if (post.source === 'instagram') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 border border-pink-200">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Instagram
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
        ประกาศทางการ
      </span>
    );
  };

  return (
    <article
      id={`post-item-${post.id}`}
      className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col overflow-hidden"
    >
      {/* Card Header: Club info, source tag, pin */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
              {club ? club.shortName.slice(0, 2).toUpperCase() : 'NU'}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="font-semibold text-slate-900 text-sm">
                  {club ? club.name : 'สโมสรนิสิตคณะสังคมศาสตร์'}
                </h4>
                {post.isPinned && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.2 rounded-full font-medium">
                    <Pin className="w-2.5 h-2.5" /> ปักหมุด
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {post.publishedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {getSourceBadge()}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(post.id)}
                className="text-slate-300 hover:text-red-500 p-1 rounded-md transition-colors"
                title="ลบโพสต์นี้"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Media Image if available */}
      {post.imageUrl && (
        <div className="px-4 py-1">
          <div
            className="relative aspect-video sm:aspect-2/1 w-full rounded-lg overflow-hidden bg-slate-100 cursor-pointer group"
            onClick={() => onSelectImage?.(post.imageUrl!)}
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
              คลิกเพื่อดูรูปขยาย
            </div>
          </div>
        </div>
      )}

      {/* Content & Details */}
      <div className="p-4 pt-2 grow flex flex-col justify-between">
        <div>
          {/* Category Pill */}
          <div className="mb-2">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
              {post.categoryLabel}
            </span>
          </div>

          <h3 className="font-semibold text-slate-900 text-base leading-snug mb-2">
            {post.title}
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

          {/* Event Schedule and Location */}
          {(post.eventDate || post.location) && (
            <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
              {post.eventDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{post.eventDate}</span>
                </div>
              )}
              {post.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{post.location}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {post.sourceUrl ? (
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
            >
              <span>เปิดดูโพสต์ต้นทาง ({post.source === 'facebook' ? 'Facebook' : 'Instagram'})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-slate-400">
              ประกาศภายในคณะ
            </span>
          )}

          {post.sourceUrl && (
            <button
              type="button"
              onClick={handleShare}
              className="text-xs text-slate-400 hover:text-slate-600 inline-flex items-center gap-1 p-1"
              title="คัดลอกลิงก์โพสต์"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">คัดลอกแล้ว</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>แชร์</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
