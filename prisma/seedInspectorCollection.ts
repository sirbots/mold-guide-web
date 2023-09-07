import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const inspectorData = [
  {
    slug: "sun-valley-mold-inspections-santa-clara-ca",
    published: true,
    companyName: "Sun Valley Mold Inspections",
    phoneNumber: "(310) 555-5555",
    addressStreet: "123 Main St",
    addressUnit: "Suite A",
    addressCity: "Santa Clara",
    addressState: "CA",
    addressZipcode: "00000",
    addressCountry: "US",
    website: "test.com",
    certifications: ["IIRC"],
    bio: ["Mold inspections done right."],
    createdAt: new Date(),
    lastModified: new Date(),
},
  {
    slug: "main-street-environmental-austin-tx",
    published: true,
    companyName: "Main Street Environmental",
    phoneNumber: "(310) 555-5555",
    addressStreet: "123 Grove Place",
    addressUnit: "Suite A",
    addressCity: "Austin",
    addressState: "TX",
    addressZipcode: "00000",
    addressCountry: "US",
    website: "test.com",
    certifications: ["ACAC"],
    bio: ["Mold inspections for residential and commercial customers."],
    createdAt: new Date(),
    lastModified: new Date(),
},
];



async function main() {

  inspectorData.forEach( async (inspectorObj) => {
    const inspector = await prisma.inspector.upsert({
      where: { slug: inspectorObj.slug },
      update: { 
        // createdAt: inspectorObj.createdAt,
        // lastModified: inspectorObj.lastModified,
      },
      create: {
        slug: inspectorObj.slug,
        published: inspectorObj.published,
        companyName: inspectorObj.companyName,          
        phoneNumber: inspectorObj.phoneNumber,
        addressStreet: inspectorObj.addressStreet,
        addressUnit: inspectorObj.addressUnit,
        addressCity: inspectorObj.addressCity,
        addressState: inspectorObj.addressState,
        addressZipcode: inspectorObj.addressZipcode,
        addressCountry: inspectorObj.addressCountry,
        website: inspectorObj.website,
        certifications: inspectorObj.certifications,         // Array
        bio: inspectorObj.bio,                               // Array with default of "Coming Soon!"
        createdAt: inspectorObj.createdAt,
        lastModified: inspectorObj.lastModified,
      },  
    })    

    console.log(`Successfully seeded ${inspectorObj.slug}`);
  })

  
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
