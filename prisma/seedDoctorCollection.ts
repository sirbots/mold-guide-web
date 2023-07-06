import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const doctorData = [
  {
      firstName: "Robin",
      middleName: "A",
      lastName: "Bernhoft",
      slug: "robin-a-bernhoft-ojai-ca",
      gender: "male",
      practiceName: "Bernhoft Center for Advanced Medicine",
      phoneNumber: "(805) 586-3432",
      addressStreet: "1320 Maricopa Hwy",
      addressUnit: "Suite G",
      addressCity: "Ojai",
      addressState: "CA",
      addressZipcode: "93023",
      addressCountry: "US",
      website: "https://drbernhoft.com/",
      telehealth: "Yes",
      shoemakerProtocol: false,
      conditionsTreated: "Mold Illness",
      certifications: ["MD", "FACS", "DABEM","FAAEM"],
      seesPatientsIn: "CA",
      bio: ["Robin A. Bernhoft, MD, FACS, DABEM, FAAEM is one of the nation’s leading practitioners of environmental medicine, providing a full gambit of treatments for patients experiencing chronic and undiagnosed ailments in Ojai, California.", "Dr. Bernhoft spent his earlier career as an accomplished and esteemed surgeon, having completed his general surgery residence and fellowship In liver and pancreatic surgery at the Royal Postgraduate Medical School at Hammersmith Hospital in London before continuing on to become a published researcher and established private practitioner.", "However, his life took a turn when he developed skin rashes and sores that prevented him from being able to properly handle surgical tools and safely care for his patients. He soon after began to experience severe GI distress. He fell back into research and discovered environmental medicine. From there he was able to treat, not only his own symptoms, but also the symptoms of underlying disorders developed by his wife and son.","When it comes to “untreatable” chronic conditions, Dr. Bernhoft never gives up. His first hand experience in healing from and treating chronic diseases has instilled within him a passion to discover and treat any ailment that comes to his door. His goal is to understand your health concerns, lifestyle, and history in order to create an individualized diagnosis plan that will allow you to better understand what is happening in your body.", "Once you are aware of what is ailing you and which environmental favors may be impacting your health, Dr. Bernhoft makes it his task to imbue you with all of the knowledge you need to make conscious, healthy decisions that can positively impact your wellbeing for now and always."]
  },
  {
      firstName: "Lysander",
      middleName: "",
      lastName: "Jim",
      slug: "lysander-jim-south pasadena-ca",
      gender: "male",
      practiceName: "Mastery Medical",
      phoneNumber: "(626) 838-5485",
      addressStreet: "1401 Mission Street",
      addressUnit: "Suite C5",
      addressCity: "South Pasadena",
      addressState: "CA",
      addressZipcode: "91030",
      addressCountry: "US",
      website: "http://masterymedical.com/",
      telehealth: "Unknown",
      shoemakerProtocol: true,
      conditionsTreated: "Mold Illness",
      certifications: ["MD"],
      seesPatientsIn: "CA",
      bio: ["Dr. Lysander Jim is a Board-certified Physical Medicine and Rehabilitation doctor who specializes in the treatment of low back pain and immunological conditions arising from damp building exposure. He graduated from the University of California, Berkeley with a bachelor’s degree in psychology (2007) and earned his medical doctorate (M.D.) at the Albert Einstein College of Medicine (2011).", "Dr. Jim has always been interested in the connection between the mind, the body, and the environment. He sees patients from all over the world who suffer from Chronic Inflammatory Response Syndrome (CIRS) due to water-damaged buildings (WDB). His approach is to use Shoemaker Protocol to help patients recover from their symptoms. He also uses a functional medicine approach to help patients improve their overall health and wellness.", "When he’s not seeing patients, Dr. Jim enjoys spending time with his family and is a passionate musician who plays multiple instruments."]
  },
  {
      firstName: "Scott",
      middleName: "W",
      lastName: "McMahon",
      slug: "scott-w-mcmahon-roswell-nm",
      gender: "male",
      addressCity: "Roswell",
      addressState: "NM",
      addressCountry: "US",
      conditionsTreated: "Mold Illness",
      certifications: ["MD"],
      shoemakerProtocol: true,
      
  },
  {
      firstName: "Robin",
      middleName: "",
      lastName: "Thomson",
      slug: "robin-thomson-bozeman-mt",
      gender: "female",
      practiceName: "Trillium Integrative Medicine",
      phoneNumber: "(406) 219-0049",
      addressCity: "Bozeman",
      addressState: "MT",
      addressCountry: "US",
      conditionsTreated: "Mold Illness",
      certifications: ["ND"],
      shoemakerProtocol: true,
      
  },
  {
    firstName: "Margaret",
    middleName: "",
    lastName: "DiTulio",
    slug: "margaret-ditulio-atkinson-nh",
    gender: "female",
    addressCity: "Atkinson",
    addressState: "NH",
    addressCountry: "US",
    conditionsTreated: "Mold Illness",
    shoemakerProtocol: true,
      
      
  },
  {
    firstName: "Kellyn",
    lastName: "Milani",
    slug: "kellyn-milani-bozeman-mt",
    gender: "female",
    addressCity: "Bozeman",
    addressState: "MT",
    addressCountry: "US",
    conditionsTreated: "Mold Illness",
    certifications: ["ND"],
    locations: ["MT", "CA"],
    shoemakerProtocol: true,
  },
  {
    firstName: "Lynese",
    middleName: "L",
    lastName: "Lawson",
    gender: "female",
    slug: "lynese-l-lawson-vienna-va",
    addressCity: "Vienna",
    addressState: "VA",
    addressCountry: "US",
    conditionsTreated: "Mold Illness",
    certifications: ["D.O.", "ABAARM", "IFMCP"],
    shoemakerProtocol: true,
  },
  {
    firstName: "Michael",
    middleName: "R",
    lastName: "Rothman",
    slug: "michael-rothman-spring-lake-nj",
    gender: "male",
    addressCity: "Spring Lake",
    addressState: "NJ",
    addressCountry: "US",
    conditionsTreated: "Mold Illness",
    certifications: ["MD", "FACEP"],
    shoemakerProtocol: true,

  },

  {
    firstName: "Natasha",
    middleName: "",
    lastName: "Thomas",
    slug: "natasha-thomas-myrtle-beach-sc",
    gender: "female",
    addressCity: "Myrtle Beach",
    addressState: "SC",
    addressCountry: "US",
    conditionsTreated: "Mold Illness",
    certifications: ["MD"],
    shoemakerProtocol: true,
  },
  {
    firstName: "Jacki",
    middleName: "",
    lastName: "Meinhardt",
    slug: "jacki-meinhardt-reston-va",
    gender: "female",
    
    addressCity: "Reston",
    addressState: "VA",
    
    addressCountry: "US",
    
    conditionsTreated: "Mold Illness",
    certifications: ["NP"],
    shoemakerProtocol: true,
  },
  {
    firstName: "Karen",
    middleName: "D.",
    lastName: "Johnson",
    slug: "karen-d-johnson-kapaau-hi",
    gender: "female",
    addressCity: "Kapaau",
    addressState: "HI",
    
    addressCountry: "US",
    
    conditionsTreated: "Mold Illness",
    certifications: ["MD"],
    shoemakerProtocol: true,
    
  },
  {
    firstName: "Jennifer",
    middleName: "",
    lastName: "Smith",
    slug: "jennifer-smith-phoenix-az",
    gender: "female",

    addressCity: "Phoenix",
    addressState: "AZ",

    addressCountry: "US",
    conditionsTreated: "Mold Illness",
    certifications: ["NMD"],
    shoemakerProtocol: true,

  },
  {
    firstName: "Craig",
    middleName: "",
    lastName: "Tanio",
    slug: "craig-tanio-hollywood-fl",
    gender: "male",
    addressCity: "Hollywood",
    addressState: "FL",
    addressCountry: "US",
    conditionsTreated: "Mold Illness",
    certifications: ["MD", "FACP"],
    shoemakerProtocol: true,
  },
  {
    firstName: "Louise",
    middleName: "",
    lastName: "Carder",
    slug: "louise-carder-lincoln-england",
    gender: "female",
    addressCity: "Lincoln",
    addressState: "England",
    addressZipcode: "",
    addressCountry: "GB",
    conditionsTreated: "Mold Illness",
    certifications: ["BSc Nutr. Med.", "PgDip"],
    shoemakerProtocol: true,
  },
  {
    firstName: "John",
    middleName: "",
    lastName: "Whitcomb",
    slug: "john-whitcomb-brookfield-wi",
    gender: "male",
    
    addressCity: "Brookfield",
    addressState: "WI",
    addressCountry: "US",
    
    conditionsTreated: "Mold Illness",
    certifications: ["MD"],
    shoemakerProtocol: true,
    
  },
  {
    firstName: "Tamara",
    middleName: "",
    lastName: "Lyday",
    slug: "tamara-lyday-green bay-wi",
    gender: "female",
    
    addressCity: "Green Bay",
    addressState: "WI",
    
    addressCountry: "US",
    shoemakerProtocol: true,
    conditionsTreated: "Mold Illness",
    certifications: ["DO"],
    
  },
  {
    firstName: "Ming",
    middleName: "",
    lastName: "Dooley",
    slug: "ming-dooley-san diego-ca",
    gender: "female",
    addressCity: "San Diego",
    addressState: "CA",
    addressCountry: "US",
    shoemakerProtocol: true,
    conditionsTreated: "Mold Illness",
    certifications: ["L.Ac"],
    
  },
  {
    firstName: "Jodie",
    middleName: "A",
    lastName: "Dashore",
    slug: "jodie-a-dashore-marlboro-nj",
    gender: "female",
    
    addressCity: "Marlboro",
    addressState: "NJ",
    
    addressCountry: "US",
    
    conditionsTreated: "Mold Illness",
    certifications: ["PhD","OTD","BCIP","HHP"],
    shoemakerProtocol: true,
    
  },
  {
    firstName: "Linda",
    middleName: "S",
    lastName: "Goggin",
    slug: "linda-s-goggin-bellingham-wa",
    gender: "female",
    addressCity: "Bellingham",
    addressState: "WA",
    addressCountry: "US",
    shoemakerProtocol: true,
    conditionsTreated: "Mold Illness",
    certifications: ["MD"],
    
  },

];



