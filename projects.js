const projects = [
  {
    id: "proj-001",
    title: "林間微光住宅",
    subtitle: "Forest Glade Residence",
    year: 2025,
    season: "Fall",
    type: "Residential",
    category: "Architecture",
    coverImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill="%23181818" stroke="%232e2e2e" stroke-width="1"/><text x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23a0a0a0" letter-spacing="1">PROJECT COVER</text></svg>`,
    tags: ["量體分析", "日照模擬", "永續材料"],
    tools: ["Archicad", "ComfyUI", "Twinmotion"],
    details: {
      overview: {
        text: "本案坐落於密林之中，設計核心在於重塑人、建築與自然的界線。藉由大面積的水平開窗與懸挑結構，將森林景觀引入室內，並利用當地回收木材與清水混凝土作為主體，展現低碳永續與極簡美學的和諧共存。",
        images: [
          `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%23181818" stroke="%232e2e2e" stroke-width="1"/><rect x="5" y="5" width="90" height="65" fill="none" stroke="%233a3a3a" stroke-width="0.5" stroke-dasharray="2,2"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">DESIGN BOARD / DIAGRAM</text></svg>`
        ]
      },
      plans: [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%23121212" stroke="%232e2e2e" stroke-width="1"/><line x1="20" y1="15" x2="80" y2="15" stroke="%233a3a3a" stroke-width="0.5"/><line x1="20" y1="35" x2="80" y2="35" stroke="%233a3a3a" stroke-width="0.5"/><line x1="20" y1="55" x2="80" y2="55" stroke="%233a3a3a" stroke-width="0.5"/><line x1="35" y1="15" x2="35" y2="60" stroke="%233a3a3a" stroke-width="0.5"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">FLOOR PLAN DRAWING</text></svg>`
      ],
      renders: [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%231a1a1a" stroke="%232e2e2e" stroke-width="1"/><circle cx="50" cy="37.5" r="15" fill="none" stroke="%233a3a3a" stroke-width="0.5"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">PROJECT RENDER</text></svg>`
      ]
    }
  },
  {
    id: "proj-002",
    title: "當代藝術浮游館",
    subtitle: "Floating Contemporary Pavilion",
    year: 2025,
    season: "Spring",
    type: "Culture",
    category: "Architecture",
    coverImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill="%23181818" stroke="%232e2e2e" stroke-width="1"/><text x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23a0a0a0" letter-spacing="1">PROJECT COVER</text></svg>`,
    tags: ["結構優化", "計算設計", "風場模擬"],
    tools: ["Rhino", "Grasshopper", "V-Ray"],
    details: {
      overview: {
        text: "此文化展館以「浮游」為概念，利用輕量化鋼構與半透明網格薄膜，創造出彷彿漂浮於水面之上的視覺張力。內部空間採取無柱大跨度設計，提供靈活的展覽動線，並利用自然對流風系統達到節能效果。",
        images: [
          `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%23181818" stroke="%232e2e2e" stroke-width="1"/><rect x="5" y="5" width="90" height="65" fill="none" stroke="%233a3a3a" stroke-width="0.5" stroke-dasharray="2,2"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">DESIGN BOARD / DIAGRAM</text></svg>`
        ]
      },
      plans: [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%23121212" stroke="%232e2e2e" stroke-width="1"/><line x1="20" y1="15" x2="80" y2="15" stroke="%233a3a3a" stroke-width="0.5"/><line x1="20" y1="35" x2="80" y2="35" stroke="%233a3a3a" stroke-width="0.5"/><line x1="20" y1="55" x2="80" y2="55" stroke="%233a3a3a" stroke-width="0.5"/><line x1="35" y1="15" x2="35" y2="60" stroke="%233a3a3a" stroke-width="0.5"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">FLOOR PLAN DRAWING</text></svg>`
      ],
      renders: [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%231a1a1a" stroke="%232e2e2e" stroke-width="1"/><circle cx="50" cy="37.5" r="15" fill="none" stroke="%233a3a3a" stroke-width="0.5"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">PROJECT RENDER</text></svg>`
      ]
    }
  },
  {
    id: "proj-003",
    title: "谷地冥想圖書館",
    subtitle: "Valley Meditation Library",
    year: 2024,
    season: "Winter",
    type: "Education",
    category: "Design",
    coverImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill="%23181818" stroke="%232e2e2e" stroke-width="1"/><text x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23a0a0a0" letter-spacing="1">PROJECT COVER</text></svg>`,
    tags: ["地形適應", "自然採光", "聲學模擬"],
    tools: ["Revit", "Enscape", "Photoshop"],
    details: {
      overview: {
        text: "位於山谷低窪處的公共閱覽與冥想空間。建築依循山勢起伏，將半個量體嵌入土丘中以達到極佳的保溫與隔音效果。頂部天窗引入垂直漫射光，為室內營造出靜謐、神盛且適合閱讀與沉思的精神場所。",
        images: [
          `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%23181818" stroke="%232e2e2e" stroke-width="1"/><rect x="5" y="5" width="90" height="65" fill="none" stroke="%233a3a3a" stroke-width="0.5" stroke-dasharray="2,2"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">DESIGN BOARD / DIAGRAM</text></svg>`
        ]
      },
      plans: [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%23121212" stroke="%232e2e2e" stroke-width="1"/><line x1="20" y1="15" x2="80" y2="15" stroke="%233a3a3a" stroke-width="0.5"/><line x1="20" y1="35" x2="80" y2="35" stroke="%233a3a3a" stroke-width="0.5"/><line x1="20" y1="55" x2="80" y2="55" stroke="%233a3a3a" stroke-width="0.5"/><line x1="35" y1="15" x2="35" y2="60" stroke="%233a3a3a" stroke-width="0.5"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">FLOOR PLAN DRAWING</text></svg>`
      ],
      renders: [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%231a1a1a" stroke="%232e2e2e" stroke-width="1"/><circle cx="50" cy="37.5" r="15" fill="none" stroke="%233a3a3a" stroke-width="0.5"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">PROJECT RENDER</text></svg>`
      ]
    }
  },
  {
    id: "proj-004",
    title: "幾何懸浮別墅",
    subtitle: "Suspended Geometric Villa",
    year: 2024,
    season: "Summer",
    type: "Residential",
    category: "Architecture",
    coverImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill="%23181818" stroke="%232e2e2e" stroke-width="1"/><text x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23a0a0a0" letter-spacing="1">PROJECT COVER</text></svg>`,
    tags: ["懸挑結構", "參數化幾何", "視覺對焦"],
    tools: ["Rhino", "Grasshopper", "Lumion"],
    details: {
      overview: {
        text: "本別墅設計立足於險峻的山壁之上，主體結構採用巨型幾何鋼箱樑懸挑出山體表面，創造出令人驚嘆的懸浮感與向谷地無限延伸的景觀視野。立面採用耐候鋼板與大片防眩光玻璃，將粗獷的地質質感與當代精準工藝完美交融。",
        images: [
          `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%23181818" stroke="%232e2e2e" stroke-width="1"/><rect x="5" y="5" width="90" height="65" fill="none" stroke="%233a3a3a" stroke-width="0.5" stroke-dasharray="2,2"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">DESIGN BOARD / DIAGRAM</text></svg>`
        ]
      },
      plans: [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%23121212" stroke="%232e2e2e" stroke-width="1"/><line x1="20" y1="15" x2="80" y2="15" stroke="%233a3a3a" stroke-width="0.5"/><line x1="20" y1="35" x2="80" y2="35" stroke="%233a3a3a" stroke-width="0.5"/><line x1="20" y1="55" x2="80" y2="55" stroke="%233a3a3a" stroke-width="0.5"/><line x1="35" y1="15" x2="35" y2="60" stroke="%233a3a3a" stroke-width="0.5"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">FLOOR PLAN DRAWING</text></svg>`
      ],
      renders: [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%231a1a1a" stroke="%232e2e2e" stroke-width="1"/><circle cx="50" cy="37.5" r="15" fill="none" stroke="%233a3a3a" stroke-width="0.5"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">PROJECT RENDER</text></svg>`
      ]
    }
  },
  {
    id: "proj-005",
    title: "水岸生態特區",
    subtitle: "Waterfront Ecological Zone",
    year: 2024,
    season: "Spring",
    type: "Planning",
    category: "Design",
    coverImage: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><rect width="100" height="100" fill="%23181818" stroke="%232e2e2e" stroke-width="1"/><text x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23a0a0a0" letter-spacing="1">PROJECT COVER</text></svg>`,
    tags: ["生態修復", "海綿城市", "親水景觀"],
    tools: ["AutoCAD", "QGIS", "Photoshop"],
    details: {
      overview: {
        text: "以生態永續與親水防洪為核心的都市水岸更新計劃。利用階梯式人工濕地、透水鋪面與雨水花園構築起海綿城市的微循環系統，有效過濾都市地表逕流，同時建立供居民漫步與動植物棲息的綠色廊道。",
        images: [
          `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%23181818" stroke="%232e2e2e" stroke-width="1"/><rect x="5" y="5" width="90" height="65" fill="none" stroke="%233a3a3a" stroke-width="0.5" stroke-dasharray="2,2"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">DESIGN BOARD / DIAGRAM</text></svg>`
        ]
      },
      plans: [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%23121212" stroke="%232e2e2e" stroke-width="1"/><line x1="20" y1="15" x2="80" y2="15" stroke="%233a3a3a" stroke-width="0.5"/><line x1="20" y1="35" x2="80" y2="35" stroke="%233a3a3a" stroke-width="0.5"/><line x1="20" y1="55" x2="80" y2="55" stroke="%233a3a3a" stroke-width="0.5"/><line x1="35" y1="15" x2="35" y2="60" stroke="%233a3a3a" stroke-width="0.5"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">FLOOR PLAN DRAWING</text></svg>`
      ],
      renders: [
        `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 75" width="100%" height="100%"><rect width="100" height="75" fill="%231a1a1a" stroke="%232e2e2e" stroke-width="1"/><circle cx="50" cy="37.5" r="15" fill="none" stroke="%233a3a3a" stroke-width="0.5"/><text x="50" y="37.5" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="4" fill="%23888888" letter-spacing="1">PROJECT RENDER</text></svg>`
      ]
    }
  }
];

// 匯出資料，供瀏覽器環境或模組使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projects };
}
