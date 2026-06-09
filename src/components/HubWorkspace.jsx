import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const ASSISTANTS = [
  {
    id: 'arturo',
    name: 'Arturo',
    role: 'Asesor Fiscal & SAT',
    category: 'Finanzas',
    price: 200,
    shortDesc: 'Calcula tus impuestos, optimiza tus deducciones y evita multas.',
    longDesc: 'Especialista en legislación fiscal mexicana. Automatiza el rastreo de tus facturas CFDI directas del SAT, gestiona tu declaración anual y te sugiere deducciones estratégicas personalizadas para optimizar tu carga tributaria.',
    avatarColor: 'from-blue-500 to-indigo-600',
    tags: ['sat', 'impuestos', 'deducciones', 'declaracion', 'fiscal', 'contador'],
    questions: [
      { id: 'regimen', label: '¿Cuál es tu régimen fiscal actual?', type: 'select', options: ['RESICO (Simplificado de Confianza)', 'Sueldos y Salarios', 'Actividad Empresarial', 'Plataformas Tecnológicas'] },
      { id: 'facturas', label: '¿Emitiste o recibiste facturas al público en general este mes?', type: 'select', options: ['Sí, emití facturas', 'Sólo recibí facturas', 'Ambas', 'Ninguna'] },
      { id: 'deducibles', label: '¿Cuáles son tus gastos deducibles más comunes?', type: 'select', options: ['Gastos médicos y escolares', 'Arrendamiento y equipo', 'Viáticos y transporte', 'Ninguno'] }
    ],
    defaultPrompts: ['¿Cómo optimizo mis deducciones este mes?', '¿Qué obligaciones tengo en mi régimen?', '¿Cómo presento mi declaración anual?']
  },
  {
    id: 'sofia',
    name: 'Sofía',
    role: 'Health & Fitness Coach',
    category: 'Bienestar',
    price: 200,
    shortDesc: 'Diseña tus rutinas, planes de nutrición y recuperación muscular.',
    longDesc: 'Certificada en nutrición deportiva y entrenamiento de alto rendimiento. Estructura planes semanales híbridos basados en tu tasa metabólica, composición física y disponibilidad de equipo, adaptando tu ingesta calórica a tu rendimiento.',
    avatarColor: 'from-emerald-500 to-teal-600',
    tags: ['ejercicio', 'nutricion', 'recuperacion', 'dieta', 'gimnasio', 'salud'],
    questions: [
      { id: 'meta', label: '¿Cuál es tu objetivo físico principal?', type: 'select', options: ['Pérdida de grasa corporal', 'Aumento de masa muscular', 'Resistencia y condición', 'Salud general'] },
      { id: 'frecuencia', label: '¿Cuántos días a la semana puedes entrenar?', type: 'select', options: ['1 a 2 días', '3 a 4 días', '5 o más días', 'Ninguno por ahora'] },
      { id: 'restriccion', label: '¿Tienes alguna intolerancia alimentaria o lesión?', type: 'select', options: ['Sin restricciones ni lesiones', 'Intolerancia (Lácteos/Gluten)', 'Lesión articular activa', 'Vegano / Vegetariano'] }
    ],
    defaultPrompts: ['Estructura mi rutina semanal', '¿Qué comida pre-entreno me sugieres?', 'Plan de recuperación muscular']
  },
  {
    id: 'hugo',
    name: 'Dr. Hugo',
    role: 'Médico Familiar Digital',
    category: 'Salud',
    price: 250,
    shortDesc: 'Atención médica preventiva e interpretación de estudios.',
    longDesc: 'Médico preventivo con enfoque en longevidad. Te asiste en la interpretación inmediata de análisis de laboratorio (sangre, perfil lipídico, tiroideo) y te ofrece recomendaciones no farmacéuticas para mejorar tus marcadores vitales.',
    avatarColor: 'from-rose-500 to-red-600',
    tags: ['medico', 'salud', 'analisis', 'preventivo', 'estudios', 'doctor'],
    questions: [
      { id: 'edad', label: '¿En qué rango de edad te encuentras?', type: 'select', options: ['18 a 30 años', '31 a 45 años', '46 a 60 años', 'Más de 60 años'] },
      { id: 'antecedentes', label: '¿Tienes antecedentes familiares de cuidado?', type: 'select', options: ['Diabetes o Hipertensión', 'Cardiopatías', 'Ambas', 'Ninguno / Desconozco'] },
      { id: 'ultimo_estudio', label: '¿Cuándo fue tu último análisis de sangre completo?', type: 'select', options: ['Hace menos de 6 meses', 'Hace 6 a 12 meses', 'Hace más de un año', 'Nunca me he hecho uno'] }
    ],
    defaultPrompts: ['¿Qué análisis generales debo hacerme?', 'Interpreta mis hábitos de salud', 'Consejos de longevidad cardiorrespiratoria']
  },
  {
    id: 'elena',
    name: 'Elena',
    role: 'Asesora de Inversiones',
    category: 'Finanzas',
    price: 200,
    shortDesc: 'Crea portafolios estables de inversión en Cetes y ETFs.',
    longDesc: 'Estratega de finanzas personales. Analiza tu perfil de aversión al riesgo y tu horizonte de inversión para estructurar un portafolio diversificado que proteja tu capital de la inflación a través de renta fija y fondos indexados globales.',
    avatarColor: 'from-amber-500 to-orange-600',
    tags: ['cetes', 'inversiones', 'etf', 'ahorro', 'portafolio', 'finanzas'],
    questions: [
      { id: 'riesgo', label: '¿Cómo reaccionarías si tu inversión baja un 5% temporalmente?', type: 'select', options: ['Me asusto y retiro todo (Conservador)', 'Espero con calma a que se recupere (Moderado)', 'Aprovecho para comprar más barato (Agresivo)'] },
      { id: 'plazo', label: '¿Cuál es el plazo estimado de tus metas?', type: 'select', options: ['Corto plazo (Menos de 1 año)', 'Mediano plazo (1 a 5 años)', 'Largo plazo / Retiro (Más de 5 años)'] },
      { id: 'capacidad', label: '¿Qué porcentaje de tus ingresos mensuales puedes ahorrar?', type: 'select', options: ['Menos del 10%', 'Entre 10% y 30%', 'Más del 30%', 'Actualmente no me es posible'] }
    ],
    defaultPrompts: ['¿Cómo empiezo en Cetes directo?', 'Portafolio sugerido para mis metas', '¿Qué es un fondo de emergencia?']
  },
  {
    id: 'mateo',
    name: 'Mateo',
    role: 'Gestor de Seguros & Pólizas',
    category: 'Legal',
    price: 180,
    shortDesc: 'Administra tus pólizas, coberturas y deducibles sin sorpresas.',
    longDesc: 'Auditor experto en contratos de seguros. Lee las letras chiquitas de tus pólizas de gastos médicos mayores, autos y vida para ayudarte a gestionar reclamos, entender tus deducibles y coaseguros, y asegurar el pago de indemnizaciones.',
    avatarColor: 'from-violet-500 to-purple-600',
    tags: ['seguros', 'poliza', 'deducible', 'coaseguro', 'legal', 'auto', 'vida'],
    questions: [
      { id: 'cobertura', label: '¿Qué tipo de seguro te interesa optimizar primero?', type: 'select', options: ['Gastos Médicos Mayores (GMM)', 'Seguro de Auto', 'Seguro de Vida / Retiro', 'Seguro de Casa'] },
      { id: 'siniestros', label: '¿Has tenido algún problema reciente al reclamar una póliza?', type: 'select', options: ['No, nunca he tenido problemas', 'Sí, me rechazaron un siniestro', 'Sí, el deducible fue muy alto', 'Nunca he contratado seguros'] },
      { id: 'conocimiento', label: '¿Conoces la diferencia exacta entre deducible y coaseguro?', type: 'select', options: ['Sí, lo tengo muy claro', 'Sólo de forma general', 'No, me confunde', 'No sé qué es ninguno'] }
    ],
    defaultPrompts: ['¿Qué es el deducible y coaseguro?', '¿Cómo reclamo un siniestro de auto?', 'Revisión de mi póliza de salud GMM']
  },
  {
    id: 'daniel',
    name: 'Daniel',
    role: 'Ingeniero de Procesos Industriales',
    category: 'Industrial',
    price: 250,
    shortDesc: 'Optimiza líneas de producción y flujos logísticos en tu planta.',
    longDesc: 'Ingeniero en manufactura esbelta (Lean Manufacturing). Ayuda a supervisores y dueños de talleres o plantas a identificar cuellos de botella, optimizar inventarios mediante metodologías Kanban y reducir desperdicios en líneas operativas.',
    avatarColor: 'from-cyan-500 to-blue-600',
    tags: ['procesos', 'planta', 'industrial', 'lean', 'kanban', 'produccion', 'eficiencia'],
    questions: [
      { id: 'giro', label: '¿Cuál es el giro operativo de tu negocio?', type: 'select', options: ['Manufactura / Ensamble', 'Logística y Distribución', 'Servicios / Taller', 'Alimentos y Bebidas'] },
      { id: 'cuello_botella', label: '¿Dónde identificas el mayor retraso actual?', type: 'select', options: ['Abastecimiento de materia prima', 'Tiempo de ciclo de producción', 'Control de calidad / Mermas', 'Embarque y entrega final'] },
      { id: 'metodologia', label: '¿Utilizan actualmente alguna metodología de mejora?', type: 'select', options: ['No, trabajamos de forma empírica', 'Sí, 5S o Kanban básico', 'Sí, Six Sigma / Lean avanzado', 'Desconozco qué metodologías existen'] }
    ],
    defaultPrompts: ['¿Cómo elimino cuellos de botella?', 'Pasos para implementar Kanban', 'Optimizar control de calidad de mermas']
  },

  // ── BIENESTAR ──────────────────────────────────────────────────────────────
  {
    id: 'gym_coach', name: 'Coach Alex', role: 'Entrenador Personal de Gym', category: 'Bienestar', price: 99,
    shortDesc: 'Rutinas personalizadas para gym, casa o parque, semana a semana.',
    longDesc: 'Diseña programas para bajar de peso, ganar músculo o mejorar resistencia. Ajusta semana a semana. Sustituto del entrenador personal que cuesta $800–$2,000/mes.',
    avatarColor: 'from-emerald-500 to-green-600',
    tags: ['gym', 'rutina', 'ejercicio', 'musculo', 'peso', 'entrenador', 'fitness'],
    questions: [
      { id: 'objetivo_gym', label: '¿Cuál es tu objetivo principal?', type: 'select', options: ['Bajar de peso', 'Ganar músculo', 'Mejorar resistencia', 'Mantenimiento'] },
      { id: 'equipo_gym', label: '¿Con qué equipo cuentas?', type: 'select', options: ['Gym completo', 'Casa con mancuernas', 'Solo peso corporal', 'Parque / exterior'] },
      { id: 'nivel_gym', label: '¿Cuál es tu nivel de experiencia?', type: 'select', options: ['Principiante (0-6 meses)', 'Intermedio (6m-2 años)', 'Avanzado (+2 años)', 'Tengo alguna lesión'] }
    ],
    defaultPrompts: ['Diseña mi rutina semanal', 'Plan para perder peso en casa', 'Ejercicios para ganar músculo sin gym']
  },
  {
    id: 'nutriologa', name: 'Nutrióloga Valeria', role: 'Nutrióloga Virtual', category: 'Bienestar', price: 99,
    shortDesc: 'Planes de alimentación con comida mexicana real y tu presupuesto.',
    longDesc: 'Genera planes semanales con recetas mexicanas reales, cálculo de macros y lista de compras. Versiones para diabéticos, embarazadas y niños.',
    avatarColor: 'from-lime-500 to-green-600',
    tags: ['nutricion', 'dieta', 'comida', 'alimentacion', 'calorias', 'recetas', 'macros'],
    questions: [
      { id: 'objetivo_nut', label: '¿Cuál es tu objetivo nutricional?', type: 'select', options: ['Bajar de peso', 'Ganar masa muscular', 'Control de diabetes', 'Salud general'] },
      { id: 'presupuesto_nut', label: '¿Cuál es tu presupuesto diario para alimentos?', type: 'select', options: ['Menos de $100/día (familia)', '$100–$200/día', '$200–$400/día', 'Sin restricción'] },
      { id: 'restriccion_nut', label: '¿Tienes alguna restricción alimentaria?', type: 'select', options: ['Ninguna', 'Diabetes o pre-diabetes', 'Embarazo o lactancia', 'Vegetariano/Vegano'] }
    ],
    defaultPrompts: ['Arma mi plan semanal mexicano', 'Lista de compras familiar $100/día', 'Tacos saludables para bajar de peso']
  },

  // ── SALUD ──────────────────────────────────────────────────────────────────
  {
    id: 'medico_triaje', name: 'Dr. Triaje', role: 'Asistente Médico Primera Consulta', category: 'Salud', price: 29,
    shortDesc: 'Evalúa síntomas y orienta si necesitas urgencias, farmacia o descanso.',
    longDesc: 'Filtra casos que no requieren consulta. Orienta sobre medicamentos de venta libre y prepara al paciente para la consulta médica. No reemplaza al médico.',
    avatarColor: 'from-red-400 to-rose-600',
    tags: ['sintomas', 'medico', 'urgencias', 'farmacia', 'triaje', 'salud', 'imss'],
    questions: [
      { id: 'sintoma_principal', label: '¿Cuál es tu síntoma principal hoy?', type: 'select', options: ['Dolor (cabeza, cuerpo, pecho)', 'Fiebre o malestar general', 'Problemas digestivos', 'Síntoma respiratorio'] },
      { id: 'duracion', label: '¿Cuánto tiempo llevas con el síntoma?', type: 'select', options: ['Menos de 24 horas', '1 a 3 días', '3 a 7 días', 'Más de una semana'] },
      { id: 'condicion_prev', label: '¿Tienes alguna condición médica preexistente?', type: 'select', options: ['Ninguna', 'Diabetes o hipertensión', 'Enfermedad cardiaca', 'Embarazo actual'] }
    ],
    defaultPrompts: ['Tengo fiebre y dolor de cabeza, ¿qué hago?', '¿Necesito urgencias o puedo esperar?', 'Qué decirle a mi médico del IMSS']
  },
  {
    id: 'cronicas', name: 'Monitor Crónico', role: 'Seguimiento Diabetes e Hipertensión', category: 'Salud', price: 79,
    shortDesc: 'Registro diario de glucosa, presión y medicamentos con alertas de rango.',
    longDesc: 'Ayuda a pacientes crónicos con registro de glucosa, presión y peso. Genera gráficas, recordatorios de medicamentos y alertas de hipoglucemia o presión alta.',
    avatarColor: 'from-red-600 to-rose-700',
    tags: ['diabetes', 'glucosa', 'presion', 'hipertension', 'cronica', 'medicamentos'],
    questions: [
      { id: 'condicion_cronica', label: '¿Cuál es tu condición crónica principal?', type: 'select', options: ['Diabetes tipo 2', 'Hipertensión arterial', 'Ambas', 'Prediabetes o riesgo'] },
      { id: 'tratamiento_cron', label: '¿Estás bajo tratamiento médico actualmente?', type: 'select', options: ['Sí, con medicamentos', 'Solo dieta y ejercicio', 'Recién diagnosticado', 'No, pero tengo síntomas'] },
      { id: 'control_cron', label: '¿Qué tan controlada tienes la condición?', type: 'select', options: ['Bien controlada', 'Con algunas oscilaciones', 'Mal controlada', 'No lo sé'] }
    ],
    defaultPrompts: ['¿Mi glucosa de 180 es de alarma?', 'Registrar mi presión de hoy', 'Plan de alimentación para diabético']
  },
  {
    id: 'embarazo', name: 'Mamá Informada', role: 'Asistente de Embarazo y Maternidad', category: 'Salud', price: 59,
    shortDesc: 'Acompañamiento semana a semana con nutrición y señales de alarma.',
    longDesc: 'Informa sobre desarrollo fetal, síntomas normales vs. alarmantes, estudios por trimestre y nutrición con comida mexicana. Incluye apoyo postparto.',
    avatarColor: 'from-pink-400 to-rose-500',
    tags: ['embarazo', 'bebe', 'maternidad', 'ginecologia', 'lactancia', 'parto'],
    questions: [
      { id: 'semana_gest', label: '¿En qué semana de gestación estás?', type: 'select', options: ['Semanas 1-12 (Primer trimestre)', 'Semanas 13-27 (Segundo trimestre)', 'Semanas 28+ (Tercer trimestre)', 'Postparto (primeros 3 meses)'] },
      { id: 'primer_emb', label: '¿Es tu primer embarazo?', type: 'select', options: ['Sí, es mi primero', 'No, tengo experiencia previa', 'Embarazo múltiple', 'Embarazo de riesgo identificado'] },
      { id: 'acceso_gin', label: '¿Tienes acceso regular a ginecólogo?', type: 'select', options: ['Sí, ginecóloga privada', 'Solo IMSS o ISSSTE', 'Muy limitado', 'Centro de salud público'] }
    ],
    defaultPrompts: ['¿Qué debe pasar en mi semana 20?', '¿Este síntoma es normal?', 'Nutrición en embarazo con presupuesto limitado']
  },

  // ── SALUD MENTAL ───────────────────────────────────────────────────────────
  {
    id: 'terapeuta', name: 'Mente Sana', role: 'Apoyo Emocional & Salud Mental', category: 'Salud Mental', price: 129,
    shortDesc: 'Apoyo emocional, técnicas de ansiedad y seguimiento del estado de ánimo.',
    longDesc: 'Técnicas de TCC, mindfulness y respiración. Detecta patrones de ansiedad, proporciona escucha activa y deriva a líneas de crisis (SAPTEL 55 5259-8121).',
    avatarColor: 'from-violet-400 to-purple-600',
    tags: ['ansiedad', 'estres', 'depresion', 'mindfulness', 'terapia', 'emocional', 'mental'],
    questions: [
      { id: 'motivo_mental', label: '¿Cuál es tu principal preocupación emocional?', type: 'select', options: ['Ansiedad o estrés laboral', 'Problemas de relaciones', 'Tristeza o bajo ánimo', 'Insomnio o pensamientos intrusivos'] },
      { id: 'frecuencia_mental', label: '¿Con qué frecuencia sientes esto?', type: 'select', options: ['Siempre, interfiere mi vida', 'Varios días a la semana', 'Ocasionalmente', 'Solo en momentos de crisis'] },
      { id: 'terapia_previa', label: '¿Has tenido terapia psicológica antes?', type: 'select', options: ['Sí, actualmente', 'Sí, pero la interrumpí', 'No, nunca', 'No puedo pagarlo'] }
    ],
    defaultPrompts: ['Ejercicio de respiración para ansiedad', 'Cómo manejar el estrés laboral', 'Técnica de mindfulness de 5 minutos']
  },

  // ── FINANZAS ───────────────────────────────────────────────────────────────
  {
    id: 'deudas', name: 'Libre de Deudas', role: 'Administrador de Deudas y Tarjetas', category: 'Finanzas', price: 79,
    shortDesc: 'Estrategia para liquidar deudas al menor costo y en el menor tiempo.',
    longDesc: 'Analiza tarjetas, créditos y préstamos. Aplica estrategia avalancha o bola de nieve, simula cuánto pagas de más con el mínimo y guía negociación con bancos.',
    avatarColor: 'from-orange-500 to-amber-600',
    tags: ['deudas', 'tarjeta', 'credito', 'prestamo', 'minimo', 'banco', 'intereses'],
    questions: [
      { id: 'num_deudas', label: '¿Cuántas deudas tienes actualmente?', type: 'select', options: ['1 sola deuda', '2 a 3 deudas', '4 o más deudas', 'No estoy seguro'] },
      { id: 'tipo_deuda', label: '¿Qué tipo de deuda te preocupa más?', type: 'select', options: ['Tarjeta de crédito bancaria', 'Préstamo de nómina', 'Crédito departamental', 'Varios tipos mezclados'] },
      { id: 'pago_minimo', label: '¿Solo pagas el mínimo en alguna deuda?', type: 'select', options: ['Sí, en varias', 'Sí, en alguna', 'No, pago más del mínimo', 'No tengo capacidad de pago'] }
    ],
    defaultPrompts: ['¿Cuánto pago de más con el mínimo?', 'Estrategia para liquidar mi tarjeta', 'Cómo negociar una quita con mi banco']
  },
  {
    id: 'hipoteca', name: 'Casa Propia', role: 'Asesor Hipotecario INFONAVIT', category: 'Finanzas', price: 99,
    shortDesc: 'Guía para obtener hipoteca: INFONAVIT, FOVISSSTE o banco.',
    longDesc: 'Consulta saldo INFONAVIT, compara opciones hipotecarias y simula mensualidades. Checklist de documentos, guía de trámites y alertas de fraudes inmobiliarios.',
    avatarColor: 'from-sky-500 to-blue-600',
    tags: ['infonavit', 'hipoteca', 'casa', 'credito', 'fovissste', 'banco', 'vivienda'],
    questions: [
      { id: 'tipo_empleo_hip', label: '¿Cuál es tu situación laboral?', type: 'select', options: ['Empleado formal con IMSS', 'Gobierno (ISSSTE/FOVISSSTE)', 'Independiente/Freelancer', 'Mixto o sin derechohabiencia'] },
      { id: 'precio_casa', label: '¿En qué rango de precio buscas tu casa?', type: 'select', options: ['Menos de $800K MXN', '$800K a $1.5M MXN', '$1.5M a $3M MXN', 'Más de $3M MXN'] },
      { id: 'infonavit_uso', label: '¿Ya consultaste tu saldo INFONAVIT?', type: 'select', options: ['Sí, ya sé cuánto tengo', 'No sé cómo hacerlo', 'Nunca he cotizado al IMSS', 'Tengo FOVISSSTE'] }
    ],
    defaultPrompts: ['¿Cuánto crédito INFONAVIT me corresponde?', 'INFONAVIT vs banco ¿cuál conviene?', 'Checklist para solicitar hipoteca']
  },
  {
    id: 'facturacion', name: 'SAT Fácil', role: 'Contador Personal & Facturación CFDI', category: 'Finanzas', price: 149,
    shortDesc: 'Declara al SAT, factura en CFDI 4.0 y paga solo lo justo.',
    longDesc: 'Para freelancers, RESICO y pequeños negocios. Calcula ISR e IVA, genera CFDIs, alerta de fechas límite y guía la declaración anual paso a paso.',
    avatarColor: 'from-indigo-500 to-blue-700',
    tags: ['sat', 'factura', 'cfdi', 'resico', 'freelancer', 'isr', 'iva', 'declaracion'],
    questions: [
      { id: 'regimen_sat', label: '¿En qué régimen fiscal estás?', type: 'select', options: ['RESICO (Simplificado de Confianza)', 'Actividad Empresarial (persona física)', 'Plataformas tecnológicas', 'Persona Moral / Empresa'] },
      { id: 'facturas_mes', label: '¿Cuántas facturas emites al mes?', type: 'select', options: ['0 a 5 facturas', '6 a 20 facturas', '21 a 50 facturas', 'Más de 50 facturas'] },
      { id: 'sat_corriente', label: '¿Qué tan al corriente estás con el SAT?', type: 'select', options: ['Al corriente, sin adeudos', 'Algunos meses sin declarar', 'Adeudo varios meses', 'Acabo de darme de alta'] }
    ],
    defaultPrompts: ['Cómo hago mi declaración RESICO', 'Generar factura CFDI 4.0 paso a paso', 'Cuánto tengo que pagar de IVA este mes']
  },
  {
    id: 'remesas', name: 'Remesas Smart', role: 'Asesor de Remesas y Tipo de Cambio', category: 'Finanzas', price: 49,
    shortDesc: 'Optimiza cómo recibes remesas y ahorra en comisiones innecesarias.',
    longDesc: 'Compara Western Union, Remitly, Wise y bancos. Alerta del mejor tipo de cambio, calcula cuánto llega neto y orienta sobre cómo invertir las remesas recibidas.',
    avatarColor: 'from-green-500 to-emerald-600',
    tags: ['remesas', 'dolar', 'tipo_cambio', 'wise', 'western_union', 'extranjero', 'envio'],
    questions: [
      { id: 'origen_rem', label: '¿De qué país recibes las remesas?', type: 'select', options: ['Estados Unidos', 'Canadá', 'Europa', 'Otro país'] },
      { id: 'monto_remesa', label: '¿Cuánto recibes aproximadamente por envío?', type: 'select', options: ['Menos de $200 USD', '$200 a $500 USD', '$500 a $1,500 USD', 'Más de $1,500 USD'] },
      { id: 'servicio_actual', label: '¿Qué servicio usas actualmente?', type: 'select', options: ['Western Union o MoneyGram', 'Transferencia bancaria', 'Wise, Remitly o similar', 'Efectivo / sin servicio'] }
    ],
    defaultPrompts: ['¿Qué servicio cobra menos comisión hoy?', '¿Cuánto llega neto si me mandan $500?', 'Mejor momento para cambiar dólares']
  },
  {
    id: 'ahorro', name: 'Meta Cumplida', role: 'Asistente de Ahorro por Metas', category: 'Finanzas', price: 49,
    shortDesc: 'Define metas de ahorro y calcula cuánto guardar cada quincena.',
    longDesc: 'Planea quince años, fondos de emergencia, viajes y navidad. Recomienda dónde guardar (CETES, tandas digitales) y alerta del riesgo de no llegar a la meta.',
    avatarColor: 'from-yellow-500 to-amber-600',
    tags: ['ahorro', 'metas', 'quincena', 'fondo', 'cetes', 'tanda', 'presupuesto'],
    questions: [
      { id: 'meta_ahor', label: '¿Cuál es tu meta de ahorro más urgente?', type: 'select', options: ['Fondo de emergencia', 'Vacaciones o viaje', 'Evento familiar (boda, XV)', 'Enganche de casa o auto'] },
      { id: 'plazo_ahor', label: '¿En cuánto tiempo quieres lograrlo?', type: 'select', options: ['Menos de 3 meses', '3 a 6 meses', '6 a 12 meses', 'Más de 1 año'] },
      { id: 'capacidad_ahor', label: '¿Cuánto puedes ahorrar por quincena?', type: 'select', options: ['Menos de $500', '$500 a $1,500', '$1,500 a $3,000', 'Más de $3,000'] }
    ],
    defaultPrompts: ['Cuánto debo ahorrar para mis XV', '¿Dónde guardo mi fondo de emergencia?', 'Crea mi plan de ahorro quincenal']
  },

  // ── ALIMENTACIÓN ───────────────────────────────────────────────────────────
  {
    id: 'super_tracker', name: 'Precio Justo', role: 'Tracker de Precios de Supermercado', category: 'Alimentación', price: 29,
    shortDesc: 'Compara precios entre Walmart, Chedraui, Soriana y más en tiempo real.',
    longDesc: 'Compara precios de tu lista entre supermercados mexicanos, alerta de ofertas y calcula el costo total de la despensa en cada tienda.',
    avatarColor: 'from-teal-500 to-emerald-600',
    tags: ['supermercado', 'precio', 'walmart', 'chedraui', 'despensa', 'oferta', 'comparar'],
    questions: [
      { id: 'super_fav', label: '¿En qué supermercados compras normalmente?', type: 'select', options: ['Walmart / Bodega Aurrerá', 'Chedraui / La Comer', 'Soriana / Costco', 'Varios según la oferta'] },
      { id: 'familia_size', label: '¿Para cuántas personas compras?', type: 'select', options: ['Solo yo', '2 a 3 personas', '4 a 5 personas', 'Más de 5 personas'] },
      { id: 'pres_despensa', label: '¿Cuánto gastas en despensa al mes?', type: 'select', options: ['Menos de $1,500', '$1,500 a $3,000', '$3,000 a $5,000', 'Más de $5,000'] }
    ],
    defaultPrompts: ['¿Dónde está más barato el aceite?', 'Lista de despensa semanal económica', 'Comparar precio de la leche hoy']
  },
  {
    id: 'chef', name: 'Chef en Casa', role: 'Planeador de Menú Semanal', category: 'Alimentación', price: 49,
    shortDesc: 'Menú semanal completo según tu presupuesto y lo que tienes en casa.',
    longDesc: 'Diseña desayunos, comidas y cenas con lo que tienes y lo que está barato. Lista de compras optimizada, recetas paso a paso y modo ¿qué cocino con lo que tengo?',
    avatarColor: 'from-orange-400 to-amber-500',
    tags: ['menu', 'cocina', 'recetas', 'presupuesto', 'comida', 'familia', 'desperdicio'],
    questions: [
      { id: 'personas_menu', label: '¿Para cuántas personas planeas los alimentos?', type: 'select', options: ['Solo yo', '2 personas', '3 a 5 personas', 'Familia de 6 o más'] },
      { id: 'restriccion_menu', label: '¿Hay restricciones alimentarias en tu familia?', type: 'select', options: ['Ninguna', 'Diabetes o hipertensión', 'Vegetarianismo', 'Niños pequeños o bebés'] },
      { id: 'nivel_cocina', label: '¿Qué tan seguido cocinas en casa?', type: 'select', options: ['Todos los días', '3 a 4 veces a la semana', 'Poco, prefiero comprar hecho', 'Quiero aprender a cocinar'] }
    ],
    defaultPrompts: ['¿Qué cocino con pollo, jitomate y chile?', 'Menú semanal familiar $150/día', 'Receta de enfrijoladas saludables']
  },
  {
    id: 'tianguis', name: 'Tianguero Pro', role: 'Asistente de Compras en Mercado', category: 'Alimentación', price: 29,
    shortDesc: 'Precios justos del tianguis, temporada y cómo negociar mejor.',
    longDesc: 'Precios de referencia por zona, qué frutas y verduras están en temporada, cómo elegirlas de calidad y frases para negociar precio en el mercado sobre ruedas.',
    avatarColor: 'from-green-400 to-teal-500',
    tags: ['tianguis', 'mercado', 'verdura', 'fruta', 'temporada', 'precio', 'negociar'],
    questions: [
      { id: 'ciudad_tian', label: '¿En qué ciudad o zona estás?', type: 'select', options: ['CDMX o área metropolitana', 'Guadalajara o Jalisco', 'Monterrey o Nuevo León', 'Otra ciudad del interior'] },
      { id: 'frec_mercado', label: '¿Con qué frecuencia vas al mercado?', type: 'select', options: ['Dos veces por semana', 'Una vez a la semana', 'Cada 2 semanas', 'Nunca he ido, quiero empezar'] },
      { id: 'producto_merc', label: '¿Qué compras más en el mercado?', type: 'select', options: ['Frutas y verduras', 'Carnes y pollos', 'Granos y abarrotes', 'Todo tipo de productos'] }
    ],
    defaultPrompts: ['¿Cuánto debería costar el kilo de tomate?', 'Qué fruta está en temporada esta semana', 'Frases para regatear en el mercado']
  },

  // ── HOGAR ──────────────────────────────────────────────────────────────────
  {
    id: 'gasolina', name: 'GasoFinder', role: 'Comparador de Precios de Gasolina', category: 'Hogar', price: 0,
    shortDesc: 'Estaciones más baratas en tu ruta y alertas de variaciones de precio.',
    longDesc: 'Precios de gasolina en estaciones cercanas, alerta de variaciones inusuales (cargadas cortas) y calculadora de gasto mensual en combustible.',
    avatarColor: 'from-slate-500 to-zinc-600',
    tags: ['gasolina', 'pemex', 'precio', 'combustible', 'estacion', 'ruta', 'ahorro'],
    questions: [
      { id: 'tipo_gas', label: '¿Qué tipo de combustible usa tu vehículo?', type: 'select', options: ['Magna (regular)', 'Premium', 'Diesel', 'Aún no tengo vehículo'] },
      { id: 'km_semana', label: '¿Cuántos km aproximados manejas a la semana?', type: 'select', options: ['Menos de 50 km', '50 a 150 km', '150 a 300 km', 'Más de 300 km'] },
      { id: 'zona_gas', label: '¿En qué zona buscas gasolineras?', type: 'select', options: ['CDMX / Área metropolitana', 'Guadalajara o GDL metro', 'Monterrey o MTY metro', 'Otra ciudad'] }
    ],
    defaultPrompts: ['Gasolineras baratas cerca de mí', '¿Cuánto gasto en gasolina al mes?', 'Alerta si sube el precio de la Magna']
  },
  {
    id: 'cfe', name: 'Recibo Claro', role: 'Asistente de Recibo CFE y Servicios', category: 'Hogar', price: 29,
    shortDesc: 'Entiende tu recibo de luz, detecta cobros raros y baja tu tarifa.',
    longDesc: 'Analiza el recibo de CFE, agua y predial. Detecta tarifa incorrecta (doméstica vs. DAC), compara consumo histórico y orienta sobre cómo impugnar o reducir el pago.',
    avatarColor: 'from-amber-400 to-yellow-500',
    tags: ['cfe', 'luz', 'electricidad', 'recibo', 'agua', 'predial', 'tarifa', 'dac'],
    questions: [
      { id: 'servicio_cfe', label: '¿Cuál servicio quieres analizar primero?', type: 'select', options: ['Recibo de luz (CFE)', 'Agua (SACMEX u otro)', 'Predial municipal', 'Gas natural'] },
      { id: 'problema_cfe', label: '¿Has tenido algún problema con tu recibo?', type: 'select', options: ['Sí, llegó mucho más alto', 'Sí, no entiendo los cobros', 'Quiero reducir mi consumo', 'Solo quiero entenderlo'] },
      { id: 'tarifa_cfe', label: '¿Sabes en qué tarifa CFE estás?', type: 'select', options: ['Sí, tarifa doméstica 1', 'Sí, tarifa DAC (alto consumo)', 'No sé qué tarifa tengo', 'Tengo paneles solares'] }
    ],
    defaultPrompts: ['¿Por qué llegó tan alto mi recibo?', '¿Estoy en tarifa DAC?', 'Cómo bajar el consumo eléctrico en casa']
  },
  {
    id: 'auto_semi', name: 'AutoVerifica', role: 'Asesor de Compra de Auto Seminuevo', category: 'Hogar', price: 49,
    shortDesc: 'Detecta fraudes, evalúa precio justo y negocia tu auto seminuevo.',
    longDesc: 'Verifica historial (robo, accidentes), valida precio según mercado y guía negociación. Alerta de autos inundados o con odómetro alterado.',
    avatarColor: 'from-zinc-500 to-slate-600',
    tags: ['auto', 'coche', 'seminuevo', 'fraude', 'precio', 'verificacion', 'olx'],
    questions: [
      { id: 'marca_auto', label: '¿Qué marca de auto buscas?', type: 'select', options: ['Nissan, Chevrolet o Ford', 'Toyota, Honda o Mazda', 'Volkswagen o Seat', 'Otro / Aún no decido'] },
      { id: 'pres_auto', label: '¿Cuál es tu presupuesto máximo?', type: 'select', options: ['Menos de $80,000 MXN', '$80K a $150K MXN', '$150K a $300K MXN', 'Más de $300K MXN'] },
      { id: 'uso_auto', label: '¿Para qué usarás el auto principalmente?', type: 'select', options: ['Trabajo diario en ciudad', 'Viajes de carretera', 'Uso familiar', 'Primer auto, uso básico'] }
    ],
    defaultPrompts: ['¿El precio de este Nissan March 2018 es justo?', 'Qué revisar antes de comprar un auto usado', 'Cómo detectar si el auto fue inundado']
  },
  {
    id: 'mecanico', name: 'Mecánico Virtual', role: 'Diagnóstico de Auto por Síntomas', category: 'Hogar', price: 0,
    shortDesc: 'Describe el ruido o problema de tu coche y recibe el diagnóstico.',
    longDesc: 'Diagnostica causas probables por síntomas o códigos OBD-II, estima precios de reparación en México y enseña qué preguntar al mecánico para no pagar de más.',
    avatarColor: 'from-slate-600 to-zinc-700',
    tags: ['mecanico', 'coche', 'ruido', 'averia', 'obd', 'taller', 'reparacion'],
    questions: [
      { id: 'marca_coche', label: '¿Qué marca y modelo es tu vehículo?', type: 'select', options: ['Nissan Tsuru / Versa / March', 'Chevrolet Aveo / Beat', 'Toyota / Honda', 'Otro modelo'] },
      { id: 'sintoma_auto', label: '¿Qué tipo de problema presenta?', type: 'select', options: ['Ruido o vibración anormal', 'Luz de advertencia encendida', 'Problemas para arrancar', 'Frenos, motor o transmisión'] },
      { id: 'km_auto', label: '¿Cuántos km tiene tu vehículo?', type: 'select', options: ['Menos de 50,000 km', '50,000 a 100,000 km', '100,000 a 150,000 km', 'Más de 150,000 km'] }
    ],
    defaultPrompts: ['Mi carro hace ruido al frenar', '¿Qué significa la luz del motor?', 'Mantenimiento para 80,000 km']
  },

  // ── VIAJES ─────────────────────────────────────────────────────────────────
  {
    id: 'viajes', name: 'Explorador MX', role: 'Planeador de Viajes Nacionales', category: 'Viajes', price: 79,
    shortDesc: 'Itinerarios por México adaptados a tu presupuesto y días disponibles.',
    longDesc: 'Diseña viajes día a día con costos, hospedaje, transporte óptimo y restaurantes locales. Incluye modo fin de semana espontáneo desde tu ciudad.',
    avatarColor: 'from-cyan-500 to-sky-600',
    tags: ['viaje', 'mexico', 'itinerario', 'turismo', 'playa', 'aventura', 'presupuesto'],
    questions: [
      { id: 'tipo_viajero', label: '¿Qué tipo de viajero eres?', type: 'select', options: ['Familia con niños', 'Pareja romántica', 'Amigos o grupo', 'Mochilero / Solo'] },
      { id: 'pres_viaje', label: '¿Cuál es tu presupuesto total para el viaje?', type: 'select', options: ['Menos de $2,000 por persona', '$2,000 a $5,000 por persona', '$5,000 a $10,000', 'Más de $10,000'] },
      { id: 'tipo_destino', label: '¿Qué tipo de destino prefieres?', type: 'select', options: ['Playa y descanso', 'Cultura e historia', 'Naturaleza y aventura', 'Pueblos mágicos y gastronomía'] }
    ],
    defaultPrompts: ['Plan de 4 días en Oaxaca con $3,000', 'Fin de semana espontáneo desde CDMX', 'Destinos poco conocidos de México']
  },
  {
    id: 'vuelos', name: 'VueloBeat', role: 'Cazador de Vuelos y Ofertas', category: 'Viajes', price: 0,
    shortDesc: 'Alertas de precio para tus rutas favoritas en Volaris, Viva y Aeroméxico.',
    longDesc: 'Monitorea precios, muestra el calendario de precios más baratos y calcula el costo real incluyendo equipaje y traslados al aeropuerto.',
    avatarColor: 'from-sky-400 to-blue-500',
    tags: ['vuelos', 'volaris', 'vivaaerobus', 'aeromexico', 'oferta', 'precio', 'aerolinea'],
    questions: [
      { id: 'ruta_vuelo', label: '¿Cuál es tu ruta de vuelo más frecuente?', type: 'select', options: ['CDMX ↔ Guadalajara / Monterrey', 'CDMX ↔ Cancún / Los Cabos', 'Interior del país (otras rutas)', 'Internacional (EUA o Centroamérica)'] },
      { id: 'aerolinea_pref', label: '¿Qué aerolínea prefieres normalmente?', type: 'select', options: ['Volaris (precio bajo)', 'Viva Aerobús (ultralow)', 'Aeroméxico (servicio)', 'Sin preferencia, lo más barato'] },
      { id: 'anticipacion_vuelo', label: '¿Con cuánta anticipación sueles comprar?', type: 'select', options: ['2 o más semanas antes', '1 semana antes', 'Menos de 72 horas', 'Depende de la oferta'] }
    ],
    defaultPrompts: ['¿Cuándo es más barato volar CDMX-Cancún?', 'Alerta de precio para vuelo a Monterrey', 'Costo real Volaris con maleta de 25kg']
  },
  {
    id: 'guia_turistico', name: 'LocalMX', role: 'Guía Turístico Local Inteligente', category: 'Viajes', price: 59,
    shortDesc: 'Como un amigo local: historia, precios justos y tips que no están en guías.',
    longDesc: 'Historia, restaurantes locales, horarios actualizados y precios justos para no pagar de más. Disponible 24/7 con modo audio mientras caminas.',
    avatarColor: 'from-teal-400 to-cyan-500',
    tags: ['guia', 'turismo', 'local', 'restaurante', 'historia', 'mapa', 'tips'],
    questions: [
      { id: 'destino_actual', label: '¿En qué destino o ciudad te encuentras?', type: 'select', options: ['CDMX / Ciudad de México', 'Cancún o Riviera Maya', 'Oaxaca / Puebla / Guanajuato', 'Otro destino mexicano'] },
      { id: 'interes_cultural', label: '¿Qué te interesa más del destino?', type: 'select', options: ['Historia y arquitectura', 'Gastronomía local', 'Naturaleza y actividades', 'Vida nocturna y entretenimiento'] },
      { id: 'pres_diario', label: '¿Cuál es tu presupuesto diario para actividades?', type: 'select', options: ['Menos de $300 MXN', '$300 a $700 MXN', '$700 a $1,500 MXN', 'Sin restricción'] }
    ],
    defaultPrompts: ['¿Dónde comen los locales en Oaxaca?', 'Historia del Zócalo de CDMX', '¿Cuánto cuesta la entrada a Chichén Itzá?']
  },
  {
    id: 'road_trip', name: 'CarreteroMX', role: 'Planeador de Road Trips', category: 'Viajes', price: 49,
    shortDesc: 'Rutas seguras, casetas, gasolineras y paradas recomendadas en México.',
    longDesc: 'Planea viajes en carretera considerando seguridad por región, costo de casetas, gasolineras y restaurantes en ruta. Alertas de clima y cierres viales.',
    avatarColor: 'from-amber-500 to-orange-500',
    tags: ['carretera', 'road_trip', 'caseta', 'ruta', 'seguridad', 'gasolina', 'descanso'],
    questions: [
      { id: 'ruta_carretera', label: '¿Cuál es tu ruta de carretera?', type: 'select', options: ['CDMX al Bajío (León, GTO)', 'CDMX al Golfo (Veracruz, Tampico)', 'Norte (Monterrey, Chihuahua)', 'Sur / Pacífico (Acapulco, Oaxaca)'] },
      { id: 'personas_road', label: '¿Cuántas personas viajan?', type: 'select', options: ['Solo/Sola', '2 personas', '3 a 5 personas', 'Familia grande o caravana'] },
      { id: 'prioridad_road', label: '¿Qué importa más en tu viaje?', type: 'select', options: ['Llegar rápido (autopista)', 'Gastar menos (libre o mixto)', 'Seguridad ante todo', 'Conocer en el camino'] }
    ],
    defaultPrompts: ['Ruta segura CDMX-Guadalajara por autopista', '¿Cuántas casetas hay de CDMX a Veracruz?', 'Mejores paradas para comer en carretera']
  },
  {
    id: 'rutas_tp', name: 'MetroGo', role: 'Optimizador de Transporte Público', category: 'Viajes', price: 0,
    shortDesc: 'Rutas óptimas en metro, metrobús y transporte público de CDMX y más.',
    longDesc: 'Calcula rutas puerta a puerta en transporte público, compara con Uber y alerta de cierres o paros de transporte en las principales ciudades mexicanas.',
    avatarColor: 'from-orange-400 to-red-500',
    tags: ['metro', 'metrobus', 'cdmx', 'transporte', 'ruta', 'movilidad', 'cablebus'],
    questions: [
      { id: 'ciudad_tp', label: '¿En qué ciudad usas transporte público?', type: 'select', options: ['Ciudad de México (CDMX)', 'Guadalajara (Tren Ligero)', 'Monterrey (Metro MTY)', 'Otra ciudad'] },
      { id: 'uso_tp', label: '¿Para qué usas más el transporte público?', type: 'select', options: ['Trabajo diario', 'Escuela', 'Trámites y compras', 'Ocasionalmente'] },
      { id: 'prioridad_tp', label: '¿Qué priorizas al elegir la ruta?', type: 'select', options: ['Más rápida', 'Más barata', 'Menos transbordos', 'Más segura (evitar ciertas zonas)'] }
    ],
    defaultPrompts: ['Cómo llego del Zócalo a Satélite en metro', 'Ruta de Tepito a Coyoacán más segura', 'Comparar metro vs. Uber en tiempo y costo']
  },

  // ── EDUCACIÓN ──────────────────────────────────────────────────────────────
  {
    id: 'tutor_sep', name: 'ProfeBot', role: 'Tutor Escolar SEP (Primaria y Secundaria)', category: 'Educación', price: 99,
    shortDesc: 'Tareas y dudas escolares adaptadas al plan de estudios SEP mexicano.',
    longDesc: 'Explica en lenguaje simple para cada grado, resuelve ejercicios paso a paso y adapta el contenido a los libros de texto gratuitos de la SEP.',
    avatarColor: 'from-yellow-500 to-amber-600',
    tags: ['tarea', 'sep', 'escuela', 'primaria', 'secundaria', 'matematicas', 'español'],
    questions: [
      { id: 'grado_sep', label: '¿En qué grado escolar está el estudiante?', type: 'select', options: ['Primaria baja (1°–3°)', 'Primaria alta (4°–6°)', 'Secundaria (1°–3°)', 'Preparatoria'] },
      { id: 'materia_dif', label: '¿En qué materia necesita más apoyo?', type: 'select', options: ['Matemáticas', 'Español y comprensión lectora', 'Ciencias Naturales o Historia', 'Varias materias'] },
      { id: 'ritmo_aprender', label: '¿Cómo aprende mejor el estudiante?', type: 'select', options: ['Con ejemplos visuales', 'Resolviendo ejercicios paso a paso', 'Escuchando explicaciones', 'Repasando y repitiendo'] }
    ],
    defaultPrompts: ['Explícame las fracciones para 4° grado', 'Ayúdame con los verbos en 5° primaria', 'Historia de México para secundaria']
  },
  {
    id: 'comipems', name: 'ProCOMIPEMS', role: 'Preparador para Examen COMIPEMS', category: 'Educación', price: 199,
    shortDesc: 'Simulacros, retroalimentación y plan de estudio personalizado para el bachillerato.',
    longDesc: 'Diagnóstico por materia, plan de 3–6 meses con simulacros tipo COMIPEMS y explicación de cada respuesta incorrecta. Modo intensivo para la última semana.',
    avatarColor: 'from-orange-500 to-red-500',
    tags: ['comipems', 'bachillerato', 'examen', 'simulacro', 'unam', 'ipt', 'prep'],
    questions: [
      { id: 'tiempo_comipems', label: '¿Cuánto tiempo tienes para prepararte?', type: 'select', options: ['Más de 4 meses', '2 a 4 meses', '1 mes o menos', 'El examen es en días'] },
      { id: 'materia_comipems', label: '¿En qué área necesitas más preparación?', type: 'select', options: ['Matemáticas y Física', 'Español y Comprensión Lectora', 'Historia y Civismo', 'Química y Biología'] },
      { id: 'opcion_bach', label: '¿Cuál es tu primera opción de bachillerato?', type: 'select', options: ['UNAM (Prepa, CCH)', 'IPN (CECYT)', 'Prepa SEP / UAM', 'CONALEP u otra opción'] }
    ],
    defaultPrompts: ['Simulacro de 10 preguntas de Matemáticas', 'Explícame este error en Comprensión Lectora', 'Plan de estudio de 3 meses para COMIPEMS']
  },
  {
    id: 'empleo', name: 'CarreraUP', role: 'Búsqueda de Empleo y Entrevistas', category: 'Educación', price: 149,
    shortDesc: 'CV efectivo, búsqueda de vacantes y práctica de entrevistas de trabajo.',
    longDesc: 'Genera CVs ATS-ready, optimiza LinkedIn, busca vacantes y simula entrevistas con retroalimentación. Incluye guía de negociación de salario.',
    avatarColor: 'from-indigo-400 to-blue-500',
    tags: ['empleo', 'trabajo', 'cv', 'entrevista', 'linkedin', 'vacante', 'salario'],
    questions: [
      { id: 'sector_empleo', label: '¿En qué sector o industria buscas empleo?', type: 'select', options: ['Manufactura o producción', 'Tecnología o sistemas', 'Ventas o comercial', 'Administración o contabilidad'] },
      { id: 'nivel_empleo', label: '¿Qué nivel de puesto buscas?', type: 'select', options: ['Primer empleo / Sin experiencia', 'Operativo con 1-3 años de exp.', 'Coordinador o supervisor', 'Gerencial o directivo'] },
      { id: 'urgencia_empleo', label: '¿Cuánto tiempo llevas buscando?', type: 'select', options: ['Apenas empiezo a buscar', '1 a 3 meses sin éxito', 'Más de 3 meses', 'Tengo empleo pero quiero cambiar'] }
    ],
    defaultPrompts: ['Revisa y mejora mi CV', 'Simula una entrevista para ventas', '¿Cuánto pedir de salario en manufactura?']
  },
  {
    id: 'ingles', name: 'EnglishWork', role: 'Tutor de Inglés para el Trabajo', category: 'Educación', price: 149,
    shortDesc: 'Inglés práctico por industria en sesiones de 10 minutos diarias.',
    longDesc: 'Diagnóstico de nivel, lecciones adaptadas al horario y vocabulario por industria. Práctica de conversación y preparación para entrevistas en inglés.',
    avatarColor: 'from-blue-500 to-indigo-500',
    tags: ['ingles', 'english', 'trabajo', 'idioma', 'pronunciacion', 'entrevista', 'vocabulario'],
    questions: [
      { id: 'nivel_ingles', label: '¿Cuál es tu nivel actual de inglés?', type: 'select', options: ['Principiante (casi nada)', 'Básico (saludos y frases simples)', 'Intermedio (me defiendo)', 'Avanzado (quiero perfeccionar)'] },
      { id: 'industria_ing', label: '¿Para qué industria quieres aprender inglés?', type: 'select', options: ['Manufactura o maquiladora', 'Turismo y hotelería', 'Tecnología y negocios', 'Call center o servicio al cliente'] },
      { id: 'tiempo_ingles', label: '¿Cuánto tiempo diario puedes dedicar?', type: 'select', options: ['5 a 10 minutos', '15 a 30 minutos', '30 a 60 minutos', 'Más de 1 hora'] }
    ],
    defaultPrompts: ['Vocabulario de manufactura en inglés', 'Practica conmigo una entrevista en inglés', 'Lección de 10 minutos para hoy']
  },
  {
    id: 'escolar_padres', name: 'Papás Informados', role: 'Asistente Escolar para Padres', category: 'Educación', price: 49,
    shortDesc: 'Becas disponibles, fechas escolares y comunicación con la escuela.',
    longDesc: 'Identifica becas SEP y Bienestar, gestiona comunicados escolares y genera cartas formales. Incluye calendario de inscripciones y fechas de renovación de beca.',
    avatarColor: 'from-pink-500 to-rose-600',
    tags: ['escuela', 'beca', 'sep', 'padres', 'inscripcion', 'comunicado', 'extracurricular'],
    questions: [
      { id: 'nivel_hijo', label: '¿En qué nivel escolar está tu hijo/a?', type: 'select', options: ['Preescolar', 'Primaria', 'Secundaria', 'Preparatoria o bachillerato'] },
      { id: 'tipo_escuela', label: '¿En qué tipo de escuela estudia?', type: 'select', options: ['Pública SEP', 'Indígena o CONAFE', 'Privada o particular', 'Tele-secundaria o multigrado'] },
      { id: 'nec_padre', label: '¿Qué información necesitas con más urgencia?', type: 'select', options: ['Becas disponibles para mi hijo', 'Fechas de inscripción', 'Comunicarme con el maestro', 'Actividades extracurriculares gratuitas'] }
    ],
    defaultPrompts: ['¿Mi hijo califica para la Beca Benito Juárez?', 'Escribe una carta para el director del colegio', 'Calendario SEP 2025-2026']
  },

  // ── LEGAL ──────────────────────────────────────────────────────────────────
  {
    id: 'tramites', name: 'TrámitesCiudadanos', role: 'Guía de Trámites de Gobierno', category: 'Legal', price: 29,
    shortDesc: 'Paso a paso para SAT, INE, IMSS, pasaporte y más de 50 trámites.',
    longDesc: 'Explica requisitos, documentos, costo y lugar de cada trámite. Diferencia en línea vs. presencial y alerta de citas disponibles en SAT, INE y SRE.',
    avatarColor: 'from-violet-500 to-indigo-600',
    tags: ['tramite', 'gobierno', 'sat', 'ine', 'imss', 'pasaporte', 'acta', 'curp'],
    questions: [
      { id: 'tramite_nec', label: '¿Qué trámite necesitas realizar?', type: 'select', options: ['Trámites SAT (RFC, facturación)', 'Documentos INE / CURP / Actas', 'IMSS / ISSSTE / Seguro Social', 'Pasaporte o trámites SRE'] },
      { id: 'urgencia_tram', label: '¿Con qué urgencia lo necesitas?', type: 'select', options: ['Urgente (esta semana)', 'Pronto (próximas 2-4 semanas)', 'Sin prisa, quiero informarme', 'Es para alguien más'] },
      { id: 'modalidad_tram', label: '¿Prefieres hacer el trámite?', type: 'select', options: ['En línea desde casa', 'Presencial en oficinas', 'Mixto (inicio en línea, concluyo presencial)', 'No sé, necesito orientación'] }
    ],
    defaultPrompts: ['Pasos para sacar el pasaporte mexicano', 'Cómo sacar la cita del SAT', 'Qué documentos necesito para el INE']
  },
  {
    id: 'legal_basico', name: 'Asesor Legal MX', role: 'Asesor Legal Básico y PROFECO', category: 'Legal', price: 99,
    shortDesc: 'Revisa contratos, calcula liquidaciones y presenta quejas ante PROFECO.',
    longDesc: 'Orienta en situaciones legales cotidianas sin necesidad de abogado: arrendamiento, liquidación laboral, quejas de consumidor y cartas de reclamación.',
    avatarColor: 'from-indigo-600 to-purple-700',
    tags: ['legal', 'contrato', 'arrendamiento', 'profeco', 'liquidacion', 'laboral', 'derechos'],
    questions: [
      { id: 'asunto_legal', label: '¿Cuál es tu asunto legal principal?', type: 'select', options: ['Contrato de renta o arrendamiento', 'Liquidación o despido laboral', 'Queja de consumidor (PROFECO)', 'Deuda o cobranza'] },
      { id: 'urgencia_legal', label: '¿Cuál es la urgencia de tu situación?', type: 'select', options: ['Urgente, hay fechas límite', 'Importante, quiero resolverlo pronto', 'Quiero entender mis derechos', 'Es preventivo'] },
      { id: 'abogado_prev', label: '¿Has consultado con un abogado?', type: 'select', options: ['Sí, ya lo consulté', 'No, es muy caro', 'No sé si lo necesito', 'Quiero hacerlo yo mismo'] }
    ],
    defaultPrompts: ['Revisa mi contrato de renta por cláusulas abusivas', 'Cuánto me deben de liquidación', 'Cómo poner queja en PROFECO']
  },
  {
    id: 'migratorio', name: 'MigraGuía', role: 'Asistente Migratorio y Visas', category: 'Legal', price: 149,
    shortDesc: 'Guía para visas, apostillas y trámites consulares sin pagar gestores.',
    longDesc: 'Checklist de documentos por tipo de visa, guía de apostilla, simulador de entrevista consular y pasos para regularización migratoria en México.',
    avatarColor: 'from-blue-600 to-violet-600',
    tags: ['visa', 'migratorio', 'apostilla', 'consulado', 'pasaporte', 'extranjero', 'migracion'],
    questions: [
      { id: 'tipo_tram_migr', label: '¿Qué tipo de trámite migratorio necesitas?', type: 'select', options: ['Visa de turista para EUA / Europa', 'Visa de trabajo o estudio', 'Apostilla de documentos mexicanos', 'Regularización migratoria en México'] },
      { id: 'destino_migr', label: '¿A qué país o embajada te diriges?', type: 'select', options: ['Estados Unidos (DSO)', 'Canadá o Europa (Schengen)', 'España específicamente', 'Otro país o embajada'] },
      { id: 'ant_visa', label: '¿Has tramitado visas antes?', type: 'select', options: ['Sí, ya tengo experiencia', 'Sí, pero me rechazaron', 'No, es mi primera vez', 'Tengo visa vencida'] }
    ],
    defaultPrompts: ['Checklist para visa de turista a EUA', 'Cómo apostillar mi acta de nacimiento', 'Qué decir en entrevista consular']
  },

  // ── FAMILIA ────────────────────────────────────────────────────────────────
  {
    id: 'crianza', name: 'Crianza Inteligente', role: 'Asistente de Crianza y Desarrollo Infantil', category: 'Familia', price: 79,
    shortDesc: 'Hitos de desarrollo, manejo de berrinches y nutrición infantil por edad.',
    longDesc: 'Acompaña a los padres desde recién nacidos hasta adolescentes. Explica hitos, manejo conductual sin gritos, nutrición por etapa y señales de alarma.',
    avatarColor: 'from-fuchsia-400 to-pink-500',
    tags: ['crianza', 'bebe', 'ninos', 'desarrollo', 'berrinche', 'pediatria', 'lactancia'],
    questions: [
      { id: 'edad_hijo', label: '¿Qué edad tiene tu hijo/a?', type: 'select', options: ['Recién nacido (0-3 meses)', 'Bebé (3-12 meses)', 'Infante (1-4 años)', 'Niño/adolescente (5+ años)'] },
      { id: 'preoc_crianza', label: '¿Cuál es tu mayor preocupación actual?', type: 'select', options: ['Desarrollo y hitos normales', 'Berrinches y conducta difícil', 'Alimentación y lactancia', 'Sueño y rutinas'] },
      { id: 'situacion_fam', label: '¿Cuál es tu situación familiar?', type: 'select', options: ['Primer hijo/a, todo es nuevo', 'Tengo más hijos, pero este es diferente', 'Cuidador/abuela en apoyo', 'Familia monoparental'] }
    ],
    defaultPrompts: ['¿A los cuántos meses debe caminar?', 'Cómo manejar el berrinche de mi hijo de 2 años', 'Primeras papillas para bebé de 6 meses']
  },
  {
    id: 'adultos_mayores', name: 'Cuidado Mayor', role: 'Asistente para Cuidado de Adultos Mayores', category: 'Familia', price: 99,
    shortDesc: 'Medicamentos, ejercicios y guía para cuidar a tus papás o abuelitos.',
    longDesc: 'Recordatorio de medicamentos, registro de síntomas, ejercicios de movilidad y memoria, guía de enfermedades como Alzheimer y recursos del INAPAM.',
    avatarColor: 'from-rose-400 to-pink-600',
    tags: ['adulto_mayor', 'abuelo', 'alzheimer', 'cuidador', 'medicamento', 'inapam', 'pension'],
    questions: [
      { id: 'edad_mayor', label: '¿Qué edad tiene el adulto mayor?', type: 'select', options: ['60 a 70 años', '70 a 80 años', '80 a 90 años', 'Más de 90 años'] },
      { id: 'condicion_mayor', label: '¿Qué condición de salud tiene actualmente?', type: 'select', options: ['Buena salud general', 'Diabetes o hipertensión', 'Alzheimer o Parkinson', 'Movilidad reducida'] },
      { id: 'cuidador_fam', label: '¿Quién cuida al adulto mayor?', type: 'select', options: ['Yo solo, en casa', 'Con apoyo de familia', 'Tiene enfermero/a contratado', 'Vive en casa de retiro'] }
    ],
    defaultPrompts: ['Recordatorio de medicamentos para mi abuelita', 'Ejercicios de memoria para Alzheimer leve', 'Cómo acceder a la Pensión Bienestar']
  },

  // ── NEGOCIOS ───────────────────────────────────────────────────────────────
  {
    id: 'emprendimiento', name: 'EmprenderMX', role: 'Asesor de Emprendimiento y Negocios', category: 'Negocios', price: 129,
    shortDesc: 'Guía para abrir tu negocio: SAT, estructura legal y estrategia inicial.',
    longDesc: 'Desde el registro ante el SAT hasta el plan de negocio básico. Calcula punto de equilibrio, estrategia de precios y primeros pasos en redes sociales.',
    avatarColor: 'from-amber-500 to-orange-600',
    tags: ['emprendimiento', 'negocio', 'startup', 'sat', 'plan', 'empresa', 'formalizacion'],
    questions: [
      { id: 'etapa_negocio', label: '¿En qué etapa está tu negocio?', type: 'select', options: ['Apenas tengo la idea', 'Ya vendo pero de forma informal', 'Quiero formalizarme ante el SAT', 'Ya tengo empresa, quiero crecer'] },
      { id: 'giro_negocio', label: '¿Cuál es el giro de tu negocio?', type: 'select', options: ['Venta de productos físicos', 'Servicios profesionales', 'Comida y bebidas', 'E-commerce o digital'] },
      { id: 'capital_ini', label: '¿Con cuánto capital cuentas para iniciar?', type: 'select', options: ['Sin capital (bootstrapping)', 'Menos de $20,000 MXN', '$20,000 a $100,000 MXN', 'Más de $100,000 MXN'] }
    ],
    defaultPrompts: ['¿Qué régimen del SAT me conviene?', 'Plan de negocio para mi taquería', 'Cómo calcular el precio de mi servicio']
  }
]

