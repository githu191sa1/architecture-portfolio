const projects = [
  {
    id: "proj-001",
    title: "林間微光住宅",
    subtitle: "Forest Glade Residence",
    year: 2025,
    season: "Fall",
    type: "Residential",
    category: "Architecture",
    coverImage: "./assets/images/projects/proj-001/cover.jpg",
    gallery: [
      "./assets/images/projects/proj-001/01.jpg",
      "./assets/images/projects/proj-001/02.jpg",
      "./assets/images/projects/proj-001/03.jpg"
    ],
    description: "本案坐落於密林之中，設計核心在於重塑人、建築與自然的界線。藉由大面積的水平開窗與懸挑結構，將森林景觀引入室內，並利用當地回收木材與清水混凝土作為主體，展現低碳永續與極簡美學的和諧共存。",
    tags: ["量體分析", "日照模擬", "永續材料"],
    tools: ["Archicad", "ComfyUI", "Twinmotion"]
  },
  {
    id: "proj-002",
    title: "當代藝術浮游館",
    subtitle: "Floating Contemporary Pavilion",
    year: 2025,
    season: "Spring",
    type: "Culture",
    category: "Architecture",
    coverImage: "./assets/images/projects/proj-002/cover.jpg",
    gallery: [
      "./assets/images/projects/proj-002/01.jpg",
      "./assets/images/projects/proj-002/02.jpg"
    ],
    description: "此文化展館以「浮游」為概念，利用輕量化鋼構與半透明網格薄膜，創造出彷彿漂浮於水面之上的視覺張力。內部空間採取無柱大跨度設計，提供靈活的展覽動線，並利用自然對流風系統達到節能效果。",
    tags: ["結構優化", "計算設計", "風場模擬"],
    tools: ["Rhino", "Grasshopper", "V-Ray"]
  },
  {
    id: "proj-003",
    title: "谷地冥想圖書館",
    subtitle: "Valley Meditation Library",
    year: 2024,
    season: "Winter",
    type: "Education",
    category: "Design",
    coverImage: "./assets/images/projects/proj-003/cover.jpg",
    gallery: [
      "./assets/images/projects/proj-003/01.jpg",
      "./assets/images/projects/proj-003/02.jpg"
    ],
    description: "位於山谷低窪處的公共閱覽與冥想空間。建築依循山勢起伏，將半個量體嵌入土丘中以達到極佳的保溫與隔音效果。頂部天窗引入垂直漫射光，為室內營造出靜謐、神聖且適合閱讀與沉思的精神場所。",
    tags: ["地形適應", "自然採光", "聲學模擬"],
    tools: ["Revit", "Enscape", "Photoshop"]
  }
];

const sketches = [
  {
    id: "sketch-001",
    title: "京都二年坂街景速寫",
    location: "日本，京都",
    image: "./assets/images/sketches/sketch-001.jpg"
  },
  {
    id: "sketch-002",
    title: "粗獷主義混凝土光影習作",
    location: "瑞士，蘇黎世",
    image: "./assets/images/sketches/sketch-002.jpg"
  },
  {
    id: "sketch-003",
    title: "哥德式教堂立面細部",
    location: "義大利，佛羅倫斯",
    image: "./assets/images/sketches/sketch-003.jpg"
  }
];

// 匯出資料，供瀏覽器環境或模組使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projects, sketches };
}
