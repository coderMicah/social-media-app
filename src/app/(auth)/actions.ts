"use server"

import { lucia, validatedRequest } from "@/auth"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
	const { session } = await validatedRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}