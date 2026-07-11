// ---  localStorage keys ---
const STORAGE_KEYS = {
  THEME: 'theme',
  TODOS: 'todos',
  PLANNER: 'planner',
  GOALS: 'goals',
  LOCATION: "location",
};

// My Credentials for Weather API Config, please do not misuse it
const WEATHER_API_KEY = "2bd8398df0b447b79ac182453242308";
const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";

// --- background images for day and night for different weather conditions ---
const BACKGROUNDS = {
  day: {
    sunny: "https://plus.unsplash.com/premium_photo-1661957387235-3bc814072fb3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cloudy: "https://images.unsplash.com/photo-1752563574621-2342cb20bd0b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    mist: "https://images.unsplash.com/photo-1482841628122-9080d44bb807?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rainy: "https://images.unsplash.com/uploads/14116603688211a68546c/30f8f30b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    snow: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    storm: "https://images.unsplash.com/photo-1516490981167-dc990a242afe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  night: {
    sunny: "https://images.unsplash.com/photo-1728519454370-8f5341cd1a3f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cloudy: "https://images.unsplash.com/photo-1488226941561-6d7a806ae42a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    mist: "https://images.unsplash.com/photo-1503745328377-1f4355a2284b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rainy: "https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    snow: "https://plus.unsplash.com/premium_photo-1658506822827-fb0677fb8e1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    storm: "https://images.unsplash.com/photo-1475116127127-e3ce09ee84e1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
};

const WEATHER_CODE_MAP = {
  // Sunny / Clear
  1000: { sky: "Clear", icon: "ri-sun-fill", color: "#facc15", bg: "sunny" },

  // Cloudy
  1003: { sky: "Partly Cloudy", icon: "ri-cloudy-fill", color: "#cbd5e1", bg: "cloudy" },
  1006: { sky: "Cloudy", icon: "ri-cloudy-fill", color: "#94a3b8", bg: "cloudy" },
  1009: { sky: "Overcast", icon: "ri-cloudy-fill", color: "#94a3b8", bg: "cloudy" },

  // Mist / Fog
  1030: { sky: "Mist", icon: "ri-mist-fill", color: "#94a3b8", bg: "mist" },
  1135: { sky: "Fog", icon: "ri-mist-fill", color: "#94a3b8", bg: "mist" },
  1147: { sky: "Freezing Fog", icon: "ri-mist-fill", color: "#94a3b8", bg: "mist" },

  // Drizzle / Rain
  1063: { sky: "Patchy Rain Possible", icon: "ri-drizzle-fill", color: "#60a5fa", bg: "rainy" },
  1150: { sky: "Light Drizzle", icon: "ri-drizzle-fill", color: "#60a5fa", bg: "rainy" },
  1153: { sky: "Drizzle", icon: "ri-drizzle-fill", color: "#60a5fa", bg: "rainy" },
  1180: { sky: "Patchy Light Rain", icon: "ri-rainy-fill", color: "#60a5fa", bg: "rainy" },
  1183: { sky: "Light Rain", icon: "ri-rainy-fill", color: "#3b82f6", bg: "rainy" },
  1186: { sky: "Moderate Rain At Times", icon: "ri-rainy-fill", color: "#3b82f6", bg: "rainy" },
  1189: { sky: "Moderate Rain", icon: "ri-rainy-fill", color: "#2563eb", bg: "rainy" },
  1192: { sky: "Heavy Rain At Times", icon: "ri-heavy-showers-fill", color: "#2563eb", bg: "rainy" },
  1195: { sky: "Heavy Rain", icon: "ri-heavy-showers-fill", color: "#1d4ed8", bg: "rainy" },
  1240: { sky: "Light Rain Shower", icon: "ri-showers-fill", color: "#3b82f6", bg: "rainy" },
  1243: { sky: "Moderate Rain Shower", icon: "ri-showers-fill", color: "#2563eb", bg: "rainy" },
  1246: { sky: "Torrential Rain Shower", icon: "ri-showers-fill", color: "#1d4ed8", bg: "rainy" },

  // Snow / Ice
  1066: { sky: "Patchy Snow Possible", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1069: { sky: "Sleet Possible", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1114: { sky: "Blowing Snow", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1117: { sky: "Blizzard", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1210: { sky: "Patchy Light Snow", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1213: { sky: "Light Snow", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1216: { sky: "Patchy Moderate Snow", icon: "ri-snowy-fill", color: "#cbd5e1", bg: "snow" },
  1219: { sky: "Moderate Snow", icon: "ri-snowy-fill", color: "#cbd5e1", bg: "snow" },
  1222: { sky: "Patchy Heavy Snow", icon: "ri-snowy-fill", color: "#cbd5e1", bg: "snow" },
  1225: { sky: "Heavy Snow", icon: "ri-snowy-fill", color: "#cbd5e1", bg: "snow" },
  1255: { sky: "Light Snow Showers", icon: "ri-snowy-fill", color: "#e2e8f0", bg: "snow" },
  1258: { sky: "Heavy Snow Showers", icon: "ri-snowy-fill", color: "#cbd5e1", bg: "snow" },

  // Thunder / Storm
  1087: { sky: "Thundery Outbreaks", icon: "ri-thunderstorms-fill", color: "#f59e0b", bg: "storm" },
  1273: { sky: "Patchy Light Rain with Thunder", icon: "ri-thunderstorms-fill", color: "#f59e0b", bg: "storm" },
  1276: { sky: "Moderate or Heavy Rain with Thunder", icon: "ri-thunderstorms-fill", color: "#f59e0b", bg: "storm" },
  1279: { sky: "Patchy Light Snow with Thunder", icon: "ri-thunderstorms-fill", color: "#f59e0b", bg: "storm" },
  1282: { sky: "Moderate or Heavy Snow with Thunder", icon: "ri-thunderstorms-fill", color: "#f59e0b", bg: "storm" },
};

// --- motivational quotes data ---
const MOTIVATIONAL_QUOTES = [
  { text: "उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।", author: "स्वामी विवेकानंद", category: "persistence" },
  { text: "तुम्हें अंदर से बाहर की ओर विकसित होना होगा। कोई तुम्हें सिखा नहीं सकता, कोई तुम्हें आध्यात्मिक नहीं बना सकता।", author: "स्वामी विवेकानंद", category: "mindset" },
  { text: "एक समय में एक काम करो, और ऐसा करते समय अपनी पूरी आत्मा उसमें डाल दो।", author: "स्वामी विवेकानंद", category: "focus" },
  { text: "खुद को कमजोर समझना सबसे बड़ा पाप है।", author: "स्वामी विवेकानंद", category: "mindset" },
  { text: "सपने वो नहीं जो आप नींद में देखते हैं, सपने वो हैं जो आपको सोने न दें।", author: "डॉ. ए. पी. जे. अब्दुल कलाम", category: "success" },
  { text: "यदि तुम सूरज की तरह चमकना चाहते हो, तो पहले सूरज की तरह जलना सीखो।", author: "डॉ. ए. पी. जे. अब्दुल कलाम", category: "discipline" },
  { text: "आत्मविश्वास और कड़ी मेहनत असफलता नाम की बीमारी को मारने की सबसे अच्छी दवा हैं।", author: "डॉ. ए. पी. जे. अब्दुल कलाम", category: "persistence" },
  { text: "अपने मिशन में सफल होने के लिए, तुम्हें अपने लक्ष्य के प्रति एकचित्त निष्ठा रखनी होगी।", author: "डॉ. ए. पी. जे. अब्दुल कलाम", category: "focus" },
  { text: "भविष्य इस बात पर निर्भर करता है कि आप आज क्या करते हैं।", author: "महात्मा गांधी", category: "productivity" },
  { text: "पहले वे आपको नज़रअंदाज़ करेंगे, फिर आप पर हँसेंगे, फिर आपसे लड़ेंगे, और तब आप जीत जाएंगे।", author: "महात्मा गांधी", category: "persistence" },
  { text: "खुद वो बदलाव बनिए जो आप दुनिया में देखना चाहते हैं।", author: "महात्मा गांधी", category: "mindset" },
  { text: "ताकत शारीरिक क्षमता से नहीं आती, यह अदम्य इच्छाशक्ति से आती है।", author: "महात्मा गांधी", category: "discipline" },
  { text: "जीवन साइकिल चलाने जैसा है। संतुलन बनाए रखने के लिए आपको चलते रहना होता है।", author: "अल्बर्ट आइंस्टीन", category: "persistence" },
  { text: "जिस व्यक्ति ने कभी गलती नहीं की, उसने कभी कुछ नया करने की कोशिश नहीं की।", author: "अल्बर्ट आइंस्टीन", category: "mindset" },
  { text: "कल्पना ज्ञान से अधिक महत्वपूर्ण है।", author: "अल्बर्ट आइंस्टीन", category: "mindset" },
  { text: "कठिनाइयों के बीच ही अवसर छिपे होते हैं।", author: "अल्बर्ट आइंस्टीन", category: "success" },
  { text: "मैं असफल नहीं हुआ हूँ। मैंने केवल 10,000 ऐसे तरीके खोजे हैं जो काम नहीं करते।", author: "थॉमस ए. एडिसन", category: "persistence" },
  { text: "हमारी सबसे बड़ी कमजोरी हार मान लेना है। सफल होने का सबसे निश्चित तरीका है एक बार और प्रयास करना।", author: "थॉमस ए. एडिसन", category: "persistence" },
  { text: "प्रतिभा एक प्रतिशत प्रेरणा और निन्यानवे प्रतिशत पसीना है।", author: "थॉमस ए. एडिसन", category: "discipline" },
  { text: "अवसर अधिकतर लोगों से इसलिए छूट जाता है क्योंकि वह काम के कपड़ों में आता है और काम जैसा दिखता है।", author: "थॉमस ए. एडिसन", category: "productivity" },
  { text: "सफलता अंतिम नहीं है, असफलता घातक नहीं है; मायने रखता है आगे बढ़ते रहने का साहस।", author: "विंस्टन चर्चिल", category: "persistence" },
  { text: "यदि आप नरक से गुजर रहे हैं, तो चलते रहिए।", author: "विंस्टन चर्चिल", category: "persistence" },
  { text: "सुधार करना बदलना है; पूर्ण होना अक्सर बदलते रहना है।", author: "विंस्टन चर्चिल", category: "mindset" },
  { text: "आपका समय सीमित है, इसलिए इसे किसी और की जिंदगी जीकर बर्बाद मत कीजिए।", author: "स्टीव जॉब्स", category: "focus" },
  { text: "महान काम करने का एकमात्र तरीका है कि आप वह करें जिसे आप प्यार करते हैं।", author: "स्टीव जॉब्स", category: "success" },
  { text: "कभी-कभी जिंदगी आपके सिर पर ईंट से वार करती है, लेकिन विश्वास मत खोइए।", author: "स्टीव जॉब्स", category: "persistence" },
  { text: "नवाचार एक नेता और अनुयायी के बीच अंतर करता है।", author: "स्टीव जॉब्स", category: "success" },
  { text: "जो लोग इतने पागल होते हैं कि सोचते हैं कि वे दुनिया बदल सकते हैं, वही इसे बदलते हैं।", author: "स्टीव जॉब्स", category: "mindset" },
  { text: "मैं हवा की दिशा नहीं बदल सकता, लेकिन मैं अपने पाल इस तरह समायोजित कर सकता हूँ कि हमेशा अपने गंतव्य तक पहुँच सकूँ।", author: "जिमी डीन", category: "mindset" },
  { text: "मैं अपनी सफलता का श्रेय इस बात को देता हूँ कि मैंने कभी कोई बहाना नहीं बनाया।", author: "फ्लोरेंस नाइटिंगेल", category: "discipline" },
  { text: "जो हमारे पीछे है और जो हमारे सामने है, वह उन चीजों की तुलना में बहुत छोटा है जो हमारे भीतर हैं।", author: "राल्फ वाल्डो इमर्सन", category: "mindset" },
  { text: "जो व्यक्ति स्वयं पर विजय पा लेता है, वही सबसे बड़ा विजेता है।", author: "गौतम बुद्ध", category: "discipline" },
  { text: "हजारों लड़ाइयाँ जीतने से बेहतर है स्वयं पर विजय प्राप्त करना।", author: "गौतम बुद्ध", category: "discipline" },
  { text: "मन ही सब कुछ है; आप जो सोचते हैं, वही बन जाते हैं।", author: "गौतम बुद्ध", category: "mindset" },
  { text: "शांति भीतर से आती है, इसे बाहर मत खोजो।", author: "गौतम बुद्ध", category: "focus" },
  { text: "किसी भी काम को शुरू करने का तरीका है बातें छोड़ना और करना शुरू करना।", author: "वॉल्ट डिज़्नी", category: "productivity" },
  { text: "हमारे सारे सपने सच हो सकते हैं, यदि हमारे पास उन्हें पूरा करने का साहस हो।", author: "वॉल्ट डिज़्नी", category: "success" },
  { text: "जितना अधिक आप खुद को पसंद करेंगे, उतना ही आप किसी और जैसे नहीं बनना चाहेंगे।", author: "वॉल्ट डिज़्नी", category: "mindset" },
  { text: "घड़ी को मत देखते रहो; जो वह करती है वही करो—चलते रहो।", author: "सैम लेवेंसन", category: "persistence" },
  { text: "अतीत से सीखो, वर्तमान में जियो, और आने वाले कल के लिए आशा रखो।", author: "अल्बर्ट आइंस्टीन", category: "mindset" },
  { text: "मैंने सीखा है कि लोग भूल जाएंगे कि आपने क्या कहा, लोग भूल जाएंगे कि आपने क्या किया, लेकिन लोग कभी नहीं भूलेंगे कि आपने उन्हें कैसा महसूस कराया।", author: "माया एंजेलो", category: "mindset" },
  { text: "हम कई हारों का सामना कर सकते हैं, लेकिन हमें हार नहीं माननी चाहिए।", author: "माया एंजेलो", category: "persistence" },
  { text: "कुछ भी काम नहीं करेगा जब तक आप नहीं करेंगे।", author: "माया एंजेलो", category: "discipline" },
  { text: "आप जो करते हैं उससे फर्क पड़ता है, और आपको तय करना है कि आप किस तरह का फर्क डालना चाहते हैं।", author: "जेन गुडॉल", category: "focus" },
  { text: "अपने सपनों की दिशा में आत्मविश्वास से आगे बढ़ो। वह जीवन जियो जिसकी तुमने कल्पना की है।", author: "हेनरी डेविड थोरो", category: "success" },
  { text: "सफलता आमतौर पर उन लोगों के पास आती है जो उसे पाने में बहुत व्यस्त होते हैं।", author: "हेनरी डेविड थोरो", category: "productivity" },
  { text: "हजार मील की यात्रा भी एक कदम से शुरू होती है।", author: "लाओ त्ज़ु", category: "productivity" },
  { text: "जब मैं जो हूँ उसे छोड़ देता हूँ, तब मैं वह बन जाता हूँ जो मैं बन सकता हूँ।", author: "लाओ त्ज़ु", category: "mindset" },
  { text: "जो दूसरों को जानता है वह बुद्धिमान है; जो खुद को जानता है वह प्रबुद्ध है।", author: "लाओ त्ज़ु", category: "mindset" },
  { text: "आपका जीवन संयोग से बेहतर नहीं होता, बदलाव से बेहतर होता है।", author: "जिम रोहन", category: "discipline" },
  { text: "अनुशासन लक्ष्यों और उपलब्धि के बीच का पुल है।", author: "जिम रोहन", category: "discipline" },
  { text: "या तो आप दिन को चलाइए, या दिन आपको चलाएगा।", author: "जिम रोहन", category: "productivity" },
  { text: "प्रेरणा वह है जो आपको शुरू कराती है, आदत वह है जो आपको चलते रहने देती है।", author: "जिम रोहन", category: "discipline" },
  { text: "कठिन परिश्रम प्रतिभा को हरा देता है, जब प्रतिभा कठिन परिश्रम नहीं करती।", author: "टिम नोटके", category: "discipline" },
  { text: "मैं अपने करियर में बार-बार असफल हुआ हूँ, और यही कारण है कि मैं सफल हुआ।", author: "माइकल जॉर्डन", category: "persistence" },
  { text: "कुछ लोग चाहते हैं कि यह हो जाए, कुछ लोग कामना करते हैं कि यह हो जाए, और कुछ लोग इसे कर दिखाते हैं।", author: "माइकल जॉर्डन", category: "focus" },
  { text: "अगर आप कोशिश करना बंद नहीं करते, तो आप हारे नहीं हैं।", author: "अल्बर्ट हबर्ड", category: "persistence" },
  { text: "भविष्य उन लोगों का है जो अपने सपनों की सुंदरता में विश्वास रखते हैं।", author: "एलेनोर रूज़वेल्ट", category: "success" },
  { text: "वह करो जो तुम कर सकते हो, वहीं से जहाँ तुम हो, और उन्हीं साधनों से जो तुम्हारे पास हैं।", author: "थियोडोर रूज़वेल्ट", category: "productivity" },
  { text: "यह मायने नहीं रखता कि आप कितनी धीरे चलते हैं, जब तक आप रुकते नहीं हैं।", author: "कन्फ्यूशियस", category: "persistence" },
  { text: "महानता कभी न गिरने में नहीं, बल्कि हर बार गिरकर उठ जाने में है।", author: "कन्फ्यूशियस", category: "persistence" }
];

// --- toast notification feature ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'ri-checkbox-circle-fill';
  if (type === 'info') icon = 'ri-information-fill';
  if (type === 'warning') icon = 'ri-error-warning-fill';
  
  toast.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
      toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 3000);
}

function getWeatherVisual(conditionCode) {
  const mapped = WEATHER_CODE_MAP[conditionCode];
  if (mapped) return mapped;

  return { sky: conditionText || "Clear", icon: "ri-sun-fill", color: "#facc15", bg: "sunny" };
}
// --- background image change feature ---
function updateBackgroundAndWeather(data) {
  if (!data?.current || !data?.location) return;
  const root = document.documentElement; 
  const currentTheme = root.getAttribute('data-theme') || 'dark'; 


  console.log(data)

  
  
  const tempEl = document.getElementById('hero-temp');
  const skyEl = document.getElementById('hero-sky');
  const iconEl = document.getElementById('weather-icon');
  const location = document.getElementById('hero-location');
  const humEl = document.getElementById('hero-humidity');
  const windEl = document.getElementById('hero-wind');
  const bgEl = document.getElementById("dashboard-bg");

  const conditionCode = data.current.condition.code;
  const isDay = data.current.is_day === 1;
  console.log(isDay)
  let themeMode = currentTheme === 'light'  ? 'day' : 'night';
  console.log(themeMode)

  const visual = getWeatherVisual(conditionCode);
   
  const bgImage = BACKGROUNDS?.[themeMode || isDay]?.[visual.bg];
  console.log(bgImage)

  if (bgEl && bgImage) {
    bgEl.style.backgroundImage = `url('${bgImage}')`;
  }

  
  let skyText = data?.current?.condition?.text;
  let weatherIcon = data?.current?.condition?.icon;
  let locationName = data?.location?.name;
  let tempValue = data?.current?.temp_c;
  let humidity = data?.current?.humidity;
  let wind = data?.current?.wind_mph;
  

  
  if (tempEl) tempEl.textContent = tempValue + "°C";
  if (skyEl) skyEl.textContent = skyText;
  if (iconEl) iconEl.src = weatherIcon;
  if (location) location.textContent = locationName;
  const navLocName = document.getElementById('nav-location-name');
  if (navLocName) navLocName.textContent = locationName;
  if (humEl) humEl.textContent = "Humidity: " + humidity;
  if (windEl) windEl.textContent = "Wind: " + wind + "mph";
}

// --- date and time ---
function initClock() {
  const navClock = document.getElementById('nav-clock');
  const heroTime = document.getElementById('hero-time');
  const heroDate = document.getElementById('hero-date');
  const heroQuote = document.getElementById('hero-quote');
  
  if (heroQuote) {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    heroQuote.innerHTML = MOTIVATIONAL_QUOTES[randomIndex].text + " —— " +  `<b>${MOTIVATIONAL_QUOTES[randomIndex].author}</b>`;
  }
  
  function updateTime() {
    const now = new Date();
    
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const heroTimeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    
    if (navClock) navClock.textContent = now.toLocaleTimeString('en-US', timeOptions);
    if (heroTime) heroTime.textContent = now.toLocaleTimeString('en-US', heroTimeOptions);
    if (heroDate) heroDate.textContent = now.toLocaleDateString('en-US', dateOptions);
  }
  
  updateTime();
  setInterval(updateTime, 1000);
}

function saveLocation(locationData) {
  localStorage.setItem(STORAGE_KEYS.LOCATION, JSON.stringify(locationData));
}

function getSavedLocation() {
  const raw = localStorage.getItem(STORAGE_KEYS.LOCATION);
  return raw ? JSON.parse(raw) : null;
}

async function fetchCurrentWeather(query) {
  const url = `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(query)}&aqi=no`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Weather fetch failed");
  }

  return await res.json();
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });
}

// --- Weather API Integration ---
async function initWeather() {
  try {
    const savedLocation = getSavedLocation();

    if (savedLocation?.query) {
      const data = await fetchCurrentWeather(savedLocation.query);
      updateBackgroundAndWeather(data);
      return;
    }

    try {
      const position = await getCurrentPosition();
      console.log("Position", position);
      const { latitude, longitude } = position.coords;
      const query = `${latitude},${longitude}`;
      const data = await fetchCurrentWeather(query);
      updateBackgroundAndWeather(data);
      saveLocation({
        query: data.location.name,
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
      });
    } catch (geoError) {
      console.warn("Geolocation failed or denied, using fallback location.", geoError);
      const fallbackQuery = "New Delhi";
      const data = await fetchCurrentWeather(fallbackQuery);
      updateBackgroundAndWeather(data);
      saveLocation({
        query: data.location.name,
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
      });
    }
  } catch (error) {
    console.error(error);
    showToast("Unable to load weather.", "danger");
  }
}

// --- SPA VIEW ROUTING CONTROLLER ---
function showView(viewId) {
  const dashboardView = document.getElementById('dashboard-view');
  if (dashboardView) dashboardView.style.display = 'none';
  
  const detailViews = document.querySelectorAll('.detail-view');
  detailViews.forEach(view => {
    view.style.display = 'none';
    view.classList.remove('active');
  });
  
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.style.display = '';
    targetView.classList.add('active');
  }
  
  const backBtn = document.getElementById('dashboard-back-btn');
  if (backBtn) backBtn.style.display = 'flex';
}

function showDashboard() {
  const detailViews = document.querySelectorAll('.detail-view');
  detailViews.forEach(view => {
    view.style.display = 'none';
    view.classList.remove('active');
  });
  
  const dashboardView = document.getElementById('dashboard-view');
  if (dashboardView) dashboardView.style.display = '';
  
  const backBtn = document.getElementById('dashboard-back-btn');
  if (backBtn) backBtn.style.display = 'none';
  
  updateDashboardBadges();
}

function updateDashboardBadges() {
  // Todo active count
  const todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS)) || [];
  const activeTodos = todos.filter(t => !t.completed).length;
  const todoBadge = document.getElementById('todo-badge');
  if (todoBadge) todoBadge.textContent = `${activeTodos} Active`;
  const todoDetailBadge = document.getElementById('todo-detail-badge');
  if (todoDetailBadge) todoDetailBadge.textContent = `${activeTodos} Active`;
  
  // Planner events count
  const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLANNER)) || [];
  const plannerBadge = document.getElementById('planner-badge');
  if (plannerBadge) plannerBadge.textContent = `${events.length} Events`;
  const plannerDetailBadge = document.getElementById('planner-detail-badge');
  if (plannerDetailBadge) plannerDetailBadge.textContent = `${events.length} Events`;
  
  // Goals completed fraction
  const goals = JSON.parse(localStorage.getItem(STORAGE_KEYS.GOALS)) || [];
  const completedGoals = goals.filter(g => g.completed).length;
  const goalsBadge = document.getElementById('goals-progress-badge');
  if (goalsBadge) goalsBadge.textContent = `${completedGoals}/${goals.length} Completed`;
}

