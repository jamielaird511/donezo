import Link from "next/link";
import Container from "@/components/layout/Container";

const services = [
  {
    id: "gutter-cleaning",
    name: "Gutter cleaning",
    price: "from $149",
    status: "active",
    location: "Queenstown",
  },
  {
    id: "window-cleaning",
    name: "Window cleaning",
    status: "coming-soon",
  },
  {
    id: "lawn-mowing",
    name: "Lawn mowing",
    status: "coming-soon",
  },
  {
    id: "pressure-washing",
    name: "Pressure washing",
    status: "coming-soon",
  },
];

export default function ServicesPage() {
  const activeServices = services.filter((service) => service.status === "active");
  const comingSoonServices = services.filter((service) => service.status === "coming-soon");

  const toTitleCase = (str: string) => {
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative z-10 flex flex-1 flex-col">
        <section className="flex flex-1 items-start">
          <Container className="py-16">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold tracking-[-0.01em] text-[#0B1220] sm:text-5xl md:text-6xl lg:text-6xl leading-tight">
                  Choose a service
                </h1>
                <p className="text-base text-[#374151]/70 max-w-xl">
                  Fixed prices. No quotes. Book in minutes.
                </p>
              </div>

              {/* Live now section */}
              {activeServices.length > 0 && (
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                    Live now
                  </p>
                  <div className="flex justify-center">
                    <div className="w-full max-w-2xl">
                      {activeServices.map((service) => (
                        <div
                          key={service.id}
                          className="flex flex-col gap-6 rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-sm transition-all duration-150 ease-out hover:border-[#D1D5DB] hover:shadow-md"
                        >
                          <div className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold text-[#0B1220]">
                              {toTitleCase(service.name)}
                            </h2>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="text-xl font-semibold text-[#0B1220]">
                                {service.price}
                              </span>
                              <span className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-300 px-3 py-1 text-xs font-medium text-slate-900">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#7ED321]"></span>
                                Live in {service.location}
                              </span>
                            </div>
                            <Link
                              href={`/${service.id}`}
                              className="font-space-grotesk inline-flex items-center justify-center rounded-md bg-donezo-orange px-6 py-2.5 text-sm font-semibold text-[#FFFFFF] transition-opacity hover:opacity-90 w-fit"
                            >
                              Select
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Coming soon section */}
              {comingSoonServices.length > 0 && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-semibold text-[#0B1220]">
                    Coming soon
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {comingSoonServices.map((service) => (
                      <div
                        key={service.id}
                        className="flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between">
                            <h3 className="text-xl font-semibold text-[#0B1220]">
                              {toTitleCase(service.name)}
                            </h3>
                            <span className="inline-flex items-center rounded-md bg-[#F3F4F6] border border-[#E5E7EB] px-2.5 py-1 text-xs font-medium text-[#6B7280]">
                              Coming soon
                            </span>
                          </div>
                          <p className="text-sm text-[#6B7280]">
                            Launching soon
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}

