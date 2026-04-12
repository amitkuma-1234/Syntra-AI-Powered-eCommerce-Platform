'use client';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { SEED_PRODUCTS, searchProducts, formatPrice, getStars, CATEGORIES, BRANDS } from '@/lib/data';

export default function ChatbotWidget() {
  const { state, dispatch } = useStore();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef(null);
  const [context, setContext] = useState({ lastProducts: [], lastCategory: null, lastBudget: null });

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'bot', text: "Hey! 👋 I'm your **Syntra AI Shopping Agent** 🤖\n\nI think, decide & act for you!\n\nTry:\n• \"Best phone under 30k\"\n• \"Show me deals\"\n• \"Compare laptops\"", time: Date.now() }]);
    }
  }, []);

  useEffect(() => { messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight); }, [messages]);

  const addBot = (text) => setMessages(prev => [...prev, { role: 'bot', text, time: Date.now() }]);

  const extractBudget = (t) => {
    const m = t.replace(/,/g,'').match(/(\d+)\s*(k|lakh|l)?/i);
    if (!m) return null;
    let v = parseInt(m[1]);
    const u = (m[2]||'').toLowerCase();
    if (u === 'k') v *= 1000;
    else if (u === 'l' || u === 'lakh') v *= 100000;
    else if (v < 100) v *= 1000;
    return v;
  };

  const extractCategory = (t) => {
    const map = { electronics:['phone','laptop','headphone','tv','camera','watch','speaker','tablet'], fashion:['shoes','jacket','dress','jeans','sunglasses','bag'], home:['purifier','vacuum','mattress','lamp','kitchen','coffee'], books:['book','programming','novel'], sports:['fitness','yoga','gym','bicycle','tent','running'], beauty:['skincare','perfume','hair','makeup'], toys:['drone','robot','game','toy'], grocery:['tea','chocolate','nuts','coffee'], health:['protein','massage','vitamin','medical'], automotive:['car','dashcam','jump'] };
    const lower = t.toLowerCase();
    for (const [cat, kws] of Object.entries(map)) {
      if (kws.some(k => lower.includes(k))) return cat;
    }
    return null;
  };

  const send = async () => {
    if (!input.trim() || typing) return;
    const raw = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: raw, time: Date.now() }]);
    setTyping(true);

    await new Promise(r => setTimeout(r, 600));

    const t = raw.toLowerCase();
    const budget = extractBudget(t);
    const category = extractCategory(t) || context.lastCategory;

    if (budget) setContext(c => ({ ...c, lastBudget: budget }));
    if (category) setContext(c => ({ ...c, lastCategory: category }));

    // Greetings
    if (/^(hi|hello|hey|namaste)/i.test(t)) {
      addBot("Hello! 😊 How can I help you today?\n\nTry asking for products, deals, or let me recommend something!");
      setTyping(false); return;
    }

    // Deals
    if (t.includes('deal') || t.includes('offer') || t.includes('sale') || t.includes('discount')) {
      const deals = SEED_PRODUCTS.filter(p => p.discount >= 30).slice(0,3);
      let msg = "🔥 **Hot Deals Right Now:**\n\n";
      deals.forEach(p => { msg += `• **${p.name}** — ${formatPrice(p.price)} ~~${formatPrice(p.originalPrice)}~~ (${p.discount}% off)\n`; });
      msg += "\nVisit our [Deals page](/deals) for more!";
      addBot(msg);
      setTyping(false); return;
    }

    // Cart
    if (t.includes('cart') && (t.includes('show') || t.includes('my') || t.includes('what'))) {
      const items = state.cart.filter(i => !i.savedForLater);
      if (items.length === 0) { addBot("Your cart is empty! 🛒 Want me to help you find something?"); }
      else { addBot(`🛒 You have **${items.length} items** in cart.\n\nHead to [Cart](/cart) to checkout!`); }
      setTyping(false); return;
    }

    // Search & Recommend
    let results = [];
    if (category) results = SEED_PRODUCTS.filter(p => p.category === category);
    else results = searchProducts(t, 10);

    if (budget) results = results.filter(p => p.price <= budget);

    if (results.length > 0) {
      results.sort((a,b) => (b.rating * 10 + b.discount) - (a.rating * 10 + a.discount));
      const top = results.slice(0, 3);
      setContext(c => ({ ...c, lastProducts: top }));
      let msg = `🔍 Found **${results.length} products**. Here are the top picks:\n\n`;
      if (budget) msg += `💰 Budget: ${formatPrice(budget)}\n`;
      msg += `\n🏆 **Top Pick: ${top[0].name}**\n`;
      msg += `⭐ ${top[0].rating}/5 | 💰 ${formatPrice(top[0].price)} | ${top[0].discount}% off\n\n`;
      top.forEach((p, i) => {
        msg += `**${i+1}. ${p.name}**\n   ${formatPrice(p.price)} | ${getStars(p.rating)} ${p.rating}\n\n`;
      });
      msg += "Want me to add the best one to cart? Just say \"add to cart\"!";
      addBot(msg);
    } else if (t.includes('add') && t.includes('cart') && context.lastProducts.length > 0) {
      const p = context.lastProducts[0];
      dispatch({ type: 'ADD_TO_CART', payload: { productId: p.id } });
      addBot(`✅ **Added to cart!**\n\n🛒 ${p.name} — ${formatPrice(p.price)}\n\nHead to [Cart](/cart) to checkout!`);
    } else if (t.includes('thank')) {
      addBot("You're welcome! 😊 Happy to help anytime!");
    } else {
      addBot("I'd love to help! Try:\n• \"Best laptop under 50k\"\n• \"Show me fashion deals\"\n• \"Recommend headphones\"\n\nOr browse our [Products](/products)!");
    }
    setTyping(false);
  };

  const formatMsg = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/~~(.*?)~~/g, '<s>$1</s>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:var(--accent-light)">$1</a>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setOpen(!open)} title="AI Shopping Agent">
        {open ? '✕' : '🤖'}
      </button>
      <div className={`chatbot-window ${open ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">🤖</div>
            <div>
              <div style={{ fontWeight: 600, color: '#fff' }}>Syntra Agent</div>
              <div className="chatbot-status">{typing ? '🧠 Thinking...' : '● Online — Ready to help'}</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{ color: '#fff', fontSize: '1.2rem' }}>✕</button>
        </div>
        <div className="chatbot-messages" ref={messagesRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role}`} dangerouslySetInnerHTML={{ __html: formatMsg(msg.text) }} />
          ))}
          {typing && <div className="chat-msg bot" style={{ opacity: 0.7 }}>Thinking...</div>}
        </div>
        <div className="quick-replies">
          {['📱 Best Phone', '🔥 Deals', '💻 Laptops', '⭐ Recommend'].map(q => (
            <button key={q} className="quick-reply" onClick={() => { setInput(q.replace(/[^\w\s]/g,'').trim()); setTimeout(() => { const inp = document.querySelector('.chatbot-input input'); if(inp) { inp.value = q.replace(/[^\w\s]/g,'').trim(); } }, 0); }}>{q}</button>
          ))}
        </div>
        <div className="chatbot-input">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask me anything..." />
          <button onClick={send}>➤</button>
        </div>
      </div>
    </>
  );
}
