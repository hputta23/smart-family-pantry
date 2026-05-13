
import React from 'react';

export default function ScanReceipt() {
  return (
    <>
      <div>
  {/* Top App Bar */}
  <header className="w-full top-0 bg-background dark:bg-background z-50 sticky">
    <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
          <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuGNzvkL3dTuzpv7vo8QnBiqHMfTiObILfJtL6c9HNdKzpLTbaRBI1Ym7kSsqd697ziDxwYznADKDDg9RoqWGF7Z5q2d4BSGgZwGMHMMQfGXSWfLt_3CRc6XJbyFVsIK9kHgSOk6_FuhAuXFnxb87ZKbm7aSRfmlvicc1633oUfs1EWYPL9SmGyGtOk1Hugw0XiBq9rwnUbPHoILNBK1yrTU1yTO5ZsSU-DmwuKGE7z54ip8aPunYTSJlYDYuuXOIPgSEia64l4m02" />
        </div>
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface dark:text-on-background">Smart Family Pantry</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="text-primary dark:text-primary-fixed-dim hover:opacity-80 transition-opacity p-2 active:scale-95 transition-transform duration-150">
          <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
        </button>
      </div>
    </div>
  </header>
  <main className="relative min-h-[calc(100vh-144px)] flex flex-col items-center justify-center overflow-hidden bg-black">
    {/* Camera Viewport Simulation */}
    <div className="absolute inset-0 z-0">
      <img alt="Kitchen Countertop" className="w-full h-full object-cover opacity-60" data-alt="A clean, minimalist domestic kitchen setting with light wood countertops and a white ceramic tile backsplash. Soft morning sunlight streams across the surface, illuminating a light grey stone countertop where a grocery receipt will be placed. The aesthetic is warm, organized, and tranquil, using a palette of soft teals, whites, and natural textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQgZWCWhJu1XqpSMTjozp7BR8ZRxx-uFUIBVXAKhnfmUR2yoO7fJz0p82ad82eX_io8Ix5dBkk6BSmfyUiYH3TGO-Rz8klfA6yZ-qr3Mg6swP4AMvwGRnZ7G9stIf5jOpKnXB0CuBlUN3BEiSjUu5qYPcVEC91Zyb-TiLtQyH_kzRhD-VVZZjfi4BAayoD83O2nvkZFGccI1YgYhbzFCVx3dyb0maqqDeqp0I8hb90SmKluukU7LvugeGvwmPfCBG1rohNe78wnelM" />
    </div>
    {/* Scanning Interface Overlay */}
    <div className="relative z-10 w-full h-full flex flex-col items-center px-container-padding py-stack-lg max-w-lg mx-auto">
      <div className="mb-stack-lg text-center">
        <h2 className="font-headline-md text-headline-md text-white mb-2">Scan Receipt</h2>
        <p className="font-body-md text-white/80">Align the grocery receipt within the frame</p>
      </div>
      {/* Receipt Frame Guide */}
      <div className="relative flex-grow w-full max-w-[320px] aspect-[9/16] border-2 border-dashed border-white/50 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
        {/* Inner guide corners */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
        {/* Scanning Line Visual */}
        <div className="scanner-line" />
        <div className="text-center p-gutter">
          <span className="material-symbols-outlined text-white/30 text-6xl block mb-2" data-icon="receipt_long">receipt_long</span>
        </div>
      </div>
      {/* Tip Text */}
      <div className="mt-stack-lg text-center">
        <p className="font-label-sm text-label-sm text-white bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
          Tip: Flatten the receipt and ensure good lighting
        </p>
      </div>
      {/* Shutter Controls */}
      <div className="mt-auto pt-stack-lg flex items-center justify-around w-full">
        <button className="text-white p-4 hover:bg-white/10 rounded-full transition-colors">
          <span className="material-symbols-outlined text-3xl" data-icon="image">image</span>
        </button>
        <button className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center shutter-ring active:scale-90 transition-all">
          <div className="w-16 h-16 rounded-full border-2 border-on-surface" />
        </button>
        <button className="text-white p-4 hover:bg-white/10 rounded-full transition-colors">
          <span className="material-symbols-outlined text-3xl" data-icon="flashlight_on">flashlight_on</span>
        </button>
      </div>
    </div>
    {/* Post-Capture Processing Overlay (Initially Hidden/Shown for Context) */}
    <div className="absolute inset-0 z-20 bg-on-surface/80 backdrop-blur-sm flex items-center justify-center hidden">
      <div className="bg-surface-container-lowest p-stack-lg rounded-xl max-w-xs w-full shadow-lg text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-stack-md" />
        <h3 className="font-headline-md text-headline-md mb-stack-sm">Processing...</h3>
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary" data-icon="cloud_upload">cloud_upload</span>
            <p className="font-label-bold text-label-bold text-primary">Uploading →</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-on-surface-variant" data-icon="document_scanner">document_scanner</span>
            <p className="font-label-bold text-label-bold text-on-surface-variant">OCR →</p>
          </div>
          <div className="flex items-center gap-3 opacity-50">
            <span className="material-symbols-outlined text-on-surface-variant" data-icon="inventory_2">inventory_2</span>
            <p className="font-label-bold text-label-bold text-on-surface-variant">Matching</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  {/* Bottom Navigation Bar */}
  
</div>

    </>
  );
}
