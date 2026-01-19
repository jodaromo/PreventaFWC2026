// Colombian Departments and Cities
// Bogotá D.C. is listed first for quick access

export const viaTypes = [
  { value: 'Calle', label: 'Calle', abbr: 'Cl.' },
  { value: 'Carrera', label: 'Carrera', abbr: 'Cra.' },
  { value: 'Avenida', label: 'Avenida', abbr: 'Av.' },
  { value: 'Transversal', label: 'Transversal', abbr: 'Tv.' },
  { value: 'Diagonal', label: 'Diagonal', abbr: 'Dg.' },
  { value: 'Circular', label: 'Circular', abbr: 'Cir.' },
  { value: 'Autopista', label: 'Autopista', abbr: 'Auto.' },
  { value: 'Manzana', label: 'Manzana', abbr: 'Mz.' },
];

export const propertyTypes = [
  { value: 'Casa', label: 'Casa' },
  { value: 'Apartamento', label: 'Apartamento' },
  { value: 'Oficina', label: 'Oficina' },
  { value: 'Local', label: 'Local' },
  { value: 'Bodega', label: 'Bodega' },
  { value: 'Conjunto', label: 'Conjunto Residencial' },
  { value: 'Edificio', label: 'Edificio' },
  { value: 'Otro', label: 'Otro' },
];

