import { UserRole } from "../constants/enums/user.role.enum";
import { prisma } from "../lib/prisma";

async function seedAdmin() {
    try {
        console.log("*** Admin seeding started");
        const adminData = {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            role: UserRole.ADMIN,
            password: process.env.ADMIN_PASSWORD
        }

        //check user exist on DB or not
        const isExistUser = await prisma.user.findUnique({
            where: {
                email: adminData.email as string
            }
        })


        if (isExistUser) {
            throw new Error("User already exists");
        }

        const signUpAdmin = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminData)
        });



        if (signUpAdmin.ok) {
            console.log("*** Admin created successfully");
            await prisma.user.update({
                where: {
                    email: adminData.email as string
                },
                data: {
                    emailVerified: true
                }
            })
            console.log("*** Admin role updates successfully");
        }

    } catch (error) {
        console.log(error);
    }
}

seedAdmin()