async function main() {

  doctorData.forEach( async (doctorObj) => {
    const doctor = await prisma.doctor.upsert({
      where: { slug: doctorObj.slug },
      update: { },
      create: {
        slug: doctorObj.slug,
        firstName: doctorObj.firstName,
        middleName: doctorObj.middleName,
        lastName: doctorObj.lastName,
        gender: doctorObj.gender,
        practiceName: doctorObj.practiceName,
        phoneNumber: doctorObj.phoneNumber,
        addressStreet: doctorObj.addressStreet,
        addressUnit: doctorObj.addressUnit,
        addressCity: doctorObj.addressCity,
        addressState: doctorObj.addressState,
        addressZipcode: doctorObj.addressZipcode,
        addressCountry: doctorObj.addressCountry,
        website: doctorObj.website,
        telehealth: doctorObj.telehealth,
        shoemakerProtocol: doctorObj.shoemakerProtocol,   // Boolean
        conditionsTreated: doctorObj.conditionsTreated,   // Array with default of "Mold Illness"
        certifications: doctorObj.certifications,         // Array
        seesPatientsIn: doctorObj.seesPatientsIn,         // Array
        bio: doctorObj.bio,                               // Array with default of "Coming Soon!"
      },  
    })    

    console.log(`Successfully seeded ${doctorObj.slug}`);
  })

  
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