export const departments = [
  {
    id: 'bogota',
    name: 'Bogotá D.C.',
    cities: ['Bogotá']
  },
  {
    id: 'amazonas',
    name: 'Amazonas',
    cities: ['Leticia', 'Puerto Nariño', 'El Encanto', 'La Chorrera', 'La Pedrera', 'Mirití-Paraná', 'Puerto Alegría', 'Puerto Arica', 'Puerto Santander', 'Tarapacá']
  },
  {
    id: 'antioquia',
    name: 'Antioquia',
    cities: ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Apartadó', 'Turbo', 'Rionegro', 'Caucasia', 'Copacabana', 'La Estrella', 'Sabaneta', 'Caldas', 'Girardota', 'Barbosa', 'Chigorodó', 'Carepa', 'El Carmen de Viboral', 'Marinilla', 'La Ceja', 'Guarne', 'Yarumal', 'Santa Rosa de Osos', 'Puerto Berrío', 'Segovia', 'El Bagre', 'Zaragoza', 'Cáceres', 'Tarazá', 'Andes', 'Ciudad Bolívar', 'Jardín', 'Jericó', 'Santa Fe de Antioquia', 'Amalfi', 'Remedios', 'Yolombó', 'San Pedro de los Milagros', 'Entrerríos', 'Don Matías', 'Santa Bárbara', 'La Pintada', 'Sonsón', 'Abejorral', 'La Unión', 'Retiro', 'San Vicente Ferrer', 'Santuario', 'Granada', 'Cocorná', 'San Carlos', 'San Rafael', 'Guatapé', 'Peñol', 'Necoclí', 'San Juan de Urabá', 'Arboletes', 'San Pedro de Urabá', 'Mutatá', 'Dabeiba', 'Frontino', 'Urrao', 'Cañasgordas', 'Abriaquí', 'Giraldo', 'Buriticá', 'Peque', 'Sabanalarga', 'Liborina', 'Olaya', 'Sopetrán', 'San Jerónimo', 'Ebéjico', 'Heliconia', 'Armenia', 'Angelópolis', 'Amagá', 'Titiribí', 'Venecia', 'Fredonia', 'Támesis', 'Valparaíso', 'Caramanta', 'Montebello', 'Pueblorrico', 'Tarso', 'Betania', 'Hispania', 'Salgar', 'Concordia', 'Betulia', 'Anzá', 'Caicedo', 'Santa Rosa de Cabal']
  },
  {
    id: 'arauca',
    name: 'Arauca',
    cities: ['Arauca', 'Arauquita', 'Cravo Norte', 'Fortul', 'Puerto Rondón', 'Saravena', 'Tame']
  },
  {
    id: 'atlantico',
    name: 'Atlántico',
    cities: ['Barranquilla', 'Soledad', 'Malambo', 'Sabanalarga', 'Baranoa', 'Galapa', 'Puerto Colombia', 'Santo Tomás', 'Palmar de Varela', 'Sabanagrande', 'Polonuevo', 'Ponedera', 'Campo de la Cruz', 'Candelaria', 'Manatí', 'Repelón', 'Santa Lucía', 'Suan', 'Tubará', 'Usiacurí', 'Juan de Acosta', 'Piojó', 'Luruaco']
  },
  {
    id: 'bolivar',
    name: 'Bolívar',
    cities: ['Cartagena', 'Magangué', 'Turbaco', 'Arjona', 'Carmen de Bolívar', 'San Juan Nepomuceno', 'María la Baja', 'Mompós', 'Simití', 'San Pablo', 'Cantagallo', 'Santa Rosa del Sur', 'Morales', 'Achí', 'Altos del Rosario', 'Arenal', 'Barranco de Loba', 'Calamar', 'Cicuco', 'Clemencia', 'Córdoba', 'El Guamo', 'El Peñón', 'Hatillo de Loba', 'Mahates', 'Margarita', 'Montecristo', 'Norosí', 'Pinillos', 'Regidor', 'Río Viejo', 'San Cristóbal', 'San Estanislao', 'San Fernando', 'San Jacinto', 'San Jacinto del Cauca', 'San Martín de Loba', 'Santa Catalina', 'Soplaviento', 'Talaigua Nuevo', 'Tiquisio', 'Villanueva', 'Zambrano']
  },
  {
    id: 'boyaca',
    name: 'Boyacá',
    cities: ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá', 'Puerto Boyacá', 'Paipa', 'Villa de Leyva', 'Moniquirá', 'Garagoa', 'Guateque', 'Miraflores', 'Nobsa', 'Tibasosa', 'Firavitoba', 'Iza', 'Tota', 'Cuitiva', 'Aquitania', 'Toca', 'Pesca', 'Sotaquirá', 'Santa Rosa de Viterbo', 'Belén', 'Cerinza', 'Corrales', 'Floresta', 'Busbanzá', 'Betéitiva', 'Tutazá', 'Paz de Río', 'Socha', 'Socotá', 'Tasco', 'Jericó', 'Chita', 'El Cocuy', 'Güicán', 'El Espino', 'Panqueba', 'Guacamayas', 'San Mateo', 'La Uvita', 'Boavita', 'Covarachía', 'Tipacoque', 'Soatá', 'Susacón', 'Sativanorte', 'Sativasur', 'Onzaga', 'Mogotes', 'San Joaquín', 'Coromoro', 'Encino', 'Charalá', 'Ocamonte', 'Páramo', 'San Gil', 'Valle de San José', 'Pinchote', 'Cabrera', 'Barichara', 'Villanueva', 'Aratoca', 'Curití', 'Jordán', 'Cepitá', 'Los Santos', 'Zapatoca', 'Betulia', 'San Vicente de Chucurí', 'El Carmen de Chucurí', 'Santa Helena del Opón', 'Contratación', 'Galán', 'El Guacamayo', 'Hato', 'Palmas del Socorro', 'Simacota', 'Chima', 'Confines', 'Guapotá', 'Oiba', 'Palmar', 'Suaita', 'Guadalupe', 'Guavatá', 'Vélez', 'Barbosa', 'Puente Nacional', 'Jesús María', 'Sucre', 'La Paz', 'Albania', 'Florián', 'La Belleza', 'Landázuri', 'El Peñón', 'Bolívar', 'Cimitarra', 'Santa Sofía', 'Sutamarchán', 'Tinjacá', 'Ráquira', 'Sáchica', 'Samacá', 'Cucaita', 'Sora', 'Motavita', 'Cómbita', 'Oicatá', 'Chivatá', 'Siachoque', 'Viracachá', 'Ciénega', 'Ramiriquí', 'Jenesano', 'Tibaná', 'Nuevo Colón', 'Turmequé', 'Ventaquemada', 'Boyacá', 'Soracá']
  },
  {
    id: 'caldas',
    name: 'Caldas',
    cities: ['Manizales', 'La Dorada', 'Chinchiná', 'Villamaría', 'Riosucio', 'Anserma', 'Aguadas', 'Pácora', 'Salamina', 'Pensilvania', 'Manzanares', 'Marquetalia', 'Marulanda', 'Samaná', 'Victoria', 'Norcasia', 'Supía', 'Marmato', 'La Merced', 'Filadelfia', 'Aranzazu', 'Neira', 'Palestina', 'Belalcázar', 'Viterbo', 'San José', 'Risaralda']
  },
  {
    id: 'caqueta',
    name: 'Caquetá',
    cities: ['Florencia', 'San Vicente del Caguán', 'Puerto Rico', 'El Doncello', 'El Paujil', 'Cartagena del Chairá', 'Montañita', 'Milán', 'Morelia', 'Belén de los Andaquíes', 'Albania', 'Curillo', 'San José del Fragua', 'Valparaíso', 'Solita', 'Solano']
  },
  {
    id: 'casanare',
    name: 'Casanare',
    cities: ['Yopal', 'Aguazul', 'Villanueva', 'Tauramena', 'Paz de Ariporo', 'Monterrey', 'Maní', 'Trinidad', 'San Luis de Palenque', 'Orocué', 'Nunchía', 'Hato Corozal', 'Pore', 'Támara', 'Sácama', 'La Salina', 'Chámeza', 'Recetor', 'Sabanalarga']
  },
  {
    id: 'cauca',
    name: 'Cauca',
    cities: ['Popayán', 'Santander de Quilichao', 'Puerto Tejada', 'Patía', 'Miranda', 'Corinto', 'Caloto', 'Guapi', 'Piendamó', 'Silvia', 'Timbío', 'El Tambo', 'Bolívar', 'Mercaderes', 'Balboa', 'Argelia', 'La Sierra', 'La Vega', 'Almaguer', 'San Sebastián', 'Santa Rosa', 'Florencia', 'Sucre', 'Rosas', 'Sotará', 'Puracé', 'Totoró', 'Inzá', 'Páez', 'Caldono', 'Jambaló', 'Toribío', 'Buenos Aires', 'Suárez', 'Morales', 'Cajibío', 'Timbiquí', 'López de Micay', 'Villa Rica', 'Padilla']
  },
  {
    id: 'cesar',
    name: 'Cesar',
    cities: ['Valledupar', 'Aguachica', 'Agustín Codazzi', 'Bosconia', 'Curumaní', 'Chimichagua', 'El Copey', 'El Paso', 'Gamarra', 'González', 'La Gloria', 'La Jagua de Ibirico', 'La Paz', 'Manaure Balcón del Cesar', 'Pailitas', 'Pelaya', 'Pueblo Bello', 'Río de Oro', 'Robles', 'San Alberto', 'San Diego', 'San Martín', 'Tamalameque', 'Becerril', 'Astrea', 'Chiriguaná']
  },
  {
    id: 'choco',
    name: 'Chocó',
    cities: ['Quibdó', 'Istmina', 'Tadó', 'Condoto', 'Nóvita', 'Sipí', 'Medio San Juan', 'Certegui', 'Unión Panamericana', 'Atrato', 'Bagadó', 'Lloró', 'El Carmen de Atrato', 'Río Quito', 'Cantón de San Pablo', 'Cértegui', 'Alto Baudó', 'Medio Baudó', 'Bajo Baudó', 'Nuquí', 'Bahía Solano', 'Juradó', 'Riosucio', 'Carmen del Darién', 'Belén de Bajirá', 'Unguía', 'Acandí', 'San José del Palmar', 'El Litoral del San Juan', 'Bojayá']
  },
  {
    id: 'cordoba',
    name: 'Córdoba',
    cities: ['Montería', 'Cereté', 'Sahagún', 'Lorica', 'Montelíbano', 'Planeta Rica', 'Tierralta', 'Ciénaga de Oro', 'San Andrés de Sotavento', 'Chinú', 'San Pelayo', 'San Carlos', 'Purísima', 'Momil', 'Chimá', 'Cotorra', 'San Bernardo del Viento', 'Moñitos', 'Puerto Escondido', 'Los Córdobas', 'Canalete', 'Valencia', 'Pueblo Nuevo', 'Buenavista', 'La Apartada', 'Ayapel', 'San Antero', 'Tuchin', 'San José de Uré']
  },
  {
    id: 'cundinamarca',
    name: 'Cundinamarca',
    cities: ['Soacha', 'Facatativá', 'Zipaquirá', 'Chía', 'Fusagasugá', 'Girardot', 'Madrid', 'Mosquera', 'Funza', 'Cajicá', 'Sibaté', 'Tocancipá', 'La Calera', 'Sopó', 'Tabio', 'Tenjo', 'Cota', 'Gachancipá', 'Nemocón', 'Cogua', 'Ubaté', 'Pacho', 'La Mesa', 'Anapoima', 'Apulo', 'Viotá', 'Tocaima', 'Agua de Dios', 'Ricaurte', 'Nilo', 'Arbeláez', 'San Bernardo', 'Pandi', 'Venecia', 'Cabrera', 'Pasca', 'Silvania', 'Granada', 'Tibacuy', 'Fusagasugá', 'Chinauta', 'Melgar', 'Carmen de Apicalá', 'Suárez', 'Flandes', 'Espinal', 'Coello', 'Guamo', 'San Luis', 'Purificación', 'Saldaña', 'Coyaima', 'Natagaima', 'Ataco', 'Chaparral', 'Rioblanco', 'Planadas', 'Villarrica', 'Cunday', 'Icononzo', 'Alpujarra', 'Dolores', 'Prado', 'Colombia', 'Suárez', 'Villeta', 'Sasaima', 'Albán', 'La Vega', 'San Francisco', 'Supatá', 'Nocaima', 'Vergara', 'Nimaima', 'Quebradanegra', 'Útica', 'Caparrapí', 'Guaduas', 'Puerto Salgar', 'Yacopí', 'La Palma', 'Topaipí', 'El Peñón', 'Paime', 'San Cayetano', 'Villagómez', 'Carmen de Carupa', 'Cucunubá', 'Sutatausa', 'Tausa', 'Fúquene', 'Guachetá', 'Lenguazaque', 'Simijaca', 'Susa', 'Ubaté', 'Chiquinquirá', 'Ráquira', 'Saboyá', 'San Miguel de Sema', 'Caldas', 'Buenavista', 'Chocont', 'Machetá', 'Manta', 'Sesquilé', 'Suesca', 'Tibiritá', 'Villapinzón', 'Choachí', 'Fómeque', 'Ubaque', 'Chipaque', 'Une', 'Gutiérrez', 'Fosca', 'Quetame', 'Guayabetal', 'Cáqueza', 'Medina', 'Paratebueno', 'Guatavita', 'Junín', 'Gachalá', 'Ubalá', 'Gama', 'Gachetá']
  },
  {
    id: 'guainia',
    name: 'Guainía',
    cities: ['Inírida', 'Barranco Minas', 'Mapiripana', 'San Felipe', 'Puerto Colombia', 'La Guadalupe', 'Cacahual', 'Pana Pana', 'Morichal']
  },
  {
    id: 'guaviare',
    name: 'Guaviare',
    cities: ['San José del Guaviare', 'Calamar', 'El Retorno', 'Miraflores']
  },
  {
    id: 'huila',
    name: 'Huila',
    cities: ['Neiva', 'Pitalito', 'Garzón', 'La Plata', 'Campoalegre', 'Palermo', 'San Agustín', 'Isnos', 'Gigante', 'Algeciras', 'Rivera', 'Aipe', 'Yaguará', 'Tesalia', 'Paicol', 'Nátaga', 'Íquira', 'Teruel', 'Santa María', 'Tello', 'Baraya', 'Colombia', 'Villavieja', 'Hobo', 'Altamira', 'Guadalupe', 'Suaza', 'Acevedo', 'Timaná', 'Elías', 'Oporapa', 'Saladoblanco', 'Tarqui', 'Pital', 'Agrado', 'La Argentina', 'Palestina']
  },
  {
    id: 'la_guajira',
    name: 'La Guajira',
    cities: ['Riohacha', 'Maicao', 'Uribia', 'Manaure', 'San Juan del Cesar', 'Fonseca', 'Barrancas', 'Villanueva', 'El Molino', 'Urumita', 'La Jagua del Pilar', 'Hatonuevo', 'Albania', 'Distracción', 'Dibulla']
  },
  {
    id: 'magdalena',
    name: 'Magdalena',
    cities: ['Santa Marta', 'Ciénaga', 'Fundación', 'El Banco', 'Plato', 'Aracataca', 'Zona Bananera', 'Pivijay', 'Salamina', 'El Retén', 'Ariguaní', 'Chivolo', 'Nueva Granada', 'Sabanas de San Ángel', 'San Zenón', 'Santa Ana', 'San Sebastián de Buenavista', 'Guamal', 'Pijiño del Carmen', 'Tenerife', 'Cerro de San Antonio', 'Concordia', 'Pedraza', 'Zapayán', 'Remolino', 'Sitionuevo', 'Puebloviejo', 'El Piñón', 'Algarrobo', 'Santa Bárbara de Pinto']
  },
  {
    id: 'meta',
    name: 'Meta',
    cities: ['Villavicencio', 'Acacías', 'Granada', 'San Martín', 'Puerto López', 'Puerto Gaitán', 'Cumaral', 'Restrepo', 'Guamal', 'San Juan de Arama', 'Lejanías', 'El Castillo', 'El Dorado', 'Cubarral', 'Castilla la Nueva', 'San Carlos de Guaroa', 'Barranca de Upía', 'Cabuyaro', 'Puerto Lleras', 'Puerto Rico', 'Puerto Concordia', 'Mapiripán', 'La Macarena', 'Uribe', 'Mesetas', 'Vistahermosa', 'La Uribe', 'San Juanito', 'El Calvario', 'Fuente de Oro']
  },
  {
    id: 'narino',
    name: 'Nariño',
    cities: ['Pasto', 'Tumaco', 'Ipiales', 'Túquerres', 'La Unión', 'Samaniego', 'Sandoná', 'El Charco', 'Barbacoas', 'La Tola', 'Olaya Herrera', 'Santa Bárbara', 'Mosquera', 'Francisco Pizarro', 'Roberto Payán', 'Magüí', 'Cumbal', 'Guachucal', 'Aldana', 'Carlosama', 'Cuaspud', 'Pupiales', 'Córdoba', 'Potosí', 'Puerres', 'Funes', 'Iles', 'Contadero', 'Gualmatán', 'Tangua', 'Yacuanquer', 'Consacá', 'Ancuyá', 'Linares', 'La Florida', 'Nariño', 'Chachagüí', 'El Peñol', 'El Tambo', 'La Llanada', 'Los Andes', 'Cumbitara', 'Policarpa', 'El Rosario', 'Leiva', 'Taminango', 'San Lorenzo', 'Arboleda', 'San Bernardo', 'Albán', 'San Pedro de Cartago', 'Buesaco', 'El Tablón de Gómez', 'Colón', 'Belén', 'San Pablo', 'La Cruz', 'Mallama', 'Ricaurte', 'Providencia', 'Imués', 'Ospina', 'Sapuyes']
  },
  {
    id: 'norte_santander',
    name: 'Norte de Santander',
    cities: ['Cúcuta', 'Ocaña', 'Pamplona', 'Villa del Rosario', 'Los Patios', 'Tibú', 'El Zulia', 'Puerto Santander', 'San Cayetano', 'Chinácota', 'Ragonvalia', 'Herrán', 'Toledo', 'Labateca', 'Chitagá', 'Silos', 'Mutiscua', 'Cácota', 'Pamplonita', 'Bochalema', 'Durania', 'Santiago', 'Gramalote', 'Lourdes', 'Salazar', 'Arboledas', 'Cucutilla', 'San Calixto', 'La Playa', 'Ábrego', 'Cáchira', 'Hacarí', 'La Esperanza', 'Teorama', 'Convención', 'El Carmen', 'El Tarra', 'Sardinata', 'Bucarasica', 'Villacaro']
  },
  {
    id: 'putumayo',
    name: 'Putumayo',
    cities: ['Mocoa', 'Puerto Asís', 'Orito', 'Valle del Guamuez', 'San Miguel', 'Puerto Caicedo', 'Puerto Guzmán', 'Puerto Leguízamo', 'Villagarzón', 'Sibundoy', 'San Francisco', 'Santiago', 'Colón']
  },
  {
    id: 'quindio',
    name: 'Quindío',
    cities: ['Armenia', 'Calarcá', 'Montenegro', 'Quimbaya', 'La Tebaida', 'Circasia', 'Filandia', 'Salento', 'Buenavista', 'Córdoba', 'Génova', 'Pijao']
  },
  {
    id: 'risaralda',
    name: 'Risaralda',
    cities: ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Marsella', 'Santuario', 'Apía', 'Belén de Umbría', 'Quinchía', 'Guática', 'La Celia', 'Balboa', 'Mistrató', 'Pueblo Rico']
  },
  {
    id: 'san_andres',
    name: 'San Andrés y Providencia',
    cities: ['San Andrés', 'Providencia']
  },
  {
    id: 'santander',
    name: 'Santander',
    cities: ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja', 'San Gil', 'Socorro', 'Barbosa', 'Vélez', 'Málaga', 'Puerto Wilches', 'Cimitarra', 'Sabana de Torres', 'Rionegro', 'Lebrija', 'Los Santos', 'Zapatoca', 'Oiba', 'Charalá', 'Mogotes', 'San Vicente de Chucurí', 'El Carmen de Chucurí', 'Simacota', 'Contratación', 'Galán', 'El Guacamayo', 'Hato', 'Palmar', 'Guadalupe', 'Suaita', 'Guapotá', 'Confines', 'Chima', 'Páramo', 'San Joaquín', 'Onzaga', 'Coromoro', 'Encino', 'Curití', 'Jordán', 'Aratoca', 'Cepitá', 'Barichara', 'Villanueva', 'Pinchote', 'Cabrera', 'Valle de San José', 'Ocamonte', 'Palmas del Socorro', 'Santa Helena del Opón', 'Guavatá', 'Puente Nacional', 'Jesús María', 'Sucre', 'La Paz', 'Albania', 'Florián', 'La Belleza', 'Landázuri', 'El Peñón', 'Bolívar', 'San Benito', 'Güepsa', 'Chipatá', 'Aguada', 'La Paz', 'El Playón', 'San Andrés', 'California', 'Vetas', 'Suratá', 'Matanza', 'Charta', 'Tona', 'Carcasí', 'Concepción', 'Cerrito', 'Macaravita', 'San José de Miranda', 'Capitanejo', 'San Miguel', 'Enciso', 'Molagavita', 'Guaca', 'Santa Bárbara']
  },
  {
    id: 'sucre',
    name: 'Sucre',
    cities: ['Sincelejo', 'Corozal', 'San Marcos', 'Sampués', 'Tolú', 'San Onofre', 'Majagual', 'Sucre', 'San Benito Abad', 'Guaranda', 'Coveñas', 'Tolú Viejo', 'San Antonio de Palmito', 'Morroa', 'Los Palmitos', 'Galeras', 'El Roble', 'San Pedro', 'Sincé', 'Buenavista', 'San Juan de Betulia', 'Ovejas', 'Chalán', 'Coloso', 'La Unión', 'Caimito']
  },
  {
    id: 'tolima',
    name: 'Tolima',
    cities: ['Ibagué', 'Espinal', 'Melgar', 'Chaparral', 'Líbano', 'Honda', 'Mariquita', 'Lérida', 'Guamo', 'Purificación', 'Flandes', 'Saldaña', 'Coyaima', 'Natagaima', 'Ortega', 'San Luis', 'Valle de San Juan', 'Coello', 'Piedras', 'Alvarado', 'Venadillo', 'Ambalema', 'Armero', 'Falan', 'Palocabildo', 'Fresno', 'Herveo', 'Casabianca', 'Villahermosa', 'Murillo', 'Santa Isabel', 'Anzoátegui', 'Cajamarca', 'Rovira', 'Roncesvalles', 'San Antonio', 'Planadas', 'Rioblanco', 'Ataco', 'Alpujarra', 'Dolores', 'Villarrica', 'Cunday', 'Icononzo', 'Prado', 'Carmen de Apicalá', 'Suárez']
  },
  {
    id: 'valle',
    name: 'Valle del Cauca',
    cities: ['Cali', 'Buenaventura', 'Palmira', 'Tuluá', 'Buga', 'Cartago', 'Yumbo', 'Jamundí', 'Candelaria', 'Florida', 'Pradera', 'El Cerrito', 'Ginebra', 'Guacarí', 'San Pedro', 'Roldanillo', 'Zarzal', 'La Unión', 'Toro', 'Ansermanuevo', 'El Águila', 'El Cairo', 'Argelia', 'Versalles', 'La Victoria', 'Obando', 'Alcalá', 'Ulloa', 'Sevilla', 'Caicedonia', 'Bugalagrande', 'Andalucía', 'Trujillo', 'Riofrio', 'Bolívar', 'Restrepo', 'Darién', 'La Cumbre', 'Dagua', 'Vijes', 'Yotoco', 'Calima', 'El Dovio']
  },
  {
    id: 'vaupes',
    name: 'Vaupés',
    cities: ['Mitú', 'Carurú', 'Taraira', 'Papunaua', 'Yavaraté', 'Pacoa']
  },
  {
    id: 'vichada',
    name: 'Vichada',
    cities: ['Puerto Carreño', 'La Primavera', 'Santa Rosalía', 'Cumaribo']
  }
];

// Helper function to get cities by department
export const getCitiesByDepartment = (departmentId) => {
  const dept = departments.find(d => d.id === departmentId);
  return dept ? dept.cities.sort((a, b) => a.localeCompare(b)) : [];
};

// Get all departments sorted (Bogotá first, then alphabetically)
export const getSortedDepartments = () => {
  const bogota = departments.find(d => d.id === 'bogota');
  const others = departments.filter(d => d.id !== 'bogota').sort((a, b) => a.name.localeCompare(b.name));
  return [bogota, ...others];
};
