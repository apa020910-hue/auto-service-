import type { Locale, ServiceKey } from "@/lib/types";

export type ServiceData = {
  key: ServiceKey;
  number: string;
  title: Record<Locale, string>;
  short: Record<Locale, string>;
  price: number;
  duration: Record<Locale, string>;
  warranty: Record<Locale, string>;
  included: Record<Locale, string[]>;
  laborLow: number;
  laborHigh: number;
  partsLow: number;
  partsHigh: number;
};

export const services: ServiceData[] = [
  {
    key: "oil", number: "01", title: { lv: "Eļļas un filtru maiņa", ru: "Замена масла и фильтров", en: "Oil & filter service" },
    short: { lv: "Motoreļļa, filtri un pārbaude pēc ražotāja specifikācijas.", ru: "Моторное масло, фильтры и проверка по регламенту производителя.", en: "Engine oil, filters and checks to the manufacturer's specification." },
    price: 59, duration: { lv: "45–90 min", ru: "45–90 мин", en: "45–90 min" }, warranty: { lv: "Detaļām līdz 24 mēn.", ru: "На детали до 24 мес.", en: "Parts up to 24 mo." },
    included: {
      lv: ["Motoreļļa atbilstoši OEM pielaidei", "Eļļas un izvēlēto filtru nomaiņa", "Šķidrumu līmeņu un noplūžu pārbaude", "Apkopes intervāla atiestatīšana"],
      ru: ["Масло по допуску производителя", "Замена масла и выбранных фильтров", "Проверка уровней жидкостей и утечек", "Сброс сервисного интервала"],
      en: ["Engine oil to OEM specification", "Oil and selected filter replacement", "Fluid level and leak inspection", "Service interval reset"],
    }, laborLow: 30, laborHigh: 48, partsLow: 29, partsHigh: 68,
  },
  {
    key: "brakes", number: "02", title: { lv: "Bremžu sistēmas apkope", ru: "Обслуживание тормозной системы", en: "Brake system service" },
    short: { lv: "Disku, kluču, suportu un bremžu šķidruma stāvokļa kontrole.", ru: "Проверка дисков, колодок, суппортов и тормозной жидкости.", en: "Inspection of discs, pads, calipers and brake fluid condition." },
    price: 49, duration: { lv: "1–3 h", ru: "1–3 ч", en: "1–3 hrs" }, warranty: { lv: "Līdz 24 mēn. remontam", ru: "До 24 мес. на ремонт", en: "Up to 24 mo. on repairs" },
    included: {
      lv: ["Disku un kluču nodiluma mērījumi", "Suportu vadīklu un putekļsargu pārbaude", "Bremžu šķidruma stāvokļa tests", "Pēc remonta — bremžu darbības pārbaude"],
      ru: ["Измерение износа дисков и колодок", "Проверка направляющих и пыльников суппортов", "Тест состояния тормозной жидкости", "Контроль работы тормозов после ремонта"],
      en: ["Disc and pad wear measurements", "Caliper slides and dust boot inspection", "Brake fluid condition test", "Post-repair brake operation check"],
    }, laborLow: 42, laborHigh: 95, partsLow: 20, partsHigh: 180,
  },
  {
    key: "suspension", number: "03", title: { lv: "Ritošās daļas remonts", ru: "Ремонт ходовой части", en: "Chassis & suspension repair" },
    short: { lv: "Klusinātāji, sviras, lodbalsti, bukses un stūres mehānisms.", ru: "Амортизаторы, рычаги, шаровые, сайлентблоки и рулевой механизм.", en: "Dampers, control arms, ball joints, bushes and steering components." },
    price: 39, duration: { lv: "1–4 h", ru: "1–4 ч", en: "1–4 hrs" }, warranty: { lv: "Līdz 24 mēn. remontam", ru: "До 24 мес. на ремонт", en: "Up to 24 mo. on repairs" },
    included: {
      lv: ["Pacēlāja pārbaude un brīvkustību kontrole", "Bukses, balstu un amortizatoru novērtējums", "Defektu foto un darbu saskaņošana", "Kontroles brauciens pēc remonta"],
      ru: ["Проверка на подъёмнике и люфтов", "Оценка втулок, опор и амортизаторов", "Фото дефектов и согласование работ", "Контрольная поездка после ремонта"],
      en: ["Lift inspection and play checks", "Assessment of bushes, joints and dampers", "Defect photos and repair approval", "Post-repair road test"],
    }, laborLow: 35, laborHigh: 150, partsLow: 15, partsHigh: 260,
  },
  {
    key: "diagnostics", number: "04", title: { lv: "Datoru diagnostika", ru: "Компьютерная диагностика", en: "Full vehicle diagnostics" },
    short: { lv: "Vadības bloku kļūdu nolasīšana un parametru analīze.", ru: "Чтение ошибок электронных блоков и анализ текущих параметров.", en: "Control-unit fault reading and live-data analysis." },
    price: 35, duration: { lv: "30–60 min", ru: "30–60 мин", en: "30–60 min" }, warranty: { lv: "Diagnostikas atskaite", ru: "Отчёт диагностики", en: "Diagnostic report" },
    included: {
      lv: ["Visu pieejamo vadības bloku skenēšana", "Kļūdu kodu un freeze-frame analīze", "Dzīvo datu pārbaude pēc simptomiem", "Secinājumi un remonta plāns"],
      ru: ["Сканирование доступных блоков управления", "Анализ кодов ошибок и freeze-frame", "Проверка текущих параметров по симптомам", "Заключение и план ремонта"],
      en: ["Scan of accessible control modules", "Fault-code and freeze-frame analysis", "Live-data checks based on symptoms", "Findings and recommended repair plan"],
    }, laborLow: 35, laborHigh: 65, partsLow: 0, partsHigh: 0,
  },
  {
    key: "alignment", number: "05", title: { lv: "Savērsuma regulēšana 3D", ru: "3D-развал-схождение", en: "3D wheel alignment" },
    short: { lv: "Precīza riteņu ģeometrijas mērīšana un regulēšana.", ru: "Точное измерение и регулировка углов установки колёс.", en: "Accurate wheel geometry measurement and adjustment." },
    price: 49, duration: { lv: "45–60 min", ru: "45–60 мин", en: "45–60 min" }, warranty: { lv: "12 mēn. regulējumam", ru: "12 мес. на регулировку", en: "12 mo. on adjustment" },
    included: {
      lv: ["Riteņu un piekares stāvokļa sākotnējā pārbaude", "3D ģeometrijas mērījums", "Regulēšana ražotāja pielaidēs", "Drukāta pirms/pēc atskaite"],
      ru: ["Предварительная проверка колёс и подвески", "3D-измерение геометрии", "Регулировка в допусках производителя", "Отчёт до/после в распечатке"],
      en: ["Pre-check of wheels and suspension", "3D geometry measurement", "Adjustment to manufacturer tolerances", "Printed before/after report"],
    }, laborLow: 49, laborHigh: 69, partsLow: 0, partsHigh: 0,
  },
  {
    key: "ac", number: "06", title: { lv: "Kondicioniera apkope", ru: "Обслуживание кондиционера", en: "Air-conditioning service" },
    short: { lv: "Sistēmas pārbaude, vakuumēšana un uzpilde pēc normas.", ru: "Проверка системы, вакуумирование и заправка по норме.", en: "System check, vacuum test and refrigerant recharge by specification." },
    price: 59, duration: { lv: "45–60 min", ru: "45–60 мин", en: "45–60 min" }, warranty: { lv: "12 mēn. darbam", ru: "12 мес. на работу", en: "12 mo. on labour" },
    included: {
      lv: ["Spiediena un sistēmas darbības pārbaude", "Vecā aukstumaģenta atsūknēšana", "Vakuuma tests un uzpilde pēc masas", "Noplūdes pazīmju pārbaude"],
      ru: ["Проверка давления и работы системы", "Откачка старого хладагента", "Вакуумный тест и заправка по массе", "Проверка признаков утечки"],
      en: ["Pressure and system operation check", "Recovery of existing refrigerant", "Vacuum test and measured recharge", "Leak indication inspection"],
    }, laborLow: 35, laborHigh: 50, partsLow: 24, partsHigh: 55,
  },
  {
    key: "battery", number: "07", title: { lv: "Akumulatora un uzlādes sistēma", ru: "Аккумулятор и система зарядки", en: "Battery & charging system" },
    short: { lv: "Akumulatora tests, ģeneratora un startera pārbaude.", ru: "Тест аккумулятора, проверка генератора и стартера.", en: "Battery health test, alternator and starter checks." },
    price: 25, duration: { lv: "30–90 min", ru: "30–90 мин", en: "30–90 min" }, warranty: { lv: "Pēc detaļas ražotāja", ru: "По гарантии производителя", en: "As per part manufacturer" },
    included: {
      lv: ["Akumulatora veselības un starta tests", "Uzlādes sprieguma mērījums", "Ģeneratora un masas savienojumu kontrole", "Nomaiņa un reģistrācija, ja nepieciešams"],
      ru: ["Тест состояния аккумулятора и запуска", "Измерение напряжения зарядки", "Проверка генератора и соединений массы", "Замена и регистрация при необходимости"],
      en: ["Battery health and starting test", "Charging voltage measurement", "Alternator and ground connection check", "Replacement and registration where required"],
    }, laborLow: 25, laborHigh: 55, partsLow: 0, partsHigh: 180,
  },
  {
    key: "inspection", number: "08", title: { lv: "Pārbaude pirms CSDD", ru: "Проверка перед CSDD", en: "Pre-inspection check" },
    short: { lv: "Pārbaude pirms tehniskās apskates, lai zinātu, kas jānovērš.", ru: "Проверка перед техосмотром, чтобы заранее знать, что исправить.", en: "A pre-roadworthiness inspection to identify issues before the test." },
    price: 29, duration: { lv: "30–45 min", ru: "30–45 мин", en: "30–45 min" }, warranty: { lv: "Defektu saraksts", ru: "Список замечаний", en: "Inspection findings" },
    included: {
      lv: ["Apgaismojuma un signālierīču pārbaude", "Bremžu un ritošās daļas vizuāla kontrole", "Riepu un šķidrumu pārbaude", "Ieteikumu saraksts pirms CSDD"],
      ru: ["Проверка света и сигнальных приборов", "Визуальный осмотр тормозов и ходовой", "Проверка шин и технических жидкостей", "Список рекомендаций перед CSDD"],
      en: ["Lighting and signal equipment check", "Visual brake and suspension inspection", "Tyre and fluid checks", "Action list before the roadworthiness test"],
    }, laborLow: 29, laborHigh: 42, partsLow: 0, partsHigh: 0,
  },
];

