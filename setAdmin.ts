import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const emailToUpdate = process.argv[2];

    if (!emailToUpdate) {
        console.error("Please provide an email address.");
        console.log("Usage: npx ts-node setAdmin.ts <email>");
        process.exit(1);
    }

    try {
        const user = await prisma.user.update({
            where: { email: emailToUpdate },
            data: { role: 'admin' },
        })
        console.log(`Success! Updated user ${user.email} with the 'admin' role.`);
    } catch (error: unknown) {
        const err = error as { code?: string };
        if (err.code === 'P2025') {
            console.error(`User with email '${emailToUpdate}' not found in the database.`);
        } else {
            console.error("An error occurred:", error);
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
