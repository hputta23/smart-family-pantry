'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockProcessReceipt } from '@/app/actions';
import { useToast } from '@/app/components/Toast';

export default function ScanReceipt() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processState, setProcessState] = useState<'idle' | 'uploading' | 'ocr' | 'matching'>('idle');

  const handleCapture = async () => {
    setIsProcessing(true);
    setProcessState('uploading');
    
    // Simulate UI stages
    await new Promise(r => setTimeout(r, 800));
    setProcessState('ocr');
    await new Promise(r => setTimeout(r, 800));
    setProcessState('matching');
    
    // Call server action to actually populate DB
    const mockItems = [
      { canonical_name: 'Large Eggs', quantity: 1, unit: 'dozen', category: 'Dairy & Eggs', expected_shelf_life_days: 14 },
      { canonical_name: 'Whole Milk', quantity: 1, unit: 'gallon', category: 'Dairy & Eggs', expected_shelf_life_days: 10 }
    ];
    const res = await mockProcessReceipt('Costco', 85.50, mockItems);
    
    if (res.success) {
      showToast('Receipt processed! Added $85.50 to budget and stocked items.');
      router.push('/inventory');
    } else {
      showToast(`Failed to process receipt: ${res.error}`, 'error');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div>
        <header className="w-full top-0 bg-background z-50 sticky">
          <div className="flex justify-between items-center px-container-padding py-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
                <span className="material-symbols-outlined text-primary mt-2 ml-2 text-[24px]">family_restroom</span>
              </div>
              <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Smart Pantry Scanner</h1>
            </div>
          </div>
        </header>

        <main className="relative min-h-[calc(100vh-144px)] flex flex-col items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <img alt="Kitchen Countertop" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQgZWCWhJu1XqpSMTjozp7BR8ZRxx-uFUIBVXAKhnfmUR2yoO7fJz0p82ad82eX_io8Ix5dBkk6BSmfyUiYH3TGO-Rz8klfA6yZ-qr3Mg6swP4AMvwGRnZ7G9stIf5jOpKnXB0CuBlUN3BEiSjUu5qYPcVEC91Zyb-TiLtQyH_kzRhD-VVZZjfi4BAayoD83O2nvkZFGccI1YgYhbzFCVx3dyb0maqqDeqp0I8hb90SmKluukU7LvugeGvwmPfCBG1rohNe78wnelM" />
          </div>

          <div className="relative z-10 w-full h-full flex flex-col items-center px-container-padding py-stack-lg max-w-lg mx-auto pb-32">
            <div className="mb-stack-lg text-center mt-8">
              <h2 className="font-headline-md text-headline-md text-white mb-2">Scan Receipt</h2>
              <p className="font-body-md text-white/80">Align the grocery receipt within the frame</p>
            </div>

            <div className="relative flex-grow w-full max-w-[320px] aspect-[9/16] border-2 border-dashed border-white/50 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
              
              {isProcessing && <div className="scanner-line" />}
              
              <div className="text-center p-gutter">
                <span className="material-symbols-outlined text-white/30 text-6xl block mb-2" data-icon="receipt_long">receipt_long</span>
              </div>
            </div>

            <div className="mt-stack-lg text-center">
              <p className="font-label-sm text-label-sm text-white bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
                Tip: Flatten the receipt and ensure good lighting
              </p>
            </div>

            <div className="mt-8 pt-stack-lg flex items-center justify-around w-full">
              <button className="text-white p-4 hover:bg-white/10 rounded-full transition-colors">
                <span className="material-symbols-outlined text-3xl" data-icon="image">image</span>
              </button>
              <button 
                onClick={handleCapture}
                disabled={isProcessing}
                className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center shutter-ring active:scale-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-16 h-16 rounded-full border-2 border-on-surface" />
              </button>
              <button className="text-white p-4 hover:bg-white/10 rounded-full transition-colors">
                <span className="material-symbols-outlined text-3xl" data-icon="flashlight_on">flashlight_on</span>
              </button>
            </div>
          </div>

          {isProcessing && (
            <div className="absolute inset-0 z-20 bg-on-surface/80 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-surface-container-lowest p-stack-lg rounded-xl max-w-xs w-full shadow-lg text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-stack-md" />
                <h3 className="font-headline-md text-headline-md mb-stack-sm text-on-surface">Processing...</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">cloud_upload</span>
                    <p className={`font-label-bold text-label-bold ${processState === 'uploading' ? 'text-primary' : 'text-on-surface'}`}>Uploading</p>
                  </div>
                  <div className={`flex items-center gap-3 ${processState === 'uploading' ? 'opacity-50' : ''}`}>
                    <span className="material-symbols-outlined text-primary">document_scanner</span>
                    <p className={`font-label-bold text-label-bold ${processState === 'ocr' ? 'text-primary' : 'text-on-surface'}`}>OCR Mapping</p>
                  </div>
                  <div className={`flex items-center gap-3 ${processState !== 'matching' ? 'opacity-50' : ''}`}>
                    <span className="material-symbols-outlined text-primary">inventory_2</span>
                    <p className={`font-label-bold text-label-bold ${processState === 'matching' ? 'text-primary' : 'text-on-surface'}`}>Updating Inventory</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
