import React, { useState } from 'react';
import { ClubInfo, PostItem } from '../types';
import { X, Plus, Link, Image, Calendar, MapPin, Sparkles, AlertCircle } from 'lucide-react';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubs: ClubInfo[];
  onSubmit: (post: PostItem) => void;
}

const PRESET_IMAGES = [
  { label: 'กิจกรรม / สัมมนา', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80' },
  { label: 'ประชุม / การทูต', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=900&auto=format&fit=crop&q=80' },
  { label: 'กีฬา / สันทนาการ', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&auto=format&fit=crop&q=80' },
  { label: 'จิตอาสา / ชุมชน', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&auto=format&fit=crop&q=80' },
  { label: 'สุขภาพใจ / เวิร์กช็อป', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&auto=format&fit=crop&q=80' },
  { label: 'ประวัติศาสตร์ / ทัศนศึกษา', url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=900&auto=format&fit=crop&q=80' }
];

export const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  clubs,
  onSubmit
}) => {
  const [clubId, setClubId] = useState<string>('smo-socsci');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [source, setSource] = useState<'facebook' | 'instagram' | 'announcement'>('facebook');
  const [sourceUrl, setSourceUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<'activity' | 'recruitment' | 'announcement' | 'competition' | 'welfare'>('activity');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('กรุณากรอกหัวข้อและรายละเอียดข่าวสาร');
      return;
    }

    const categoryLabels: Record<string, string> = {
      activity: 'กิจกรรม',
      recruitment: 'เปิดรับสมัคร',
      announcement: 'ประชาสัมพันธ์',
      competition: 'การแข่งขันกีฬา/วิชาการ',
      welfare: 'ทุนและสวัสดิการ'
    };

    const newPost: PostItem = {
      id: 'post-' + Date.now(),
      clubId,
      title: title.trim(),
      content: content.trim(),
      publishedAt: 'เมื่อสักครู่',
      source,
      sourceUrl: sourceUrl.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      category,
      categoryLabel: categoryLabels[category] || 'กิจกรรม',
      eventDate: eventDate.trim() || undefined,
      location: location.trim() || undefined,
      isPinned
    };

    onSubmit(newPost);
    onClose();
  };

  const handleClubChange = (newClubId: string) => {
    setClubId(newClubId);
    const selectedClub = clubs.find(c => c.id === newClubId);
    if (selectedClub) {
      if (source === 'facebook' && selectedClub.facebookUrl) {
        setSourceUrl(selectedClub.facebookUrl);
      } else if (source === 'instagram' && selectedClub.instagramUrl) {
        setSourceUrl(selectedClub.instagramUrl);
      }
    }
  };

  const handleSourceChange = (newSource: 'facebook' | 'instagram' | 'announcement') => {
    setSource(newSource);
    const selectedClub = clubs.find(c => c.id === clubId);
    if (selectedClub) {
      if (newSource === 'facebook' && selectedClub.facebookUrl) {
        setSourceUrl(selectedClub.facebookUrl);
      } else if (newSource === 'instagram' && selectedClub.instagramUrl) {
        setSourceUrl(selectedClub.instagramUrl);
      } else if (newSource === 'announcement') {
        setSourceUrl('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              อัปเดตข่าวสาร / กิจกรรมใหม่
            </h3>
            <p className="text-xs text-slate-500">
              กรอกข้อมูลเพื่อแสดงในฟีดข่าวและแนบลิงก์ Facebook / Instagram
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Select Club */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              เลือกชมรม / สโมสร หรือหน่วยงาน *
            </label>
            <select
              value={clubId}
              onChange={(e) => handleClubChange(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name} ({club.shortName})
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              หัวข้อข่าวสาร / ชื่องานกิจกรรม *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น เปิดรับสมัครสมาชิกชมรม, เสวนาวิชาการ, ตารางคัดตัวนักกีฬา"
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              รายละเอียดเนื้อหา *
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="กรอกรายละเอียดสั้นๆ สิ่งที่นิสิตควรรู้ กำหนดการ เงื่อนไขการเข้าร่วม..."
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Platform & Social URL */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ช่องทางต้นทาง
              </label>
              <select
                value={source}
                onChange={(e) => handleSourceChange(e.target.value as any)}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                <option value="facebook">Facebook Page</option>
                <option value="instagram">Instagram</option>
                <option value="announcement">ประกาศทางการ</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ลิงก์โพสต์ต้นทาง (URL Facebook หรือ Instagram)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Link className="w-3.5 h-3.5" />
                </div>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://facebook.com/... หรือ https://instagram.com/p/..."
                  className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Category & Pinning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                หมวดหมู่
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                <option value="activity">กิจกรรมทั่วไป / เสวนา</option>
                <option value="recruitment">เปิดรับสมัครสมาชิก / ทีมงาน</option>
                <option value="announcement">ประชาสัมพันธ์</option>
                <option value="competition">การแข่งขันกีฬา / วิชาการ</option>
                <option value="welfare">ทุนและสวัสดิการนิสิต</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded-md border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>ปักหมุดข่าวนี้ไว้ด้านบนสุด</span>
              </label>
            </div>
          </div>

          {/* Event Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                วัน-เวลาจัดกิจกรรม (ถ้ามี)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="เช่น 28 ก.ย. 2568 เวลา 13.00 น."
                  className="w-full pl-8 pr-3 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                สถานที่จัด (ถ้ามี)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="เช่น ห้องราชพฤกษ์ 1 คณะสังคมศาสตร์"
                  className="w-full pl-8 pr-3 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Image Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              รูปภาพประกอบ (เลือกภาพตัวอย่าง หรือใส่ URL ภาพ)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... ลิงก์รูปภาพ"
              className="w-full text-xs sm:text-sm border border-slate-200 rounded-lg px-3 py-1.5 mb-2 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] text-slate-400 self-center">เลือกภาพสำเร็จรูป:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                    imageUrl === preset.url
                      ? 'bg-amber-100 border-amber-300 text-amber-800 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs sm:text-sm rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-xs transition-colors"
            >
              บันทึกและประกาศข่าว
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