function initSpaRouting() {
  const todoCard = document.getElementById('todo-card-wrapper');
  const plannerCard = document.getElementById('planner-card-wrapper');
  const motivationCard = document.getElementById('motivation-card-wrapper');
  const pomodoroCard = document.getElementById('pomodoro-card-wrapper');
  const goalsCard = document.getElementById('goals-card-wrapper');
  
  const backBtn = document.getElementById('dashboard-back-btn');
  const logo = document.getElementById('logo-dashboard-trigger');
  
  if (todoCard) todoCard.addEventListener('click', () => showView('todo-view'));
  if (plannerCard) plannerCard.addEventListener('click', () => showView('planner-view'));
  if (motivationCard) motivationCard.addEventListener('click', () => showView('motivation-view'));
  if (pomodoroCard) pomodoroCard.addEventListener('click', () => showView('pomodoro-view'));
  if (goalsCard) goalsCard.addEventListener('click', () => showView('goals-view'));
  
  if (backBtn) backBtn.addEventListener('click', showDashboard);
  if (logo) logo.addEventListener('click', showDashboard);
  
  updateDashboardBadges();
}

// --- Motivational quotes ---
function initMotivationWidget() {
  const displayEl = document.getElementById('motivation-quote-display');
  const authorEl = document.getElementById('motivation-quote-author');
  const refreshBtn = document.getElementById('refresh-quote-btn');
  const categoryChips = document.querySelectorAll('.category-chip');
  
  let currentCategory = 'all';
  
  function setRandomQuote() {
    if (!displayEl || !authorEl) return;
    
    displayEl.style.opacity = '0';
    authorEl.style.opacity = '0';
    
    setTimeout(() => {
      const filteredQuotes = currentCategory === 'all' 
        ? MOTIVATIONAL_QUOTES 
        : MOTIVATIONAL_QUOTES.filter(q => q.category === currentCategory);
        
      if (filteredQuotes.length === 0) return;
      
      const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      displayEl.textContent = `"${random.text}"`;
      authorEl.textContent = `— ${random.author}`;
      
      displayEl.style.transition = 'opacity 0.4s ease';
      authorEl.style.transition = 'opacity 0.4s ease';
      displayEl.style.opacity = '1';
      authorEl.style.opacity = '1';
    }, 200);
  }
  
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      setRandomQuote();
      const icon = refreshBtn.querySelector('i');
      if (icon) {
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
      }
    });
  }
  
  if (categoryChips.length > 0) {
    categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = chip.getAttribute('data-category');
        setRandomQuote();
        showToast(`Filtered quotes by: ${chip.textContent.trim()}`, 'info');
      });
    });
  }
  
  setRandomQuote();
}

