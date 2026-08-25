import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, ArrowRight } from 'lucide-react';
import { AnimatedImage } from '../components/ui/AnimatedImage';

const REAL_EVENTS = [
  {
    id: 'taller-1',
    title: 'Memoria, Creatividad e Inteligencia Artificial',
    type: 'Taller',
    date: 'Viernes 18 y Sábado 26 de Septiembre, 2026',
    time: '2:00 a 4:00 p. m.',
    location: 'Casa de la Cultura Manrique - La 45 (Carrera 45 # 72-62)',
    description: 'Aprende, explora y descubre nuevas posibilidades con la IA. Explora herramientas para crear, aprender y preservar las historias de nuestra comunidad. No necesitas conocimientos previos con IA.',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/talleres/talleres_ok_01.png',
    actionText: 'Inscríbete en el WhatsApp',
    actionLink: 'https://wa.me/573196242779',
    tag: 'Entrada Gratuita'
  },
  {
    id: 'convocatoria-1',
    title: 'Buscamos las historias que aún viven en los álbumes familiares',
    type: 'Convocatoria Permanente',
    date: 'Convocatoria Abierta',
    time: '2026',
    location: 'Comuna 3, Manrique',
    description: '¿Conoces a un adulto mayor que haya vivido toda su vida en Manrique, conserve fotografías de su juventud y tenga historias para contar? Buscamos fotografías familiares y del barrio de los años 40, 50, 60 y 70 para un documental.',
    imageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/talleres/convocatorias_01.png',
    actionText: 'Escríbenos al WhatsApp',
    actionLink: 'https://wa.me/573196242779',
    tag: 'Participa'
  }
];

export function Talleres() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="w-[min(calc(100%-40px),1380px)] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-12 items-end"
        >
          <div>
            <div className="text-[0.7rem] uppercase tracking-[0.2em] font-extrabold text-orange">06 · Comunidad</div>
            <h1 className="text-[clamp(3.5rem,7vw,7.5rem)] my-2">Aprender<br/><span className="text-blue">haciendo.</span></h1>
          </div>
          <p className="text-muted text-[1.1rem] max-w-[680px]">
            La memoria es de todos. Participa en nuestros espacios de formación y ayúdanos a preservar la historia de Manrique.
          </p>
        </motion.div>

        <div className="space-y-16 mb-24">
          {REAL_EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-paper border-[5px] border-[#1112] rounded-[18px] overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Image side (Poster) */}
              <div className="lg:w-[45%] xl:w-[40%] bg-white relative min-h-[400px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[#1112] flex items-center justify-center p-8 lg:p-12">
                 <AnimatedImage 
                    src={event.imageUrl} 
                    alt={event.title} 
                    wrapperClassName="relative w-full h-full bg-transparent"
                    className="w-full h-full object-contain object-center"
                    referrerPolicy="no-referrer"
                  />
              </div>

              {/* Content side */}
              <div className="lg:w-[55%] xl:w-[60%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-block bg-orange/10 text-orange px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest w-max mb-6">
                  {event.type}
                </div>
                
                <h3 className="text-[2rem] md:text-[2.5rem] leading-[0.9] uppercase font-extrabold font-barlow text-ink mb-6">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-8 text-sm md:text-base text-ink font-medium">
                  <div className="flex items-center gap-3">
                    <CalendarIcon size={18} className="text-orange" />
                    <span>{event.date} {event.time !== 'N/A' && `| ${event.time}`}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-orange" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <p className="text-ink/80 mb-10 text-base md:text-lg font-dm leading-relaxed max-w-2xl">
                  {event.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-auto">
                  <a 
                    href={event.actionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-blue text-white border-0 rounded-full py-[15px] px-[24px] font-extrabold cursor-pointer hover:bg-teal transition-colors"
                  >
                    {event.actionText} →
                  </a>
                  <span className="font-extrabold text-orange uppercase tracking-widest text-sm">
                    {event.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
