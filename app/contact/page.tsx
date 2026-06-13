import { Mail, MapPin, Phone } from 'lucide-react';
import SubHero from '@/src/components/SubHero';
import { defaultContent } from '@/src/data/siteContent';
import ScrollReveal from '@/src/components/ScrollReveal';
import ContactForm from '@/src/components/ContactForm';

export const metadata = {
  title: 'Contact Us | IERF',
  description: 'Get in touch with the India Eurasia Research Forum. Reach out for research collaborations, academic inquiries, event partnerships, or general questions.',
};

export default function Contact() {
  const c = defaultContent.contact;
  if (!c) return null;
  const contactIcons = [<Mail key="mail" size={24} />, <MapPin key="map" size={24} />, <Phone key="phone" size={24} />];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <SubHero 
        title="Contact Us" 
        subtitle={c.subtitle}
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* ── CONTACT INFO SIDEBAR ── */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal>
                <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Connect</h2>
                <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] mb-6 tracking-tighter font-display leading-tight">{c.heading} <br />{c.subheading}</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-12">
                  {c.body}
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 gap-6">
                {c.info?.map((info: any, idx: number) => (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                     <a
                       href={info.href}
                       className="flex items-center p-6 sm:p-8 transition-all duration-500 group bg-white border border-gray-100 hover:border-[#E87722]/30 rounded-xl shadow-sm hover:shadow-2xl hover:shadow-[#E87722]/10"
                     >
                       <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-[#0A192F] group-hover:bg-[#E87722] group-hover:text-white transition-all duration-500 mr-6 flex-shrink-0 shadow-inner group-hover:shadow-[0_0_20px_rgba(232,119,34,0.4)] group-hover:scale-110">
                         {contactIcons[idx % contactIcons.length]}
                       </div>
                       <div>
                         <h4 className="text-lg font-black text-[#0A192F] mb-1 tracking-tight group-hover:text-[#E87722] transition-colors">{info.title}</h4>
                         <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-widest">{info.desc}</p>
                         <p className="text-[#E87722] font-black text-sm">{info.value}</p>
                       </div>
                     </a>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* ── CONTACT FORM ── */}
            <ScrollReveal delay={0.2} className="lg:col-span-7 h-full">
               <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