// --- TODO WIDGET ---
function initTodoWidget() {
  const addBtn = document.getElementById('add-todo-item-btn');
  const inputField = document.getElementById('todo-input-field');
  const listContainer = document.getElementById('todo-items-list');
  const detailBadge = document.getElementById('todo-detail-badge');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  let currentFilter = 'all';
  
  let todos = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS)) || [];
  
  function saveAndRender() {
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
    render();
    updateDashboardBadges();
  }
  
  function addTodo() {
    if (!inputField) return;
    const text = inputField.value.trim();
    if (!text) return;
    
    todos.push({
      id: Date.now(),
      text: text,
      completed: false
    });
    
    inputField.value = '';
    saveAndRender();
    showToast('Task added successfully');
  }
  
  if (addBtn) addBtn.addEventListener('click', addTodo);
  if (inputField) {
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTodo();
    });
  }
  
  window.deleteTodo = function(id) {
    todos = todos.filter(t => t.id !== id);
    saveAndRender();
    showToast('Task deleted', 'warning');
  };
  
  window.toggleTodo = function(id) {
    todos = todos.map(t => {
      if (t.id === id) t.completed = !t.completed;
      return t;
    });
    saveAndRender();
  };
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        render();
      });
    });
  }
  
  function render() {
    const activeTodos = todos.filter(t => !t.completed);
    if (detailBadge) detailBadge.textContent = `${activeTodos.length} Active`;
    
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    let filtered = todos;
    if (currentFilter === 'active') {
      filtered = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
      filtered = todos.filter(t => t.completed);
    }
    
    if (filtered.length === 0) {
      listContainer.innerHTML = `<li class="todo-item-li" style="justify-content:center; color:var(--text-muted); font-style:italic;">No tasks under this filter.</li>`;
      return;
    }
    
    filtered.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'todo-item-li ' + (todo.completed ? 'completed' : '');
      li.innerHTML = `
        <div class="todo-item-li-left">
          <label class="checkbox-container">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
            <span class="checkmark"></span>
            <span class="goal-text" >${todo.text}</span>
          </label>
        </div>
        <button class="todo-delete-btn" onclick="deleteTodo(${todo.id})" aria-label="Delete task">
          <i class="ri-delete-bin-6-line"></i>
        </button>
      `;
      listContainer.appendChild(li);
    });
  }
  
  render();
}

