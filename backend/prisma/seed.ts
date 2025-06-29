import { config } from 'dotenv';
import prismaClient from './../src/db/db';
import { UserService } from './../src/services/UserService';
import { ConflictError } from './../src/exceptions/customException';
//Faker
import { faker } from '@faker-js/faker';
import { generateRandomPassword } from './../src/utils/hash';
// config({ path: __dirname + '/../.env' });
config();

if (
  process.env.NODE_ENV! === 'production' ||
  !process.env.ALLOW_SEED ||
  process.env.ALLOW_SEED !== 'true'
) {
  console.error(
    `❌ Seeding is either disabled or not allowed in the current \`${process.env.NODE_ENV} environment\` .`,
  );
  process.exit(1);
}
const email = process.env.ADMIN_EMAIL || faker.internet.email(); // Default to a random email if not set
const password = process.env.ADMIN_PASSWORD || generateRandomPassword(10); // Default to a random password if not set

const randomName = faker.person.fullName();
const mobile = 9 + faker.string.numeric(9); // Indian 10-digit starting with 9

if (!email || !password) {
  console.error('❌ Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env');
  process.exit(1);
}

async function main() {
  try {
    const userData = {
      name: randomName,
      email,
      password,
      mobile,

      //   role: 'admin',
    };
    const res = await UserService.createUsers(userData);
  } catch (e) {
    if (e instanceof ConflictError) {
      console.error('User already exists:', e.message);
    }
    //console.error('Error in seeding', e);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prismaClient.$disconnect());
