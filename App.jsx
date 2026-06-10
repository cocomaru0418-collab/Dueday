import { useState } from "react";

const CATEGORIES = [
  { id: "car", label: "🚘 車関係", color: "#FF8FAB" },
  { id: "food", label: "🍳 食べ物", color: "#51CF66" },
  { id: "beauty", label: "💄 化粧品", color: "#CC5DE8" },
  { id: "other", label: "📦 その他", color: "#339AF0" },
];

const ICON_OPTIONS = ["🚘","🏛️","🛡️","🔧","🍳","🥬","🎁","🍱","🥛","💄","☀️","✨","👁️","💊","📦","🧴","🧹","💉","🏥","📋"];

const THEMES = {
  pink: {
    name: "Pink",
    bg: "linear-gradient(135deg, #fdf6f0 0%, #fce8f3 100%)",
    card: "#fff",
    cardBorder: "transparent",
    text: "#2d2d2d",
    sub: "#aaa",
    accent: "#FF8FAB",
    accent2: "#CC5DE8",
    btnGrad: "linear-gradient(135deg, #FF8FAB, #CC5DE8)",
    filterActive: null,
    filterInactive: "#fff",
    tierRed:     { bg: "#FF8FAB", panelBg: "#fff0f5", panelBorder: "#ffb3c6", textColor: "#d63384", shadow: "0 4px 14px rgba(255,143,171,0.45)" },
    tierOrange:  { bg: "#FFB347", panelBg: "#fff6ed", panelBorder: "#ffd59e", textColor: "#c96a00", shadow: "0 4px 14px rgba(255,179,71,0.4)" },
    tierGreen:   { bg: "#6BCB8B", panelBg: "#f0fdf6", panelBorder: "#a8e6bc", textColor: "#2a7a4b", shadow: "0 4px 14px rgba(107,203,139,0.35)" },
    tierExpired: { bg: "#B0B8C8", panelBg: "#f4f5f7", panelBorder: "#d0d5df", textColor: "#6b7590", shadow: "none" },
  },
  white: {
    name: "White",
    bg: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    card: "#fff",
    cardBorder: "#e9ecef",
    text: "#212529",
    sub: "#868e96",
    accent: "#495057",
    accent2: "#868e96",
    btnGrad: "linear-gradient(135deg, #495057, #868e96)",
    filterInactive: "#fff",
    tierRed:     { bg: "#FA5252", panelBg: "#fff5f5", panelBorder: "#ffc9c9", textColor: "#c92a2a", shadow: "0 4px 14px rgba(250,82,82,0.3)" },
    tierOrange:  { bg: "#FD7E14", panelBg: "#fff4e6", panelBorder: "#ffd8a8", textColor: "#d9480f", shadow: "0 4px 14px rgba(253,126,20,0.3)" },
    tierGreen:   { bg: "#40C057", panelBg: "#ebfbee", panelBorder: "#b2f2bb", textColor: "#2f9e44", shadow: "0 4px 14px rgba(64,192,87,0.3)" },
    tierExpired: { bg: "#adb5bd", panelBg: "#f8f9fa", panelBorder: "#dee2e6", textColor: "#868e96", shadow: "none" },
  },
  black: {
    name: "Black",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    card: "#0f3460",
    cardBorder: "#1a4a7a",
    text: "#e0e0e0",
    sub: "#8892a4",
    accent: "#e94560",
    accent2: "#0f3460",
    btnGrad: "linear-gradient(135deg, #e94560, #533483)",
    filterInactive: "#0f3460",
    tierRed:     { bg: "#e94560", panelBg: "#1f1f3a", panelBorder: "#e94560", textColor: "#ff6b8a", shadow: "0 4px 14px rgba(233,69,96,0.5)" },
    tierOrange:  { bg: "#f5a623", panelBg: "#1f1f3a", panelBorder: "#f5a623", textColor: "#f5a623", shadow: "0 4px 14px rgba(245,166,35,0.4)" },
    tierGreen:   { bg: "#2ecc71", panelBg: "#1f1f3a", panelBorder: "#2ecc71", textColor: "#2ecc71", shadow: "0 4px 14px rgba(46,204,113,0.4)" },
    tierExpired: { bg: "#4a4a6a", panelBg: "#1f1f3a", panelBorder: "#4a4a6a", textColor: "#8892a4", shadow: "none" },
  },
  sky: {
    name: "Sky",
    bg: "linear-gradient(135deg, #e0f7fa 0%, #e8f4fd 100%)",
    card: "#fff",
    cardBorder: "#b2ebf2",
    text: "#01579b",
    sub: "#78909c",
    accent: "#0288d1",
    accent2: "#26c6da",
    btnGrad: "linear-gradient(135deg, #0288d1, #26c6da)",
    filterInactive: "#fff",
    tierRed:     { bg: "#ef5350", panelBg: "#fff5f5", panelBorder: "#ffcdd2", textColor: "#c62828", shadow: "0 4px 14px rgba(239,83,80,0.35)" },
    tierOrange:  { bg: "#ffa726", panelBg: "#fff8e1", panelBorder: "#ffe082", textColor: "#e65100", shadow: "0 4px 14px rgba(255,167,38,0.35)" },
    tierGreen:   { bg: "#26a69a", panelBg: "#e0f2f1", panelBorder: "#80cbc4", textColor: "#00695c", shadow: "0 4px 14px rgba(38,166,154,0.35)" },
    tierExpired: { bg: "#90a4ae", panelBg: "#eceff1", panelBorder: "#b0bec5", textColor: "#546e7a", shadow: "none" },
  },
};