// --- DAILY PLANNER ---
function initPlannerWidget() {
  const addBtn = document.getElementById('add-planner-item-btn');
  const timeField = document.getElementById('planner-time-field');
  const descField = document.getElementById('planner-desc-field');
  const listContainer = document.getElementById('planner-timeline-list');
  const detailBadge = document.getElementById('planner-detail-badge');
  
  let events = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLANNER)) || [];
  
  function saveAndRender() {
    localStorage.setItem(STORAGE_KEYS.PLANNER, JSON.stringify(events));
    render();
    updateDashboardBadges();
  }
  
  function addEvent() {
    if (!timeField || !descField) return;
    const time = timeField.value;
    const text = descField.value.trim();
    if (!time || !text) return;
    
    events.push({
      id: Date.now(),
      time: time,
      text: text
    });
    
    events.sort((a, b) => a.time.localeCompare(b.time));
    descField.value = '';
    saveAndRender();
    showToast('Scheduled event added');
  }
  
  if (addBtn) addBtn.addEventListener('click', addEvent);
  if (descField) {
    descField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addEvent();
    });
  }
  
  window.deletePlannerEvent = function(id) {
    events = events.filter(e => e.id !== id);
    saveAndRender();
    showToast('Event removed', 'warning');
  };
  
  function formatTime12(timeString) {
    const [h, m] = timeString.split(':');
    const hours = parseInt(h);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${m} ${ampm}`;
  }
  
  function render() {
    if (detailBadge) detailBadge.textContent = `${events.length} Events`;
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    const now = new Date();
    const currentHourString = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    
    let nextEvent = null;
    for (let i = 0; i < events.length; i++) {
      if (events[i].time >= currentHourString) {
        nextEvent = events[i];
        break;
      }
    }
    if (!nextEvent && events.length > 0) nextEvent = events[0];
    
    if (events.length === 0) {
      listContainer.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding: 10px; font-style:italic;">No scheduled events yet. Set your daily agenda!</div>`;
      return;
    }
    
    events.forEach(event => {
      const isEventActive = nextEvent && nextEvent.id === event.id;
      const item = document.createElement('div');
      item.className = `planner-time-block ${isEventActive ? 'active' : ''}`;
      item.innerHTML = `
        <div class="planner-time-card">
          <div class="planner-card-text">
            <span class="planner-card-time">${formatTime12(event.time)}</span>
            <span class="planner-card-desc">${event.text}</span>
          </div>
          <button class="todo-delete-btn" onclick="deletePlannerEvent(${event.id})" aria-label="Delete event">
            <i class="ri-close-line"></i>
          </button>
        </div>
      `;
      listContainer.appendChild(item);
    });
  }
  
  render();
}

