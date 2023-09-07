import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const remediatorData = [
  {
    slug: "work-fast-remediations-los-angeles-ca",
    published: true,
    companyName: "Work Fast Remediations",
    phoneNumber: "(310) 555-5555",
    addressStreet: "123 Main St",
    addressUnit: "Suite A",
    addressCity: "Santa Clara",
    addressState: "CA",
    addressZipcode: "00000",
    addressCountry: "US",
    website: "test.com",
    certifications: ["RSA"],
    bio: ["Mold remediations done right."],
    createdAt: new Date(),
    lastModified: new Date(),
},
  {
    slug: "main-street-environmental-construction-tx",
    published: true,
    companyName: "Main Street Environmental Construction",
    phoneNumber: "(310) 555-5555",
    addressStreet: "123 Grove Place",
    addressUnit: "Suite A",
    addressCity: "Austin",
    addressState: "TX",
    addressZipcode: "00000",
    addressCountry: "US",
    website: "test.com",
    certifications: ["OPA"],
    bio: ["Mold remediations for residential and commercial customers."],
    createdAt: new Date(),
    lastModified: new Date(),
},
];



async function main() {

  remediatorData.forEach( async (remediatorObj) => {
    const remediator = await prisma.remediator.upsert({
      where: { slug: remediatorObj.slug },
      update: { 
        // createdAt: remediatorObj.createdAt,
        // lastModified: remediatorObj.lastModified,
      },
      create: {
        slug: remediatorObj.slug,
        published: remediatorObj.published,
        companyName: remediatorObj.companyName,          
        phoneNumber: remediatorObj.phoneNumber,
        addressStreet: remediatorObj.addressStreet,
        addressUnit: remediatorObj.addressUnit,
        addressCity: remediatorObj.addressCity,
        addressState: remediatorObj.addressState,
        addressZipcode: remediatorObj.addressZipcode,
        addressCountry: remediatorObj.addressCountry,
        website: remediatorObj.website,
        certifications: remediatorObj.certifications,         // Array
        bio: remediatorObj.bio,                               // Array with default of "Coming Soon!"
        createdAt: remediatorObj.createdAt,
        lastModified: remediatorObj.lastModified,
      },  
    })    

    console.log(`Successfully seeded ${remediatorObj.slug}`);
  })

  
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