export const brands = ["Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Toyota", "Škoda", "Volvo", "Ford", "Opel", "Other"];

export const problems: Record<Locale, { value: string; label: string }[]> = {
  lv: [
    { value: "diagnostics", label: "Deg brīdinājuma lampiņa / diagnostika" },
    { value: "suspension", label: "Troksnis vai brīvkustība ritošajā daļā" },
    { value: "brakes", label: "Bremzes, vibrācija vai skaņa" },
    { value: "alignment", label: "Velk uz sāniem / stūre šķībi" },
    { value: "oil", label: "Eļļas un filtru maiņa" },
    { value: "ac", label: "Kondicionieris nedzesē" },
    { value: "inspection", label: "Pārbaude pirms CSDD" },
  ],
  ru: [
    { value: "diagnostics", label: "Горит индикатор / нужна диагностика" },
    { value: "suspension", label: "Шум или люфт в ходовой части" },
    { value: "brakes", label: "Тормоза, вибрация или посторонний звук" },
    { value: "alignment", label: "Уводит в сторону / руль стоит криво" },
    { value: "oil", label: "Замена масла и фильтров" },
    { value: "ac", label: "Кондиционер не охлаждает" },
    { value: "inspection", label: "Проверка перед CSDD" },
  ],
  en: [
    { value: "diagnostics", label: "Warning light / diagnostics" },
    { value: "suspension", label: "Suspension noise or play" },
    { value: "brakes", label: "Brake noise, vibration or feel" },
    { value: "alignment", label: "Car pulls / steering wheel off-centre" },
    { value: "oil", label: "Oil and filter change" },
    { value: "ac", label: "Air conditioning not cooling" },
    { value: "inspection", label: "Pre-CSDD inspection" },
  ],
};