// --- POMODORO TIMER WORKSPACE ---
function initPomodoroWidget() {
  const startBtn = document.getElementById('start-pomodoro');
  const pauseBtn = document.getElementById('pause-pomodoro');
  const resetBtn = document.getElementById('reset-pomodoro');
  const display = document.getElementById('pomodoro-time');
  const statusBadge = document.getElementById('pomodoro-status');
  const progressPath = document.getElementById('pomodoro-progress');
  const circleWrapper = document.querySelector('.timer-circle-wrapper');
  
  const workInput = document.getElementById('work-duration-input');
  const breakInput = document.getElementById('break-duration-input');
  
  let timer = null;
  let isWorkSession = true;
  
  let focusDuration = (workInput ? parseInt(workInput.value) : 25) * 60;
  let breakDuration = (breakInput ? parseInt(breakInput.value) : 5) * 60;
  let timeLeft = focusDuration;
  
  const radius = 80;
  const circumference = 2 * Math.PI * radius; 
  
  if (progressPath) {
    progressPath.style.strokeDasharray = circumference;
    progressPath.style.strokeDashoffset = circumference;
  }
  
  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const displayString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (display) display.textContent = displayString;
    
    if (progressPath) {
      const activeTotal = isWorkSession ? focusDuration : breakDuration;
      const percent = timeLeft / activeTotal;
      progressPath.style.strokeDashoffset = circumference - (percent * circumference);
    }
    
    if (circleWrapper) {
      if (!isWorkSession) {
        circleWrapper.classList.add('break-active');
      } else {
        circleWrapper.classList.remove('break-active');
      }
    }
  }
  
  function applyInputs() {
    if (timer) return;
    focusDuration = (workInput ? parseInt(workInput.value) || 25 : 25) * 60;
    breakDuration = (breakInput ? parseInt(breakInput.value) || 5 : 5) * 60;
    timeLeft = isWorkSession ? focusDuration : breakDuration;
    updateDisplay();
  }
  
  if (workInput) workInput.addEventListener('change', applyInputs);
  if (breakInput) breakInput.addEventListener('change', applyInputs);
  
  function startTimer() {
    if (timer) return;
    
    if (workInput) workInput.disabled = true;
    if (breakInput) breakInput.disabled = true;
    
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      
      if (timeLeft <= 0) {
        if (isWorkSession) {
          showToast('Time is up! Work session finished. Take a break!', 'success');
          isWorkSession = false;
          timeLeft = breakDuration;
          if (statusBadge) statusBadge.textContent = 'Break Session';
          updateDisplay();
        } else {
          showToast('Break is over! Focus session started.', 'info');
          isWorkSession = true;
          timeLeft = focusDuration;
          
          clearInterval(timer);
          timer = null;
          resetControls();
          updateDisplay();
          if (statusBadge) statusBadge.textContent = 'Focus Session';
        }
      }
    }, 1000);
    
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'flex';
    if (statusBadge) statusBadge.textContent = isWorkSession ? 'Focus Session' : 'Break Session';
    if (display) display.classList.add('timer-pulse');
  }
  
  function pauseTimer() {
    clearInterval(timer);
    timer = null;
    
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (startBtn) startBtn.style.display = 'flex';
    if (statusBadge) statusBadge.textContent = 'Paused';
    if (display) display.classList.remove('timer-pulse');
  }
  
  function resetTimer() {
    clearInterval(timer);
    timer = null;
    isWorkSession = true;
    
    if (workInput) workInput.disabled = false;
    if (breakInput) breakInput.disabled = false;
    
    focusDuration = (workInput ? parseInt(workInput.value) || 25 : 25) * 60;
    breakDuration = (breakInput ? parseInt(breakInput.value) || 5 : 5) * 60;
    timeLeft = focusDuration;
    
    resetControls();
    updateDisplay();
    if (statusBadge) statusBadge.textContent = 'Idle';
    if (display) display.classList.remove('timer-pulse');
  }
  
  function resetControls() {
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (startBtn) startBtn.style.display = 'flex';
  }
  
  if (startBtn) startBtn.addEventListener('click', startTimer);
  if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
  if (resetBtn) resetBtn.addEventListener('click', resetTimer);
  
  updateDisplay();
}