const TIER_LABELS = {
  red: "❤️ もうすぐ期限",
  orange: "🧡 30日以内",
  green: "💚 余裕あり",
  expired: "🩶 期限切れ",
};

function getDaysLeft(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  return Math.ceil((new Date(dateStr) - today) / 86400000);
}
function getDaysPassed(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  return Math.floor((today - new Date(dateStr)) / 86400000);
}
function getDeadlineStatus(days) {
  if (days < 0) return { label: "期限切れ", color: "#fff", tier: "expired" };
  if (days <= 7) return { label: "あと" + days + "日", color: "#fff", tier: "red" };
  if (days <= 30) return { label: "あと" + days + "日", color: "#fff", tier: "orange" };
  return { label: "あと" + days + "日", color: "#fff", tier: "green" };
}
function getFoodStatus(days) {
  if (days === 0) return { label: "今日", color: "#fff", tier: "green" };
  if (days <= 2) return { label: days + "日前", color: "#fff", tier: "green" };
  if (days <= 5) return { label: days + "日前", color: "#fff", tier: "orange" };
  return { label: days + "日前", color: "#fff", tier: "red" };
}

const initialItems = [
  { id: 1, name: "自動車税", category: "car", icon: "🏛️", date: "2026-05-31", memo: "コンビニで払う", itemMode: null },
  { id: 2, name: "車検", category: "car", icon: "🔧", date: "2026-08-15", memo: "", itemMode: null },
  { id: 3, name: "日焼け止め", category: "beauty", icon: "☀️", date: "2026-06-01", memo: "SPF50", itemMode: "deadline" },
  { id: 7, name: "カラコン", category: "beauty", icon: "👁️", date: "2026-05-18", memo: "マンスリー", itemMode: "purchased" },
  { id: 4, name: "市場の野菜", category: "food", icon: "🥬", date: "2026-05-22", memo: "道の駅で購入", itemMode: "purchased" },
  { id: 5, name: "ヨーグルト", category: "food", icon: "🥛", date: "2026-05-28", memo: "", itemMode: "deadline" },
  { id: 6, name: "車の保険", category: "car", icon: "🛡️", date: "2026-04-01", memo: "", itemMode: null },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [presets, setPresets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPresetForm, setShowPresetForm] = useState(false);
  const [filterCat, setFilterCat] = useState("all");
  const [form, setForm] = useState({ name: "", category: "car", icon: "📋", date: "", memo: "", itemMode: "deadline" });
  const [presetForm, setPresetForm] = useState({ name: "", category: "car", icon: "📋" });
  const [nextId, setNextId] = useState(10);
  const [openPanel, setOpenPanel] = useState(null);
  const [themeKey, setThemeKey] = useState("pink");
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [heroImage, setHeroImage] = useState(null);
  const [imgPos, setImgPos] = useState({ x: 50, y: 50 });
  const [cropSrc, setCropSrc] = useState(null);
  const [cropPos, setCropPos] = useState({ x: 50, y: 50 });
  const [cropDrag, setCropDrag] = useState(false);
  const [cropDragStart, setCropDragStart] = useState(null);

  const t = THEMES[themeKey];
  const isFormFood = form.category === "food";
  const isFormBeauty = form.category === "beauty";
  const showItemModeSelector = isFormFood || isFormBeauty;

  const sorted = [...items]
    .filter(i => filterCat === "all" || i.category === filterCat)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  function getItemStatus(item) {
    const isPurchased = (item.category === "food" || item.category === "beauty") && item.itemMode === "purchased";
    return isPurchased ? getFoodStatus(getDaysPassed(item.date)) : getDeadlineStatus(getDaysLeft(item.date));
  }

  function getTierStyle(tierKey) {
    return { red: t.tierRed, orange: t.tierOrange, green: t.tierGreen, expired: t.tierExpired }[tierKey];
  }

  function addItem() {
    if (!form.name || !form.date) return;
    setItems(prev => [...prev, { ...form, id: nextId }]);
    setNextId(n => n + 1);
    setForm({ name: "", category: "car", icon: "📋", date: "", memo: "", itemMode: "deadline" });
    setShowForm(false);
  }
  function deleteItem(id) { setItems(prev => prev.filter(i => i.id !== id)); }
  function applyPreset(preset) {
    const itemMode = preset.category === "beauty" ? "purchased" : preset.category === "food" ? "purchased" : "deadline";
    setForm(f => ({ ...f, name: preset.name, category: preset.category, icon: preset.icon, itemMode }));
  }
  function addPreset() {
    if (!presetForm.name) return;
    setPresets(prev => [...prev, { ...presetForm, id: Date.now() }]);
    setPresetForm({ name: "", category: "car", icon: "📋" });
    setShowPresetForm(false);
  }
  function deletePreset(id) { setPresets(prev => prev.filter(p => p.id !== id)); }
  function togglePanel(key) { setOpenPanel(prev => prev === key ? null : key); }

  const tierItems = { red: [], orange: [], green: [], expired: [] };
  items.forEach(i => { const s = getItemStatus(i); tierItems[s.tier].push(i); });

  return (
    <>
      {/* クロップモーダル */}
      {cropSrc && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>表示位置を調整</div>
          <div style={{ color: "#ccc", fontSize: 12, marginBottom: 16 }}>ドラッグして好きな位置に合わせてね</div>
          <div
            style={{ width: "100%", maxWidth: 440, height: 180, borderRadius: 16, overflow: "hidden", cursor: cropDrag ? "grabbing" : "grab", position: "relative", border: "2px solid rgba(255,255,255,0.3)" }}
            onMouseDown={e => { setCropDrag(true); setCropDragStart({ x: e.clientX, y: e.clientY, px: cropPos.x, py: cropPos.y }); }}
            onMouseMove={e => {
              if (!cropDrag || !cropDragStart) return;
              const dx = (e.clientX - cropDragStart.x) * 0.12;
              const dy = (e.clientY - cropDragStart.y) * 0.12;
              setCropPos({ x: Math.min(100, Math.max(0, cropDragStart.px - dx)), y: Math.min(100, Math.max(0, cropDragStart.py - dy)) });
            }}
            onMouseUp={() => { setCropDrag(false); setCropDragStart(null); }}
            onMouseLeave={() => { setCropDrag(false); setCropDragStart(null); }}
            onTouchStart={e => { const touch = e.touches[0]; setCropDrag(true); setCropDragStart({ x: touch.clientX, y: touch.clientY, px: cropPos.x, py: cropPos.y }); }}
            onTouchMove={e => {
              if (!cropDrag || !cropDragStart) return;
              const touch = e.touches[0];
              const dx = (touch.clientX - cropDragStart.x) * 0.12;
              const dy = (touch.clientY - cropDragStart.y) * 0.12;
              setCropPos({ x: Math.min(100, Math.max(0, cropDragStart.px - dx)), y: Math.min(100, Math.max(0, cropDragStart.py - dy)) });
            }}
            onTouchEnd={() => { setCropDrag(false); setCropDragStart(null); }}
          >
            <img src={cropSrc} alt="crop" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `${cropPos.x}% ${cropPos.y}%`, pointerEvents: "none" }} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button onClick={() => setCropSrc(null)} style={{ padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", fontSize: 14, cursor: "pointer" }}>キャンセル</button>
            <button onClick={() => { setHeroImage(cropSrc); setImgPos(cropPos); setCropSrc(null); }} style={{ padding: "12px 32px", borderRadius: 12, border: "none", background: "#fff", color: "#222", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>決定 ✓</button>
          </div>
        </div>
      )}

    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif", padding: "20px 16px 60px", transition: "background 0.4s" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>

        {/* ヘロー写真エリア */}
        <div style={{ position: "relative", marginBottom: 20, borderRadius: 20, overflow: "hidden", minHeight: heroImage ? 160 : 0 }}>
          {heroImage && (
            <img src={heroImage} alt="cover" style={{ width: "100%", height: 180, objectFit: "cover", objectPosition: `${imgPos.x}% ${imgPos.y}%`, display: "block" }} />
          )}
          <label style={{
            position: heroImage ? "absolute" : "relative", bottom: 10, right: 10,
            background: "rgba(0,0,0,0.45)", color: "#fff",
            padding: "6px 12px", borderRadius: 10, fontSize: 12, cursor: "pointer",
            display: heroImage ? "block" : "none",
          }}>
            📷 変更
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
              const file = e.target.files[0];
              if (file) { const reader = new FileReader(); reader.onload = ev => { setCropSrc(ev.target.result); setCropPos({ x: 50, y: 50 }); }; reader.readAsDataURL(file); e.target.value = ""; }
            }} />
          </label>
        </div>

        {/* ヘッダー */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, position: "relative" }}>
          <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, margin: 0, letterSpacing: 1 }}>Dueday</h1>
            <p style={{ fontSize: 10, color: t.sub + "99", margin: "3px 0 0", letterSpacing: 3, textTransform: "uppercase" }}>manage your deadlines</p>
          </div>
          {/* 写真追加ボタン（未設定時） */}
          {!heroImage && (
            <label style={{ position: "absolute", left: 0, top: 0, background: "none", border: `1px solid ${t.sub}44`, borderRadius: 10, padding: "6px 10px", cursor: "pointer", fontSize: 13, color: t.sub }}>
              📷
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
                const file = e.target.files[0];
                if (file) { const reader = new FileReader(); reader.onload = ev => setHeroImage(ev.target.result); reader.readAsDataURL(file); }
              }} />
            </label>
          )}

          {/* テーマ切り替えボタン */}
          <button onClick={() => setShowThemePicker(v => !v)} style={{
            position: "absolute", right: 0, top: 0,
            background: "none", border: `1px solid ${t.sub}44`, borderRadius: 10,
            padding: "6px 10px", cursor: "pointer", fontSize: 13, color: t.sub,
          }}>🎨</button>
        </div>

        {/* テーマピッカー */}
        {showThemePicker && (
          <div style={{ background: t.card, borderRadius: 16, padding: 16, marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.12)", border: `1px solid ${t.cardBorder}` }}>
            
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {Object.entries(THEMES).map(([key, theme]) => (
                <button key={key} onClick={() => { setThemeKey(key); setShowThemePicker(false); }} style={{
                  padding: "10px 16px", borderRadius: 12, border: themeKey === key ? `2px solid ${theme.accent}` : "2px solid transparent",
                  background: key === "black" ? "#1a1a2e" : key === "sky" ? "#e0f7fa" : key === "white" ? "#f8f9fa" : "#fce8f3",
                  cursor: "pointer", fontSize: 13, fontWeight: themeKey === key ? 700 : 400,
                  color: key === "black" ? "#e0e0e0" : "#333",
                  boxShadow: themeKey === key ? `0 0 0 3px ${theme.accent}44` : "none",
                }}>{theme.name}</button>
              ))}
            </div>
          </div>
        )}

        {/* 4段バッジ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {["red","orange","green","expired"].map(tierKey => {
            const ts = getTierStyle(tierKey);
            const count = tierItems[tierKey].length;
            if (count === 0) return null;
            const isOpen = openPanel === tierKey;
            return (
              <div key={tierKey}>
                <div onClick={() => togglePanel(tierKey)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: ts.bg, color: "#fff",
                  borderRadius: isOpen ? "14px 14px 0 0" : 14,
                  padding: "13px 18px", cursor: "pointer",
                  boxShadow: ts.shadow, transition: "border-radius 0.2s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22, fontWeight: 800 }}>{count}</span>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{TIER_LABELS[tierKey]}</span>
                  </div>
                  <span style={{ fontSize: 13 }}>{isOpen ? "▲" : "▼"}</span>
                </div>
                {isOpen && (
                  <div style={{ background: ts.panelBg, border: `1px solid ${ts.panelBorder}`, borderTop: "none", borderRadius: "0 0 14px 14px", padding: "4px 16px 12px" }}>
                    {tierItems[tierKey].map((item, idx) => {
                      const cat = CATEGORIES.find(c => c.id === item.category);
                      const isPurchased = (item.category === "food" || item.category === "beauty") && item.itemMode === "purchased";
                      const status = getItemStatus(item);
                      return (
                        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: idx < tierItems[tierKey].length - 1 ? `1px solid ${ts.panelBorder}` : "none" }}>
                          <span style={{ fontSize: 20 }}>{item.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{item.name}</div>
                            <div style={{ fontSize: 11, color: t.sub, marginTop: 1 }}>{cat?.label}{item.memo ? "  •  " + item.memo : ""}</div>
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: ts.textColor, whiteSpace: "nowrap" }}>
                            {isPurchased ? getDaysPassed(item.date) + "日前" : status.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* カテゴリフィルター */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
          {[{ id: "all", label: "✨ すべて", color: t.accent }, ...CATEGORIES].map(cat => (
            <button key={cat.id} onClick={() => setFilterCat(cat.id)} style={{
              whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 20, border: "none",
              background: filterCat === cat.id ? (cat.color || t.accent) : t.filterInactive,
              color: filterCat === cat.id ? "#fff" : t.sub,
              fontWeight: 600, fontSize: 13, cursor: "pointer",
              boxShadow: filterCat === cat.id ? "0 3px 10px rgba(0,0,0,0.2)" : "0 1px 4px rgba(0,0,0,0.08)",
              transition: "all 0.2s",
            }}>{cat.label}</button>
          ))}
        </div>

        {/* アイテム一覧 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sorted.map(item => {
            const cat = CATEGORIES.find(c => c.id === item.category);
            const isPurchased = (item.category === "food" || item.category === "beauty") && item.itemMode === "purchased";
            const status = getItemStatus(item);
            const ts = getTierStyle(status.tier);
            const isUrgent = status.tier === "red";
            return (
              <div key={item.id} style={{
                background: t.card, borderRadius: 18, padding: "16px 18px",
                display: "flex", alignItems: "center", gap: 14,
                boxShadow: isUrgent ? ts.shadow : "0 2px 10px rgba(0,0,0,0.07)",
                border: `2px solid ${isUrgent ? ts.bg : t.cardBorder}`,
                transition: "all 0.3s",
              }}>
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: t.text }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: t.sub, marginTop: 2 }}>
                    {isPurchased ? (item.category === "beauty" ? "開封日：" : "入手日：") : "期限："}
                    {new Date(item.date).toLocaleDateString("ja-JP")}
                    {item.memo && <span style={{ marginLeft: 8 }}>• {item.memo}</span>}
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{ fontSize: 11, color: cat?.color || t.sub, background: (cat?.color || t.sub) + "22", borderRadius: 8, padding: "2px 8px", fontWeight: 600 }}>{cat?.label}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  <span style={{ background: ts.bg, color: "#fff", borderRadius: 10, padding: "4px 10px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>{status.label}</span>
                  <button onClick={() => deleteItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: t.sub + "88", fontSize: 16, padding: 0 }}>🗑️</button>
                </div>
              </div>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div style={{ textAlign: "center", color: t.sub, padding: "40px 0", fontSize: 14 }}>
            まだ登録がないよ！<br />下の＋ボタンから追加してみて😊
          </div>
        )}

        {/* 追加フォーム */}
        {showForm && (
          <div style={{ marginTop: 20, background: t.card, borderRadius: 20, padding: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.12)", border: `1px solid ${t.cardBorder}` }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, color: t.text }}>📝 新しく追加</h3>

            {presets.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: t.sub, marginBottom: 8 }}>⭐ よく使うもの</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {presets.map(p => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center" }}>
                      <button onClick={() => applyPreset(p)} style={{ padding: "6px 12px", borderRadius: "12px 0 0 12px", border: `1px solid ${t.cardBorder || "#e9ecef"}`, borderRight: "none", background: t.card, fontSize: 12, cursor: "pointer", color: t.text }}>{p.icon} {p.name}</button>
                      <button onClick={() => deletePreset(p.id)} style={{ padding: "6px 8px", borderRadius: "0 12px 12px 0", border: `1px solid ${t.cardBorder || "#e9ecef"}`, background: t.card, fontSize: 11, cursor: "pointer", color: t.sub }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!showPresetForm ? (
              <button onClick={() => setShowPresetForm(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 12, border: `1px dashed ${t.sub}`, background: "transparent", fontSize: 12, cursor: "pointer", color: t.sub, marginBottom: 16 }}>＋ よく使うものを登録</button>
            ) : (
              <div style={{ background: t.bg, borderRadius: 14, padding: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: t.sub, marginBottom: 8 }}>⭐ よく使うものを登録</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                  {ICON_OPTIONS.map(ic => (
                    <button key={ic} onClick={() => setPresetForm(f => ({ ...f, icon: ic }))} style={{ fontSize: 20, padding: "4px 6px", borderRadius: 8, border: "none", background: presetForm.icon === ic ? t.accent + "33" : "transparent", cursor: "pointer" }}>{ic}</button>
                  ))}
                </div>
                <input placeholder="名前（例：カラコン）" value={presetForm.name} onChange={e => setPresetForm(f => ({ ...f, name: e.target.value }))} style={getInputStyle(t)} />
                <select value={presetForm.category} onChange={e => setPresetForm(f => ({ ...f, category: e.target.value }))} style={getInputStyle(t)}>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setShowPresetForm(false)} style={{ flex: 1, padding: "9px", borderRadius: 10, border: `1px solid ${t.cardBorder || "#e9ecef"}`, background: t.card, cursor: "pointer", fontSize: 13, color: t.sub }}>キャンセル</button>
                  <button onClick={addPreset} style={{ flex: 2, padding: "9px", borderRadius: 10, border: "none", background: t.btnGrad, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>登録する ⭐</button>
                </div>
              </div>
            )}

            <input placeholder="名前（例：車の保険）" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={getInputStyle(t)} />
            <select value={form.category} onChange={e => { const cat = e.target.value; setForm(f => ({ ...f, category: cat, itemMode: cat === "beauty" ? "purchased" : cat === "food" ? "purchased" : "deadline" })); }} style={getInputStyle(t)}>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>

            {showItemModeSelector && (
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {[
                  { value: "purchased", label: isFormBeauty ? "💊 開封日で管理" : "📦 入手日で管理", sub: isFormBeauty ? "カラコン・美容液など" : "市場・もらいもの向け" },
                  { value: "deadline", label: "📅 期限日で管理", sub: "賞味期限あるもの向け" },
                ].map(opt => (
                  <button key={opt.value} onClick={() => setForm(f => ({ ...f, itemMode: opt.value }))} style={{
                    flex: 1, padding: "10px 8px", borderRadius: 12, cursor: "pointer",
                    border: form.itemMode === opt.value ? `2px solid ${t.accent}` : `1px solid ${t.cardBorder || "#e9ecef"}`,
                    background: form.itemMode === opt.value ? t.accent + "18" : t.card, textAlign: "center",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: t.sub, marginTop: 2 }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            )}

            <div style={{ fontSize: 12, color: t.sub, marginBottom: 6 }}>
              {showItemModeSelector && form.itemMode === "purchased" ? (isFormBeauty ? "📅 開封日・買った日" : "📅 買った日・もらった日") : "📅 期限日"}
            </div>
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={getInputStyle(t)} />
            <input placeholder="メモ（任意）" value={form.memo} onChange={e => setForm(f => ({ ...f, memo: e.target.value }))} style={getInputStyle(t)} />

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: "12px", borderRadius: 12, border: `1px solid ${t.cardBorder || "#e9ecef"}`, background: t.card, cursor: "pointer", fontSize: 14, color: t.sub }}>キャンセル</button>
              <button onClick={addItem} style={{ flex: 2, padding: "12px", borderRadius: 12, border: "none", background: t.btnGrad, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>追加する ✓</button>
            </div>
          </div>
        )}

        {!showForm && (
          <button onClick={() => setShowForm(true)} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", marginTop: 20, padding: "16px", borderRadius: 18, border: "none",
            background: t.btnGrad, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
            boxShadow: `0 6px 20px ${t.accent}55`,
          }}>
            ＋ 期限を追加する
          </button>
        )}
      </div>
    </div>
    </>
  );
}

function getInputStyle(t) {
  return {
    width: "100%", padding: "12px 14px", borderRadius: 12,
    border: `1px solid ${t.cardBorder || "#e9ecef"}`, fontSize: 14, marginBottom: 10,
    boxSizing: "border-box", color: t.text, outline: "none", background: t.card,
  };
}
