import React from 'react';
import Link from 'next/link';

export default function SetupPreferredStores() {
  return (
    <>
      <div>
  {/* Step Indicator */}
  <header className="w-full max-w-2xl px-container-padding py-stack-lg mt-unit">
    <div className="flex items-center justify-between mb-stack-md">
      <span className="font-label-bold text-label-bold text-primary">STEP 2 OF 5</span>
      <div className="flex gap-2">
        <div className="w-8 h-1.5 rounded-full bg-primary-fixed" />
        <div className="w-8 h-1.5 rounded-full bg-primary" />
        <div className="w-8 h-1.5 rounded-full bg-surface-container-highest" />
        <div className="w-8 h-1.5 rounded-full bg-surface-container-highest" />
        <div className="w-8 h-1.5 rounded-full bg-surface-container-highest" />
      </div>
    </div>
    <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Where do you shop?</h1>
    <p className="text-on-surface-variant font-body-md text-body-md">We'll help you find deals and organize your pantry based on your local store layouts.</p>
  </header>
  {/* Main Content Canvas */}
  <main className="w-full max-w-2xl px-container-padding pb-32">
    {/* Search and Filter Bar */}
    <div className="relative mb-stack-lg group">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
      <input className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-0 transition-all outline-none font-body-md text-body-md store-card-shadow" placeholder="Search for more stores..." type="text" />
    </div>
    {/* Store Grid (Bento Style Layout) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Aldi Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 store-card-shadow flex flex-col justify-between hover:translate-y-0.5 transition-transform cursor-pointer relative group">
        <div className="flex justify-between items-start mb-stack-md">
          <img alt="Aldi Logo" className="h-10 w-auto object-contain" data-alt="A clean, high-resolution logo of Aldi grocery store against a pure white studio background. The visual style is minimalist and domestic, featuring soft, even lighting that emphasizes the bold primary colors of the brand. This image fits the 'Digital Kitchen Board' aesthetic by being crisp, dependable, and clearly recognizable for a home pantry management application." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeOJaJFii3VVeugo4J4DiSEw4OyJrVHMQ61MKNL03P4P0EzlHpXxGP2tNbkDzX4NRBZazMBAeCsBcdOrhoeicn3l4wZdMzqs09FNi5suUM7CYlT6npCfuRMQIjMaf8yO55psBwEgnmZ128mEUPpmjDa86jDfSEG8rK2b1yRJlOeRGr1f_l1FzXDecnygn5X7LbSf1dJ4wdPsddqszCYR2EWdzXSLe0_1q3PL8VIOfTknzdy0YyGRnqh5s5oY7yM5FiuaoktL_pxwul" />
          <div className="flex flex-col items-end">
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">near_me</span> 0.8 mi
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">Aldi</h3>
          <p className="text-on-surface-variant text-label-sm font-label-sm">High Street Branch</p>
        </div>
        <div className="absolute top-4 right-4 h-6 w-6 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center transition-colors">
          {/* Custom hand-drawn style checkmark simulation */}
          <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity" data-weight="fill">check_circle</span>
        </div>
      </div>
      {/* Walmart Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 store-card-shadow flex flex-col justify-between hover:translate-y-0.5 transition-transform cursor-pointer relative group">
        <div className="flex justify-between items-start mb-stack-md">
          <img alt="Walmart Logo" className="h-10 w-auto object-contain" data-alt="The distinctive yellow spark and blue text of the Walmart logo presented in a clean, professional commercial photography style. The setting is bright and airy, reflecting a modern light-mode design. The atmosphere is nurturing and organized, suggesting a reliable domestic hub for a family's grocery needs, perfectly aligned with a tactile minimalist design system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeKg-aQy-auH3K4DJFsiyOxsG0hJYp982vaeQqanYEknortiqA99JG_hCtOsnPjt0gnBuyjylZJAfEYV4ELMlXwxaamVfjwYcHT1ov3UjFkFv7YHI0x8Xb9sTprMsRqaPXPPZikIjuOsuPjEEwdkH6kA5TAnhLCjhnEn8CSfcklDpyy6tKttXZDTm4483ivSLMHjKdNFXVysi8Cge7N1_2GW_oT7qv7hEKg4j4c1TpQ4mwMJLBllPERmTgkigBQm9AtmKY8Fi0eTpZ" />
          <div className="flex flex-col items-end">
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">near_me</span> 1.2 mi
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">Walmart</h3>
          <p className="text-on-surface-variant text-label-sm font-label-sm">Supercenter Parkway</p>
        </div>
        <div className="absolute top-4 right-4 h-6 w-6 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity" data-weight="fill">check_circle</span>
        </div>
      </div>
      {/* Trader Joe's Card (Active State Example) */}
      <div className="bg-surface-container-lowest border-2 border-primary rounded-xl p-5 store-card-shadow flex flex-col justify-between hover:translate-y-0.5 transition-transform cursor-pointer relative store-card-active shadow-md">
        <div className="flex justify-between items-start mb-stack-md">
          <img alt="Trader Joe's Logo" className="h-10 w-auto object-contain" data-alt="A detailed view of the Trader Joe's red typography logo against a clean, cream-colored textured background resembling a high-end kitchen tile. The lighting is soft and ambient, characteristic of a high-fidelity domestic aesthetic. The mood is warm and inviting, fitting for a 'Digital Kitchen Board' that transforms chaotic meal planning into a calm, organized experience." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpC21RYYNNJSlcuKBgvj7phzvSdhyvO2z22FQ8c1vbozEhBR7muvr7cKtgQ2Dpjrv0B97mJBftsbJccvZ3pfl_aoRtSxLupB9X__k6RPaxTFeL10CUv8XSR8VmG4DBZh_O7MnBikfiFxIac0Ikkb0ZoMF3xq3USs-6fkfN9E7F-JkZWq5A5bsY5XIF9DVDcYE7z04krl23pWAyLPk6RFAyvi1CO5B0PUwZPcF3HrO0qVx7wuL8oVcTjOxQni0_qDHiyKaO9Lfrm9yZ" />
          <div className="flex flex-col items-end">
            <span className="font-label-sm text-label-sm text-on-primary-container bg-primary-container px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">near_me</span> 2.1 mi
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-headline-md text-headline-md text-on-primary-container">Trader Joe's</h3>
          <p className="text-on-primary-container opacity-80 text-label-sm font-label-sm">Westside Market</p>
        </div>
        <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-primary flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined text-on-primary text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
        </div>
      </div>
      {/* Costco Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 store-card-shadow flex flex-col justify-between hover:translate-y-0.5 transition-transform cursor-pointer relative group">
        <div className="flex justify-between items-start mb-stack-md">
          <img alt="Costco Logo" className="h-10 w-auto object-contain" data-alt="The blue and red Costco Wholesale logo captured in high resolution with a crisp, modern aesthetic. The background is a very light grey with a soft shadow effect, giving the impression of a physical card on a clean board. The visual style is dependable and hyper-organized, designed to reduce cognitive load for busy families managing their household inventory." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_qATHztLT8nzKb2eCJAip9R7KuMSIln4qbNJ02Dp94Q2wwc0a4os8Da5ZGSoizOwnObUeKiZt2zUo9PadWhDRbdc0JHhbeKi4mE8H4aFetFngW-SHfMu1zev8D5bXa_TwqYG2F4pM_u9syYKWa4tiixjpMhfx8MECAxw0ROA9xYxm-PzeR5T-tY706BJaii7fIZnz2-tofAST57zFa39J9k_hqCo6tSzIG-GpUIWgDjZJB592rSGU01YruS-Jj7YCJSwJKbQipUhp" />
          <div className="flex flex-col items-end">
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">near_me</span> 3.5 mi
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">Costco</h3>
          <p className="text-on-surface-variant text-label-sm font-label-sm">Bulk World Plaza</p>
        </div>
        <div className="absolute top-4 right-4 h-6 w-6 rounded-full border-2 border-outline-variant group-hover:border-primary flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity" data-weight="fill">check_circle</span>
        </div>
      </div>
    </div>
    {/* Smart Prediction Prompt (Contextual AI suggest) */}
    <div className="mt-stack-lg p-6 bg-secondary-container bg-opacity-10 border border-secondary-container rounded-xl flex gap-4 items-start">
      <div className="bg-secondary-container p-2 rounded-lg">
        <span className="material-symbols-outlined text-on-secondary-container">auto_awesome</span>
      </div>
      <div>
        <h4 className="font-label-bold text-label-bold text-on-secondary-container mb-1">Smart Suggestion</h4>
        <p className="text-on-surface-variant font-body-md text-body-md">Based on your location, many of your neighbors also shop at <strong>Whole Foods</strong>. Would you like to add it?</p>
        <button className="mt-3 text-primary font-label-bold text-label-bold flex items-center gap-1 hover:underline">
          Add Whole Foods <span className="material-symbols-outlined text-[16px]">add_circle</span>
        </button>
      </div>
    </div>
  </main>
  {/* Footer Actions */}
  <div className="fixed bottom-0 left-0 w-full p-4 bg-surface-container-lowest border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
    <div className="max-w-2xl mx-auto flex flex-col gap-3">
      <Link href="/setup/members" className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-md text-headline-md shadow-md active:scale-95 transition-transform duration-150 flex items-center justify-center">
        Next
      </Link>
      <Link href="/setup/members" className="w-full py-2 text-on-surface-variant font-label-bold text-label-bold hover:text-primary transition-colors flex items-center justify-center">
        Skip for now
      </Link>
    </div>
  </div>
</div>

    </>
  );
}