// --- DAILY GOALS ---
function initGoalsWidget() {
  const container = document.getElementById('goals-list-container');
  const badge = document.getElementById('goals-progress-badge');
  const progressFill = document.getElementById('goals-progress-fill');
  
  const goalInput = document.getElementById('goal-input-field');
  const addGoalBtn = document.getElementById('add-goal-btn');
  
  let goals = JSON.parse(localStorage.getItem(STORAGE_KEYS.GOALS)) || [];
  
  function updateProgress() {
    if (goals.length === 0) {
      if (badge) badge.textContent = `0 Completed`;
      if (progressFill) progressFill.style.width = '0%';
      return;
    }
    const completed = goals.filter(g => g.completed).length;
    if (badge) badge.textContent = `${completed}/${goals.length} Completed`;
    if (progressFill) {
      const percentage = (completed / goals.length) * 100;
      progressFill.style.width = `${percentage}%`;
    }
  }
  
  function saveGoals() {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    updateProgress();
    updateDashboardBadges();
  }
  
  window.toggleGoal = function(id) {
    goals = goals.map(g => {
      if (g.id === id) g.completed = !g.completed;
      return g;
    });
    saveGoals();
    renderGoals();
    
  };
  
  window.deleteGoal = function(id) {
    goals = goals.filter(g => g.id !== id);
    saveGoals();
    renderGoals();
    showToast('Daily goal deleted', 'warning');
  };
  
  function addGoal() {
    if (!goalInput) return;
    const goalText = goalInput.value.trim();
    if (!goalText) return;
    
    const newId = `goal-${Date.now()}`;
    goals.push({
      id: newId,
      text: goalText,
      completed: false
    });
    
    goalInput.value = '';
    saveGoals();
    renderGoals();
    showToast('Daily goal added');
  }
  
  if (addGoalBtn) addGoalBtn.addEventListener('click', addGoal);
  if (goalInput) {
    goalInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addGoal();
    });
  }
  
  function renderGoals() {
    updateProgress();
    if (!container) return;
    container.innerHTML = '';
    
    if (goals.length === 0) {
      container.innerHTML = `<div style="text-align:center; color:var(--text-muted); font-style:italic; padding: 10px;">No daily goals set yet. Let's outline one!</div>`;
      return;
    }
    
    goals.forEach(goal => {
      const item = document.createElement('div');
      item.className = "todo-item-li " + (goal.completed ? 'completed' : '');
      item.innerHTML = `
        <div class="todo-item-li-left">
          <label class="checkbox-container">
            <input type="checkbox" class="goal-checkbox" id="${goal.id}" ${goal.completed ? 'checked' : ''} onchange="toggleGoal('${goal.id}')">
            <span class="checkmark"></span>
            <span class="goal-text">${goal.text}</span>
          </label>
        </div>
        <button class="todo-delete-btn" onclick="deleteGoal('${goal.id}')" aria-label="Delete goal">
          <i class="ri-delete-bin-6-line"></i>
        </button>
      `;
      container.appendChild(item);
    });
  }
  
  renderGoals();
}

