export default function DisciplesOfJesus() {
    const bubbles = [
        { label: "Lives of\nCelebration", size: 92, top: "6%", left: "56%" },
        { label: "Spirit -\nEmpowered\nServants", size: 100, top: "2%", left: "74%" },
        { label: "Simple\nLiving", size: 92, top: "8%", left: "88%" },
        { label: "Sent\nOnes", size: 86, top: "28%", left: "52%" },
        { label: "Surrendered\nLives", size: 92, top: "48%", left: "46%" },
        { label: "Multiplying\nChurch", size: 92, top: "72%", left: "56%" },
        { label: "Radical\nHospitality", size: 92, top: "72%", left: "74%" },
        { label: "Faithful\nStewards", size: 86, top: "48%", left: "88%" },
        { label: "One\nFamily", size: 86, top: "28%", left: "88%" },
    ];

    return (
        <section className="bg-biscay px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start">
                    {/* Left descriptive card */}
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <div className="rounded-3xl bg-[#3f5f9a] p-10 text-white shadow-xl lg:max-w-lg">
                                <h2 className="text-3xl font-extrabold leading-tight lg:text-4xl">
                                    At the center is one
                                    <br /> thing: being discipled
                                    <span className="ml-2 block text-biscay lg:inline">by Jesus.</span>
                                </h2>

                                <div className="mt-6 text-base leading-7 text-white/90">
                                    <p className="mb-3">
                                        Everything else—<span className="text-white/80">family, hospitality,</span>
                                        <span className="text-white/80"> servanthood, simplicity, multiplication</span>— all
                                        flows from that.
                                    </p>
                                    <p className="mb-3">
                                        We don’t try to manufacture these values. We believe they{' '}
                                        <span className="text-white/80">grow naturally from a life close to Him</span>, and
                                        we want to see that life multiply in others.
                                    </p>
                                </div>
                            </div>
                            {/* subtle offset shadow to emulate screenshot */}
                            <div className="pointer-events-none absolute -bottom-4 left-6 w-3/4 rounded-3xl bg-[#223556] h-6 blur-sm opacity-70" />
                        </div>
                    </div>

                    {/* Right bubble cluster */}
                    <div className="order-first lg:order-last lg:w-1/2">
                        <div className="relative h-96 lg:h-[480px]">
                            {/* center bubble */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="flex items-center justify-center rounded-full bg-[#6b8fc9] shadow-2xl text-white"
                                    style={{ width: 180, height: 180 }}>
                                    <div className="text-center text-lg font-bold">Disciples of\nJesus</div>
                                </div>
                            </div>

                            {/* surrounding bubbles (visible on lg and above) */}
                            <div className="hidden lg:block">
                                {bubbles.map((b, i) => (
                                    <div
                                        key={i}
                                        className="absolute flex items-center justify-center rounded-full bg-[#6b8fc9] text-white shadow-lg text-center px-3"
                                        style={{ width: b.size, height: b.size, top: b.top, left: b.left, transform: 'translate(-50%, -50%)' }}
                                    >
                                        <span className="whitespace-pre-line text-sm font-semibold">{b.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* fallback grid for small screens */}
                            <div className="lg:hidden mt-6 grid grid-cols-3 gap-3">
                                <div className="col-span-3 flex items-center justify-center">
                                    <div className="rounded-full bg-[#6b8fc9] text-white flex items-center justify-center" style={{ width: 120, height: 120 }}>
                                        <div className="text-center text-sm font-bold">Disciples of\nJesus</div>
                                    </div>
                                </div>
                                {bubbles.slice(0, 6).map((b, i) => (
                                    <div key={i} className="flex items-center justify-center">
                                        <div className="rounded-full bg-[#6b8fc9] text-white flex items-center justify-center" style={{ width: 72, height: 72 }}>
                                            <span className="text-xs text-center whitespace-pre-line">{b.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}