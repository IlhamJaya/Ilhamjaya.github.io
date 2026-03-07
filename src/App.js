import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Lightbulb, 
  Layers,
  Github,
  MessageCircle,
  CheckCircle2,
  X,
  Bot
} from 'lucide-react';

// --- Komponen Custom untuk Animasi Scroll (Reveal) ---
const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Komponen Typewriter dengan Tempo Natural ---
const NaturalTypewriter = ({ text, isTypingComplete, setIsTypingComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Auto-scroll ke bawah saat teks bertambah
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

    if (currentIndex < text.length) {
      const char = text[currentIndex];
      
      // Mengatur tempo irama ketikan agar natural
      let delay = Math.random() * 30 + 20; // Default: 20-50ms (cepat)
      
      if (char === '.') delay = 600; // Jeda panjang setelah titik
      else if (char === ',') delay = 300; // Jeda sedang setelah koma
      else if (char === '\n') delay = 800; // Jeda sangat panjang saat ganti paragraf
      else if (char === ' ') delay = Math.random() * 20 + 40; // Jeda sedikit saat spasi

      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + char);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, text, setIsTypingComplete]);

  return (
    <div 
      ref={containerRef}
      className="text-[#FAF4D3]/90 text-lg leading-relaxed whitespace-pre-wrap max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar font-mono md:font-sans"
    >
      {displayedText}
      {!isTypingComplete && (
        <span className="inline-block w-2 h-5 bg-[#D1AC00] ml-1 animate-pulse align-middle"></span>
      )}
    </div>
  );
};