// --- Change location ---
function initLocationSelector() {
  const container = document.getElementById('nav-location-container');
  const displayWrap = document.getElementById('nav-location-display');
  const searchWrap = document.getElementById('nav-location-search-wrap');
  const changeBtn = document.getElementById('nav-location-change-btn');
  const closeBtn = document.getElementById('nav-location-close-btn');
  const searchInput = document.getElementById('nav-location-input');
  const suggestionsList = document.getElementById('location-suggestions-list');

  if (!container || !displayWrap || !searchWrap || !changeBtn || !closeBtn || !searchInput || !suggestionsList) {
    return;
  }

  // Toggle Search Input
  changeBtn.addEventListener('click', () => {
    displayWrap.style.display = 'none';
    searchWrap.style.display = 'block';
    searchInput.value = '';
    searchInput.focus();
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
  });

  // Cancel / Close Search
  function closeSearch() {
    searchWrap.style.display = 'none';
    displayWrap.style.display = 'flex';
    searchInput.value = '';
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
  }

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeSearch();
  });

  // Debounce helper
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Fetch Suggestions from WeatherAPI Search/Autocomplete
  async function fetchSuggestions(query) {
    if (!query.trim()) {
      suggestionsList.innerHTML = '';
      suggestionsList.style.display = 'none';
      return;
    }

    try {
      const url = `${WEATHER_BASE_URL}/search.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Search suggestions failed");
      const data = await res.json();
      renderSuggestions(data);
    } catch (err) {
      console.error(err);
    }
  }

  // Render Suggestions list
  function renderSuggestions(list) {
    suggestionsList.innerHTML = '';
    if (list.length === 0) {
      suggestionsList.innerHTML = `<li class="no-results">No matches found</li>`;
      suggestionsList.style.display = 'block';
      return;
    }

    list.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="suggestion-name">${item.name}</span>
        <span class="suggestion-sub">${item.region ? item.region + ', ' : ''}${item.country}</span>
      `;
      li.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
          const query = `${item.lat},${item.lon}`;
          const weatherData = await fetchCurrentWeather(query);
          updateBackgroundAndWeather(weatherData);
          saveLocation({
            query: weatherData.location.name,
            name: weatherData.location.name,
            region: weatherData.location.region,
            country: weatherData.location.country,
          });
          showToast(`Location changed to ${weatherData.location.name}`);
          closeSearch();
        } catch (error) {
          console.error(error);
          showToast("Failed to fetch weather for selected location.", "danger");
        }
      });
      suggestionsList.appendChild(li);
    });

    suggestionsList.style.display = 'block';
  }

  // Bind debounced keyup/input handler
  searchInput.addEventListener('input', debounce((e) => {
    fetchSuggestions(e.target.value);
  }, 300));

  // 6. Close suggestions list or search wrap when clicking outside
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      closeSearch();
    }
  });
}

// --- theme management ---
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
      updateThemeIcon(newTheme);
      initWeather();
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }
  
  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    if (theme === 'light') {
      icon.className = 'ri-moon-line';
    } else {
      icon.className = 'ri-sun-line';
    }
  }
}

// --- Initializer ---
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTheme();
  initLocationSelector();
  initWeather();
  updateBackgroundAndWeather();
  
  // Initialize routers for single page application
  initSpaRouting();
  
  // Widget initializations
  initMotivationWidget();
  initTodoWidget();
  initPlannerWidget();
  initPomodoroWidget();
  initGoalsWidget();
});