export const reviews = [
  { name: "Mārtiņš K.", area: "Purvciems", car: "BMW 530d", date: "2026. gada piemērs", text: { lv: "Pirms detaļu maiņas parādīja mērījumus un izskaidroja, kas tiešām jāmaina. Tāme sakrita ar gala rēķinu.", ru: "Перед заменой деталей показали измерения и объяснили, что действительно требует ремонта. Итог совпал со сметой.", en: "They showed the measurements before replacing anything and explained what actually needed attention. The final bill matched the estimate." } },
  { name: "Elīna P.", area: "Āgenskalns", car: "Audi A6", date: "2026. gada piemērs", text: { lv: "Atrada vibrācijas iemeslu, ko iepriekš citur nevarēja noteikt. Patika, ka saskaņoja darbus pirms remonta.", ru: "Нашли причину вибрации, которую не могли определить в другом месте. Понравилось, что работы согласовали заранее.", en: "They found the source of a vibration another workshop had missed. I appreciated that all work was approved in advance." } },
  { name: "Jānis R.", area: "Teika", car: "Toyota RAV4", date: "2026. gada piemērs", text: { lv: "3D savērsuma atskaite bija saprotama, un pēc regulēšanas auto vairs nevelk pa labi.", ru: "Отчёт 3D-развала понятный, после регулировки автомобиль больше не тянет вправо.", en: "The 3D alignment report was easy to understand, and the car no longer pulls to the right." } },
  { name: "Sergejs V.", area: "Imanta", car: "VW Passat", date: "2026. gada piemērs", text: { lv: "Ātra diagnostika, konkrēts remonta plāns un normāla komunikācija. Bez nevajadzīgu darbu uzspiešanas.", ru: "Быстрая диагностика, конкретный план ремонта и нормальная коммуникация. Без навязывания лишних работ.", en: "Fast diagnostics, a clear repair plan and straightforward communication. No pressure to approve unnecessary work." } },
];

export function getService(key: string): ServiceData | undefined {
  return services.find((service) => service.key === key);
}
