/**
 * =============================================
 * ARNAV MULTISERVICES — script.js (v2 Upgraded)
 * Dharashiv (Osmanabad), Maharashtra - 413501
 *
 * Features:
 *   1.  Sticky navbar
 *   2.  Mobile hamburger menu
 *   3.  Smooth scroll
 *   4.  Active nav link scroll-spy
 *   5.  Service tab switching
 *   6.  FAQ accordion
 *   7.  Scroll-reveal (Intersection Observer)
 *   8.  Animated counters
 *   9.  Button ripple effect
 *   10. Hero parallax
 *   11. Trust strip auto-scroll (mobile)
 *   12. Back-to-top button
 *   13. WhatsApp prefill fallback
 *   14. Page load fade-in
 *   15. ★ Required Documents Modal (MARATHI)
 *   16. ★ Aaple Sarkar items — WhatsApp click
 * =============================================
 */

/* ═══════════════════════════════════════════════════════════
   ★  MARATHI DOCUMENTS DATABASE
   Key  = exact text of card's <h4>
   Each entry: { marathi: display name, docs: [{m, e}] }
═══════════════════════════════════════════════════════════ */
const SERVICE_DOCS = {

  /* ────── GOVERNMENT CERTIFICATES ────── */

  'Income Certificate': {
    marathi: 'उत्पन्नाचा दाखला',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card (Original + Xerox)' },
      { m: 'रेशन कार्ड (मूळ + झेरॉक्स)', e: 'Ration Card' },
      { m: '७/१२ उतारा किंवा प्रॉपर्टी कार्ड', e: '7/12 Extract or Property Card' },
      { m: 'शाळेचा दाखला / जन्म दाखला', e: 'School Leaving / Birth Certificate' },
      { m: 'पगार स्लिप किंवा उत्पन्नाचे स्वयंघोषणापत्र', e: 'Salary Slip or Self-Declaration of Income' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
      { m: 'आधारशी जोडलेला मोबाईल नंबर (OTP साठी)', e: 'Aadhaar-linked Mobile Number (for OTP)' },
    ]
  },

  'EWS Certificate': {
    marathi: 'EWS प्रमाणपत्र (आर्थिकदृष्ट्या दुर्बल घटक)',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'रेशन कार्ड', e: 'Ration Card' },
      { m: 'उत्पन्नाचा दाखला (वार्षिक उत्पन्न ₹८ लाखांपेक्षा कमी)', e: 'Income Certificate (Annual income < ₹8 lakh)' },
      { m: '७/१२ उतारा / मालमत्ता नसल्याचे प्रमाणपत्र', e: '7/12 Extract / No Property Certificate' },
      { m: 'जातीचा दाखला (General प्रवर्ग असल्यास)', e: 'Caste Certificate (if General category)' },
      { m: 'शाळेचा दाखला', e: 'School Leaving Certificate' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  'Age, Nationality & Domicile': {
    marathi: 'वय, राष्ट्रीयत्व व अधिवास प्रमाणपत्र',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'शाळेचा दाखला (जन्मतारखेचा पुरावा)', e: 'School Leaving Certificate (Date of Birth Proof)' },
      { m: 'रेशन कार्ड (महाराष्ट्रातील रहिवास पुरावा)', e: 'Ration Card (Maharashtra Residence Proof)' },
      { m: 'वडिलांचा / पालकाचा अधिवास दाखला', e: "Father's / Guardian's Domicile Certificate" },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
      { m: 'नोटरी केलेले स्वयंघोषणापत्र', e: 'Notarized Self-Declaration' },
    ]
  },

  'Caste Certificate': {
    marathi: 'जातीचा दाखला',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'शाळेचा दाखला (जात नमूद असलेला)', e: 'School Leaving Certificate (with caste mentioned)' },
      { m: 'वडिलांचा / आजोबांचा जातीचा दाखला', e: "Father's / Grandfather's Caste Certificate" },
      { m: 'रेशन कार्ड', e: 'Ration Card' },
      { m: '७/१२ उतारा', e: '7/12 Extract' },
      { m: 'ग्रामसेवक / तहसीलदारांचा स्थानिक चौकशी अहवाल', e: 'Local Enquiry Report from Gramsevak / Tahsildar' },
      { m: 'जन्म दाखला', e: 'Birth Certificate' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  '30% Women Reservation': {
    marathi: '३०% महिला आरक्षण प्रमाणपत्र',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'जन्म दाखला / शाळेचा दाखला', e: 'Birth Certificate / School Leaving Certificate' },
      { m: 'रेशन कार्ड', e: 'Ration Card' },
      { m: 'उत्पन्नाचा दाखला', e: 'Income Certificate' },
      { m: 'महिला असल्याचे स्वयंघोषणापत्र', e: 'Self-Declaration of being a Woman' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  'Birth & Death Certificate': {
    marathi: 'जन्म व मृत्यू नोंदणी / प्रमाणपत्र',
    docs: [
      { m: 'रुग्णालयाचा जन्म / मृत्यू दाखला (अॅडमिशन रसीद)', e: 'Hospital Birth / Death Record (Admission Receipt)' },
      { m: 'आईचे / वडिलांचे आधार कार्ड', e: "Mother's / Father's Aadhaar Card" },
      { m: 'रेशन कार्ड', e: 'Ration Card' },
      { m: 'ग्रामपंचायत / नगरपालिका नोंदणी (असल्यास)', e: 'GP / Municipal Registration (if available)' },
      { m: 'जुन्या नोंदणीसाठी: शाळेचा दाखला / शपथपत्र', e: 'For old records: School Certificate / Affidavit' },
      { m: 'पालकांचे पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos of Parents' },
    ]
  },

  'Police Clearance Certificate': {
    marathi: 'पोलीस क्लिअरन्स प्रमाणपत्र (PCC)',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'पासपोर्ट (पहिले व शेवटचे पान)', e: 'Passport (First & Last Page)' },
      { m: 'रहिवाशी पुरावा (वीज बिल / भाडे करार)', e: 'Residence Proof (Electricity Bill / Rent Agreement)' },
      { m: 'शाळेचा दाखला', e: 'School Leaving Certificate' },
      { m: 'पासपोर्ट साईज फोटो (३ नग)', e: '3 Passport Size Photos' },
      { m: 'पोलीस स्टेशन अर्ज नमुना', e: 'Application Form (Police Station)' },
    ]
  },

  'Character Verification Certificate': {
    marathi: 'चारित्र्य पडताळणी प्रमाणपत्र',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'शाळेचा दाखला', e: 'School Leaving Certificate' },
      { m: 'रहिवाशी पुरावा', e: 'Address Proof' },
      { m: 'नोकरीसाठी असल्यास: कंपनीचे विनंती पत्र', e: 'If for employment: Company Request Letter' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
      { m: 'नोंदणी फी भरल्याची रसीद', e: 'Registration Fee Receipt' },
    ]
  },

  'BPL Certificate': {
    marathi: 'दारिद्र्यरेषेखालील (BPL) प्रमाणपत्र',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'BPL रेशन कार्ड (असल्यास)', e: 'BPL Ration Card (if available)' },
      { m: 'उत्पन्नाचा दाखला', e: 'Income Certificate' },
      { m: '७/१२ उतारा (जमीन नसल्याचा पुरावा)', e: '7/12 Extract (Proof of No Agricultural Land)' },
      { m: 'ग्रामसेवकाचे शिफारसपत्र', e: 'Recommendation Letter from Gramsevak' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  'Shop Act License': {
    marathi: 'दुकाने व आस्थापना परवाना (Shop Act)',
    docs: [
      { m: 'मालकाचे आधार कार्ड', e: "Owner's Aadhaar Card" },
      { m: 'PAN कार्ड (मालकाचे / व्यवसायाचे)', e: "Owner's / Business PAN Card" },
      { m: 'दुकानाचा पत्ता पुरावा (भाडे करार / मालकी दस्तऐवज)', e: 'Shop Address Proof (Rent Agreement / Ownership Doc)' },
      { m: 'व्यवसायाचे नाव व स्वरूप', e: 'Business Name & Nature of Business' },
      { m: 'कर्मचारी संख्येची माहिती', e: 'Details of Number of Employees' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  'Factory License': {
    marathi: 'कारखाना परवाना',
    docs: [
      { m: 'मालकाचे आधार कार्ड', e: "Owner's Aadhaar Card" },
      { m: 'PAN कार्ड / GST नोंदणी प्रमाणपत्र', e: 'PAN Card / GST Registration Certificate' },
      { m: 'जागेचा पुरावा (७/१२ / भाडे करार)', e: 'Land / Premises Proof (7/12 / Rent Agreement)' },
      { m: 'बांधकाम परवानगी', e: 'Building Permission' },
      { m: 'उत्पादन प्रक्रियेचे वर्णन (Process Details)', e: 'Description of Manufacturing Process' },
      { m: 'विद्युत जोडणीचे तपशील', e: 'Electricity Connection Details' },
      { m: 'कामगार यादी (Name & Aadhaar)', e: 'Workers List (Name & Aadhaar)' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  'Building Permission': {
    marathi: 'बांधकाम परवानगी',
    docs: [
      { m: 'जमिनीचे ७/१२ उतारा', e: '7/12 Land Extract' },
      { m: 'अर्जदाराचे आधार कार्ड', e: "Applicant's Aadhaar Card" },
      { m: 'बांधकाम नकाशा (इंजिनिअर / आर्किटेक्टने प्रमाणित)', e: 'Building Plan certified by Engineer / Architect' },
      { m: 'प्रॉपर्टी कार्ड / ८ अ उतारा', e: 'Property Card / 8A Extract' },
      { m: 'शेजारील जमीन मालकाचे ना-हरकत पत्र', e: 'NOC from Neighbouring Landowners (if required)' },
      { m: 'मालमत्ता कर भरणा पावती', e: 'Property Tax Payment Receipt' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  'Trade License': {
    marathi: 'व्यापार परवाना',
    docs: [
      { m: 'मालकाचे आधार कार्ड', e: "Owner's Aadhaar Card" },
      { m: 'PAN कार्ड', e: 'PAN Card' },
      { m: 'व्यवसायाच्या ठिकाणाचा पत्ता पुरावा', e: 'Business Address Proof' },
      { m: 'Shop Act License (असल्यास)', e: 'Shop Act License (if available)' },
      { m: 'GST नोंदणी क्रमांक (लागू असल्यास)', e: 'GST Registration Number (if applicable)' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  'Loudspeaker License': {
    marathi: 'भोंगा / ध्वनिक्षेपक परवाना',
    docs: [
      { m: 'अर्जदाराचे आधार कार्ड', e: "Applicant's Aadhaar Card" },
      { m: 'कार्यक्रमाचे ठिकाण, दिनांक व वेळ', e: 'Event Venue, Date & Time' },
      { m: 'कार्यक्रमाचे स्वरूप (सांस्कृतिक / धार्मिक / व्यावसायिक)', e: 'Event Nature (Cultural / Religious / Commercial)' },
      { m: 'ग्रामपंचायत / नगरपालिकेचे ना-हरकत पत्र', e: 'NOC from GP / Municipality' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  'Entertainment / Program License': {
    marathi: 'मनोरंजन / सांस्कृतिक कार्यक्रम परवाना',
    docs: [
      { m: 'आयोजकाचे आधार कार्ड', e: "Organizer's Aadhaar Card" },
      { m: 'कार्यक्रमाचा संपूर्ण तपशील (दिनांक, वेळ, ठिकाण)', e: 'Full Event Details (Date, Time, Venue)' },
      { m: 'पोलीस विभागाचे ना-हरकत पत्र (NOC)', e: 'Police Department NOC' },
      { m: 'अग्निशमन विभागाची परवानगी (मोठ्या कार्यक्रमांसाठी)', e: 'Fire Department Approval (for large events)' },
      { m: 'स्थानिक प्राधिकरणाचे ना-हरकत पत्र', e: 'Local Authority NOC' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  'Cinema/Theater License': {
    marathi: 'सिनेमा / चित्रपटगृह परवाना',
    docs: [
      { m: 'मालकाचे आधार कार्ड', e: "Owner's Aadhaar Card" },
      { m: 'PAN कार्ड / GST नोंदणी', e: 'PAN Card / GST Registration' },
      { m: 'जागेची बांधकाम परवानगी', e: 'Building Permission for the Premises' },
      { m: 'अग्निशमन विभागाचे ना-हरकत पत्र', e: 'Fire Department NOC' },
      { m: 'जिल्हाधिकारी कार्यालयाचा परवाना अर्ज (Form A)', e: 'District Collector License Application (Form A)' },
      { m: 'विद्युत सुरक्षा प्रमाणपत्र', e: 'Electrical Safety Certificate' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
    ]
  },

  'Arms License': {
    marathi: 'शस्त्रास्त्र परवाना',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'रहिवाशी पुरावा', e: 'Residence / Address Proof' },
      { m: 'वैद्यकीय प्रमाणपत्र (शारीरिक व मानसिक स्वास्थ्य)', e: 'Medical Certificate (Physical & Mental Fitness)' },
      { m: 'पोलीस चारित्र्य पडताळणी प्रमाणपत्र', e: 'Police Character Verification Certificate' },
      { m: 'उत्पन्नाचा दाखला', e: 'Income Certificate' },
      { m: 'परवाना का आवश्यक आहे — कारण पत्र', e: 'Reason for Requiring License — Explanation Letter' },
      { m: 'पासपोर्ट साईज फोटो (४ नग)', e: '4 Passport Size Photos' },
    ]
  },

  'Liquor License': {
    marathi: 'मद्य परवाना',
    docs: [
      { m: 'मालकाचे आधार कार्ड', e: "Owner's Aadhaar Card" },
      { m: 'PAN कार्ड', e: 'PAN Card' },
      { m: 'जागेचा पत्ता पुरावा (भाडे करार / मालकी दस्तऐवज)', e: 'Premises Address Proof (Rent Agreement / Ownership)' },
      { m: 'Shop Act License', e: 'Shop Act License' },
      { m: 'पोलीस विभागाचे ना-हरकत पत्र', e: 'Police Department NOC' },
      { m: 'जिल्हाधिकारी / उत्पादन शुल्क विभाग अर्ज', e: 'District Collector / State Excise Dept. Application' },
      { m: 'जवळच्या शाळा/धार्मिक स्थळापासून अंतर प्रमाणपत्र', e: 'Distance Certificate from nearby School / Religious Place' },
      { m: 'पासपोर्ट साईज फोटो (४ नग)', e: '4 Passport Size Photos' },
    ]
  },

  '7/12 Utara': {
    marathi: '७/१२ उतारा (सातबारा)',
    docs: [
      { m: 'आधार कार्ड', e: 'Aadhaar Card' },
      { m: 'जमिनीचा गट नंबर (Survey / Gat Number)', e: 'Land Survey / Gat Number' },
      { m: 'गावाचे नाव, तालुका व जिल्हा', e: 'Village Name, Taluka & District' },
      { m: 'जमीन मालकाचे नाव (महसूल नोंदीनुसार)', e: "Land Owner's Name as per Revenue Records" },
    ]
  },

  '8A Extract': {
    marathi: '८ अ उतारा',
    docs: [
      { m: 'आधार कार्ड', e: 'Aadhaar Card' },
      { m: 'जमिनीचा गट / सर्व्हे नंबर', e: 'Land Gat / Survey Number' },
      { m: 'गावाचे नाव, तालुका व जिल्हा', e: 'Village Name, Taluka & District' },
      { m: 'जमीन मालकाचे नाव', e: "Land Owner's Name" },
    ]
  },

  /* ────── IDENTITY CARDS ────── */

  'PAN Card': {
    marathi: 'PAN कार्ड',
    docs: [
      { m: 'आधार कार्ड (ओळख व पत्ता पुरावा)', e: 'Aadhaar Card (ID + Address Proof)' },
      { m: 'जन्म दाखला / शाळेचा दाखला (वयाचा पुरावा)', e: 'Birth / School Certificate (Age Proof)' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
      { m: 'सुधारणा असल्यास: जुन्या PAN कार्डची झेरॉक्स', e: 'For correction: Xerox of old PAN Card' },
      { m: 'OTP साठी मोबाईल नंबर', e: 'Mobile Number (for OTP)' },
    ]
  },

  'Voter ID Card': {
    marathi: 'मतदार ओळखपत्र (Voter ID)',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'वयाचा पुरावा — जन्म दाखला / शाळेचा दाखला (१८+ वर्षे)', e: 'Age Proof (must be 18+) — Birth / School Cert.' },
      { m: 'रहिवाशी पुरावा (रेशन कार्ड / वीज बिल / बँक पासबुक)', e: 'Address Proof (Ration Card / Electricity Bill / Bank Passbook)' },
      { m: 'पासपोर्ट साईज फोटो (२ नग)', e: '2 Passport Size Photos' },
      { m: 'मोबाईल नंबर', e: 'Mobile Number' },
    ]
  },

  'Aadhaar PVC Card': {
    marathi: 'आधार PVC कार्ड',
    docs: [
      { m: 'आधार नंबर (१२ अंकी)', e: '12-digit Aadhaar Number' },
      { m: 'आधारशी जोडलेला मोबाईल नंबर (OTP साठी)', e: 'Aadhaar-linked Mobile Number (for OTP)' },
      { m: '₹५० ऑर्डर शुल्क (UIDAI अधिकृत)', e: '₹50 Order Fee (Official UIDAI charge)' },
    ]
  },

  /* ────── TRANSPORT ────── */

  'Driving Licence': {
    marathi: 'वाहन चालक परवाना (Driving Licence)',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'वयाचा पुरावा — जन्म दाखला / शाळेचा दाखला (दुचाकी: १६+, चारचाकी: १८+ वर्षे)', e: 'Age Proof (2-wheeler: 16+, Car: 18+)' },
      { m: 'रहिवाशी पुरावा', e: 'Address Proof' },
      { m: 'वैद्यकीय प्रमाणपत्र — Form 1A (नोंदणीकृत डॉक्टरकडून)', e: 'Medical Certificate — Form 1A (from Registered Doctor)' },
      { m: 'पासपोर्ट साईज फोटो (३ नग)', e: '3 Passport Size Photos' },
      { m: 'लर्निंग लायसेन्स (DL साठी — LLR काढल्यानंतर ३०+ दिवस)', e: "Learner's Licence (for DL — min. 30 days after LLR)" },
      { m: 'Parivahan पोर्टलशी जोडलेला मोबाईल नंबर', e: 'Mobile Number (linked to Parivahan portal)' },
    ]
  },

  'Vehicle RC Services': {
    marathi: 'वाहन नोंदणी (RC) सेवा',
    docs: [
      { m: 'मालकाचे आधार कार्ड', e: "Owner's Aadhaar Card" },
      { m: 'वाहन खरेदी / विक्री दस्तऐवज (Form 20/21/22)', e: 'Vehicle Purchase/Sale Document (Form 20/21/22)' },
      { m: 'विमा प्रमाणपत्र (Insurance Certificate)', e: 'Insurance Certificate' },
      { m: 'प्रदूषण नियंत्रण प्रमाणपत्र (PUC)', e: 'Pollution Under Control (PUC) Certificate' },
      { m: 'वाहन तपासणी अहवाल (RTO)', e: 'Vehicle Inspection Report (RTO)' },
      { m: 'पत्ता बदलासाठी: नवीन पत्ता पुरावा', e: 'For address change: New Address Proof' },
      { m: 'मालकी हस्तांतरणासाठी: Form 29 & 30', e: 'For ownership transfer: Form 29 & 30' },
    ]
  },

  /* ────── OTHER SERVICES ────── */

  'Passport Application': {
    marathi: 'पासपोर्ट अर्ज',
    docs: [
      { m: 'आधार कार्ड (मूळ + झेरॉक्स)', e: 'Aadhaar Card' },
      { m: 'जन्म दाखला (अल्पवयीनांसाठी अनिवार्य)', e: 'Birth Certificate (Mandatory for minors)' },
      { m: 'शाळेचा दाखला / SSC / HSC मार्कशीट', e: 'School Certificate / SSC / HSC Marksheet' },
      { m: 'रहिवाशी पुरावा (वीज बिल / बँक पासबुक)', e: 'Address Proof (Electricity Bill / Bank Passbook)' },
      { m: 'जुना पासपोर्ट (नूतनीकरणासाठी)', e: 'Old Passport (for renewal)' },
      { m: 'पांढऱ्या पार्श्वभूमीचा फोटो (४.५ × ३.५ सें.मी.)', e: 'White background photo (4.5×3.5 cm)' },
      { m: 'मोबाईल नंबर व ईमेल (Passport Seva Portal नोंदणीसाठी)', e: 'Mobile & Email (for Passport Seva Portal registration)' },
    ]
  },

  'Ration Card': {
    marathi: 'शिधापत्रिका (Ration Card)',
    docs: [
      { m: 'कुटुंबातील सर्व सदस्यांचे आधार कार्ड', e: 'Aadhaar Card of ALL family members' },
      { m: 'रहिवाशी पुरावा (वीज बिल / घर कर पावती)', e: 'Address Proof (Electricity Bill / Property Tax Receipt)' },
      { m: 'जुने रेशन कार्ड (सरेंडर किंवा सुधारणेसाठी)', e: 'Old Ration Card (for surrender/correction)' },
      { m: 'उत्पन्नाचा दाखला', e: 'Income Certificate' },
      { m: 'कुटुंब प्रमुखाचे पासपोर्ट साईज फोटो (२ नग)', e: '2 Photos of Head of Family' },
      { m: 'मोबाईल नंबर', e: 'Mobile Number' },
    ]
  },

  'Online Forms Filling': {
    marathi: 'ऑनलाईन फॉर्म भरणे',
    docs: [
      { m: 'आधार कार्ड', e: 'Aadhaar Card' },
      { m: 'संबंधित सेवेनुसार आवश्यक कागदपत्रे', e: 'Documents as per the specific service applied for' },
      { m: 'पासपोर्ट साईज फोटो', e: 'Passport Size Photo' },
      { m: 'OTP साठी मोबाईल नंबर व ईमेल', e: 'Mobile Number & Email (for OTP)' },
      { m: 'शिष्यवृत्ती / नोकरी अर्जासाठी शैक्षणिक प्रमाणपत्रे', e: 'Educational Certificates (for Scholarship / Job application)' },
    ]
  },

  'Xerox & Printing': {
    marathi: 'झेरॉक्स व प्रिंटिंग',
    docs: [
      { m: 'कोणतेही विशेष कागदपत्र आवश्यक नाही', e: 'No specific documents required' },
      { m: 'ज्या कागदपत्रांची प्रत हवी ती सोबत आणा', e: 'Bring the documents you want copied / printed' },
      { m: 'डिजिटल फाईलसाठी: पेन ड्राईव्ह किंवा मोबाईल', e: 'For digital files: Pen Drive or Mobile' },
    ]
  },

};
/* ═══════════════════════ END SERVICE_DOCS ═══════════════════════ */


document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. STICKY NAVBAR
  ───────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const handleScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  /* ─────────────────────────────────────────
     2. MOBILE HAMBURGER MENU
  ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const opening = !navMenu.classList.contains('open');
    hamburger.classList.toggle('open', opening);
    navMenu.classList.toggle('open', opening);
    hamburger.setAttribute('aria-expanded', String(opening));
    document.body.style.overflow = opening ? 'hidden' : '';
  });

  navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) closeMenu();
  });


  /* ─────────────────────────────────────────
     3. SMOOTH SCROLL
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 12,
        behavior: 'smooth'
      });
    });
  });


  /* ─────────────────────────────────────────
     4. ACTIVE NAV LINK (SCROLL SPY)
  ───────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activateLink = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - navbar.offsetHeight - 20) current = sec.id;
    });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', activateLink, { passive: true });
  activateLink();


  /* ─────────────────────────────────────────
     5. SERVICE TABS
  ───────────────────────────────────────── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(`tab-${btn.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });


  /* ─────────────────────────────────────────
     6. FAQ ACCORDION
  ───────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-answer').style.maxHeight =
          item.querySelector('.faq-answer').scrollHeight + 'px';
      }
    });
  });


  /* ─────────────────────────────────────────
     7. SCROLL-REVEAL ANIMATIONS
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.service-card, .why-card, .testi-card, .about-feature, .aaple-item, .contact-item'
  );
  revealEls.forEach(el => el.classList.add('fade-up'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = [...entry.target.parentElement.children].indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 80, 500));
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));


  /* ─────────────────────────────────────────
     8. ANIMATED COUNTERS
  ───────────────────────────────────────── */
  const animateCounter = (el) => {
    const text   = el.textContent.trim();
    const numStr = text.replace(/[^0-9]/g, '');
    const suffix = text.replace(numStr, '');
    const target = parseInt(numStr, 10);
    if (!target) return;
    let cur = 0;
    const step  = Math.ceil(target / 50);
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = cur + suffix;
    }, 30);
  };

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); counterObs.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(c => counterObs.observe(c));


  /* ─────────────────────────────────────────
     9. BUTTON RIPPLE EFFECT
  ───────────────────────────────────────── */
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }`;
    document.head.appendChild(s);
  }

  const addRipple = (e) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const r = document.createElement('span');
    r.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top  - size / 2}px;
      background:rgba(255,255,255,0.3); border-radius:50%;
      transform:scale(0); animation:rippleAnim 0.6s linear; pointer-events:none;
    `;
    if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
  };

  document.querySelectorAll('.btn, .nav-cta, .service-wa, .float-whatsapp').forEach(b => {
    b.addEventListener('click', addRipple);
  });


  /* ─────────────────────────────────────────
     10. HERO PARALLAX
  ───────────────────────────────────────── */
  const heroShapes = document.querySelectorAll('.hero-bg-shapes .shape');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    heroShapes.forEach((s, i) => { s.style.transform = `translateY(${sy * (i + 1) * 0.08}px)`; });
  }, { passive: true });


  /* ─────────────────────────────────────────
     11. TRUST STRIP AUTO-SCROLL (mobile)
  ───────────────────────────────────────── */
  const trustContainer = document.querySelector('.trust-container');
  if (trustContainer && window.innerWidth < 600) {
    let scrollX = 0;
    const t = setInterval(() => {
      scrollX += 1;
      trustContainer.scrollLeft = scrollX;
      if (scrollX >= trustContainer.scrollWidth - trustContainer.clientWidth) scrollX = 0;
    }, 30);
    trustContainer.addEventListener('touchstart', () => clearInterval(t), { once: true });
  }


  /* ─────────────────────────────────────────
     12. BACK-TO-TOP BUTTON
  ───────────────────────────────────────── */
  const btt = document.createElement('button');
  btt.innerHTML = '<i class="fas fa-chevron-up"></i>';
  btt.setAttribute('aria-label', 'Back to top');
  btt.style.cssText = `
    position:fixed; bottom:100px; right:28px; z-index:998;
    width:44px; height:44px; border-radius:50%;
    background:var(--blue); color:#fff; border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    font-size:1rem; box-shadow:0 4px 16px rgba(26,60,143,0.3);
    opacity:0; transform:translateY(10px);
    transition:opacity 0.3s ease,transform 0.3s ease; font-family:inherit;
  `;
  document.body.appendChild(btt);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btt.style.opacity = show ? '1' : '0';
    btt.style.transform = show ? 'translateY(0)' : 'translateY(10px)';
  }, { passive: true });

  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  btt.addEventListener('mouseenter', () => { btt.style.background = 'var(--blue-light)'; });
  btt.addEventListener('mouseleave', () => { btt.style.background = 'var(--blue)'; });


  /* ─────────────────────────────────────────
     13. WHATSAPP PREFILL FALLBACK
  ───────────────────────────────────────── */
  document.querySelectorAll('.service-wa').forEach(link => {
    if (!link.href.includes('text=')) {
      const name = link.closest('.service-card')?.querySelector('h4')?.textContent.trim() || 'a service';
      link.href = `https://wa.me/918180076674?text=${encodeURIComponent('Hello! I need help with: ' + name)}`;
    }
  });


  /* ─────────────────────────────────────────
     14. PAGE LOAD FADE-IN
  ───────────────────────────────────────── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  const showBody = () => { document.body.style.opacity = '1'; };
  window.addEventListener('load', showBody);
  if (document.readyState === 'complete') showBody();


  /* ═══════════════════════════════════════════════════════
     15. ★ REQUIRED DOCUMENTS MODAL (मराठी — Marathi)
  ═══════════════════════════════════════════════════════ */

  const modalOverlay = document.getElementById('docsModalOverlay');
  const modalClose   = document.getElementById('docsModalClose');
  const modalSvcName = document.getElementById('docsModalServiceName');
  const modalList    = document.getElementById('docsModalList');

  /** Open modal and populate with Marathi docs */
  const openDocsModal = (serviceKey) => {
    const data = SERVICE_DOCS[serviceKey];
    if (!data) return;

    // Header title
    modalSvcName.textContent = data.marathi;

    // Build list
    modalList.innerHTML = '';
    data.docs.forEach(doc => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <span class="doc-marathi">${doc.m}</span>
          <span class="doc-english">${doc.e}</span>
        </div>`;
      modalList.appendChild(li);
    });

    // Pre-fill WhatsApp with Marathi message
    const waBtn = modalOverlay.querySelector('.docs-modal-footer .btn-whatsapp');
    if (waBtn) {
      const msg = `नमस्कार! मला ${data.marathi} साठी कागदपत्रे व प्रक्रियेबद्दल माहिती हवी आहे. (Arnav Multiservices, Dharashiv)`;
      waBtn.href = `https://wa.me/918180076674?text=${encodeURIComponent(msg)}`;
    }

    // Open with animation
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDocsModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeDocsModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeDocsModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeDocsModal();
  });

  /**
   * Inject "आवश्यक कागदपत्रे" orange button on every service card
   * that has a matching entry in SERVICE_DOCS.
   */
  document.querySelectorAll('.service-card').forEach(card => {
    const h4 = card.querySelector('h4');
    if (!h4) return;

    const serviceKey = h4.textContent.trim();
    const existingWa = card.querySelector('.service-wa');
    if (!existingWa) return;

    // Wrap WhatsApp link in actions div
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'service-card-actions';
    existingWa.parentNode.insertBefore(actionsDiv, existingWa);
    actionsDiv.appendChild(existingWa);

    // Add docs button if data exists
    if (SERVICE_DOCS[serviceKey]) {
      const docsBtn = document.createElement('button');
      docsBtn.className = 'btn-docs';
      docsBtn.innerHTML = '<i class="fas fa-file-lines"></i> आवश्यक कागदपत्रे';
      docsBtn.title = `${SERVICE_DOCS[serviceKey].marathi} साठी लागणारी कागदपत्रे पहा`;
      docsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDocsModal(serviceKey);
      });
      actionsDiv.appendChild(docsBtn);
    }
  });


  /* ═══════════════════════════════════════════════════════
     16. ★ AAPLE SARKAR ITEMS — click opens WhatsApp
         with pre-filled Marathi enquiry message
  ═══════════════════════════════════════════════════════ */
  document.querySelectorAll('.aaple-item').forEach(item => {
    // Strip the checkmark icon text
    const rawText  = item.textContent.trim().replace(/^\s*\S+\s*/, '');
    const dispText = rawText.trim();
    if (!dispText) return;

    item.style.cursor = 'pointer';
    item.setAttribute('title', `${dispText} — WhatsApp वर विचारण्यासाठी क्लिक करा`);

    item.addEventListener('click', () => {
      const msg = `नमस्कार! मला ${dispText} बद्दल माहिती हवी आहे. (Arnav Multiservices, Dharashiv - 413501)`;
      window.open(`https://wa.me/918180076674?text=${encodeURIComponent(msg)}`, '_blank');
    });

    // Subtle hover hint
    item.addEventListener('mouseenter', () => {
      if (!item.querySelector('.aaple-wa-hint')) {
        const hint = document.createElement('span');
        hint.className = 'aaple-wa-hint';
        hint.style.cssText = `
          margin-left:auto; font-size:0.72rem; color:#25d366;
          font-weight:600; display:flex; align-items:center; gap:3px;
          white-space:nowrap;
        `;
        hint.innerHTML = '<i class="fab fa-whatsapp"></i> विचारा';
        item.appendChild(hint);
      }
    });
    item.addEventListener('mouseleave', () => {
      const hint = item.querySelector('.aaple-wa-hint');
      if (hint) hint.remove();
    });
  });

}); // end DOMContentLoaded
