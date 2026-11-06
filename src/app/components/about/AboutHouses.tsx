export default function AboutHouses() {
	function House({ title, children, className = "", width = 320 }: { title: string; children: React.ReactNode; className?: string; width?: number }) {
		return (
			<div className={`relative ${className}`} style={{ width }}>
				<svg viewBox="0 0 320 220" width="100%" height="auto" preserveAspectRatio="xMidYMin slice">
					{/* roof */}
					<path d="M16 72 L160 8 L304 72" fill="#6180a8" stroke="#4a6584" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
					{/* little chimney */}
					<rect x="230" y="18" width="24" height="18" rx="6" fill="#4a6584" />
					{/* body rounded */}
					<rect x="20" y="72" width="280" height="120" rx="28" ry="28" fill="#5b728f" />
				</svg>

				<div className="absolute left-6 top-28 w-[calc(100%-3rem)] text-white">
					<h3 className="text-xl font-extrabold leading-tight">{title}</h3>
					<div className="mt-3 text-sm leading-6 text-white/90">{children}</div>
				</div>
			</div>
		);
	}

	return (
		<section className="py-12">
			<div className="mx-auto max-w-6xl px-6">
				<div className="relative flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-start">
					{/* Left: houses and connectors */}
					<div className="w-full lg:w-7/12">
						<div className="relative flex flex-col items-center">
							{/* Top house */}
							<div className="z-20">
								<House title="Model">
									We gather in homes to make disciples. One church, united monthly, living out our faith in many homes.
									As we grow, we send—equipping others to lead in their own homes.
								</House>
							</div>

							{/* vertical connector to lower row */}
							<div className="absolute top-[220px] left-1/2 z-10 h-10 w-px bg-[#223556]" />

							{/* lower row with two houses */}
							<div className="mt-36 flex w-full items-start justify-between gap-6 lg:mt-44">
								<div className="flex-1 flex items-start justify-center">
									<House title="Mission" width={300}>
										We exist to lead others toward a transformed life, by making disciples who make disciples, as we teach
										people to love and obey God in every aspect of life.
									</House>
								</div>

								<div className="flex-1 flex items-start justify-center">
									<House title="Vision" width={300}>
										To empower all people to know and love God as they radically obey Jesus in every aspect of life.
									</House>
								</div>
							</div>

							{/* horizontal connector between the two lower houses */}
							<div className="absolute top-[420px] left-1/2 z-0 hidden w-1/2 -translate-x-1/2 border-t-2 border-[#223556] lg:block" />
						</div>
					</div>

					{/* Right: circular CTA */}
					<div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
						<div className="relative flex items-center justify-center">
							<div className="rounded-full bg-[#c6d6ff] shadow-2xl flex flex-col items-center justify-center text-center p-10" style={{ width: 260, height: 260 }}>
								<h4 className="text-2xl font-extrabold text-jaguar">Get Connected</h4>
								<p className="mt-3 text-sm text-jaguar/80">Ready to experience it for yourself? Let’s get you connected.</p>
								<a href="/join" className="mt-6 inline-block rounded-md bg-jaguar/90 px-4 py-2 text-sm font-semibold text-white shadow">Get Connected</a>
							</div>
							<div className="pointer-events-none absolute -right-6 bottom-4 w-56 h-6 rounded-lg bg-[#223556] opacity-30 blur-sm" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