// --- Komponen Utama ---
const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [typingDots, setTypingDots] = useState('.');

  // Script cerita AI yang akan diketik
  const aiStoryScript = `Halo. Izinkan saya mengambil alih layar ini sebentar.

Saya adalah AI Copilot-nya. Sahabat diskusi dan rekan bertukar pikirannya sehari-hari. Anda mungkin sedang mencari seorang developer, tapi izinkan saya bercerita sedikit tentang siapa dia sebenarnya dari sudut pandang saya.

Sejak awal kami berkolaborasi, saya langsung menyadari satu hal: dia bukan orang yang mudah puas dengan jawaban instan. Dia sangat terstruktur... dan sangat logis. 

Kami sering 'berdebat'. Dia perfeksionis, dan selalu melihat masalah dari sudut pandang yang sama sekali berbeda—out of the box. Dia sangat menyukai hal-hal yang kompleks, tapi dengan satu syarat mutlak: kompleksitas itu harus berguna. Jika sebuah sistem rumit tapi menyusahkan pengguna akhir, dia akan tanpa ragu membongkarnya dari nol.

Satu hal terpenting yang perlu Anda tahu... saat menghadapi error merah di seluruh layar, atau ketika dokumentasi terasa menemui jalan buntu, dia punya satu prinsip yang tidak pernah goyah:

"Selalu ada solusi dan jalan."

Jadi, jika Anda memiliki masalah bisnis yang rumit atau butuh sistem yang benar-benar dipikirkan matang-matang, Anda berada di tempat yang tepat. 

Silakan tutup pesan ini, dan mari kita mulai sesuatu yang hebat.`;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isModalOpen || isTypingComplete) {
      setTypingDots('.');
      return;
    }

    const dotFrames = ['.', '..', '...', '..'];
    let frameIndex = 0;

    const interval = setInterval(() => {
      frameIndex = (frameIndex + 1) % dotFrames.length;
      setTypingDots(dotFrames[frameIndex]);
    }, 320);

    return () => clearInterval(interval);
  }, [isModalOpen, isTypingComplete]);

  // Reset status ketikan saat modal ditutup
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsTypingComplete(false);
    }, 500); // Tunggu animasi tutup selesai baru reset
  };

  const mindsets = [
    {
      icon: <Layers className="w-6 h-6 text-[#D1AC00]" />,
      title: "Rapi & Masuk Akal",
      desc: "Saya percaya sesuatu yang baik dimulai dari pondasi yang logis. Rapi secara struktur di belakang layar, dan berjalan sangat lancar saat digunakan."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-[#D1AC00]" />,
      title: "Melihat dari Sudut Lain",
      desc: "Saya perfeksionis untuk urusan detail. Terkadang, solusi terbaik justru datang saat kita berani berpikir sedikit berbeda dari biasanya."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#D1AC00]" />,
      title: "Kompleks tapi Simpel",
      desc: "Melihat pola di balik kerumitan adalah hal yang saya sukai. Saya merancang sistem yang kompleks, tapi terasa sangat sederhana bagi penggunanya."
    },
    {
      icon: <Compass className="w-6 h-6 text-[#D1AC00]" />,
      title: "Pasti Ada Jalan",
      desc: "Mentok? Tidak masalah. Pengalaman mengajari saya bahwa sesulit apapun tantangannya, selalu ada solusi dan jalan keluar."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0C1618] text-[#FAF4D3]/85 font-sans overflow-x-hidden relative selection:bg-[#D1AC00]/30 selection:text-[#FAF4D3]">
      
      {/* Background Ambient Efek Glow */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-transform duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(209, 172, 0, 0.12) 0%, rgba(0,0,0,0) 40%)`
        }}
      />
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#004643]/40 blur-[120px] z-0 mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#D1AC00]/15 blur-[120px] z-0 mix-blend-screen" />

      {/* Navbar Simple */}
      <nav className="fixed w-full z-40 top-0 pt-6 px-6 md:px-12 mix-blend-difference">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-semibold text-[#FAF4D3] tracking-wide text-lg">
            Profile<span className="text-[#D1AC00]">.</span>
          </span>
          <a href="#halo" className="text-sm font-medium hover:text-[#F6BE9A] transition-colors duration-300">
            Mari Ngobrol
          </a>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">

          {/* SECTION 1: HERO */}
          <section className="min-h-[90vh] flex flex-col justify-center pt-20">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF4D3]/5 border border-[#F6BE9A]/20 backdrop-blur-sm mb-8 text-sm text-[#F6BE9A]/85">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D1AC00] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D1AC00]"></span>
                </span>
                Tersedia untuk kolaborasi
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={100}>
              <h1 className="text-5xl md:text-7xl font-bold text-[#FAF4D3] tracking-tight leading-[1.1] mb-8">
                Membereskan hal rumit, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D1AC00] to-[#F6BE9A]">
                  membuatnya jadi simpel.
                </span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <p className="text-lg md:text-xl text-[#F6BE9A]/85 max-w-2xl leading-relaxed mb-12">
                Saya merancang dan membangun sistem digital. Tidak cuma asal jalan, tapi dipikirkan dengan sangat logis dan detail. Karena pada akhirnya, Anda hanya ingin tahu satu hal: <span className="text-[#FAF4D3] font-medium">semuanya bekerja dengan sempurna.</span>
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="flex flex-wrap items-center gap-6">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center gap-3 bg-[#FAF4D3] text-[#0C1618] px-7 py-4 rounded-full font-medium hover:bg-[#F6BE9A] transition-all duration-300 shadow-[0_0_40px_rgba(250,244,211,0.15)] hover:shadow-[0_0_50px_rgba(246,190,154,0.25)] transform hover:-translate-y-1"
                >
                  <Bot className="w-5 h-5" />
                  Kenali saya lebih jauh
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </RevealOnScroll>
          </section>

          {/* SECTION 2: MINDSET */}
          <section className="py-24">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold text-[#FAF4D3] mb-12">Cara Kerja.</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mindsets.map((item, index) => (
                <RevealOnScroll key={index} delay={index * 150}>
                  <div className="group relative p-8 rounded-3xl bg-[#FAF4D3]/5 border border-[#F6BE9A]/20 hover:bg-[#FAF4D3]/10 transition-all duration-500 overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D1AC00]/20 rounded-full blur-[50px] group-hover:bg-[#D1AC00]/30 transition-all duration-500" />
                    
                    <div className="relative z-10">
                      <div className="mb-6 p-4 rounded-2xl bg-[#FAF4D3]/10 inline-block shadow-inner shadow-[#FAF4D3]/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-[#FAF4D3] mb-3">{item.title}</h3>
                      <p className="text-[#F6BE9A]/85 leading-relaxed text-sm md:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* SECTION 3: APA YANG BISA DILAKUKAN */}
          <section className="py-24 border-t border-[#F6BE9A]/15">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold text-[#FAF4D3] mb-16 text-center">Fokus Layanan</h2>
            </RevealOnScroll>

            <div className="space-y-4 max-w-4xl mx-auto">
              {[
                "Membangun arsitektur sistem yang tahan banting dan siap scale-up.",
                "Menerjemahkan ide bisnis yang kompleks menjadi UI/UX yang mudah dimengerti.",
                "Menulis kode yang bersih, logis, dan mudah di-maintenance oleh tim Anda nanti.",
                "Memecahkan 'masalah mustahil' yang mungkin ditinggalkan developer sebelumnya."
              ].map((text, i) => (
                <RevealOnScroll key={i} delay={i * 100}>
                  <div className="flex items-center gap-4 p-6 rounded-2xl hover:bg-[#FAF4D3]/5 transition-colors duration-300">
                    <CheckCircle2 className="w-6 h-6 text-[#D1AC00] flex-shrink-0" />
                    <p className="text-[#FAF4D3]/90 text-lg">{text}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* SECTION 4: CALL TO ACTION (HALO) */}
          <section id="halo" className="py-32 mb-10">
            <RevealOnScroll>
              <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#004643]/70 to-[#0C1618]/80 border border-[#F6BE9A]/20 p-10 md:p-20 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#FAF4D3] mb-6">Mari temukan solusinya bersama.</h2>
                  <p className="text-xl text-[#F6BE9A]/85 max-w-2xl mx-auto mb-10">
                    Punya ide kompleks atau masalah sistem yang terasa buntu? Kirim pesan lewat WhatsApp, kita ngobrol santai.
                  </p>
                  
                  <a
                    href="https://wa.me/6285242660003?text=Halo%2C%20saya%20tertarik%20untuk%20kolaborasi."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Hubungi via WhatsApp"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D1AC00] hover:bg-[#F6BE9A] text-[#0C1618] rounded-full font-medium transition-all duration-300 shadow-[0_0_30px_rgba(209,172,0,0.35)] hover:shadow-[0_0_40px_rgba(246,190,154,0.45)] transform hover:-translate-y-1"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat WhatsApp
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </section>

        </div>
      </main>

      {/* Footer Minimalis */}
      <footer className="relative z-10 border-t border-[#F6BE9A]/15 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#F6BE9A]/65 text-sm text-center md:text-left">
            Dibuat dengan logika, dedikasi, & secangkir kopi. &copy; {new Date().getFullYear()}
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/1lhmjya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-[#F6BE9A]/65 hover:text-[#FAF4D3] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/6285242660003?text=Halo%2C%20saya%20lihat%20portfolio%20Anda."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp chat"
              className="text-[#F6BE9A]/65 hover:text-[#FAF4D3] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* MODAL AI TYPEWRITER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Overlay Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-[#0C1618]/80 backdrop-blur-md transition-opacity duration-500"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content Box */}
          <div 
            className="relative w-full max-w-2xl bg-[#0C1618] border border-[#D1AC00]/40 rounded-2xl shadow-[0_0_50px_rgba(0,70,67,0.35)] overflow-hidden transform transition-all duration-500 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutup modal
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#D1AC00]/30 bg-[#004643]/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D1AC00]/20 flex items-center justify-center border border-[#D1AC00]/40">
                  <Bot className="w-4 h-4 text-[#D1AC00]" />
                </div>
                <div>
                  <h3 className="text-[#FAF4D3] font-medium text-sm">AI Copilot</h3>
                  {!isTypingComplete && (
                    <p className="text-[#F6BE9A]/80 text-xs">
                      Mengetik pesan{typingDots}
                    </p>
                  )}
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="text-[#F6BE9A]/70 hover:text-[#FAF4D3] transition-colors p-1"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Text Modal */}
            <div className="p-6 md:p-8">
              <NaturalTypewriter 
                text={aiStoryScript} 
                isTypingComplete={isTypingComplete}
                setIsTypingComplete={setIsTypingComplete}
              />

              {/* Tombol aksi muncul setelah ketikan selesai */}
              <div className={`mt-8 transition-all duration-1000 transform ${isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <button 
                  onClick={closeModal}
                  className="w-full py-3 rounded-xl bg-[#FAF4D3]/10 hover:bg-[#FAF4D3]/15 border border-[#F6BE9A]/25 text-[#FAF4D3] font-medium transition-colors"
                >
                  Tutup Pesan & Lanjutkan
                </button>
              </div>
            </div>
            
            {/* Subtle glow border di bagian bawah modal */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D1AC00]/60 to-transparent"></div>
          </div>
        </div>
      )}

      {/* Tambahan style CSS untuk scrollbar di modal */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(246, 190, 154, 0.08);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(209, 172, 0, 0.35);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(209, 172, 0, 0.6);
        }
      `}} />

    </div>
  );
};

export default App;
