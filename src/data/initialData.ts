import { ClubInfo, PostItem } from '../types';

export const CLUBS_DATA: ClubInfo[] = [
  {
    id: 'smo-socsci',
    name: 'สโมสรนิสิตคณะสังคมศาสตร์',
    shortName: 'SMO FSS NU',
    category: 'student_union',
    categoryLabel: 'สโมสรนิสิต',
    description: 'องค์กรหลักดูแลประสานงานและขับเคลื่อนกิจกรรมนิสิตคณะสังคมศาสตร์ มหาวิทยาลัยนเรศวร',
    facebookUrl: 'https://www.facebook.com/SMO.SocSci.NU',
    instagramUrl: 'https://www.instagram.com/smo.fssnu/',
    accentColor: 'text-amber-600',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
    tagline: 'เสียงของนิสิตสังคมศาสตร์ มน.'
  },
  {
    id: 'polsci-nu',
    name: 'ชมรมรัฐศาสตร์และรัฐประศาสนศาสตร์',
    shortName: 'PolSci NU',
    category: 'academic',
    categoryLabel: 'วิชาการและสังคม',
    description: 'ส่งเสริมการเรียนรู้ วิเคราะห์นโยบายสาธารณะ รัฐศาสตร์ เสวนาวิชาการและค่ายอาสา',
    facebookUrl: 'https://www.facebook.com/PolSciNU',
    instagramUrl: 'https://www.instagram.com/polsci.nu',
    accentColor: 'text-blue-600',
    badgeBg: 'bg-blue-50 border-blue-200 text-blue-800',
    tagline: 'สิงห์นเรศวร รัฐศาสตร์และรัฐประศาสนศาสตร์'
  },
  {
    id: 'naresuan-mun',
    name: 'ชมรม MUN (Model United Nations)',
    shortName: 'Naresuan MUN',
    category: 'academic',
    categoryLabel: 'การทูตและสากล',
    description: 'การจำลองการประชุมสหประชาชาติ ฝึกทักษะการเจรจาการทูต การกล่าวสุนทรพจน์ระดับสากล',
    instagramUrl: 'https://www.instagram.com/naresuan_mun',
    accentColor: 'text-sky-600',
    badgeBg: 'bg-sky-50 border-sky-200 text-sky-800',
    tagline: 'Diplomacy, Debate, Global Leadership'
  },
  {
    id: 'fss-sports',
    name: 'ชมรมกีฬา คณะสังคมศาสตร์',
    shortName: 'FSS Sports Club',
    category: 'sports',
    categoryLabel: 'กีฬาและสุขภาพ',
    description: 'ส่งเสริมการออกกำลังกาย การแข่งขันกีฬาภายในคณะและกีฬามหาวิทยาลัยนเรศวร',
    facebookUrl: 'https://www.facebook.com/profile.php?id=100063609878557',
    instagramUrl: 'https://www.instagram.com/fss_sports_club/',
    accentColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    tagline: 'พลังนักกีฬา มิตรภาพ และสุขภาพแข็งแรง'
  },
  {
    id: 'history-nu',
    name: 'ชมรมประวัติศาสตร์',
    shortName: 'History NU',
    category: 'academic',
    categoryLabel: 'ประวัติศาสตร์และวัฒนธรรม',
    description: 'ศึกษาและแลกเปลี่ยนความรู้ทางประวัติศาสตร์ โบราณคดี นิทรรศการและการลงพื้นที่แหล่งประวัติศาสตร์',
    facebookUrl: 'https://www.facebook.com/profile.php?id=100094131351902',
    instagramUrl: 'https://www.instagram.com/history.nu/',
    accentColor: 'text-stone-700',
    badgeBg: 'bg-stone-100 border-stone-300 text-stone-800',
    tagline: 'เข้าใจอดีต เพื่อมองเห็นอนาคต'
  },
  {
    id: 'social-dev-nu',
    name: 'ชมรมพัฒนาสังคม',
    shortName: 'Social Dev NU',
    category: 'social',
    categoryLabel: 'พัฒนาชุมชนและอาสา',
    description: 'ลงพื้นที่เรียนรู้วิถีชุมชน โครงการจิตอาสาและการมีส่วนร่วมขับเคลื่อนประเด็นสังคม',
    facebookUrl: 'https://www.facebook.com/profile.php?id=100068892347875',
    instagramUrl: 'https://www.instagram.com/socialdev.nu/',
    accentColor: 'text-teal-700',
    badgeBg: 'bg-teal-50 border-teal-200 text-teal-800',
    tagline: 'เรียนรู้ชุมชน ร่วมสร้างสรรค์สังคม'
  },
  {
    id: 'psychology-nu',
    name: 'ชมรมจิตวิทยา',
    shortName: 'Psychology MorNor',
    category: 'academic',
    categoryLabel: 'สุขภาพใจและจิตวิทยา',
    description: 'เผยแพร่ความรู้ด้านจิตวิทยา พื้นที่ปลอดภัยในการรับฟัง เวิร์กช็อปพัฒนาตนเองและ Mental Health',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61569716251477',
    instagramUrl: 'https://www.instagram.com/psychology_mornor',
    accentColor: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    tagline: 'Understand Mind, Embrace Life'
  },
  {
    id: 'amnesty-nu',
    name: 'ชมรม Amnesty มหาวิทยาลัยนเรศวร',
    shortName: 'Amnesty NU',
    category: 'social',
    categoryLabel: 'สิทธิมนุษยชน',
    description: 'ส่งเสริมความตระหนักรู้ด้านสิทธิมนุษยชน ความเสมอภาค เสรีภาพ และความยุติธรรมในสังคม',
    facebookUrl: 'https://www.facebook.com/profile.php?id=61577612573883',
    instagramUrl: 'https://www.instagram.com/amnesty.nu.th/',
    accentColor: 'text-yellow-600',
    badgeBg: 'bg-yellow-50 border-yellow-300 text-yellow-900',
    tagline: 'ยืนหยัดเพื่อความยุติธรรมและสิทธิมนุษยชน'
  }
];

export const INITIAL_POSTS: PostItem[] = [];

