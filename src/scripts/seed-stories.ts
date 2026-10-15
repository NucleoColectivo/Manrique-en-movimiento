import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(configData);
const db = getFirestore(app, configData.firestoreDatabaseId);

export const STORIES_DATA = [
  {
    id: 'etel-memoria-barrio',
    number: '01',
    authorId: 'Don Etel',
    fullName: 'Don Etel (Etelberto Ramírez Echeverri)',
    title: 'Los teatros, las esquinas y la vida en comunidad',
    subtitle: 'Un barrio que se encontraba en la calle',
    audioUrl: '/audio/ETEL.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/ETEL.mp3',
    duration: '09:30',
    tags: ['Infancia', 'Cine', 'Tango', 'Tradiciones', 'Solidaridad'],
    content: 'En los recuerdos de Don Etel, Manrique aparece como un lugar donde la vida cotidiana sucedía también en los andenes. Al terminar la jornada de trabajo, los adultos salían a sentarse frente a sus casas, conversaban y compartían mientras los niños jugaban en la calle al fútbol, al trompo o a la chucha libertad.\n\nLa carrera 45, hoy una de las principales arterias del sector, era mucho más estrecha en aquella época. El transporte se organizaba alrededor de rutas de buses que conectaban el barrio con el centro de Medellín y otros sectores de la ciudad. Los desplazamientos, las esquinas y los lugares de encuentro formaban parte de una geografía que sus habitantes aprendían a reconocer desde pequeños.\n\nDiciembre tenía una manera particular de reunir a la gente. Según recuerda Don Etel, durante las celebraciones del 7, 8, 24 y 31, las puertas permanecían abiertas después de las seis de la tarde. Los vecinos visitaban otras casas, los niños compartían con sus mayores y los dulces, los buñuelos y la natilla circulaban entre cuadras. La celebración no terminaba en la puerta de cada vivienda: se extendía por el vecindario.\n\nLa música también ocupaba un lugar importante en su vida. Criado en una familia profundamente vinculada al tango, Don Etel recuerda sus escapadas infantiles al bar Alaska para escuchar «Tormenta». En su memoria aparecen los cafés de la carrera 45, entre ellos La Paz y el Café Manrique, y los teatros que marcaron la vida cultural del sector: el Atenas, el Manrique y el San Blas, espacios que durante décadas congregaron a familias y vecinos alrededor del cine y las presentaciones en vivo.',
    imageUrl: '/img/personas/etelberto.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Etelberto%20Ramirez%20Echeverri.png',
    isPublished: true,
    createdAt: new Date()
  },
  {
    id: 'gustavo-transporte-45',
    number: '02',
    authorId: 'Don Gustavo',
    fullName: 'Don Gustavo (Gustavo Rojas Z.)',
    title: 'La 45, los oficios y el transporte del barrio',
    subtitle: 'La transformación de la arteria principal y sus pioneros',
    audioUrl: '/audio/GUSTAVO.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/GUSTAVO.mp3',
    duration: '09:34',
    tags: ['Transporte', 'La 45', 'Oficios', 'Buses de Escalera', 'Comercio'],
    content: 'Don Gustavo relata la profunda transformación urbana y social de la Carrera 45, eje vertebral de Manrique. Recuerda el paso de los caminos de herradura y las primeras líneas a la llegada de los buses de escalera y colectivos que conectaban a la comunidad con el centro de Medellín.\n\nEn sus memorias evoca con nitidez a los pioneros mecánicos, herreros, carpinteros y zapateros que montaron sus talleres en las esquinas más transitadas. El crecimiento del transporte no solo trajo movilidad física, sino que detonó la vida comercial: farmacias familiares, graneros de abarrotes, tiendas de esquina y ferreterías donde se fiaba de palabra y el saludo del conductor era el reloj que marcaba los ritmos del vecindario.\n\nA través de su testimonio, Don Gustavo explica cómo los habitantes defendieron las rutas populares, cómo los choferes y mecánicos conformaron un gremio solidario y cómo cada cambio en el trazado de la vía reflejó los anhelos de progreso de una comunidad obrera que nunca dejó de abrirse paso en la montaña.',
    imageUrl: '/img/personas/gustavo.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Gustavo%20Rojas%20Z.png',
    isPublished: true,
    createdAt: new Date()
  },
  {
    id: 'marta-convites-comunidad',
    number: '03',
    authorId: 'Doña Marta',
    fullName: 'Doña Marta (Marta Julia González)',
    title: 'La construcción comunitaria, el agua y los convites',
    subtitle: 'El esfuerzo colectivo y las manos que levantaron el barrio',
    audioUrl: '/audio/MARTA.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/MARTA.mp3',
    duration: '07:12',
    tags: ['Convites', 'Agua', 'Solidaridad', 'Autoconstrucción', 'Mujeres'],
    content: 'Doña Marta recuerda con emoción las épicas jornadas de convite en las que los vecinos de Manrique se organizaban los fines de semana para levantar sus propias casas, abrir zanjas y nivelar caminos de herradura. En aquellos años no existían acueductos modernos; el agua debía traerse a pulso en ollas, latas y mangueras provisionales desde nacimientos y quebradas de la parte alta.\n\nEl papel de las mujeres fue el corazón de esa gesta: mientras los hombres picaban tierra y pegaban adobes, las madres y abuelas preparaban enormes sancochos de leña comunitarios, cuidaban a los niños y organizaban bazares para comprar cemento y tejas de zinc. Cada casa terminada era una victoria compartida por toda la cuadra.\n\nPara Marta, la memoria de Manrique no se resume en planos arquitectónicos, sino en el sudor fraterno, en la generosidad de prestar la pala o el balde y en la certeza de que nadie se quedaba sin techo si la comunidad entera sumaba sus brazos. Ese tejido humano sigue vivo en la dignidad de sus familias fundadoras.',
    imageUrl: '/img/personas/marta.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Marta%20Julia%20Gonza%CC%81lez.png',
    isPublished: true,
    createdAt: new Date()
  },
  {
    id: 'oscar-tango-bohemia',
    number: '04',
    authorId: 'Don Óscar',
    fullName: 'Don Óscar (Óscar Zapata)',
    title: 'Tango, bohemia y juventud en Manrique',
    subtitle: 'La época dorada de los cafés, serenatas y fonógrafos',
    audioUrl: '/audio/OSCAR.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/OSCAR.mp3',
    duration: '08:39',
    tags: ['Tango', 'Cultura', 'Juventud', 'Bohemia', 'Gardel'],
    content: 'Don Óscar recorre con vibrante lucidez la época de oro del tango y la bohemia en Manrique. Para él y sus contemporáneos, el barrio no dormía: los bares y cantinas de la Carrera 45 y los alrededores de la Casa Gardeliana eran santuarios donde resonaban las grabaciones de Carlos Gardel, Agustín Magaldi, Julio Sosa y Libertad Lamarque desde fonógrafos de bocina y radiolas de mueble de madera.\n\nEn su relato, la juventud de aquellos años encontraba en las mesas de billar, las tangovías de los domingos y los corrillos de esquina una escuela de elegancia arrabalera, poesía popular y camaradería. Los muchachos vestían sus mejores camisas y zapatos lustrados para cortejar a las muchachas en el parque o en las funciones vespertinas de los cines barriales.\n\nDon Óscar demuestra que el tango en Manrique no fue una moda foránea importada del Río de la Plata, sino un sentimiento visceral que echó raíces hondas en la ladera andina, acompañando las penas, las alegrías amorosas y la profunda identidad artística de los medellinenses.',
    imageUrl: '/img/personas/oscar.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Oscar%20Zapata.png',
    isPublished: true,
    createdAt: new Date()
  },
  {
    id: 'olga-educacion-comunidad',
    number: '05',
    authorId: 'Doña Olga',
    fullName: 'Doña Olga (Olga Lucía Muñoz)',
    title: 'Memoria barrial, educación y tejido social',
    subtitle: 'Las maestras, la escuela y el cuidado comunitario',
    audioUrl: '/audio/Olga_Lucia_Munoz.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/Olga%20Lucia%20Mun%CC%83oz.mp3',
    duration: '03:33',
    tags: ['Memoria Barrial', 'Educación', 'Comunidad', 'Mujeres', 'Territorio'],
    content: 'Olga Lucía Muñoz aporta un relato sensible y fundamental sobre las redes cotidianas de afecto, enseñanza y resistencia comunitaria en Manrique. Su voz evoca los primeros salones de clase improvisados en zaguanes y casas familiares, donde maestras y líderes barriales alfabetizaban a niños y adultos obreros con una vocación inquebrantable.\n\nDestaca cómo las madres y abuelas del sector no solo administraban el hogar, sino que tejían verdaderas redes de cuidado mutuo: el intercambio de remedios caseros, la custodia colectiva de los hijos mientras los padres laboraban en fábricas textiles de Medellín y la defensa de los espacios recreativos y culturales.\n\nPara Olga, recordar a los mayores y sus enseñanzas es un acto de justicia histórica y pedagógica. Invita a las nuevas generaciones a valorar las raíces del barrio, a no perder el sentido de vecindad y a reconocer que el verdadero progreso de Manrique ha nacido del corazón y la sabiduría de sus mujeres.',
    imageUrl: '/img/personas/olga.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Olga%20Lucia%20Mun%CC%83oz.png',
    isPublished: true,
    createdAt: new Date()
  },
  {
    id: 'ruben-tango-tangovia',
    number: '06',
    authorId: 'Don Rubén',
    fullName: 'Don Rubén (Rubén Aristizábal)',
    title: 'El tango vivo, la lírica y la tradición gardeliana',
    subtitle: 'El canto gardeliano y la mística de la Tangovía',
    audioUrl: '/audio/Ruben_Aristizabal.mp3',
    fallbackAudioUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/Audios/Ruben%20Aristizabal.mp3',
    duration: '02:01',
    tags: ['Tango Vivo', 'Gardel', 'Canto', 'Tradición', 'Tangovía'],
    content: 'Rubén Aristizábal es portador de una de las voces y memorias más apasionadas del tango en la Comuna 3. En su crónica, rememora la inauguración de la legendaria Tangovía en la Carrera 45, un acontecimiento popular sin precedentes donde la calle entera se cerraba al tráfico vehicular para convertirse en una pista gigante de baile, poesía y canto al aire libre bajo el cielo de Medellín.\n\nCon respeto y maestría, Don Rubén describe cómo cantar un tango requiere entender el peso de cada palabra, el dolor del desamor, el valor de la madre y la devoción eterna por Gardel. Rememora a los cantores locales que se disputaban amistosamente los aplausos de los vecinos en los tablados y serenatas nocturnas.\n\nSu testimonio recuerda que la música es el alma intangible del patrimonio de Manrique: una llama viva que no se apaga mientras haya un vecino que entone sus estrofas y mantenga encendida la memoria de los viejos tiempos.',
    imageUrl: '/img/personas/ruben.png',
    fallbackImageUrl: 'https://raw.githubusercontent.com/NucleoColectivo/Manrique-en-movimiento/main/img/Fotografi%CC%81as%20Personas%20del%20Barrio/Ruben%20Aristizabal.png',
    isPublished: true,
    createdAt: new Date()
  }
];

async function updateStories() {
  console.log('Actualizando historias y personajes con los 6 audios e imágenes...');
  for (const story of STORIES_DATA) {
    const docRef = doc(db, 'stories', story.id);
    await setDoc(docRef, story, { merge: true });
    console.log(`Guardada historia: ${story.number} · ${story.authorId} - ${story.title}`);
  }
  console.log('¡Las 6 historias y personajes fueron actualizados con éxito en Firestore!');
  process.exit(0);
}

updateStories().catch(err => {
  console.error('Error al actualizar historias:', err);
  process.exit(1);
});
