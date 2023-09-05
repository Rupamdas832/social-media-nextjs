import { prisma } from "@/lib/db";
import { hash } from "@/lib/hash";

export const createUser = async (email: string, password: string) => {
  const passwordHash = await hash(password);

  const admin = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (admin) {
    return "Admin already exists";
  }

  const newAdmin = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      authType: "PASSWORD",
    },
  });

  if (newAdmin) return "Created admin user";
};

const mockData = [
  { email: "user1@test.com", password: "foo123" },
  { email: "user2@test.com", password: "foo123" },
  { email: "user3@test.com", password: "foo123" },
];

export function CreateSeed() {
  mockData.forEach((item) => createUser(item.email, item.password));
}