const CATEGORIES = [
  'Todos', 'Finanzas', 'Bienestar', 'Salud', 'Salud Mental',
  'Alimentación', 'Hogar', 'Viajes', 'Educación', 'Legal', 'Familia', 'Negocios', 'Industrial'
]

const CHIPS = ['Diabetes', 'Gym', 'CFDI SAT', 'Vuelos baratos', 'COMIPEMS', 'Deudas tarjeta', 'Recibo CFE', 'INFONAVIT', 'Tianguis', 'Menú semanal']

export default function HubWorkspace({ user }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [activeIds, setActiveIds] = useState(['arturo', 'sofia']) // Default pre-activated assistants
  const [selectedAsst, setSelectedAsst] = useState(null)
  const [wizardStep, setWizardStep] = useState(0)
  const [wizardAnswers, setWizardAnswers] = useState({})
  const [wizardSuccess, setWizardSuccess] = useState(false)
  const [activeProfiles, setActiveProfiles] = useState({
    arturo: { regimen: 'Sueldos y Salarios', facturas: 'Ninguna', deducibles: 'Gastos médicos y escolares' },
    sofia: { meta: 'Salud general', frecuencia: '3 a 4 días', restriccion: 'Sin restricciones ni lesiones' }
  })

  // Chat integration states
  const [activeChatAsstId, setActiveChatAsstId] = useState(null)
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState({
    arturo: [{ sender: 'assistant', text: 'Hola, Sergio. He analizado tu régimen de Sueldos y Salarios. ¿Deseas saber cómo optimizar tus deducciones personales ante el SAT o revisar tus facturas emitidas?' }],
    sofia: [{ sender: 'assistant', text: 'Hola, Sergio. Veo que tu meta es Salud general y entrenas de 3 a 4 días a la semana. ¿Te gustaría diseñar tu rutina de fuerza o revisar tu plan de alimentación?' }]
  })
  const [chatLoading, setChatLoading] = useState(false)

  const totalCostRef = useRef(null)
  const catalogRef = useRef(null)
  const messagesEndRef = useRef(null)

  // Calculate total price based on active assistants
  const activeAssistants = ASSISTANTS.filter(a => activeIds.includes(a.id))
  const totalPrice = activeAssistants.reduce((acc, curr) => acc + curr.price, 0)

  // Scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatHistory, activeChatAsstId])

  // GSAP animation for cost counter
  useEffect(() => {
    if (!totalCostRef.current) return
    const obj = { val: parseFloat(totalCostRef.current.innerText) || 0 }
    gsap.to(obj, {
      val: totalPrice,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (totalCostRef.current) {
          totalCostRef.current.innerText = Math.round(obj.val)
        }
      }
    })
  }, [totalPrice])

  // Filter assistants based on search + category
  const filteredAssistants = ASSISTANTS.filter(asst => {
    const matchCat = activeCategory === 'Todos' || asst.category === activeCategory
    if (!search.trim()) return matchCat
    const query = search.toLowerCase()
    const matchSearch = (
      asst.name.toLowerCase().includes(query) ||
      asst.role.toLowerCase().includes(query) ||
      asst.category.toLowerCase().includes(query) ||
      asst.shortDesc.toLowerCase().includes(query) ||
      asst.longDesc.toLowerCase().includes(query) ||
      asst.tags.some(t => t.includes(query))
    )
    return matchCat && matchSearch
  })

  // Toggle Assistant Activation
  const toggleActivation = (id) => {
    if (activeIds.includes(id)) {
      setActiveIds(activeIds.filter(x => x !== id))
      // Remove profile & chat history if deactivated
      const newProfiles = { ...activeProfiles }
      delete newProfiles[id]
      setActiveProfiles(newProfiles)
      if (activeChatAsstId === id) setActiveChatAsstId(null)
    } else {
      setActiveIds([...activeIds, id])
      // Pre-fill chat history
      const asst = ASSISTANTS.find(a => a.id === id)
      setChatHistory(prev => ({
        ...prev,
        [id]: [{ sender: 'assistant', text: `Hola${user ? `, ${user.name.split(' ')[0]}` : ''}. Soy ${asst.name}, tu asistente de ${asst.category}. Activa tu Perfilador de datos para contextualizar mi inteligencia familiar, o escribe tu pregunta de inmediato.` }]
      }))
    }
  }

  // Open Onboarding Wizard
  const openWizard = (asst) => {
    setSelectedAsst(asst)
    setWizardStep(0)
    setWizardAnswers(activeProfiles[asst.id] || {})
    setWizardSuccess(false)
  }

  // Handle Wizard Option Selection
  const handleWizardSelect = (questionId, optionValue) => {
    setWizardAnswers(prev => ({
      ...prev,
      [questionId]: optionValue
    }))
  }

  // Advance Wizard & update Chat Welcome message
  const nextWizardStep = () => {
    if (wizardStep < selectedAsst.questions.length - 1) {
      setWizardStep(wizardStep + 1)
    } else {
      // Save Answers
      const newProfiles = {
        ...activeProfiles,
        [selectedAsst.id]: wizardAnswers
      }
      setActiveProfiles(newProfiles)
      
      // Update first chat message with new context
      let contextMsg = ''
      if (selectedAsst.id === 'arturo') {
        contextMsg = `¡Hola de nuevo! He actualizado mi modelo fiscal. Veo que tu régimen es "${wizardAnswers.regimen}" y tus gastos deducibles más comunes son "${wizardAnswers.deducibles}". ¿Estructuramos tu estrategia de deducciones anuales?`
      } else if (selectedAsst.id === 'sofia') {
        contextMsg = `¡Perfil recibido! Entrenada para tu meta de "${wizardAnswers.meta}" con entrenamientos de "${wizardAnswers.frecuencia}". ¿Diseñamos la rutina para comenzar?`
      } else if (selectedAsst.id === 'hugo') {
        contextMsg = `Datos de salud integrados en mi expediente preventivo. Veo que tienes "${wizardAnswers.antecedentes}" como antecedentes y tu último estudio fue "${wizardAnswers.ultimo_estudio}". ¿En qué duda médica te apoyo hoy?`
      } else {
        contextMsg = `¡Datos recibidos y cargados en mi contexto! He alineado mi modelo a tu perfil. Escríbeme cualquier consulta para comenzar.`
      }

      setChatHistory(prev => ({
        ...prev,
        [selectedAsst.id]: [{ sender: 'assistant', text: contextMsg }]
      }))

      setWizardSuccess(true)
      setTimeout(() => {
        closeWizard()
      }, 2000)
    }
  }

  const prevWizardStep = () => {
    if (wizardStep > 0) {
      setWizardStep(wizardStep - 1)
    }
  }

  const closeWizard = () => {
    setSelectedAsst(null)
    setWizardStep(0)
    setWizardAnswers({})
    setWizardSuccess(false)
  }

  // Chat send message simulation
  const handleSendMessage = (textToSend) => {
    const text = textToSend || chatInput
    if (!text.trim() || chatLoading) return

    const asstId = activeChatAsstId
    const asstProfile = activeProfiles[asstId] || {}

    // Add user message
    const updatedMessages = [
      ...(chatHistory[asstId] || []),
      { sender: 'user', text: text }
    ]

    setChatHistory(prev => ({
      ...prev,
      [asstId]: updatedMessages
    }))
    setChatInput('')
    setChatLoading(true)

    // Simulate agent response based on profile variables
    setTimeout(() => {
      let reply = ''
      const query = text.toLowerCase()

      if (asstId === 'arturo') {
        const regimen = asstProfile.regimen || 'no configurado'
        const deducibles = asstProfile.deducibles || 'no especificados'
        if (query.includes('impuestos') || query.includes('deduc') || query.includes('sat')) {
          reply = `Tomando en cuenta tu régimen de "${regimen}", te sugiero facturar bajo el CFDI de gastos médicos o educativos para tu caso. Con deducciones tipo "${deducibles}" puedes deducir hasta un 15% de tus ingresos anuales en tu declaración. ¿Te ayudo a listar los requisitos del SAT?`
        } else {
          reply = `Entendido, Sergio. Como tu asesor fiscal bajo "${regimen}", te sugiero automatizar el rastreo de CFDIs. Puedes solicitar facturas por cada gasto de "${deducibles}" para maximizar saldo a favor ante el SAT. ¿Te detallo cómo registrar tu firma electrónica?`
        }
      } else if (asstId === 'sofia') {
        const meta = asstProfile.meta || 'no configurado'
        const frecuencia = asstProfile.frecuencia || 'no especificada'
        if (query.includes('rutina') || query.includes('ejercicio') || query.includes('entren')) {
          reply = `Diseñando plan para tu objetivo de "${meta}" entrenando "${frecuencia}" por semana. Te sugiero un esquema de fuerza multiarticular priorizando Sentadillas, Press de Banca y Peso Muerto con 3 series de 8-12 repeticiones. ¿Quieres la división de días lunes-miércoles-viernes?`
        } else {
          reply = `Perfecto. Para la meta de "${meta}", la nutrición es el 80%. Debemos ajustar tus macronutrientes. Si entrenas "${frecuencia}", calcula 2.0g de proteína por kg y carbohidratos complejos antes de tu sesión. ¿Te armo un menú muestra para mañana?`
        }
      } else if (asstId === 'hugo') {
        const edad = asstProfile.edad || 'no configurado'
        const antecedentes = asstProfile.antecedentes || 'no configurado'
        if (query.includes('analisis') || query.includes('estudio') || query.includes('medico')) {
          reply = `Revisando tu perfil. En el rango de "${edad}" y con antecedentes familiares de "${antecedentes}", lo más recomendable es solicitar un checkup metabólico completo anual que incluya glucosa en ayunas, hemoglobina glucosilada y perfil de lípidos. ¿Quieres saber cómo prepararte para la toma de muestras?`
        } else {
          reply = `Como tu médico familiar preventivo, te recuerdo que tu historial de "${antecedentes}" requiere monitoreo de presión arterial mensual. Mantén una dieta baja en sodio y realiza ejercicio cardiovascular. ¿Tienes algún síntoma o estudio que desees interpretar?`
        }
      } else if (asstId === 'elena') {
        const riesgo = asstProfile.riesgo || 'no configurado'
        const plazo = asstProfile.plazo || 'no configurado'
        reply = `Analizando tu portafolio ideal. Dado tu perfil de riesgo "${riesgo}" y meta a "${plazo}", te sugiero distribuir el capital en un 70% en Renta Fija mexicana (Cetes, Udibonos) y 30% en renta variable global indexada (ETF S&P 500). Esto protege tu dinero contra inflación. ¿Te explico cómo crear tu cuenta?`
      } else if (asstId === 'mateo') {
        const cobertura = asstProfile.cobertura || 'no configurada'
        reply = `Revisando tu cobertura de "${cobertura}". Recuerda que al reclamar un siniestro, el coaseguro se aplica después de restar el deducible. Mantén siempre un fondo de emergencia equivalente a tu deducible contratado para evitar sorpresas financieras. ¿Revisamos las exclusiones de tu contrato?`
      } else if (asstId === 'daniel') {
        const giro = asstProfile.giro || 'no configurado'
        const cuello = asstProfile.cuello_botella || 'no configurado'
        reply = `En tu negocio de giro "${giro}", identificamos el retraso principal en "${cuello}". Te sugiero implementar un tablero Kanban visual de 3 columnas (Por hacer, En proceso, Hecho) para limitar el Trabajo en Progreso (WIP) y medir el tiempo de ciclo por orden. ¿Estructuramos las tarjetas del tablero?`
      } else {
        reply = `He recibido tu consulta. Utilizando el perfil de datos que configuraste, me encuentro procesando las soluciones correspondientes. ¿Tienes algún detalle específico adicional que deba considerar?`
      }

      setChatHistory(prev => ({
        ...prev,
        [asstId]: [...(prev[asstId] || []), { sender: 'assistant', text: reply }]
      }))
      setChatLoading(false)
    }, 1200)
  }

  const clearSearch = () => {
    setSearch('')
  }

  const currentChatAsst = ASSISTANTS.find(a => a.id === activeChatAsstId)

  return (
    <section id="catalogo" ref={catalogRef} className="relative z-10 px-6 py-24 md:py-32 bg-slate-950 text-white border-t border-slate-900">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] bg-indigo-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-purple-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="tag mb-4">Ecosistema Modular</span>
          <h2 className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-black leading-tight tracking-tighter mb-6 text-white" style={{ textShadow: '0 0 40px rgba(139,92,246,0.3)' }}>
            Construye tu propio <span className="text-gradient">comité de expertos</span>
          </h2>
          <p className="text-lg text-slate-300 font-medium">
            Selecciona solo los asistentes que tu vida cotidiana o negocio requieran. Activa y desactiva con un clic. Sin rentas fijas, paga únicamente por lo que usas.
          </p>
        </div>

        {/* Category Filter Chips */}
        {!activeChatAsstId && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/30'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Buscador Central */}
        {!activeChatAsstId && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center bg-slate-900/60 border border-slate-800 focus-within:border-indigo-500/50 rounded-2xl p-1.5 transition-all duration-300 shadow-xl backdrop-blur-md">
              <div className="pl-4 text-slate-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Busca por necesidad (ej: SAT, entrenar, seguros...)"
                className="w-full bg-transparent border-0 outline-none text-white text-base py-3 px-3 font-semibold placeholder-slate-500"
              />
              {search && (
                <button onClick={clearSearch} className="p-2 text-slate-400 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>

            {/* Quick search chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-xs font-mono font-bold text-slate-500 self-center mr-1">Sugerencias:</span>
              {CHIPS.map(chip => (
                <button
                  key={chip}
                  onClick={() => setSearch(chip)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900 hover:bg-indigo-950 border border-slate-800 hover:border-indigo-800/60 text-slate-300 hover:text-indigo-200 transition-all duration-350"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid: Left Catalog/Chat, Right Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Catalog OR Active Chat */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {activeChatAsstId ? (
              // ACTIVE CHAT VIEW
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col h-[580px] backdrop-blur-xl relative overflow-hidden">
                {/* Chat Header */}
                <div className="pb-4 border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentChatAsst.avatarColor} flex items-center justify-center font-bold text-sm text-white`}>
                      {currentChatAsst.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-base">{currentChatAsst.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 font-bold block">{currentChatAsst.role}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveChatAsstId(null)}
                    className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    ← Catálogo
                  </button>
                </div>

                {/* Message list */}
                <div className="flex-1 overflow-y-auto py-6 space-y-4 px-2 custom-scrollbar">
                  {(chatHistory[activeChatAsstId] || []).map((msg, idx) => {
                    const isAsst = msg.sender === 'assistant'
                    return (
                      <div key={idx} className={`flex ${isAsst ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                          isAsst
                            ? 'bg-slate-950/60 border border-slate-800 text-slate-200 rounded-tl-none'
                            : 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-950/20'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    )
                  })}

                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-950/60 border border-slate-800 text-slate-400 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested prompts */}
                <div className="pt-2 pb-4 flex flex-wrap gap-2 px-2 border-t border-slate-800/40">
                  {currentChatAsst.defaultPrompts.map(prompt => (
                    <button
                      key={prompt}
                      onClick={() => handleSendMessage(prompt)}
                      disabled={chatLoading}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800/60 text-[10px] font-bold text-slate-400 hover:text-white transition-colors disabled:opacity-40"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input form */}
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage() }}
                  className="flex gap-2 p-2 bg-slate-950/50 border border-slate-800/80 rounded-2xl"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Escribe una pregunta al asistente..."
                    disabled={chatLoading}
                    className="flex-1 bg-transparent border-0 outline-none text-xs text-white placeholder-slate-500 font-semibold px-3 disabled:opacity-40"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading || !chatInput.trim()}
                    className="btn-primary py-2 px-4 text-xs disabled:opacity-40 shrink-0"
                  >
                    Enviar
                  </button>
                </form>

              </div>
            ) : (
              // CATALOG VIEW
              <>
                <div className="flex justify-between items-center pb-4 border-b border-slate-900">
                  <h3 className="text-xl font-bold tracking-tight text-slate-200">
                    {search
                      ? `Resultados para "${search}" (${filteredAssistants.length})`
                      : activeCategory !== 'Todos'
                        ? `${activeCategory} — ${filteredAssistants.length} asistentes`
                        : `Todos los asistentes (${filteredAssistants.length})`
                    }
                  </h3>
                  {(search || activeCategory !== 'Todos') && (
                    <button onClick={() => { clearSearch(); setActiveCategory('Todos') }} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                      Ver todo
                    </button>
                  )}
                </div>

                {filteredAssistants.length === 0 ? (
                  <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl p-10">
                    <p className="text-slate-400 text-lg font-medium mb-4">No encontramos un asistente exacto para tu búsqueda.</p>
                    <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                      ¿Tienes una necesidad específica? Puedes proponer un asistente o subir las bases para el tuyo a través de nuestro protocolo de comunidad.
                    </p>
                    <a href="#comunidad" className="btn-ghost text-xs">Saber más sobre el Portal de Creadores</a>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredAssistants.map((asst) => {
                      const isActive = activeIds.includes(asst.id)
                      const hasProfile = activeProfiles[asst.id] !== undefined

                      return (
                        <div
                          key={asst.id}
                          className={`group relative rounded-2xl p-5 border transition-all duration-500 flex flex-col justify-between min-h-[240px] overflow-hidden ${
                            isActive
                              ? 'bg-slate-900/90 border-indigo-500/35 shadow-lg shadow-indigo-950/20'
                              : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700/60 hover:bg-slate-900/50'
                          }`}
                        >
                          {/* Avatar & Category Badge */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${asst.avatarColor} flex items-center justify-center font-black text-xl text-white shadow-md`}>
                                {asst.name[0]}
                              </div>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                                isActive
                                  ? 'bg-indigo-950/50 text-indigo-300 border-indigo-800/40'
                                  : 'bg-slate-950/50 text-slate-400 border-slate-800/80'
                              }`}>
                                {asst.category}
                              </span>
                            </div>

                            {/* Name & Role */}
                            <h4 className="text-xl font-extrabold mb-1 tracking-tight text-white">{asst.name}</h4>
                            <p className="text-xs font-mono font-bold text-slate-400 mb-4">{asst.role}</p>
                            
                            {/* Description */}
                            <p className="text-sm font-medium text-slate-300 leading-relaxed mb-6">
                              {asst.shortDesc}
                            </p>
                          </div>

                          {/* Footer Info & Action */}
                          <div className="mt-auto pt-4 border-t border-slate-900/60 flex items-center justify-between">
                            <div>
                              <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Costo Mensual</span>
                              <span className="text-lg font-black text-white">${asst.price} <span className="text-xs text-slate-400 font-bold">MXN</span></span>
                            </div>

                            <div className="flex gap-2">
                              {isActive && (
                                <>
                                  <button
                                    onClick={() => setActiveChatAsstId(asst.id)}
                                    className="px-3.5 py-2 rounded-full text-xs font-bold bg-indigo-950 border border-indigo-800/30 text-indigo-300 hover:bg-indigo-900/30 transition-colors"
                                  >
                                    Chatear
                                  </button>
                                  <button
                                    onClick={() => openWizard(asst)}
                                    className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                                      hasProfile
                                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-950/60'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-950/30'
                                    }`}
                                  >
                                    {hasProfile ? (
                                      <>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        Perfil
                                      </>
                                    ) : (
                                      <>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M12 20h9"></path>
                                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                        </svg>
                                        Perfilador
                                      </>
                                    )}
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => toggleActivation(asst.id)}
                                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
                                  isActive
                                    ? 'bg-slate-800 hover:bg-red-950/35 hover:text-red-400 border border-slate-700 hover:border-red-900/40 text-slate-300'
                                    : 'bg-white hover:bg-indigo-600 text-slate-950 hover:text-white'
                                }`}
                              >
                                {isActive ? 'Desactivar' : 'Activar'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Column: Active Dashboard / Modular Billing */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-[2rem] bg-slate-900/40 border border-slate-800/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <h3 className="text-lg font-bold tracking-tight text-white font-display">Tu Workspace</h3>
              </div>

              {/* Calculator display */}
              <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 mb-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full" />
                <span className="block text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Facturación Estimada</span>
                <div className="text-white text-5xl font-black tracking-tighter mb-1 select-none">
                  $<span ref={totalCostRef} className="tabular-nums">0</span>
                  <span className="text-xl font-bold text-slate-400 ml-1">MXN</span>
                </div>
                <span className="text-[11px] text-slate-400 font-bold font-mono">/ al mes (sin rentas fijas)</span>
              </div>

              {/* Active list */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Asistentes Activos ({activeAssistants.length})
                </h4>
                {activeAssistants.length === 0 ? (
                  <div className="py-8 text-center bg-slate-950/30 rounded-2xl border border-slate-900 text-slate-500 text-xs font-bold">
                    Ningún asistente activo en tu cuenta.
                  </div>
                ) : (
                  <ul className="space-y-2.5">
                    {activeAssistants.map(asst => {
                      const hasProfile = activeProfiles[asst.id] !== undefined
                      return (
                        <li key={asst.id} className="flex items-center justify-between p-3.5 bg-slate-950/40 rounded-2xl border border-slate-900/60">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${asst.avatarColor} flex items-center justify-center font-bold text-xs text-white`}>
                              {asst.name[0]}
                            </div>
                            <div>
                              <span className="block text-sm font-extrabold text-white leading-none mb-1">{asst.name}</span>
                              <span className="text-[10px] font-mono font-bold text-slate-500">{asst.role}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setActiveChatAsstId(asst.id)}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                activeChatAsstId === asst.id
                                  ? 'bg-indigo-600 border-indigo-500 text-white'
                                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                              }`}
                              title="Abrir Chat"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => openWizard(asst)}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                hasProfile
                                  ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/30 hover:bg-emerald-950/60'
                                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                              }`}
                              title={hasProfile ? "Perfil configurado" : "Configurar perfil de datos"}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => toggleActivation(asst.id)}
                              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-red-400 border border-slate-800 hover:bg-red-950/25 hover:border-red-900/40 transition-colors"
                              title="Desactivar"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              {/* Data Ownership Lock */}
              <div className="flex gap-3 bg-indigo-950/20 border border-indigo-900/30 rounded-2xl p-4">
                <div className="text-indigo-400 shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  <strong className="text-white block mb-0.5 font-bold">Datos encriptados localmente</strong>
                  La información compartida en el perfilador se utiliza únicamente para el contexto directo del agente seleccionado. Tú eres dueño de tus datos.
                </p>
              </div>

              {/* Main Simulated CTA */}
              <a
                href="#diagnostico"
                className="btn-primary w-full justify-center text-center mt-6 py-4 shadow-xl"
              >
                Comenzar con mi equipo →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Wizard Modal */}
      {selectedAsst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div
            className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl transition-all duration-300 scale-100"
            style={{ transform: wizardSuccess ? 'scale(0.98)' : 'scale(1)' }}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedAsst.avatarColor} flex items-center justify-center font-bold text-xs text-white`}>
                  {selectedAsst.name[0]}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white leading-none mb-1">Perfilando a {selectedAsst.name}</h3>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{selectedAsst.role}</span>
                </div>
              </div>
              <button onClick={closeWizard} className="text-slate-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {wizardSuccess ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-900/30 border border-emerald-600/30 flex items-center justify-center text-emerald-400 mb-6 animate-bounce">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h4 className="text-xl font-extrabold text-white mb-2">¡Sincronización Exitosa!</h4>
                  <p className="text-sm text-slate-300 font-medium max-w-sm mx-auto leading-relaxed">
                    Los datos se han estructurado en el perfil del asistente. La precisión de sus respuestas ha aumentado un 40%.
                  </p>
                </div>
              ) : (
                <div>
                  {/* Step bar */}
                  <div className="flex items-center gap-2 mb-8">
                    {selectedAsst.questions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i <= wizardStep ? 'bg-indigo-500' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Question Container */}
                  <div className="min-h-[160px] flex flex-col justify-center">
                    <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                      Pregunta {wizardStep + 1} de {selectedAsst.questions.length}
                    </span>
                    <h4 className="text-lg font-extrabold text-white mb-6 leading-snug">
                      {selectedAsst.questions[wizardStep].label}
                    </h4>

                    {/* Question Select Options */}
                    <div className="flex flex-col gap-2">
                      {selectedAsst.questions[wizardStep].options.map((opt) => {
                        const qId = selectedAsst.questions[wizardStep].id
                        const isSelected = wizardAnswers[qId] === opt

                        return (
                          <button
                            key={opt}
                            onClick={() => handleWizardSelect(qId, opt)}
                            className={`w-full text-left p-4 rounded-xl text-xs font-bold border transition-all duration-200 ${
                              isSelected
                                ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md shadow-indigo-950/20'
                                : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700/60 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{opt}</span>
                              {isSelected && (
                                <span className="text-indigo-400">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </span>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {!wizardSuccess && (
              <div className="p-6 border-t border-slate-800/80 bg-slate-950/30 flex justify-between gap-4">
                <button
                  onClick={prevWizardStep}
                  disabled={wizardStep === 0}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                  Atrás
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={nextWizardStep}
                    className="btn-primary py-2.5 px-6 text-xs"
                  >
                    {wizardStep === selectedAsst.questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
